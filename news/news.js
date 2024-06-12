const apiKey = '44b945b9d66e44edb34a121a0536a76e';

// Function to fetch Korea related news
async function fetchKoreaNews() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`);
    const data = await response.json();
    return data.articles;
}

// Function to display news on the webpage
async function displayNews() {
    const newsContainer = document.getElementById('news');
    const articles = await fetchKoreaNews();

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const image = document.createElement('img');
        image.src = article.urlToImage ? article.urlToImage : 'placeholder.jpg';
        image.alt = article.title;
        newsItem.appendChild(image);

        const content = document.createElement('div');
        content.classList.add('news-item-content');

        const title = document.createElement('h2');
        title.textContent = article.title;
        content.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        content.appendChild(description);

        newsItem.appendChild(content);

        newsContainer.appendChild(newsItem);
    });
}

// Display news when the page loads
displayNews();