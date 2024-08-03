## Project Setup and Running Guide

### Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

1. **Node.js** (v14.x or later)
2. **Yarn** or **npm**
3. **Docker** and **Docker Compose**

### Project Setup

1. **Clone the Repository**

   Clone your project repository to your local machine.

   ```sh
   git clone https://github.com/iahmadhabibx/news-aggregator.git
   cd news-aggregator
   ```

2. **Install Dependencies**

   Install the required dependencies for the React project.

   ```sh
   yarn install
   # or
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of your project directory and add the necessary environment variables for the APIs.

   ```sh
    REACT_APP_NEWS_API=
    REACT_APP_THE_GUARDIAN=
    REACT_APP_NEW_YORK_TIMES_APP_ID=
    REACT_APP_NEW_YORK_TIMES_API_KEY=
    REACT_APP_NEW_YORK_TIMES_SECRET=
   ```

### Running the Project Locally

To run the project locally, you can use the following commands:

```sh
docker compose up
ubuntu: sudo docker compose up
```

The application should now be running on `http://localhost:3000`.

### Explanation of Key Files

- **Dockerfile**: Defines the multi-stage build for your React application, using Node.js to build the app and Nginx to serve it.
- **docker-compose.yml**: Defines the Docker Compose setup for your application, mapping port 3000 on the host to port 80 in the Docker container.
- **.env**: Stores environment variables used by the React application.
- **src/hooks/useArticles.js**: Custom hook for fetching and parsing articles from multiple news APIs.
- **src/modules/HomePage.js**: The main page component that fetches and displays articles using the `useArticles` hook.

### Notes

1. **Environment Variables**: Ensure you never commit your `.env` file to a public repository as it contains sensitive API keys.
2. **API Rate Limits**: Be aware of the rate limits imposed by the news APIs and manage your API calls accordingly.