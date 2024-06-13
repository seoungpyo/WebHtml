const playBtn = document.getElementById("play");
const musicContainer = document.getElementById("musicContainer");
const audio = document.getElementById("audio");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById('progress-container');
const imgCover = document.getElementById("cover");
const title = document.getElementById("musictitle");

const songs = ["lucky girl syndrome", "Super Nova"]; 

let songIndex = 0;

loadSong(songs[songIndex]);

window.addEventListener('load', () => {
    playMusic();
});

function loadSong(song) {
    title.innerText = song;
    audio.src = `../music/${song}.m4a`; 
    imgCover.src = `../Img/Music/${song}.jpg`; 
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
    const width = e.target.clientWidth; 
    const offsetX = e.offsetX; 
    const duration = audio.duration; 
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
