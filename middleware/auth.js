/**
 * Auth middleware
 * Extracts wallet address from request and attaches to req.user
 * TODO: Implement actual authentication logic (wallet signature verification)
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Extract wallet from body, query params, or headers
    const wallet = req.body?.wallet || req.query?.wallet || req.headers['x-wallet-address'];

    if (!wallet) {
      return res.status(401).json({
        success: false,
        error: 'Wallet address is required for authentication'
      });
    }

    // Attach wallet to req.user for use in controllers
    req.user = {
      wallet: wallet
    };
    
    // Authentication successful, proceed to next middleware/controller
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication error'
    });
  }
};

export default authMiddleware;
