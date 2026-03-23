import express from 'express';
import { createApplication, getApplicationsByWallet, getApplicationByUuid } from '../controllers/applicationController.js';
import { sendChatMessage, getChatHistory } from '../controllers/chatController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// GET /api/applications - Get all applications for logged-in user
router.get('/applications', authMiddleware, getApplicationsByWallet);

// GET /api/applications/:uuid - Get single application by UUID
router.get('/applications/:uuid', authMiddleware, getApplicationByUuid);

// POST /api/create_app - Create a new application
router.post('/create_app', authMiddleware, createApplication);

// POST /api/chat - Send a message to a chat
router.post('/chat', authMiddleware, sendChatMessage);

// GET /api/chat/:chat_id/history - Get chat history with all messages
router.get('/chat/:chat_id/history', authMiddleware, getChatHistory);

export default router;
