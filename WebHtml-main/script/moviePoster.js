const movieApiKey = '10923b261ba94d897ac6b81148314a3f';
const movieApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}&language=en-US&page=1`;

const newsApiKey = '44b945b9d66e44edb34a121a0536a76e';

async function fetchMovies() {
    try {
        const response = await fetch(movieApiUrl);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

async function fetchKoreaNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${newsApiKey}`);
        const data = await response.json();
        return data.articles.slice(0, 2); // Get only first two articles
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

async function displayNews() {
    const newsContainer = document.getElementById('news');
    const articles = await fetchKoreaNews();

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>뉴스 기사를 불러오는 데 문제가 발생했습니다.</p>';
        return;
    }

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

function displayMovies(movies) {
    const sliderContent = document.getElementById('slider-content');
    sliderContent.innerHTML = '';

    // 첫 번째부터 열두 번째 포스터를 클론하여 추가합니다.
    for (let i = 0; i < 12; i++) {
        const clone = createPosterElement(movies[i]);
        sliderContent.appendChild(clone);
    }

    movies.forEach(movie => {
        const posterDiv = createPosterElement(movie);
        sliderContent.appendChild(posterDiv);
    });

    // 첫 번째부터 열두 번째 포스터를 다시 클론하여 맨 뒤에 추가합니다.
    for (let i = 0; i < 12; i++) {
        const clone = createPosterElement(movies[i]);
        sliderContent.appendChild(clone);
    }

    // 슬라이더 초기화
    currentIndex = 12;
    updateSlider();
}

function createPosterElement(movie) {
    const posterDiv = document.createElement('div');
    posterDiv.classList.add('poster');

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    posterDiv.appendChild(img);
    return posterDiv;
}

let currentIndex = 12;

function slide(offset) {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const posters = document.querySelectorAll('.poster');
    const posterWidth = posters[0].clientWidth + 20; // 20 is margin

    currentIndex += offset;
    sliderWrapper.style.transition = 'transform 0.3s ease';
    sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;

    // 무한 루프를 위해 슬라이더의 끝에 도달했을 때 트랜지션을 제거하고 인덱스를 조정합니다.
    setTimeout(() => {
        if (currentIndex <= 11) {
            sliderWrapper.style.transition = 'none';
            currentIndex = posters.length - 24 + currentIndex; // 12개의 클론이 있으므로 조정
            sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;
        } else if (currentIndex >= posters.length - 12) {
            sliderWrapper.style.transition = 'none';
            currentIndex = currentIndex - posters.length + 24; // 12개의 클론이 있으므로 조정
            sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;
        }
    }, 300);
}

function updateSlider() {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const posters = document.querySelectorAll('.poster');
    const posterWidth = posters[0].clientWidth + 20; // 20 is margin

    // 현재 인덱스에 맞게 슬라이더 위치를 설정
    sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;
}

document.getElementById('prev-btn').addEventListener('click', () => slide(-1));
document.getElementById('next-btn').addEventListener('click', () => slide(1));

async function initialize() {
    await fetchMovies();
    await displayNews();
}

initialize();
