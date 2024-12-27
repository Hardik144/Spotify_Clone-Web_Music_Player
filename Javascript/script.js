let currentSong = new Audio();
let songs;
let currFolder;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Use String.padStart to ensure two-digit formatting
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`);
    let response = await a.text();
    // console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;
    // console.log(div);

    let as = div.getElementsByTagName("a");
    // console.log(as)

    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        // console.log(element.href);
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    // Show all the songs in the playlist
    let songUL = document.querySelector(".songplayed").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML += `<li> 
                                <div class="music">
                                    <img src="images/music.svg" alt="">
                                    <div class="musicinfo">
                                        <h3>${song.replaceAll("%20", " ")}</h3> 
                                        <p>Hardik</p>
                                    </div>
                                </div>
                            </li>`;
    }

    // attach an event listener to each song
    Array.from(document.querySelector(".songplayed").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            // console.log(e.querySelector(".musicinfo").firstElementChild.innerHTML);
            playmusic(e.querySelector(".musicinfo").firstElementChild.innerHTML);
        })
    })
    return songs;
}

//Play the songs
const playmusic = (track, pause = false)=>{
    currentSong.src = `/${currFolder}/` + track;

    if(!pause){
        currentSong.play();
        play.src = "images/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}



async function displayAlbums(){
    let a = await fetch(`/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")

    let cardcontain = document.querySelector(".card-contain");

    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if(e.href.includes("/songs/") && !e.href.includes(".htaccess")){
            let folder = e.href.split("/").slice(-1)[0];
            // Get the metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`);
            let response = await a.json();
            cardcontain.innerHTML = cardcontain.innerHTML + `<div data-folder="${folder}" class="card">
                    <div class="button"><img class="buttonclass" src="images/playbutton.svg" alt=""></div>
                    <img id="albumimg" src="/songs/${folder}/cover.jpg" alt="">
                    <h3>${response.title}</h3>
                    <p>${response.description}</p>
                </div>`
        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            playmusic(songs[0]);
        })
    });
}

async function main(){

    await getsongs("songs/Best");
    // console.log(songs);
    playmusic(songs[0], true);

    // Display all the albums on the page
    await displayAlbums();
    
    // attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if(currentSong.paused){
            currentSong.play();
            play.src = "images/pause.svg";
        }
        else{
            currentSong.pause();
            play.src = "images/play.svg";
        }
        
    })
    
    // listen for time update function
    currentSong.addEventListener("timeupdate", () =>{
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
    })

    // add an event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration)*percent)/100;
    })


    // add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = 0; 
    })

    // add an event listener for cross
    document.querySelector(".cross-logo").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = -110 + "%"; 
    })

    // add a border around search bar
    // var clk = 0;
    document.querySelector(".search").addEventListener("click", ()=>{
        event.stopPropagation();
        // clk = 1;
        document.querySelector(".search").style.border = 3 +"px solid white"    
    })    

    document.addEventListener('click', () => {
        // if(!clk){
            document.querySelector(".search").style.border = "3px solid transparent"; // Remove border  
        // }
        // clk = 0;
    });

    // add an event listener to previous
    previous.addEventListener("click", ()=>{
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0]);
        if((index-1) >= 0){
            playmusic(songs[index-1])
        }
          
    })

    // add an event listener to next
    next.addEventListener("click", ()=>{
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0]);
        if((index+1) < (songs.length)){
            playmusic(songs[index+1])
        }
    })

    // add an event listener to volume

    // document.querySelector(".volume").addEventListener("click", (e)=>{
    //     event.stopPropagation();
    //     document.querySelector("#volumebar").style.display = "block";
    // })
    // document.addEventListener("click", ()=>{
    //     event.stopPropagation();
    //     document.querySelector("#volumebar").style.display = "none";
    // })
      
    
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        currentSong.volume = parseInt(e.target.value)/100
        // console.log(parseInt(e.target.value)/100)

        if((parseInt(e.target.value)/100) == 0){
            document.querySelector("#volicon1").style.display = "none";
            document.querySelector("#volicon2").style.display = "none";
            document.querySelector("#volicon3").style.display = "none";
            document.querySelector("#muticon").style.display = "block";
            
            
        }
        else if((parseInt(e.target.value)/100) < 0.3 && (parseInt(e.target.value)/100) > 0.1){
            document.querySelector("#volicon1").style.display = "block";
            document.querySelector("#volicon2").style.display = "none";   
            document.querySelector("#volicon3").style.display = "none";
            document.querySelector("#muticon").style.display = "none";
        }

        else if((parseInt(e.target.value)/100) <= 0.7 && (parseInt(e.target.value)/100) >= 0.4){
            document.querySelector("#volicon1").style.display = "none";
            document.querySelector("#volicon2").style.display = "block";
            document.querySelector("#volicon3").style.display = "none";
            document.querySelector("#muticon").style.display = "none";
        }

        else if((parseInt(e.target.value)/100) == 1 || (parseInt(e.target.value)/100) > 0.7){
            document.querySelector("#volicon1").style.display = "none";
            document.querySelector("#volicon2").style.display = "none";
            document.querySelector("#volicon3").style.display = "block";
            document.querySelector("#muticon").style.display = "none";
        }
    })

    // Mute Button for window size less than 600px

    // const mediaQuery = window.matchMedia('(max-width: 600px)');

    // function handleScreenSizeChange(e) {
    //     if (e.matches) {
    //         // document.querySelector("#volicon2").style.display = "block";
    //         // document.querySelector("#muticon").style.display = "none";
    //     }
    // }
    // let isMuted = false; // Flag to track the mute state

    // document.querySelector(".volume").addEventListener("click", () => {
    //     if (mediaQuery.matches) {
    //         const volicon2 = document.querySelector("#volicon2");
    //         const muticon = document.querySelector("#muticon");

    //         if (!isMuted) {
    //             // Mute the song
    //             volicon2.style.display = "none";
    //             document.querySelector("#volicon1").style.display = "none";
    //             document.querySelector("#volicon3").style.display = "none";
    //             muticon.style.display = "block";
    //             currentSong.volume = 0;
    //             isMuted = true; // Update flag
    //         } else {
    //             // Unmute the song
    //             volicon2.style.display = "block";
    //             muticon.style.display = "none";
    //             currentSong.volume = 0.5;
    //             isMuted = false; // Update flag
    //         }
    //     }
    // });

    // // Attach event listener for changes in screen size
    // mediaQuery.addEventListener('change', handleScreenSizeChange);

    // // Initialize the button visibility on page load
    // handleScreenSizeChange(mediaQuery);


    // Add an event listener to mute the track
    document.querySelector("#volicon2").addEventListener("click", e=>{
        if(e.target.src.includes("images/volume2.svg")){
            e.target.src = e.target.src.replace("images/volume2.svg", "images/mute.svg");
            currentSong.volume = 0;
            document.querySelector("#volumebar").value = 0;
        }else{
            e.target.src = e.target.src.replace("images/mute.svg", "images/volume2.svg");
            currentSong.volume = 0.5;
            document.querySelector("#volumebar").value = 50;
        }
    })
    
    // Add an event listener to play the next song after the previous song ended

    currentSong.addEventListener("ended", () => {
        // Get the index of the current song
        let currentIndex = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    
        // Move to the next song, or loop back to the first song if at the end
        let nextIndex = (currentIndex + 1) % songs.length;
    
        // Play the next song
        playmusic(songs[nextIndex]);
    });
    

}

main();