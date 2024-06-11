const playBtn = document.getElementById("play");
const musicContainer = document.getElementById("musicContainer");
const audio = document.getElementById("audio");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById('progress-container');
const imgCover = document.getElementById("cover");
const title = document.getElementById("musictitle");

const songs = ["lucky girl syndrome", "Super Nova"]; // 여러 곡 추가

let songIndex = 0;

loadSong(songs[songIndex]);

// 페이지가 로드될 때 자동으로 음악을 재생합니다.
window.addEventListener('load', () => {
    playMusic();
});

function loadSong(song) {
    title.innerText = song;
    audio.src = `../music/${song}.m4a`; // 곡 파일 경로 설정
    imgCover.src = `../Img/Music/${song}.jpg`; // 포스터 이미지 경로 설정
}

function playMusic() {
    musicContainer.classList.add("play");
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    audio.play();
}

function pauseMusic(){
    musicContainer.classList.remove('play');
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    audio.pause();
}

function playPrevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function playNextSong (){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPer = (currentTime / duration) * 100;
    progress.style.width = `${progressPer}%`;
}

function changeProgress(e){
    const width = e.target.clientWidth; // 전체 넓이
    const offsetX = e.offsetX; // 현재 x 좌표;
    const duration = audio.duration; // 재생길이
    audio.currentTime = (offsetX / width) * duration; 
}

playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseMusic();
    } else{
        playMusic();
    }
});

prevBtn.addEventListener("click", playPrevSong);
nextBtn.addEventListener('click', playNextSong);
audio.addEventListener('ended', playNextSong);
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', changeProgress);
