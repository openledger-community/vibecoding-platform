import v0Service from '../services/v0Service.js';

async function main() {
  try {
    // Replace with your actual chat ID from the initChat response
    const chatId = 'Z96IBznzzQ6'; // Example chat ID - update this!
    const message = 'Add a dark/light mode toggle to the trading interface with smooth transitions';
    
    console.log('Sending message to chat...');
    console.log(`Chat ID: ${chatId}`);
    console.log(`Message: ${message}`);
    console.log('---');
    
    const result = await v0Service.sendChatMessage(chatId, message);
    
    console.log('\n✓ Message sent successfully!');
    console.log('\nResponse:');
    console.log(JSON.stringify(result.data, null, 2));
    
    // Log key information
    if (result.data) {
      console.log('\n--- Quick Info ---');
      console.log(`Chat URL: ${result.data.webUrl || result.data.url || 'N/A'}`);
      if (result.data.demo) {
        console.log(`Demo URL: ${result.data.demo}`);
      }
      if (result.data.messages && result.data.messages.length > 0) {
        const lastMessage = result.data.messages[result.data.messages.length - 1];
        console.log(`Latest message role: ${lastMessage.role}`);
        console.log(`Latest message preview: ${lastMessage.content?.substring(0, 100)}...`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Failed to send message:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();

// Usage Instructions:
// 1. First, run init_chat.mjs to create a chat and get the chat ID
// 2. Update the chatId variable above with the actual chat ID
// 3. Customize the message to what you want to ask V0
// 4. Run: node scripts/send_chat_message.mjs

// Example workflow:
// Step 1: node scripts/init_chat.mjs
//         -> Get chat ID from response (e.g., "GJMMb5rqwvO")
// 
// Step 2: Update chatId in this file
// 
// Step 3: node scripts/send_chat_message.mjs
//         -> Sends your message and gets V0's response

// Example messages you can try:
// - "Add a dark mode toggle to the interface"
// - "Implement real-time price updates using WebSockets"
// - "Add a trading chart using Chart.js"
// - "Create a mobile-responsive navigation menu"
// - "Add authentication with login and signup forms"
