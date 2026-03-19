import v0Service from '../services/v0Service.js';

async function main() {
  try {
    console.log('Creating chat with message...');
    
    const result = await v0Service.createChat({
      system: 'You are an expert coder',
      message: 'Change primary color to rgb(206, 26, 26)',
      projectId: '502jT9Kdapz', // Replace with your project ID
      designSystemId: 'OHmVYYDDClw',
      modelConfiguration: {
        modelId: 'v0-mini'
      }
    });
    
    console.log('Chat created successfully:');
    console.log(JSON.stringify(result.data, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Failed to create chat:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();

// Example Response:
// {
//   "id": "chat_abc123xyz",
//   "object": "chat",
//   "name": "Create a hello world page with octopus",
//   "title": "Create a hello world page with octopus",
//   "privacy": "private",
//   "shareable": false,
//   "favorite": false,
//   "projectId": "dmrv15xlMfr",
//   "authorId": "WDl59ndABqAwLvezRWVXiKKi",
//   "createdAt": "2026-01-28T15:30:00.000Z",
//   "updatedAt": "2026-01-28T15:30:00.000Z",
//   "webUrl": "https://v0.app/chat/chat_abc123xyz",
//   "apiUrl": "https://api.v0.dev/v1/chats/chat_abc123xyz",
//   "latestVersion": {
//     "id": "version_xyz789",
//     "object": "version",
//     "status": "completed",
//     "demoUrl": "https://demo-example.vusercontent.net",
//     "screenshotUrl": "https://api.v0.dev/v1/chats/chat_abc123xyz/versions/version_xyz789/screenshot",
//     "createdAt": "2026-01-28T15:30:00.000Z",
//     "updatedAt": "2026-01-28T15:30:01.000Z",
//     "files": [
//       {
//         "object": "file",
//         "name": "page.tsx",
//         "content": "... (generated code)",
//         "locked": false
//       }
//     ]
//   },
//   "messages": [
//     {
//       "id": "msg_user_123",
//       "object": "message",
//       "content": "Create a hello world page with octopus",
//       "role": "user",
//       "type": "text",
//       "createdAt": "2026-01-28T15:30:00.000Z",
//       "updatedAt": "2026-01-28T15:30:00.000Z",
//       "authorId": "WDl59ndABqAwLvezRWVXiKKi",
//       "parentId": null
//     },
//     {
//       "id": "msg_assistant_456",
//       "object": "message",
//       "content": "Here's a hello world page... (full response)",
//       "role": "assistant",
//       "finishReason": "stop",
//       "createdAt": "2026-01-28T15:30:00.500Z",
//       "updatedAt": "2026-01-28T15:30:01.000Z",
//       "authorId": "WDl59ndABqAwLvezRWVXiKKi",
//       "parentId": "msg_user_123"
//     }
//   ],
//   "demo": "https://demo-example.vusercontent.net",
//   "permissions": {
//     "write": true
//   }
// }
