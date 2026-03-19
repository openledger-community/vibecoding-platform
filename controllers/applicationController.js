import Application from '../models/Application.js';
import v0Service from '../services/v0Service.js';

/**
 * Get all applications for a wallet address
 * GET /api/applications?wallet=0x...
 * or with wallet in headers (x-wallet-address)
 */
export const getApplicationsByWallet = async (req, res) => {
  try {
    // Get wallet from authenticated user (set by auth middleware)
    const wallet = req.user?.wallet;

    if (!wallet) {
      return res.status(400).json({
        success: false,
        error: 'Wallet address is required'
      });
    }

    console.log(`Fetching applications for wallet: ${wallet}`);

    // Fetch all applications for this wallet
    const applications = await Application.findAll({
      where: {
        wallet: wallet
      },
      order: [['created_at', 'DESC']], // Most recent first
      attributes: [
        'uuid',
        'name',
        'description',
        'type',
        'networks',
        'brand_logo',
        'brand_fav_icon',
        'status',
        'vercel_project_id',
        'design_system_id',
        'chat_id',
        'is_enabled',
        'created_at',
        'updated_at'
      ]
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      wallet: wallet,
      data: applications
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch applications',
      message: error.message
    });
  }
};

/**
 * Get a single application by UUID
 * GET /api/applications/:uuid
 */
export const getApplicationByUuid = async (req, res) => {
  try {
    const { uuid } = req.params;
    const wallet = req.user?.wallet;

    if (!wallet) {
      return res.status(400).json({
        success: false,
        error: 'Wallet address is required'
      });
    }

    if (!uuid) {
      return res.status(400).json({
        success: false,
        error: 'Application UUID is required'
      });
    }

    console.log(`Fetching application ${uuid} for wallet: ${wallet}`);

    // Find the application by UUID and wallet (to ensure user owns it)
    const application = await Application.findOne({
      where: {
        uuid: uuid,
        wallet: wallet
      },
      attributes: [
        'uuid',
        'name',
        'description',
        'type',
        'networks',
        'brand_logo',
        'brand_fav_icon',
        'system_prompt',
        'user_prompt',
        'status',
        'vercel_project_id',
        'wallet_project_id',
        'design_system_id',
        'chat_id',
        'chat_init_response',
        'is_enabled',
        'created_at',
        'updated_at'
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found or you do not have access to it'
      });
    }

    return res.status(200).json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Error fetching application:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch application',
      message: error.message
    });
  }
};

/**
 * Create a new application
 * POST /api/create_app
 */
export const createApplication = async (req, res) => {
  try {
    const {
      name,
      wallet,
      sign,
      description,
      networks,
      brand_logo,
      brand_fav_icon,
      user_prompt,
      design_system_id,
      system_prompt
    } = req.body;

    // Read repo configuration from environment variables
    const repoUrl = process.env.REPO_URL;
    const repoBranch = process.env.REPO_BRANCH || 'main';

    // Validate required fields
    if (!name || !wallet) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name and wallet are required'
      });
    }

    // Validate design_system_id if provided
    if (design_system_id && typeof design_system_id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid design_system_id'
      });
    }

    // Validate user_prompt
    if (!user_prompt || typeof user_prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'user_prompt is required'
      });
    }

    // Step 1: Create project on V0
    console.log('Creating V0 project...');
    const projectResult = await v0Service.createProject({
      name: name,
      designSystemId: design_system_id,
      description: description || '',
      privacy: 'private'
    });

    if (!projectResult.success || !projectResult.data?.id) {
      throw new Error('Failed to create V0 project');
    }

    const projectId = projectResult.data.id;
    console.log('Project created with ID:', projectId);

    // Step 2: Always initialize chat with env repo configuration
    let chatInitResult = null;
    let chatId = null;

    if (!repoUrl) {
      throw new Error('REPO_URL environment variable is not configured');
    }

    console.log('Initializing chat with repository...');
    chatInitResult = await v0Service.initChat({
      projectId: projectId,
      type: 'repo',
      repo: {
        url: repoUrl,
        branch: repoBranch
      },
      name: `Chat for ${name}`
    });

    if (!chatInitResult.success) {
      throw new Error('Failed to initialize chat');
    }

    chatId = chatInitResult.data.id;
    console.log('Chat initialized with ID:', chatId);

    // Step 2.5: Send system + user prompt to trigger generation
    console.log('Sending prompt to trigger UI generation...');

    // Static system prompt - emphasizes using repo as base
    const systemPrompt = `You are an expert React and Next.js developer.

IMPORTANT: Use the provided repository as your base template. Modify and enhance the existing code structure - do not start from scratch.

Build a clean, modern prediction market dashboard following these guidelines:
- Use the existing components and structure from the repo as foundation
- Apply the specified design pattern and styling requirements
- Use Tailwind CSS for all styling
- Ensure responsive design and smooth user experience
- Keep the code production-ready

Customize the UI to match the user's requirements while maintaining the repo's architecture.`;

    // Combine system prompt with user prompt from frontend
    const combinedPrompt = `${systemPrompt}

${user_prompt}`;

    // Send message without streaming (useStream = false)
    try {
      await v0Service.sendChatMessage(chatId, combinedPrompt, false);
      console.log('✅ Prompt sent successfully - generation started');
    } catch (error) {
      console.warn('⚠️ Failed to send prompt:', error.message);
      // Don't fail the entire request - chat is initialized, user can try again
    }

    // Step 3: Create the application entry in database
    const application = await Application.create({
      name,
      wallet,
      description,
      networks: networks || [],
      brand_logo,
      brand_fav_icon,
      user_prompt,
      system_prompt,
      design_system_id,
      vercel_project_id: projectResult.data.vercelProjectId || projectId,
      chat_id: chatId,
      chat_init_response: chatInitResult ? JSON.stringify(chatInitResult.data) : null
    });

    // Return the response
    return res.status(201).json({
      success: true,
      data: {
        uuid: application.uuid,
        name: application.name,
        description: application.description,
        brand_logo: application.brand_logo,
        brand_fav_icon: application.brand_fav_icon,
        is_enabled: application.is_enabled,
        vercel_project_id: application.vercel_project_id,
        chat_id: chatId,
        repo_url: repoUrl,           // For validation
        repo_branch: repoBranch,     // For validation
        created_at: application.created_at,
        updated_at: application.updated_at
      }
    });

  } catch (error) {
    console.error('Error creating application:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create application',
      message: error.message
    });
  }
};
