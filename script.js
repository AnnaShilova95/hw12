const playVideo = document.querySelector('img#play');
const pauseVideo = document.querySelector('img#pause');
const stopVideo = document.querySelector('img#stop');
const forward = document.querySelector('img#forward');
const video = document.querySelector('video');
const scrollVideo = document.querySelector('progress');
const timeVideo = document.querySelector('span.currentTime');
const dVideo = document.querySelector('span.durationVideo');
const volume = document.querySelector('input[type=range]');

playVideo.onclick = () => {
    if (document.querySelector('div.cntEndVideo')) {
        document.querySelector('div.cntEndVideo').remove();
    }
    video.play();
}

video.addEventListener('timeupdate', updateProgressBar, false);

pauseVideo.onclick = () => {
    video.pause();

}

stopVideo.onclick = () => {
    video.pause();
    video.currentTime = 0; 
}

forward.onclick = () => {
    video.currentTime += 30; 
}

backward.onclick = () => {
    video.currentTime -= 30;
}

volume.onchange = (e) => {
    video.volume = e.target.value;
}



function updateProgressBar() {
    if (!isNaN(video.duration)) { 

        let percentage = ((100 / video.duration) * video.currentTime);
        scrollVideo.value = percentage;
        

    }
}


video.addEventListener('ended', nextVideo, false);




function eventEndedVideo() {
    const replayVideoImg = document.querySelector('.cntButtonReplay');
    replayVideoImg.onclick = () => {
        video.play();
        document.querySelector('div.cntEndVideo').remove();
    }
}


function createWindowEndedVideo(arrayVideo) {
    const cntVideo = document.querySelector('div.contVideo');
    const cntEndVideo = document.createElement('div');
    cntEndVideo.classList.add('cntEndVideo');
    cntVideo.appendChild(cntEndVideo);


    const cntButtonReplay = document.createElement('div');
    cntButtonReplay.classList.add('cntButtonReplay');
    cntEndVideo.appendChild(cntButtonReplay);

    const imgReplay = document.createElement('img');
    imgReplay.src = './img/replay.png';
    imgReplay.width = '64';
    cntButtonReplay.appendChild(imgReplay);

    const labelReplay = document.createElement('div');
    labelReplay.textContent = 'Посмотреть сначала';
    cntButtonReplay.appendChild(labelReplay);

    
}




scrollVideo.addEventListener('click', seek);

function seek(e) {
    let percent = e.offsetX / this.offsetWidth;
    video.currentTime = percent * video.duration;
    e.target.value = Math.floor(percent / 100);
    
}



setInterval(() => {

    let houres = Math.floor(video.currentTime / 60 / 60);
    let minutes = Math.floor(video.currentTime / 60 % 60);
    let seconds = Math.floor(video.currentTime % 60 % 60);
    let z = houres < 10 ? "0" + houres : houres;
    let x = minutes < 10 ? "0" + minutes : minutes;
    let y = seconds < 10 ? "0" + seconds : seconds;


    timeVideo.textContent = String(z).padStart(2, '0') + ':' + String(x).padStart(2, '0') + ':' + (y);
}, 600)




video.onloadedmetadata = () => {
 
    hour = Math.floor(video.duration / 60 / 60);
    min = Math.floor(video.duration / 60 % 60);
    sec = Math.floor(video.duration % 60 % 60);

    dVideo.textContent = String(hour).padStart(2, '0') + ':' + String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');

}