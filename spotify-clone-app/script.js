let buttonAdderFlag = true;
let area = document.getElementById("right-nav");
let premiumButton = document.getElementById("premium1");
let installButton = document.getElementById("install-app");
let notificationButton = document.getElementById("notification");
let homeButton = document.getElementById("home");
let searchBar = document.getElementById("search-bar");
let icon = document.getElementById("left-nav");
let hiddenArea = document.getElementById("hidden-area");
let closeButton = document.getElementById("close-button");
let button = document.getElementById("user");
let hiddenAreaListenerAttached = false;
let leftAreaTop1 = document.getElementById("left-area-top-1");
let leftAreaTop2 = document.getElementById("left-area-top-2");
let leftAreaBottom = document.getElementById("left-area-bottom");
let lies = leftAreaBottom.querySelectorAll("li");
let names = ["Karan Aujla"];
let about = ["artist"];
let mainAreaRight = document.getElementById("right-main-section");
let rightBar = document.getElementById("right-bar");
let songBar1 = document.getElementById("song-bar-1");
let songBar2 = document.getElementById("song-bar-2");
let playButton1 = document.getElementById("play-button-1");
let playButton2 = document.getElementById("play-button-2");
let audio = document.getElementById("audio");
let isPlaying = false;
let playSongFlag = false;

function toggleAudio() {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
}

function playSong() {
    audio.src = "src/song.mp3";

    playButton1.addEventListener("click", () => {
        console.log("1");
        toggleAudio();
    });

    playButton2.addEventListener("click", () => {
        console.log("2");
        toggleAudio();
    });
}


function hiddenAreaListener(){
    icon.addEventListener("click", () => {
        console.log("open");
        hiddenArea.classList.toggle("left-[0%]");
    });

    closeButton.addEventListener("click", () => {
        console.log("open");
        hiddenArea.classList.toggle("left-[0%]");
    });
}

function viewTracker(){
    let windowWidth = window.innerWidth;

    if(!playSongFlag){
        playSong();

        playSongFlag = true;
    }

    if(windowWidth <= 1020){
        rightBar.style.display = "none";
    }
    else{
        rightBar.style.display = "flex";
    }

    if (windowWidth < 768){
        songBar1.style.display = "none";
        songBar2.style.display = "flex";
        if(!document.getElementById("hidden-area")){
            console.log("added");
            area.append(hiddenArea);
        }
        if(!hiddenAreaListenerAttached){
            hiddenAreaListener();
            hiddenAreaListenerAttached = true;
        }
        mainAreaRight.style.display = "none";

    }
    else{
        songBar1.style.display = "flex";
        songBar2.style.display = "none";

        hiddenArea.classList.remove("left-[0%]");

        mainAreaRight.style.display = "inline-block";
    }

    if (windowWidth < 1020){
        leftAreaTop1.style.display = "none";
        leftAreaTop2.style.display = "inline-block";

        for(let i=0; i<lies.length; i++){
            lies[i].children[1].style.display = "none";
        }
    }
    else{
        leftAreaTop1.style.display = "inline-block";
        leftAreaTop2.style.display = "none";

        for(let i=0; i<lies.length; i++){
            lies[i].children[1].style.display = "inline-block";
        }
    }
    
    if (windowWidth >= 900) {
        if (!document.getElementById("premium1")){
            area.insertBefore(premiumButton, button);
            area.insertBefore(installButton, button);
            area.insertBefore(notificationButton, button);
            area.insertBefore(homeButton, searchBar);
            console.log('Screen is at greater lg (800px)');
        }
        hiddenArea.remove();
    }
    else if (windowWidth >= 768) {
        if (!document.getElementById("premium1")){
            area.insertBefore(premiumButton, button);
            area.insertBefore(installButton, button);
            area.insertBefore(notificationButton, button);
            area.insertBefore(homeButton, searchBar);
            console.log('Screen is at greater lg (800px)');
        }
        hiddenArea.remove();
    }
    else if (windowWidth >= 375) {
        if (document.getElementById("premium1")){
            premiumButton.remove();
            installButton.remove();
            notificationButton.remove();
            homeButton.remove();
            console.log('Screen is at greater sm (375)');
        }
    }
}


viewTracker();
window.addEventListener("resize", viewTracker);
