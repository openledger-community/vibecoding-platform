import v0Service from '../services/v0Service.js';

async function main() {
  try {
    console.log('Creating project on V0...');
    
    const result = await v0Service.createProject({
      name: '02-02-2026_001',
      description: '02-02-2026_001',
      privacy: 'private',
      designSystemId: 'LlwCRnudRpp'
    });
    
    console.log('Project created successfully:');
    console.log(JSON.stringify(result.data, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Failed to create project:', error.message);
    process.exit(1);
  }
}

main();

//   {
//     "id": "dmrv15xlMfr",
//     "object": "project",
//     "name": "Blue-001",
//     "privacy": "private",
//     "vercelProjectId": "prj_TisZtx9DqPltEiQeq4AcJxyGUEnF",
//     "createdAt": "2026-01-28T15:18:45.376Z",
//     "updatedAt": "2026-01-28T15:18:45.590Z",
//     "apiUrl": "https://api.v0.dev/v1/projects/dmrv15xlMfr",
//     "webUrl": "https://v0.app/chat/projects/dmrv15xlMfr",
//     "description": "desc",
//     "chats": []
//   }



// "id": "502jT9Kdapz",
// "object": "project",
// "name": "Fri_01",
// "privacy": "private",
// "vercelProjectId": "prj_prFLjvVbtZqkLRarLVoCyvprYeym",