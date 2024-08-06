# URL Shortener Service

## Overview

The URL Shortener Service is a web application that allows users to shorten long URLs and track the number of clicks on the shortened URLs. The service provides a RESTful API for shortening URLs and retrieving statistics, and a user-friendly frontend built with Streamlit for easy interaction.

## Features

- Shorten long URLs with or without custom aliases.
- Track the number of clicks on shortened URLs.
- View statistics for shortened URLs, including the number of clicks over time.
- Simple and intuitive user interface.

## Technologies Used

- Backend: Node.js, Express
- Frontend: Streamlit, Python
- Database: JSON file (for simplicity)
- Charting: Streamlit's built-in charting capabilities

## Setup and Installation

### Prerequisites

- Node.js and npm installed on your machine
- Python 3.7 or higher installed on your machine
- `pip` package manager for Python

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/saisruthi-kovur/url-shortener.git
    cd url-shortener
    ```

2. Navigate to the backend directory and install dependencies:
    ```sh
    cd url-shortener
    npm install
    ```

3. Start the backend server:
    ```sh
    node server.js
    ```

   The backend server will start on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the project directory:
    ```sh
    cd url-shortener
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv myenv
    source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```sh
    pip install streamlit pandas requests
    ```

4. Start the Streamlit app:
    ```sh
    streamlit run app.py
    ```

   The Streamlit app will start on `http://localhost:8501`.

## Usage

### Shortening a URL
1. Open the Streamlit app in your browser at `http://localhost:8501`.
2. Navigate to the "Shorten URL" tab.
3. Enter the long URL you want to shorten.
4. Optionally, enter a custom alias for the shortened URL.
5. Click the "Shorten URL" button.
6. The shortened URL will be displayed, and you can copy and use it.

### Viewing URL Statistics
1. Open the Streamlit app in your browser at `http://localhost:8501`.
2. Navigate to the "URL Statistics" tab.
3. Enter the URL code or custom alias of the shortened URL.
4. Click the "Get Stats" button.
5. The statistics for the shortened URL, including the number of clicks and a visualization of clicks over time, will be displayed.

## Acknowledgements
- Node.js
- Express
- Streamlit
- pandas
- requests

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any enhancements.