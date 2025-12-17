# MyMedCab Project 💊🏥

A comprehensive medical cabinet management system with user authentication, doctor portals, and patient management.

## 👥 Team Members

- **Josue Quinonez** - Full Stack Developer
- **Cesar Calzadilla** - Full Stack Developer  
- **Daniel Escobar** - Frontend Stack Developer
- **Francine Portobanco** - Backend Developer
- **Kendrick Belizaire** - Full Stack Developer

## 🏗️ Project Structure

This project is divided into 2 main folders:

```
mymedcab/
├── frontend/          # React + TypeScript Frontend
├── backend/           # Node.js + Express Backend
├── README.md          # This file
└── .git/             # Git repository
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- PostgreSQL 17 with pgAdmin

### 1. Clone the Repository
```bash
git clone https://github.com/Nielson19/mymedcab2.0.git
cd mymedcab2.0
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd backend
npm install
npm run dev
```

For detailed setup instructions, see the README files in each folder:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🌿 Git & GitHub Procedures

### Initial Setup
```bash
# Configure your Git identity (one-time setup)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Branch Management
**Important:** Always work on your own branch!

#### Creating Your Branch
```bash
# Create and switch to your branch
git checkout -b YourName-Code

# Examples:
git checkout -b Josue-Code
git checkout -b Cesar-Code
git checkout -b Francine-Code
```

#### Daily Workflow
```bash
# 1. Check current status
git status

# 2. Stage your changes
git add .                    # Add all files
git add filename.tsx         # Add specific file

# 3. Commit your changes
git commit -m "Descriptive message about what you changed"

# 4. Push to your branch
git push origin YourName-Code

# 5. Pull latest changes from main (when needed)
git checkout main
git pull origin main
git checkout YourName-Code
git merge main
```

#### Collaboration Workflow
```bash
# Get latest changes from all branches
git fetch --all

# See all available branches
git branch -a

# Switch to another teammate's branch to see their work
git checkout origin/Francine-Code

# Switch back to your branch
git checkout YourName-Code

# Merge another branch into yours (be careful!)
git merge origin/Francine-Code
```

#### Common Commands
```bash
# See commit history
git log --oneline

# See changes in files
git diff

# Undo last commit (keeps changes)
git reset HEAD~1

# Discard changes in working directory
git checkout -- filename.tsx

# Create pull request (after pushing)
# Go to GitHub website and click "Compare & pull request"
```

## 🔧 Technologies Used

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling Framework
- **Vite** - Build Tool

### Backend  
- **Node.js** - Runtime Environment
- **Express** - Web Framework
- **TypeScript** - Type Safety
- **PostgreSQL** - Database

## 📝 Development Guidelines

1. **Always create your own branch** - Never work directly on `main`
2. **Use descriptive commit messages** - Explain what you changed
3. **Test before pushing** - Make sure your code works
4. **Communicate with team** - Let others know about major changes
5. **Follow naming conventions** - Use consistent file and variable names

## 🆘 Common Issues & Solutions

### Git Issues
```bash
# If you get merge conflicts
git status                    # See which files have conflicts
# Edit the files to resolve conflicts
git add .
git commit -m "Resolve merge conflicts"

# If you're behind on commits
git pull origin main
git push origin YourName-Code

# If you accidentally worked on main
git stash                     # Save your changes
git checkout -b YourName-Code # Create your branch
git stash pop                 # Get your changes back
```

### Development Issues
- **Frontend not starting**: Make sure you're in `/frontend` folder and ran `npm install`
- **Backend not connecting**: Check database credentials and ensure PostgreSQL is running
- **Dependencies issues**: Delete `node_modules` and `package-lock.json`, then run `npm install`

## 📞 Need Help?

- Create an issue on GitHub
- Ask in the team group chat
- Check the individual README files in `frontend/` and `backend/` folders


