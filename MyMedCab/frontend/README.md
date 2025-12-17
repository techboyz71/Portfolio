# Frontend - MyMedCab 🎨💻

React + TypeScript frontend application for the MyMedCab medical management system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation & Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Click the link displayed in terminal (usually `http://localhost:5173`)
   - Or manually open your browser to `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/                   # Main workspace for coding
│   ├── assets/           # Icons, images, and media files
│   │   ├── icons/        # Icon files (PNG, SVG)
│   │   └── images/       # Image files (logos, etc.)
│   ├── components/       # Reusable UI components
│   │   ├── ButtonComponent.tsx    # Reusable button with variants
│   │   ├── InputField.tsx         # Form input component
│   │   ├── PatientForm.tsx        # Patient login form
│   │   └── SpecialistForm.tsx     # Doctor login form
│   ├── constants/        # Global constants for consistency
│   │   ├── GlobalColors.tsx       # Color palette
│   │   ├── GlobalSize.tsx         # Spacing and sizes
│   │   └── GlobalTypo.tsx         # Typography settings
│   ├── views/            # Page components (screens)
│   │   ├── LoginView.tsx          # Login screen
│   │   ├── MainView.tsx           # Main dashboard
│   │   └── TestView.tsx           # Testing/development screen
│   ├── App.tsx           # Main app component (navigation)
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles with Tailwind
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Technologies & Tools

- **React 18** - UI library with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS v4** - Utility-first CSS framework with custom theme
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting for consistency

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint to check code
npm run lint:fix     # Fix ESLint issues automatically

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

## 🎯 Key Features & Components

### Form Components
- **PatientForm.tsx** - Patient login with email, phone, DOB fields
- **SpecialistForm.tsx** - Doctor login with ID and specialty
- **InputField.tsx** - Reusable input component with validation
- **ButtonComponent.tsx** - Flexible button with size variants

### Styling System
- **Tailwind CSS v4** with custom color theme
- **CSS separation** - Logic and styles in separate files
- **Responsive design** - Mobile-first approach
- **Custom color palette** - Defined in GlobalColors.tsx

### State Management
- **React Hooks** - useState, useEffect for component state
- **Curried Functions** - Clean event handlers for forms
- **TypeScript Interfaces** - Type-safe data structures

## 🔧 Configuration Files

### Tailwind CSS (`index.css`)
```css
@import "tailwindcss";

@theme {
  /* Custom color palette from GlobalColors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  /* ... more colors */
}

@layer components {
  /* Component-specific styles */
}
```

### TypeScript (`tsconfig.json`)
- Strict type checking enabled
- Modern ES modules support
- Path aliases configured for clean imports

## 🚨 Common Issues & Solutions

### Development Issues

**Port already in use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Tailwind styles not working:**
```bash
# Check if Tailwind plugin is installed
npm list @tailwindcss/vite
# Restart dev server
npm run dev
```

**TypeScript errors:**
```bash
# Run type check
npm run type-check
# Check tsconfig.json for proper configuration
```

### Build Issues

**Build failing:**
```bash
# Check for type errors
npm run type-check
# Check for linting errors
npm run lint
# Try building again
npm run build
```

## 📝 Development Guidelines

### Component Structure
```tsx
// Example component structure
import { useState } from "react";
import InputField from "./InputField";

interface FormData {
  name: string;
  email: string;
}

export default function MyComponent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });

  const handleChange = (fieldName: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: e.target.value
      }));
    };

  return (
    <form>
      <InputField
        label="Name"
        onChange={handleChange("name")}
        value={formData.name}
      />
    </form>
  );
}
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `ButtonComponent.tsx`)
- **Views/Pages**: PascalCase with "View" suffix (e.g., `LoginView.tsx`)
- **Constants**: PascalCase (e.g., `GlobalColors.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)

### Import Order
1. React imports
2. Third-party libraries
3. Internal components
4. Constants and utilities
5. Assets (images, icons)

## 🔗 Connecting to Backend

The frontend is configured to connect to the backend API. Make sure the backend is running on the expected port (usually 3000).

```tsx
// Example API call
const handleLogin = async (formData: LoginData) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    // Handle response
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## 📞 Need Help?

- Check the main [README.md](../README.md) for git procedures
- Look at existing components for examples
- Check the [Backend README](../backend/README.md) for API documentation
- Create an issue on GitHub for bugs or feature requests
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
