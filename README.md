# OpenLedger Backend API

Express.js backend application for managing decentralized applications (Dex) in the OpenLedger ecosystem.

## Features

- RESTful API for application management
- PostgreSQL database with Sequelize ORM
- Authentication middleware (wallet-based)
- CORS enabled
- Error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd open_terminal_backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` file with your database credentials and configuration.

4. Create the database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE open_terminal;
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Health Check
```
GET /health
```
Returns the server status.

### Create Application
```
POST /api/create_app
```

**Headers:**
- Content-Type: application/json

**Request Body:**
```json
{
  "name": "My Dex App",
  "wallet": "0x1234567890abcdef...",
  "sign": "signature_string",
  "description": "A decentralized exchange application",
  "networks": ["ethereum", "polygon"],
  "brand_logo": "https://example.com/logo.png",
  "brand_fav_icon": "https://example.com/favicon.ico",
  "user_prompt": "Welcome to my Dex!",
  "design_system_id": "design_123"
}
```

**Required Fields:**
- `name`: Application name
- `wallet`: Wallet address

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My Dex App",
    "description": "A decentralized exchange application",
    "brand_logo": "https://example.com/logo.png",
    "brand_fav_icon": "https://example.com/favicon.ico",
    "is_enabled": true,
    "created_at": "2026-01-28T10:30:00.000Z",
    "updated_at": "2026-01-28T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": "Missing required fields: name and wallet are required"
}
```

## API's 

  1. Get Chat History

  GET /api/chat/:chat_id/history
  - Purpose: Fetch complete conversation history for a specific chat
  - Returns: All messages (user + AI responses) with metadata
  - Example:
  curl -H "x-wallet-address: manojkumar@guardianlink.io" \
    "http://localhost:4040/api/chat/jALjI5yl2uu/history"

  ---
  2. Get Single Application

  GET /api/applications/:uuid
  - Purpose: Fetch details of one specific application by UUID
  - Returns: Full application details including chat_id, prompts, etc.
  - Example:
  curl -H "x-wallet-address: manojkumar@guardianlink.io" \
    "http://localhost:4040/api/applications/21b4f18f-bea3-440a-9224-dd5b766701b5"

  ---
  3. Get All Applications

  GET /api/applications
  - Purpose: Fetch all applications for a wallet
  - Returns: List of all applications owned by the wallet
  - Example:
  curl -H "x-wallet-address: manojkumar@guardianlink.io" \
    "http://localhost:4040/api/applications"

## Database Schema

### Applications Table

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| uuid | UUID | No | Primary key |
| name | STRING | No | Application name |
| wallet | STRING | No | Wallet address |
| description | TEXT | Yes | App description |
| type | STRING | Yes | Application type |
| networks | ARRAY | Yes | Supported networks |
| brand_logo | STRING | Yes | Logo URL |
| brand_fav_icon | STRING | Yes | Favicon URL |
| system_prompt | TEXT | Yes | System prompt |
| user_prompt | TEXT | Yes | User prompt |
| status | STRING | Yes | Application status |
| vercel_project_id | STRING | Yes | Vercel project ID |
| wallet_project_id | STRING | Yes | Wallet project ID |
| design_system_id | STRING | Yes | Design system ID |
| chat_init_response | TEXT | Yes | Chat initialization |
| is_enabled | BOOLEAN | No | Enable/disable flag |
| created_at | TIMESTAMP | No | Creation timestamp |
| updated_at | TIMESTAMP | No | Update timestamp |

## Project Structure

```
open_terminal_backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── applicationController.js  # Application logic
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   └── Application.js       # Application model
├── routes/
│   └── applicationRoutes.js # API routes
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── server.js               # Application entry point
└── README.md               # Documentation
```

## Authentication

The current implementation includes an authentication middleware that validates all requests. Currently, it returns `true` for all requests. To implement proper wallet signature verification, modify the `middleware/auth.js` file.

## Error Handling

The application includes comprehensive error handling:
- Input validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)

## Development Notes

- The database will auto-sync on server start in development mode
- Use `{ alter: true }` for development to update tables without data loss
- Never use `{ force: true }` in production as it drops all tables

## License

MIT
