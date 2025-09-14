// Define the port for the server, using an environment variable or defaulting to 8000
const PORT = process.env.PORT || 8000

// Import required modules
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
// const { attr } = require('cheerio/lib/api/attributes')

// Create an Express application
const app = express()

// Array of newspaper objects, each containing name, URL for climate news, and base URL
const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: 'https://www.thetimes.co.uk/'
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: 'https://www.theguardian.com/'
    },
    {
        name: 'apnews',
        address: 'https://apnews.com/climate-and-environment',
        base: 'https://apnews.com/'
    },
    {
        name: 'onlinepublichealth',
        address: 'https://onlinepublichealth.gwu.edu/resources/sources-for-climate-news/',
        base: 'https://onlinepublichealth.gwu.edu/'
    },
]

// Array to store scraped articles
const articles = []

// Iterate over each newspaper to scrape articles
newspapers.forEach(newspaper => {
    // Make an HTTP GET request to the newspaper's climate news page
    axios.get(newspaper.address)
        .then(response => {
            // Get the HTML content from the response
            const html = response.data
            // Load the HTML into Cheerio for parsing
            const $ = cheerio.load(html)

            // Find all <a> tags containing the word "climate" (case-insensitive)
            $('a:contains("climate")', html).each(function () {
                // Extract the text of the link as the article title
                const title = $(this).text()
                // Extract the href attribute as the article URL
                const url = $(this).attr('href')

                // Add the article details to the articles array
                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })
        })
})

// Root route to display a welcome message
app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API')
})

// Route to return all scraped articles
app.get('/news', (req, res) => {
    res.json(articles)
})

// Route to return articles from a specific newspaper, identified by newspaperID
app.get('/news/:newspaperID', (req, res) => {
    // Get the newspaperID from the URL parameter
    const newspaperID = req.params.newspaperID

    // Find the newspaper object matching the provided ID
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name === newspaperID)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperID)[0].base

    // Make an HTTP GET request to the specific newspaper's climate news page
    axios.get(newspaperAddress)
        .then(response => {
            // Get the HTML content from the response
            const html = response.data
            // Load the HTML into Cheerio for parsing
            const $ = cheerio.load(html)
            // Array to store articles specific to this newspaper
            const specificArticles = []

            // Find all <a> tags containing the word "climate"
            $('a:contains("climate")', html).each(function () {
                // Extract the text of the link as the article title
                const title = $(this).text()
                // Extract the href attribute as the article URL
                const url = $(this).attr('href')
                // Add the article details to the specificArticles array
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperID
                })
            })
            // Send the specific articles as a JSON response
            res.json(specificArticles)
        }).catch(err => console.log(err)) // Log any errors during the request
})

// Start the Express server and listen on the specified port
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))