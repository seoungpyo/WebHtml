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

    // 첫 번째부터 네 번째 포스터를 클론하여 추가합니다.
    for (let i = 0; i < 4; i++) {
        const clone = createPosterElement(movies[i]);
        sliderContent.appendChild(clone);
    }

    movies.forEach(movie => {
        const posterDiv = createPosterElement(movie);
        sliderContent.appendChild(posterDiv);
    });

    // 첫 번째부터 네 번째 포스터를 다시 클론하여 맨 뒤에 추가합니다.
    for (let i = 0; i < 4; i++) {
        const clone = createPosterElement(movies[i]);
        sliderContent.appendChild(clone);
    }

    // 슬라이더 초기화
    currentIndex = 4;
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

let currentIndex = 4;

function slide(offset) {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const posters = document.querySelectorAll('.poster');
    const posterWidth = posters[0].clientWidth + 20; // 20 is margin

    currentIndex += offset;
    sliderWrapper.style.transition = 'transform 0.3s ease';
    sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;

    // 무한 루프를 위해 슬라이더의 끝에 도달했을 때 트랜지션을 제거하고 인덱스를 조정합니다.
    setTimeout(() => {
        if (currentIndex <= 3) {
            sliderWrapper.style.transition = 'none';
            currentIndex = posters.length - 8 + currentIndex; // 4개의 클론이 있으므로 조정
            sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;
        } else if (currentIndex >= posters.length - 4) {
            sliderWrapper.style.transition = 'none';
            currentIndex = currentIndex - posters.length + 8; // 4개의 클론이 있으므로 조정
            sliderWrapper.style.transform = `translateX(${-currentIndex * posterWidth}px)`;
        }
    }, 300);
}

document.getElementById('prev-btn').addEventListener('click', () => slide(-1));
document.getElementById('next-btn').addEventListener('click', () => slide(1));

fetchMovies();
