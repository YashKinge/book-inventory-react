# Book Inventory Application

A comprehensive book inventory management application built with modern web technologies.

## Getting Started

First, install the dependencies:

```bash
bun install
```

Next, run the development server:

```bash
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Features

- Add, edit, and delete books
- Search and filter books
- View detailed book information
- Responsive design for all devices

## Tech Stack

- **Framework**: React
- **Runtime**: Bun
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: React Hooks
- **API Client**: TanStack Query

## Development

### Available Scripts

In the project directory, you can run:

- `bun dev` - Runs the app in development mode
- `bun build` - Builds the app for production
- `bun preview` - Locally preview the production build
- `bun test` - Run tests
- `bun lint` - Check for linting errors

### Project Structure

- `src/components` - Reusable UI components
- `src/pages` - Page components
- `src/hooks` - Custom React hooks
- `src/services` - API services
- `src/types` - Type definitions

### Adding New Components

To add new components, place them in the `src/components` directory. For UI components that follow design system patterns, place them in `src/components/ui`.

## Deployment

This application can be deployed to any static hosting service. The Vite build process will generate optimized assets in the `dist` directory.
