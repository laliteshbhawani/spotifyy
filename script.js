
    let currentmusic = 0;

    const music = document.querySelector('#audio');

    const seekbar = document.querySelector('.seekbar');
    const songname = document.querySelector('.songname');
    const artist = document.querySelector('.artist');
    const disk = document.querySelector('.disk');
    const currenttime = document.querySelector('.currenttime');
    const songtime = document.querySelector('.songtime');
    const playbutton = document.querySelector('.playbutton');
    const forward = document.querySelector('.forward');
    const backward = document.querySelector('.backward');

    const mp = document.querySelector('.mp');
    const pcb = document.querySelector('.pcb');
    const plb = document.querySelector('.plb');

    // Event listeners for individual cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', () => {
            mp.classList.remove('disappear');

            currentmusic = index;
            setMusic(currentmusic, songs);
            playMusic();
        });
    });
    // Function to set music details
    
    function setMusic(index, playlist) {
        const song = playlist[index];

        music.src = song.path;
        songname.innerHTML = song.name;
        artist.innerHTML = song.artist;

        currenttime.innerHTML = "00:00";
        setTimeout(() => {
            seekbar.max = music.duration;
            songtime.innerHTML = formatTime(music.duration);
        }, 500);
    }

    const formatTime = (time) => {
      let min = Math.floor(time / 60);
      if (min < 10) {
        min = `0${min}`;
      }
      let sec = Math.floor(time % 60);
      if (sec < 10) {
        sec = `0${sec}`;
      }
      return `${min}:${sec}`;
    };

    function togglePlayPause() {
        if (music.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    }

    // Function to play music
    function playMusic() {
        music.play();
        disk.classList.add('play');
        pcb.style.opacity=0;
        plb.style.opacity=1;
    }

    // Function to pause music
    function pauseMusic() {
        music.pause();
        disk.classList.remove('play');
        pcb.style.opacity=1;
        plb.style.opacity=0;
    }

    // Event listener for play/pause button
    playbutton.addEventListener('click', togglePlayPause);

    // Event listener for time update
    music.addEventListener('timeupdate', () => {
        seekbar.value = music.currentTime;
        currenttime.innerHTML = formatTime(music.currentTime);
    });

    // Event listener for seekbar input
    seekbar.addEventListener('input', () => {
        music.currentTime = seekbar.value;
        currenttime.innerHTML = formatTime(music.currentTime);
        playMusic();
    });

    // Event listener for forward button
    forward.addEventListener('click', () => {
        currentmusic = (currentmusic + 1) % songs.length;
        setMusic(currentmusic, songs);
        playMusic();
    });

    // Event listener for backward button
    backward.addEventListener('click', () => {
        currentmusic = (currentmusic - 1 + songs.length) % songs.length;
        setMusic(currentmusic, songs);
        playMusic();
    });

    music.addEventListener('ended', () => {
        currentmusic = (currentmusic + 1) % songs.length;
        setMusic(currentmusic, songs);
        playMusic();
    });

