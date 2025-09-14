# climate-change-api

Climate Change News API

Overview

This is a Node.js-based REST API that scrapes climate change-related news articles from various online newspapers and serves them through simple API endpoints. The API uses Express for the server, Axios for making HTTP requests, and Cheerio for web scraping.

Features





Fetches climate-related articles from multiple news sources.



Provides endpoints to retrieve all articles or articles from a specific newspaper.



Configurable port via environment variable (defaults to 8000).



Lightweight and easy-to-extend architecture.

Prerequisites





Node.js: Version 14.x or higher.



npm: Node package manager for installing dependencies.

Installation





Clone the Repository:

git clone https://github.com/RJ060501/climate-change-api.git
cd climate-change-api



Install Dependencies:

npm install

This installs the required packages: express, axios, and cheerio.



Set Environment Variables (optional): Create a .env file in the root directory to specify a custom port (defaults to 8000 if not set):

PORT=8000

Usage





Run the Server:

node index.js

The server will start on the specified port (e.g., http://localhost:8000).



API Endpoints:





GET /: Returns a welcome message: "Welcome to my Climate Change News API".



GET /news: Returns a JSON array of all scraped climate-related articles from configured newspapers.



GET /news/:newspaperID: Returns a JSON array of climate-related articles from a specific newspaper (e.g., /news/guardian).



Supported Newspapers: The API currently scrapes articles from the following sources:





The Times: thetimes



The Guardian: guardian



AP News: apnews



GWU Online Public Health: onlinepublichealth

Use the name field (e.g., guardian) in the /news/:newspaperID endpoint to fetch articles from a specific source.

Example Requests





Get all articles:

curl http://localhost:8000/news



Get articles from The Guardian:

curl http://localhost:8000/news/guardian

Project Structure

climate-change-api/
├── index.js        # Main application file
├── package.json    # Project metadata and dependencies
├── node_modules/   # Installed dependencies
└── README.md       # This file

Notes





Web Scraping: The API scrapes articles by searching for <a> tags containing the word "climate" (case-insensitive). Some websites may have paywalls, anti-scraping measures, or dynamic content that could affect results.



Error Handling: Errors during HTTP requests are logged to the console. You may want to add more robust error handling for production use.



Extending Sources: Add new newspapers to the newspapers array in index.js to include additional sources. Ensure the base URL is correctly set to handle relative links.



Rate Limits: Be cautious of rate limits or terms of service when scraping websites. Consider implementing delays or caching for heavy usage.

Contributing





Fork the repository.



Create a feature branch (git checkout -b feature-branch).



Commit your changes (git commit -m "Add feature").



Push to the branch (git push origin feature-branch).



Open a pull request on GitHub.