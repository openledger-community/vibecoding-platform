import v0Service from '../services/v0Service.js';

async function main() {
  try {
    console.log('Initializing chat for project dmrv15xlMfr...');
    
    const result = await v0Service.initChat({
      projectId: 'Dgc2wTtuA5v',
      type: 'repo',
      repo: {
        url: 'https://github.com/bethink/xyra-open-template',
        branch: 'api',
      },
      name: '02-02-2026_001',
    });
    
    console.log('Chat initialized successfully:');
    console.log(JSON.stringify(result.data, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize chat:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();

// Example Response:
// {
//   "id": "GJMMb5rqwvO",
//   "object": "chat",
//   "shareable": false,
//   "privacy": "private",
//   "name": "Create DEX for blue-001",
//   "title": "Create DEX for blue-001",
//   "createdAt": "2026-01-28T15:23:10.512Z",
//   "updatedAt": "2026-01-28T15:23:10.595Z",
//   "favorite": false,
//   "authorId": "WDl59ndABqAwLvezRWVXiKKi",
//   "projectId": "dmrv15xlMfr",
//   "webUrl": "https://v0.app/chat/GJMMb5rqwvO",
//   "apiUrl": "https://api.v0.dev/v1/chats/GJMMb5rqwvO",
//   "latestVersion": {
//     "id": "b_xEAnJCFISdp",
//     "object": "version",
//     "status": "completed",
//     "demoUrl": "https://demo-kzmqougl0vmtkhvbj1bk.vusercontent.net",
//     "screenshotUrl": "https://api.v0.dev/v1/chats/GJMMb5rqwvO/versions/b_xEAnJCFISdp/screenshot",
//     "createdAt": "2026-01-28T15:23:10.511Z",
//     "updatedAt": "2026-01-28T15:23:10.512Z",
//     "files": [
//       {
//         "object": "file",
//         "name": "LICENSE",
//         "content": "Apache License... (full content)",
//         "locked": false
//       }
//     ]
//   },
//   "url": "https://v0.app/chat/GJMMb5rqwvO",
//   "messages": [
//     {
//       "id": "UJTS28JVFW4hhhiTATHG3IaiPiFcvzK2",
//       "object": "message",
//       "content": "Start from this ZIP file.",
//       "createdAt": "2026-01-28T15:23:10.393Z",
//       "updatedAt": "2026-01-28T15:23:10.512Z",
//       "type": "open-in-v0",
//       "role": "user",
//       "apiUrl": "https://api.v0.dev/v1/chats/GJMMb5rqwvO/messages/UJTS28JVFW4hhhiTATHG3IaiPiFcvzK2",
//       "authorId": "WDl59ndABqAwLvezRWVXiKKi",
//       "parentId": null
//     },
//     {
//       "id": "zmQnON1yWEySeoJc60Hr1e22bQDCAZaa",
//       "object": "message",
//       "content": "**bethinkopenterminaldex** was imported... (full content)",
//       "createdAt": "2026-01-28T15:23:10.394Z",
//       "updatedAt": "2026-01-28T15:23:10.512Z",
//       "type": "open-in-v0",
//       "role": "assistant",
//       "finishReason": "stop",
//       "apiUrl": "https://api.v0.dev/v1/chats/GJMMb5rqwvO/messages/zmQnON1yWEySeoJc60Hr1e22bQDCAZaa",
//       "authorId": "WDl59ndABqAwLvezRWVXiKKi",
//       "parentId": "UJTS28JVFW4hhhiTATHG3IaiPiFcvzK2"
//     }
//   ],
//   "files": [
//     {
//       "lang": "plaintext",
//       "meta": { "file": "LICENSE" },
//       "source": "Apache License... (full content)"
//     }
//   ],
//   "demo": "https://demo-kzmqougl0vmtkhvbj1bk.vusercontent.net",
//   "text": "**bethinkopenterminaldex** was imported... (full content)",
//   "permissions": {
//     "write": true
//   }
// }
