# Team Manager Project

This project consists of two main parts:
1. **Backend**: A Django REST API located in `team_manager_api`
2. **Frontend**: A React frontend located in `team_manager_frontend`

## Prerequisites

Before running the project, ensure you have the following installed:
- **Python 3.x** (for the backend)
- **Node.js and npm** (for the frontend)

## Running the Backend (API)

Open a terminal and execute the following commands:

```bash
cd team_manager_api
python3 -m venv venv               # Create a virtual environment
source venv/bin/activate            # Activate the virtual environment
python3 -m pip install -r requirements.txt  # Install dependencies
python manage.py runserver          # Start the Django development server
```
The Django API should now be running at http://localhost:8000/api.

## Running the Frontend

Open a new terminal and execute the following commands:

```bash
cd team_manager_frontend
npm install     # Install dependencies
npm run dev     # Start the frontend development server
```
The React frontend will be available at http://localhost:3000/.


