/**
 * Test script for fetching applications by wallet address
 * 
 * This script demonstrates how to call the GET /api/applications endpoint
 */

const API_BASE_URL = 'http://localhost:3000/api';

async function testGetApplications() {
  try {
    // Replace with your actual wallet address
    const walletAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
    
    console.log('Testing GET /api/applications...');
    console.log(`Wallet Address: ${walletAddress}\n`);
    
    // Method 1: Using query parameter
    console.log('Method 1: Query Parameter');
    const response1 = await fetch(`${API_BASE_URL}/applications?wallet=${walletAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const result1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', JSON.stringify(result1, null, 2));
    console.log('\n---\n');
    
    // Method 2: Using custom header
    console.log('Method 2: Custom Header (x-wallet-address)');
    const response2 = await fetch(`${API_BASE_URL}/applications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-wallet-address': walletAddress
      }
    });
    
    const result2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', JSON.stringify(result2, null, 2));
    
    if (result2.success) {
      console.log('\n✓ Success!');
      console.log(`Found ${result2.count} application(s) for wallet ${walletAddress}`);
      
      if (result2.data && result2.data.length > 0) {
        console.log('\nApplications:');
        result2.data.forEach((app, index) => {
          console.log(`\n${index + 1}. ${app.name}`);
          console.log(`   UUID: ${app.uuid}`);
          console.log(`   Status: ${app.status}`);
          console.log(`   Enabled: ${app.is_enabled}`);
          console.log(`   Chat ID: ${app.chat_id || 'N/A'}`);
          console.log(`   Vercel Project: ${app.vercel_project_id || 'N/A'}`);
          console.log(`   Created: ${app.created_at}`);
        });
      }
    } else {
      console.log('\n✗ Failed:', result2.error);
    }
    
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    console.error(error.stack);
  }
}

testGetApplications();

// Usage Instructions:
// 1. Make sure your backend server is running on port 3000
// 2. Update the walletAddress variable with your actual wallet address
// 3. Run: node scripts/test_get_applications.mjs

// Example API Calls:
// 
// Using curl with query parameter:
// curl -X GET "http://localhost:3000/api/applications?wallet=0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
//
// Using curl with header:
// curl -X GET http://localhost:3000/api/applications \
//   -H "x-wallet-address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
