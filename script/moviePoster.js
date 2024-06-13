const apiKey = '10923b261ba94d897ac6b81148314a3f';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

async function fetchMovies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies) {
    const sliderContent = document.getElementById('slider-content');
    sliderContent.innerHTML = '';

    for (let i = 0; i < 12; i++) {
        const clone = createPosterElement(movies[i]);
        sliderContent.appendChild(clone);
    }

    movies.forEach(movie => {
        const posterDiv = createPosterElement(movie);
        sliderContent.appendChild(posterDiv);
    });

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
    const posterWidth = posters[0].clientWidth + 20; 

    currentIndex += offset;
    sliderWrapper.style.transition = 'transform 0.3s ease';
    sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;

    setTimeout(() => {
        if (currentIndex <= 11) {
            sliderWrapper.style.transition = 'none';
            currentIndex = posters.length - 24 + currentIndex; 
            sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;
        } else if (currentIndex >= posters.length - 12) {
            sliderWrapper.style.transition = 'none';
            currentIndex = currentIndex - posters.length + 24; 
            sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;
        }
    }, 300);
}

function updateSlider() {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const posters = document.querySelectorAll('.poster');
    const posterWidth = posters[0].clientWidth + 20; // 20 is margin

    sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;
}

document.getElementById('prev-btn').addEventListener('click', () => slide(-1));
document.getElementById('next-btn').addEventListener('click', () => slide(1));

fetchMovies();
