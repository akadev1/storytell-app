# Storytell App
uvicorn backend.api.app:app --reload
INFO:     Will watch for changes in these directories: ['C:\\Users\\start\\storytell-app']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [15068] using StatReload
INFO:     Started server process [3892]
INFO:     Waiting for application startup.
INFO:     Application startup complete.

## Description
A web application for creating and sharing interactive stories.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/akaday/storytell-app.git
   ```

## Development Environment Setup
1. Navigate to the project directory:
   ```bash
   cd storytell-app
   ```
2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
4. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```
5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
6. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

## Contributing
We welcome contributions to the Storytell App! To contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b my-feature-branch
   ```
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository:
   ```bash
   git push origin my-feature-branch
   ```
5. Open a pull request to the main repository and provide a detailed description of your changes.

## Deployment
To deploy the application using Docker, follow these steps:

1. Build the Docker images for the backend and frontend:
   ```bash
   docker-compose build
   ```
2. Start the containers:
   ```bash
   docker-compose up
   ```
3. The application should now be running and accessible at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.
