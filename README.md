# 🐔 Eggcellent Farm Management System

A comprehensive, modern web application for managing poultry farm operations. Built with React, TypeScript, and a beautiful, responsive UI, this system helps farmers track birds, eggs, feed, medicine, and generate detailed reports and analytics.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [API Integration](#-api-integration)
- [Role-Based Access Control](#-role-based-access-control)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Functionality

- **Dashboard Overview**: Real-time metrics, production trends, and performance analytics
- **Bird Management**: Track bird batches, breeds, health status, and production metrics
- **Egg Collection**: Record daily egg collections with grade classification and tracking
- **Feed Inventory**: Manage feed stock levels, consumption tracking, and cost analysis
- **Medicine Management**: Track vaccinations, treatments, and medicine inventory
- **Reports & Analytics**: Generate comprehensive reports on production, health, feed consumption, and financials
- **Statistics Dashboard**: Visual charts and graphs for trends, grade distribution, pen performance, and financial overview
- **User Management**: Role-based user administration (Admin, Manager, Worker)
- **Profile Management**: User profiles with avatar upload, security settings, and preferences

### 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface with gradient cards and smooth animations
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Built-in dark mode with theme switching
- **Interactive Charts**: Beautiful data visualizations using Recharts
- **Real-time Updates**: Live data updates with loading states and error handling
- **Accessibility**: WCAG-compliant components with keyboard navigation support

## 🛠 Tech Stack

### Core Technologies

- **[React 18.3](https://react.dev/)** - UI library
- **[TypeScript 5.5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite 7.2](https://vitejs.dev/)** - Build tool and dev server
- **[React Router 6.26](https://reactrouter.com/)** - Client-side routing

### UI Framework & Styling

- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Data Visualization

- **[Recharts 2.12](https://recharts.org/)** - Composable charting library
- Custom chart components for production trends, grade distribution, financial overview, and more

### State Management & Data Fetching

- **[React Context API](https://react.dev/reference/react/useContext)** - Global state management
- **[TanStack Query 5.56](https://tanstack.com/query)** - Server state management
- Custom hooks for API data fetching (`useApiData`, `useStatistics`)

### Form Handling & Validation

- **[React Hook Form 7.66](https://react-hook-form.com/)** - Performant form library
- **[Zod 3.25](https://zod.dev/)** - TypeScript-first schema validation

### Additional Libraries

- **[date-fns 3.6](https://date-fns.org/)** - Date utility library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **npm** 9.x or higher (comes with Node.js)
- **Git** for version control

### Installation

1. **Clone the repository**

```bash
git clone <YOUR_GIT_URL>
cd eggcellent-farm-view
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Eggcellent Farm Management
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📁 Project Structure

```
eggcellent-farm-view/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   ├── statistics/   # Statistics dashboard components
│   │   └── ui/           # Reusable UI components (shadcn/ui)
│   ├── contexts/         # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API service layers
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── dist/                 # Production build output
├── .env                  # Environment variables (not in git)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md            # This file
```

## 🔑 Key Features

### Dashboard

- **Real-time Metrics**: Total birds, eggs today, feed stock, health alerts
- **Production Trends**: Interactive 7-day production chart with area visualization
- **Quick Actions**: Fast access to common tasks (Add birds, Log feed, Record eggs, Medicine)
- **Recent Activity**: Live feed of farm operations
- **Performance Overview**: Production rate, feed efficiency, and mortality rate with progress indicators

### Bird Management

- Track bird batches with breed, age, pen location, and health status
- Filter and search functionality
- Statistics dashboard with total birds, healthy birds, and production metrics
- Add, edit, and manage bird groups

### Egg Collection

- Record daily egg collections with shift, pen, grade, and quantity
- Grade classification (AA, A, B, C)
- Statistics: Today's collection, weekly total, average weight
- Production chart visualization
- Filter by date, shift, grade, and pen

### Feed Inventory

- Track feed stock levels with expiry dates
- Stock status indicators (In Stock, Low Stock, Out of Stock)
- Cost analysis and value calculations
- Supplier and location tracking
- Add, edit, and update feed items

### Medicine Management

- Medicine inventory tracking
- Treatment history records
- Expiry date monitoring
- Statistics: Total medicines, low stock items, active treatments
- Filter by type and status

### Reports & Analytics

- **Production Reports**: Daily/weekly/monthly production analysis
- **Health Reports**: Treatment history, mortality rates, vaccination schedules
- **Feed Consumption Reports**: Consumption trends and cost analysis
- **Financial Reports**: Revenue, expenses, and profit tracking
- Export capabilities (PDF, Excel, CSV)

### Statistics Dashboard

- **Trends Chart**: Production, feed efficiency, and revenue trends
- **Grade Distribution**: Pie chart visualization
- **Pen Performance**: Horizontal bar chart comparing pen performance
- **Financial Chart**: Revenue, expenses, and profit visualization
- **Performance Metrics**: Progress bars for key performance indicators

### User Management

- Role-based access control (Admin, Manager, Worker)
- User creation, editing, and deletion
- Permission management
- Activity logs

### Profile Management

- Personal information management
- Avatar upload and deletion
- Security settings (password change, 2FA)
- Notification preferences
- Account information display

## 🔌 API Integration

The application integrates with a RESTful API backend. All API calls are handled through service layers:

- **`authService.ts`**: Authentication, user management, profile operations
- **`dataService.ts`**: Base API service with request/response handling
- **`useApiData.ts`**: Custom hooks for data fetching

### API Response Handling

The application handles various API response formats:
- Nested data structures (`{ success: true, data: { data: [...] } }`)
- Direct arrays and objects
- Error responses with proper error handling
- Loading states and retry mechanisms

### API Documentation

See the following specification documents for detailed API endpoint information:

- [`AUTH_ENDPOINTS_SPECIFICATION.md`](./AUTH_ENDPOINTS_SPECIFICATION.md) - Authentication endpoints
- [`EGG_COLLECTION_SPECIFICATION.md`](./EGG_COLLECTION_SPECIFICATION.md) - Egg collection endpoints
- [`FEED_INVENTORY_SPECIFICATION.md`](./FEED_INVENTORY_SPECIFICATION.md) - Feed inventory endpoints
- [`MEDICINE_SPECIFICATION.md`](./MEDICINE_SPECIFICATION.md) - Medicine management endpoints
- [`REPORTS_SPECIFICATION.md`](./REPORTS_SPECIFICATION.md) - Reports and analytics endpoints
- [`STATISTICS_SPECIFICATION.md`](./STATISTICS_SPECIFICATION.md) - Statistics dashboard endpoints
- [`API_TESTING_GUIDE.md`](./API_TESTING_GUIDE.md) - API testing guide

## 🔐 Role-Based Access Control

The application implements a comprehensive role-based access control system:

### Roles

1. **Admin**
   - Full system access
   - User management
   - All CRUD operations
   - Settings management

2. **Manager**
   - View dashboard and reports
   - Manage birds, feed, eggs, medicine
   - Edit records
   - View users (limited)

3. **Worker**
   - View dashboard
   - Collect eggs
   - View birds and feed
   - Basic reports

### Permissions

Permissions are defined in `src/contexts/UserRoleContext.tsx` and include:
- `view_dashboard`
- `manage_birds`
- `manage_feed`
- `collect_eggs`
- `manage_medicine`
- `view_reports`
- `manage_users`
- And more...

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Style

- **ESLint**: Code linting with React and TypeScript rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (if configured)

### Development Guidelines

1. **Type Safety**: Always use TypeScript types and interfaces
2. **Component Structure**: Follow the existing component patterns
3. **API Calls**: Use the custom hooks (`useApiData`, `useStatistics`) for data fetching
4. **Error Handling**: Implement proper error boundaries and user-friendly error messages
5. **Loading States**: Always show loading indicators during API calls
6. **Empty States**: Provide helpful empty state messages when no data is available

## 🏗 Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` directory.

The build includes:
- Minified JavaScript and CSS
- Optimized assets
- Tree-shaking for smaller bundle size
- Source maps (optional)

## 🚢 Deployment

### Static Hosting Services

This application can be deployed to any static hosting service:

#### Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

#### Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://netlify.com)
3. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy!

#### GitHub Pages

1. Build the project: `npm run build`
2. Configure GitHub Pages to serve from the `dist` directory
3. Or use a GitHub Action for automatic deployment

### Environment Variables

Make sure to set the following environment variables in your hosting platform:

- `VITE_API_BASE_URL`: Your API base URL
- `VITE_APP_NAME`: Application name

### Custom Domain

Most hosting providers allow you to connect custom domains. Check your hosting provider's documentation for specific instructions.

## 📚 Documentation

### Component Documentation

- **Dashboard Components**: See `src/components/dashboard/`
- **UI Components**: See `src/components/ui/` (shadcn/ui components)
- **Layout Components**: See `src/components/layout/`

### API Documentation

All API endpoint specifications are available in the root directory:

- `AUTH_ENDPOINTS_SPECIFICATION.md`
- `EGG_COLLECTION_SPECIFICATION.md`
- `FEED_INVENTORY_SPECIFICATION.md`
- `MEDICINE_SPECIFICATION.md`
- `REPORTS_SPECIFICATION.md`
- `STATISTICS_SPECIFICATION.md`
- `API_TESTING_GUIDE.md`

### Type Definitions

TypeScript interfaces and types are defined in:
- `src/types/api.ts` - API response types
- `src/types/auth.ts` - Authentication types

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and patterns
- Write meaningful commit messages
- Add TypeScript types for new features
- Update documentation as needed
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Recharts](https://recharts.org/) for beautiful data visualizations
- [Lucide](https://lucide.dev/) for the icon library

## 📞 Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Built with ❤️ for modern poultry farm management**
