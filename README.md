# Personal Blog

Welcome to the Personal Blog project! This is a simple personal blog application with a commenting system. The project is built using React with Vite and Typescript for the frontend, and Python with Django for the backend. This ReadMe will guide you through the setup process, list the technologies used, and provide space for screenshots.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)

## Requirements

To get started with this project, you need to have the following apps and programs installed:

- Node.js (v14 or above)
- npm (v6 or above)
- Python (v3.8 or above)
- Django (v3.2 or above)
- pip
- A code editor (VS Code, Sublime Text, etc.)

## Installation

### Frontend

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/personal-blog.git
    cd personal-blog/PersonalBlog/client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

### Backend

1. **Navigate to the server directory:**

    ```bash
    cd ../server
    ```

2. **Create a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following environment variables:

    ```env
    DJANGO_SECRET_KEY='your-secret-key'
    DJANGO_DEBUG=True
    DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
    CORS_ALLOWED_ORIGINS=http://localhost:5173,http://yourfrontend.com
    ```

5. **Run migrations:**

    ```bash
    python manage.py migrate
    ```

6. **Start the Django development server:**

    ```bash
    python manage.py runserver
    ```

## Usage

Once both the frontend and backend servers are running, you can open your browser and navigate to `http://localhost:5173` to see the application in action. You can create posts, view post details, and add comments.

## Technologies Used

- **Frontend:**
    - React
    - Vite
    - Typescript
    - Tailwind CSS
    - Axios
    - React Router DOM

- **Backend:**
    - Python
    - Django
    - Django REST Framework
    - SQLite (default database)

<!-- ## Screenshots

*Include your screenshots here to give users a preview of the project.*

1. **Home Page:**
    ![Home Page](path/to/your/screenshot1.png)

2. **Post Detail Page:**
    ![Post Detail Page](path/to/your/screenshot2.png)

3. **Add Post Page:**
    ![Add Post Page](path/to/your/screenshot3.png) -->
