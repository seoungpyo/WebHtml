const apiKey = '44b945b9d66e44edb34a121a0536a76e';

// Function to fetch Korea related news
async function fetchKoreaNews() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`);
    const data = await response.json();
    return data.articles.slice(0, 2); // Get only first two articles
}

// Function to display news on the webpage
async function displayNews() {
    const newsContainer = document.getElementById('news');
    const articles = await fetchKoreaNews();

    let currentIndex = 0; // Variable to keep track of the current index of displayed articles

    function showNextArticle() {
        newsContainer.innerHTML = ''; // Clear previous articles

        const article = articles[currentIndex];

        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const image = document.createElement('img');
        image.src = article.urlToImage ? article.urlToImage : 'placeholder.jpg';
        image.alt = article.title;
        newsItem.appendChild(image);

        const content = document.createElement('div');
        content.classList.add('news-item-content');

        const title = document.createElement('h2');
        const link = document.createElement('a'); // Link element
        link.href = article.url; // URL of the article
        link.textContent = article.title;
        title.appendChild(link); // Adding link as a child of title
        content.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        content.appendChild(description);

        newsItem.appendChild(content);

        newsContainer.appendChild(newsItem);

        // Increment currentIndex and handle wrapping around
        currentIndex = (currentIndex + 1) % articles.length;
    }

    // Display first article immediately
    showNextArticle();

    // Set interval to show next article every 5 seconds
    setInterval(showNextArticle, 5000);
}

// Display news when the page loads
displayNews();
