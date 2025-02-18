# Super Chat App - Frontend

This repository contains the frontend code for the Super Chat application, a real-time messaging platform designed to facilitate seamless communication between users.

## Overview

The Super Chat frontend is built using React and leverages technologies like Socket.IO for real-time communication. It provides a user interface for users to engage in instant messaging, create chat rooms, and manage their chat experience.

## Features

- **Real-time Messaging:** Send and receive messages instantly.
- **Chat Rooms:** Create and join multiple chat rooms.
- **User Authentication:** Secure user login, registration, and password recovery.
- **User Presence:** See which users are online.
- **Responsive Design:** Works seamlessly across various devices.
- **Socket.IO Integration:** For efficient real-time bidirectional event-based communication.
- **Feature-Based Architecture:** Organized for scalability and maintainability.
- **End-to-End Testing:** Robust testing with Playwright.
- **CI/CD Pipeline:** Automated builds and deployments via GitHub Actions.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Socket.IO Client:** For real-time bidirectional event-based communication.
- **TypeScript:** For static typing and improved code quality.
- **Vite:** For fast development and build processes.
- **Vitest:** For unit testing.
- **Chakra UI:** For accessible and customizable UI components.
- **Redux Toolkit:** For state management and API calls.
- **Playwright:** For end-to-end testing.
- **Vitest:** For unit testing.
- **Docker:** For containerization.
- **Nginx:** For serving static files.
- **GitHub Actions:** For CI/CD.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed.
- A running backend server with Socket.IO support (this repository only contains the frontend).
- Docker (optional, for containerized deployment).

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/oleksandr-vatamaniuk/super-chat-fe.git](https://github.com/oleksandr-vatamaniuk/super-chat-fe.git)
    cd super-chat-fe
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

### Building for Production

1.  Build the application for production:

    ```bash
    npm run build
    # or
    yarn build
    ```

2.  The production build will be located in the `dist` directory.

### Docker Deployment

1.  Build the Docker image:

    ```bash
    docker build -t super-chat-fe .
    ```

2.  Run the Docker container:

    ```bash
    docker run -p 8080:80 super-chat-fe
    ```

3.  Access the application at `http://localhost:8080`.

## Directory Structure

This project uses a feature-based directory structure to organize code related to specific functionalities.

```
super-chat-fe/
├── .dockerignore         # Docker ignore file
├── .eslintrc.js          # ESLint configuration
├── .prettierignore       # Prettier ignore file
├── .prettierrc           # Prettier configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration for the build tool
├── .github/              # GitHub Actions for CI/CD
├── .husky/               # Pre-commit hooks for linting and testing
├── public/               # Public assets (images, icons, etc.)
├── src/
│ ├── components/         # Reusable UI components
│ ├── features/           # Feature-based organization
│ │ ├── auth/             # Authentication-related components and logic
│ │ ├── chat/             # Chat feature components
│ │ └── user/             # User-related components
│ ├── hooks/              # Reusable custom hooks
│ ├── pages/              # Application pages
│ ├── store/              # Redux store configurarions
│ ├── theme/              # Theme and styling
│ ├── types/              # TypeScript types
│ ├── utils/              # Utility functions
│ ├── index.tsx           # Main entry point for the React app
│ └── App.tsx             # Main App component
├── README.md
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, bug fixes, or enhancements.
