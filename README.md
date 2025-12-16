# Backend - MyMedCab 🛠️💾

Node.js + Express + TypeScript backend with PostgreSQL database for the MyMedCab medical management system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- PostgreSQL 17
- pgAdmin 4 (v9.6)

### Installation & Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Verify server is running:**
   - Server should start on `http://localhost:3000`
   - Check terminal for "Server running on port 3000" message

## 📁 Project Structure

```
backend/
├── src/                   # Source code
│   ├── authRoutes.ts     # Authentication API routes
│   ├── db.ts             # Database connection setup
│   └── server.ts         # Express server configuration
├── node_modules/         # Dependencies (auto-generated)
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── tsconfig.json         # TypeScript configuration
└── .gitignore           # Git ignore rules
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with auto-restart
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run clean        # Clean build artifacts

# Development Tools
npm run type-check   # Check TypeScript types
npm test             # Run tests (when implemented)
```

## 💾 Database Setup & Access

### Option 1: Local PostgreSQL Development Setup

If you want to develop with a local PostgreSQL database instead of the remote AWS RDS:

#### Installing PostgreSQL Locally (macOS)

1. **Install PostgreSQL using Homebrew:**
   ```bash
   brew install postgresql@16
   ```

2. **Start PostgreSQL service:**
   ```bash
   brew services start postgresql@16
   ```

3. **Create database and user:**
   ```bash
   # Create the database
   createdb mymedcab
   
   # Connect to PostgreSQL
   psql postgres
   ```

4. **Create the required tables:**
   ```sql
   -- Connect to your database
   \c mymedcab
   
   -- Create users table
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       first_name VARCHAR(100) NOT NULL,
       last_name VARCHAR(100) NOT NULL,
       dob DATE NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Create physician table
   CREATE TABLE physician (
       id SERIAL PRIMARY KEY,
       doctor_name VARCHAR(100) NOT NULL,
       doctor_id VARCHAR(50) UNIQUE NOT NULL,
       specialty VARCHAR(100) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Exit psql
   \q
   ```

5. **Update your .env file for local development:**
   ```env
   # Server Configuration
   PORT=3001
   
   # Local Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mymedcab
   DB_USER=postgres
   DB_PASSWORD=password
   ```

6. **Test your local setup:**
   ```bash
   # Start your server
   npm run dev
   
   # Test the API endpoints
   curl http://localhost:3001/api/
   
   # Test patient login
   curl -X POST http://localhost:3001/api/login \
     -H "Content-Type: application/json" \
     -d '{"firstName": "John", "lastName": "Doe", "dob": "1990-01-01"}'
   ```

### Option 2: Remote AWS RDS Setup (Production)

### Installing PostgreSQL 17

1. **Download and Install PostgreSQL 17:**
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - PostgreSQL 17 comes with pgAdmin v9.6
   - Follow installation wizard for your operating system

### Connecting to MyMedCab Database

#### pgAdmin Setup Instructions:

1. **Open pgAdmin 4**

2. **Register Server:**
   - Right-click on "Servers" in the left panel
   - Click "Register" → "Server..."

3. **General Tab:**
   - **Name**: `MyMedCab` (write exactly as shown)

