# PVF Training Management System

A professional, modern training management system built for the **PVF Football Academy**. This project follows the **Atomic Design** methodology to ensure a scalable, maintainable, and highly reusable component architecture.

## 🚀 Technologies

- **Frontend Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: Custom Boxicons integration

## 🏗 Architecture: Atomic Design

The project is structured following **Atomic Design** principles:

- **Atoms**: Basic building blocks (Buttons, Inputs, Icons, Logos).
- **Molecules**: Groups of atoms working together (Search bars, Menu items).
- **Organisms**: Complex components forming distinct sections (Sidebar, Header).
- **Templates**: Page-level skeletons (MainLayout).
- **Pages**: Final products where templates are populated with data.

## 📂 Project Structure

```text
src/
├── assets/             # Static assets (images, logos)
├── components/         # Atomic Design components
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── pages/
├── router/             # Modular routing configuration
│   └── routes/         # Feature-based route modules
├── stores/             # Pinia state stores
├── styles/             # Global CSS and Tailwind configurations
└── utils/              # Helper functions and constants
```

## 🛠 Modular Routing

Routes are divided into logical modules for better maintainability:
- `recruitment.ts`: Handles all recruitment-related navigation.
- `student.ts`: Manages student profiles and contract-related routes.
- `extracurricular.ts`: Covers extracurricular activities and scheduling.

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```

## ✨ Features

- **Authentication**: Modern login interface with decorative glassmorphism elements.
- **Dynamic Sidebar**: Fully collapsible sidebar with active route highlighting.
- **Responsive Layout**: Designed to work seamlessly across different screen sizes.
- **Theming**: Integrated support for consistent color palettes and typography.

---

Developed with ❤️ for **PVF Football Academy**.