# PawRate

PawRate is a React Native mobile app built with Expo and a FastAPI backend service. The app is designed to help pet owners monitor and track their dog's resting respiratory rate. Increased breathing rate while resting or sleeping is a very important early indicator
that heart failure may be developing. 

## Features
- **Profile Management**: Create and manage dog profiles with name and breed
- **Session Management**: Create and manage breath monitoring sessions
- **Data Visualization**: View respiratory rate data in graph and list formats
- **Average Calculations**: Calculate average respiratory rates
- **Manual Readings**: Add manual respiratory rate readings
- **Modern UI**: Clean, intuitive interface
- **Cross-Platform**: Runs on iOS, Android, and web

## Live Demo

Coming Soon! 

## Design

Coming Soon!

## Installation & Setup

1. Fork repository
2. Clone repository to local: `git clone <your-repository-url>`

### Backend Setup
- `docker-compose up --build`
  
- Access the backend on your web browser at http://localhost:8000/

### Frontend Setup
- `cd pawrate-app`
- `npm install`
- `npx expo start`

- Access the application on your web browser at http://localhost:8081/


## System Requirements

### Backend Requirements
- Python: 3.10+
- Database: SQLite (included)
- Web Server: Uvicorn

### Frontend Requirements
- Node.js: Compatible with Expo SDK 54
- React Native: 0.81.4
- Expo CLI: Latest version
- Platform Support: iOS, Android, Web

### Development Environment
- Docker: For containerized backend development
- Docker Compose: For orchestration