4. **Connection Tab:**
   - **Host name/address**: `mymedcab-database.cncwwsga49b6.us-east-2.rds.amazonaws.com`
   - **Port**: `5433` ⚠️ (Note: This is NOT 5432, it's 5433)
   - **Maintenance database**: `postgres`
   - **Username**: `niel`
   - **Password**: `abcdepostgres12345`

5. **Save and Connect:**
   - Click "Save"
   - You should now see the MyMedCab server in the left panel
   - Expand it to see the `mymedcab` database with all tables

#### Database Connection Credentials:
```
Host: mymedcab-database.cncwwsga49b6.us-east-2.rds.amazonaws.com
Port: 5433
Database: mymedcab
Username: niel
Password: abcdepostgres12345
```

**Important Notes:**
- All usernames and passwords are lowercase
- No spaces in any credentials
- Port is 5433, not the default 5432

#### Alternative Connection (Command Line):
```bash
psql -h mymedcab-database.cncwwsga49b6.us-east-2.rds.amazonaws.com -p 5433 -U niel -d mymedcab
# Enter password when prompted: abcdepostgres12345
```

## 🏗️ Technologies & Tools

- **Node.js** - JavaScript runtime environment
- **Express** - Web framework for Node.js
- **TypeScript** - Type safety and modern JavaScript features
- **PostgreSQL 17** - Relational database
- **pg** - PostgreSQL client for Node.js
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend folder (if needed):
```env
# Database Configuration
DB_HOST=mymedcab-database.cncwwsga49b6.us-east-2.rds.amazonaws.com
DB_PORT=5433
DB_NAME=mymedcab
DB_USER=niel
DB_PASSWORD=abcdepostgres12345

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Database Connection (`db.ts`)
The database connection is configured to connect to the AWS RDS PostgreSQL instance:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: 'mymedcab-database.cncwwsga49b6.us-east-2.rds.amazonaws.com',
  port: 5433,
  database: 'mymedcab',
  user: 'niel',
  password: 'abcdepostgres12345',
});

export default pool;
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/login`
User login endpoint
```json
{
  "username": "string",
  "password": "string"
}
```

#### POST `/api/auth/register`
User registration endpoint
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

#### GET `/api/auth/logout`
User logout endpoint

### Testing API Endpoints
```bash
# Test server is running
curl http://localhost:3000/api/auth/test

# Test login (example)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
```

## 🚨 Common Issues & Solutions

### Database Connection Issues

**Cannot connect to database:**
```bash
# Check if PostgreSQL is installed
psql --version

# Test connection manually
psql -h mymedcab-database.cncwwsga49b6.us-east-2.rds.amazonaws.com -p 5433 -U niel -d postgres
```

**pgAdmin connection fails:**
- Double-check hostname (copy-paste to avoid typos)
- Ensure port is 5433, not 5432
- Verify username is lowercase: `niel`
- Check internet connection (database is on AWS)

### Server Issues

**Port 3000 already in use:**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
lsof -ti:3000 | xargs kill -9

# Start server again
npm run dev
```

**TypeScript compilation errors:**
```bash
# Check for syntax errors
npm run type-check

# Clean and rebuild
npm run clean
npm run build
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Development Issues

**Server not restarting on changes:**
```bash
# Make sure you're using npm run dev (not npm start)
npm run dev

# Check if nodemon is installed
npm list nodemon
```

**CORS errors from frontend:**
- Ensure CORS is configured in `server.ts`
- Check frontend is making requests to correct port (3000)

## 📝 Development Guidelines

### Code Structure
```typescript
// Example route structure
import express from 'express';
import pool from './db';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Database query
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    
    // Handle response
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
```

### Database Queries
- Use parameterized queries (`$1`, `$2`, etc.) to prevent SQL injection
- Always use try-catch blocks for database operations
- Handle connection errors gracefully
- Log errors for debugging

### API Response Format
```typescript
// Success response
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}

// Error response  
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details" // Only in development
}
```

## 🔗 Connecting to Frontend

The backend is configured to accept requests from the frontend (CORS enabled). Frontend should make requests to:
- Development: `http://localhost:3000`
- Production: (TBD - will be updated when deployed)

Example frontend connection:
```typescript
// In your React components
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),
});
const data = await response.json();
```

## 📊 Database Schema

The MyMedCab database contains tables for:
- **users** - User authentication and profiles
- **doctors** - Doctor/specialist information
- **patients** - Patient information
- **appointments** - Medical appointments
- **medications** - Medication tracking
- (More tables as visible in pgAdmin)

To explore the full schema:
1. Connect to pgAdmin using the instructions above
2. Navigate to MyMedCab → Databases → mymedcab → Schemas → public → Tables
3. Right-click any table and select "View/Edit Data" to see structure

## 📞 Need Help?

- Check the main [README.md](../README.md) for git procedures
- Check the [Frontend README](../frontend/README.md) for frontend integration
- Verify database connection using pgAdmin first
- Check server logs in terminal for error messages
- Create an issue on GitHub for bugs or feature requests