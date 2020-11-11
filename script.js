const vPlayer = (function(){
    const video = document.querySelector("video");
    const progressRange = document.querySelector(".progress-range");
    const progressBar = document.querySelector(".progress-bar");
    const playBtn = document.getElementById("play-btn");
    const volumeIcon = document.getElementById("volume-icon");
    const volumeRange = document.querySelector(".volume-range");
    const volumeBar = document.querySelector(".volume-bar");
    const currentTime = document.querySelector(".time-elapsed");
    const duration = document.querySelector(".time-duration");
    const fullscreenBtn = document.querySelector(".fullscreen");

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


    //Event Listeners
    playBtn.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    video.addEventListener("ended", ()=>{
        togglePlayIcon("fa-pause", "fa-play", "play");
    });
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("canplay", updateProgress);

    
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
        fullscrBtn: fullscreenBtn
    }
})();

