const vPlayer = (function(){
    const player = document.querySelector(".player");
    const video = document.querySelector("video");
    const progressRange = document.querySelector(".progress-range");
    const progressBar = document.querySelector(".progress-bar");
    const playBtn = document.getElementById("play-btn");
    const volumeIcon = document.getElementById("volume-icon");
    const volumeRange = document.querySelector(".volume-range");
    const volumeBar = document.querySelector(".volume-bar");
    const currentTime = document.querySelector(".time-elapsed");
    const duration = document.querySelector(".time-duration");
    const playRate = document.querySelector(".play-speed");
    const fullscreenBtn = document.querySelector(".fullscreen");
    let lastVolume = 0;
    let isFullscreen = false;

    // Play & Pause
    const togglePlayIcon = (currentIcon, newIcon, title)=>{
        playBtn.classList.replace(currentIcon, newIcon);
        playBtn.setAttribute("title", title);
    }

    const togglePlay = ()=>{
        if(video.paused){
            video.play();
            togglePlayIcon("fa-play", "fa-pause", "pause");
        }
        else{
            video.pause();
            togglePlayIcon("fa-pause", "fa-play", "play");
        }
    }

    // Progress Bar
    // Calculate display time format
    const displayTime = (time)=>{
        const minutes =  Math.floor(time/60);
        let seconds = Math.floor(time%60);
        seconds = seconds < 10? `0${seconds}`:`${seconds}`;
        return `${minutes} : ${seconds}`; 
    }

    // Update progress Bar as video plays
    const updateProgress = (e)=>{
        const currTime = video.currentTime;
        const dur = video.duration;
        progressBar.style.width = `${(currTime / dur)*100}%`;
        currentTime.textContent = `${displayTime(currTime)} / `;
        duration.textContent = displayTime(dur);
    }

    const setProgress = (e)=>{
        const newTime = e.offsetX / progressRange.offsetWidth;
        progressBar.style.width = `${newTime*100}%`;
        video.currentTime = newTime * video.duration;
    }

    // Volume Bar
    const changeVolume = (e)=>{
        let volume = e.offsetX / volumeRange.offsetWidth;

        // Rounding volume up or down
        if(volume < 0.1){
            volume = 0;
        }else if(volume > 0.9){
            volume = 1;
        }
        volumeBar.style.width = `${volume*100}%`;
        video.volume = volume;
        changeVolumeIcon(volume);
    }

    // Change volume icon depending on volume
    const changeVolumeIcon = (volume)=>{
        volumeIcon.className = "";
        if(volume > 0.7){
            volumeIcon.classList.add("fas","fa-volume-up");
        }else if(volume < 0.7 && volume > 0){
            volumeIcon.classList.add("fas","fa-volume-down");
        }else if(volume === 0){console.log(volume);
            volumeIcon.classList.add("fas", "fa-volume-off");
        }
    }

    // Mute and Unmute volume
    const muteVolume = ()=>{
        volumeIcon.className = "";
        volumeTitle = volumeIcon.getAttribute("title");
        if(volumeTitle === "mute"){
            lastVolume = video.volume;
            video.volume = 0;
            volumeBar.style.width = 0;
            volumeIcon.classList.add("fas","fa-volume-mute");
            volumeIcon.setAttribute("title","unmute");
        }
        else if(volumeTitle === "unmute"){
            video.volume = lastVolume;
            volumeBar.style.width = `${lastVolume*100}%`
            changeVolumeIcon(lastVolume);
            volumeIcon.setAttribute("title","mute");
        }
    }

    // Change Playback rate
    const changePlaybackRate = ()=>{
        video.playbackRate = playRate.value;   
    }

    // Fullscreen mode
    /* View in fullscreen */
    function openFullscreen(elem) {
        if (elem.requestFullscreen) {
        elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
        }
        video.classList.add("video-fullscreen");
    }
    
    /* Close fullscreen */
    function closeFullscreen() {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
        }
        video.classList.remove("video-fullscreen");
    }

    // Toggle full screen
    const toggleFullscreen = ()=>{
        if(!isFullscreen){
            openFullscreen(player);
        }else{
            closeFullscreen();
        }
        isFullscreen = !isFullscreen;
    }

    //Event Listeners
    playBtn.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    video.addEventListener("ended", ()=>{
        togglePlayIcon("fa-pause", "fa-play", "play");
    });
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("canplay", updateProgress);
    progressRange.addEventListener("click", setProgress);
    volumeRange.addEventListener("click", changeVolume);
    volumeIcon.addEventListener("click", muteVolume);
    playRate.addEventListener("change", changePlaybackRate);
    fullscreenBtn.addEventListener("click", toggleFullscreen);

    return{
        video: video,
        proRange: progressRange,
        proBar: progressBar,
        playBtn: playBtn,
        volIcon: volumeIcon,
        volRange: volumeRange,
        volBar: volumeBar,
        currTime: currentTime,
        duration: duration,
        playRate: playRate,
        fullscrBtn: fullscreenBtn,
    }
})();

