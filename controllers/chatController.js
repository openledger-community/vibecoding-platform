import v0Service from '../services/v0Service.js';
import Application from '../models/Application.js';

/**
 * Send a message to a chat
 * POST /api/chat
 */
export const sendChatMessage = async (req, res) => {
  try {
    const { chat_id, prompt } = req.body;

    // Validate required fields
    if (!chat_id) {
      return res.status(400).json({
        success: false,
        error: 'chat_id is required'
      });
    }

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'prompt is required and must be a string'
      });
    }

    // Optional: Verify chat_id exists in database
    const application = await Application.findOne({
      where: { chat_id: chat_id }
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found'
      });
    }

    // Send message to V0 chat
    console.log(`Sending message to chat ${chat_id}...`);
    const result = await v0Service.sendChatMessage(
      chat_id,
      prompt
    );



    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Handle the stream
    const reader = result.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Send the chunk to the client
      // Assuming value is a Uint8Array, we decode it
      const chunk = new TextDecoder().decode(value);
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error('Error sending chat message:', error);
    // If headers are already sent, we can't send a JSON error response
    if (res.headersSent) {
      res.end();
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to send chat message',
        message: error.message
      });
    }
  }
};

/**
 * Get chat history with all messages
 * GET /api/chat/:chat_id/history
 */
export const getChatHistory = async (req, res) => {
  try {
    const { chat_id } = req.params;

    // Validate required fields
    if (!chat_id) {
      return res.status(400).json({
        success: false,
        error: 'chat_id is required'
      });
    }

    // Verify chat_id exists in database
    const application = await Application.findOne({
      where: { chat_id: chat_id }
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found in database'
      });
    }

    // Fetch chat history from V0
    console.log(`Fetching chat history for chat ${chat_id}...`);
    const result = await v0Service.getChatHistory(chat_id);

    if (!result.success) {
      throw new Error('Failed to fetch chat history');
    }

    // Return the chat history
    return res.status(200).json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('Error fetching chat history:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch chat history',
      message: error.message
    });
  }
};
