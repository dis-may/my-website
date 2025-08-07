const songs = [
  {
    "name": "Jamiroquai - Virtual Insanity ( Piano cover )",
    "channel": "Fujii Kaze",
    "url": "https://www.youtube.com/watch?v=D-M5NTY0y7g",
  },
  {
    "name": "Modern Meme Sound Effects Compilation (2024)",
    "channel": "voximir",
    "url": "https://www.youtube.com/watch?v=nQstIbfauyo",
  },
  {
    "name": "Never Gonna Give You Up | Rick Astley Rocks New Year's Eve - BBC",
    "channel": "BBC",
    "url": "https://www.youtube.com/watch?v=XGxIE1hr0w4",
  },
  {
    "name": "Nothing Beats a Jet2holiday | Sale | Family | TV advert",
    "channel": "Jet2.com",
    "url": "https://www.youtube.com/watch?v=YQZEoZ4W0ac",
  },
  {
    "name": "Saja Boys' Soda Pop Song - K-POP DEMON HUNTERS Clip (2025)",
    "channel": "KinoCheck Family",
    "url": "https://www.youtube.com/watch?v=U3HGfwDjX0g",
  },
  {
    "name": "Diva Dance from The Fifth Element.Full version.",
    "channel": "Aleksandr Nevsky",
    "url": "https://www.youtube.com/watch?v=a7Dh5QoXv2c",
  },
  {
    "name": "CATHY (2021 Remaster)",
    "channel": "Hitomi Tohyama - Topic",
    "url": "https://www.youtube.com/watch?v=klq9uEdv1Hg",
  },
  {
    "name": "\"Samurai Champloo - Shiki No Uta\" (Nujabes) - The Brotet",
    "channel": "Jeraël",
    "url": "https://www.youtube.com/watch?v=8PsG3ycLx3o",
  },
  {
    "name": "Nyan Cat! [Official]",
    "channel": "NyanCat",
    "url": "https://www.youtube.com/watch?v=2yJgwwDcgV8",
  },
  {
    "name": "Daler Mehndi Tunak Tunak Tun (Remastered HD)",
    "channel": "Remastered videos",
    "url": "https://www.youtube.com/watch?v=viMEhOWcxd0",
  },
  {
    "name": "Ai♡Scream!(愛♡スクリ～ム！) - AiScReam Ai ScReam LIVE concert",
    "channel": "GoGoUp",
    "url": "https://www.youtube.com/watch?v=f9Q58Rnzz88",
  },
  {
    "name": "ASMRZ(TANAKA, NEEDMORECASH) - goodnight ojosama(prod. Gwana)❤️ Official Music Video",
    "channel": "namolla family hotshow",
    "url": "https://www.youtube.com/watch?v=FoO7Pmx0bE4",
  },
  {
    "name": "The Beths - \"Mother, Pray For Me\" (Official)",
    "channel": "The Beths",
    "url":"https://www.youtube.com/watch?v=v71QgHSMpnk",
  },

]

function loadRandomVideo(id) {
    const i = Math.floor(Math.random() * songs.length);
    const song = songs[i];
    const URL = song.url.substring(song.url.length-11,song.url.length);
    let play = false;

    // want to play rickroll immediately
    if (song.name.includes("Never Gonna Give You Up")) {
        play = true;
    }

    if (id == "r1") {
        if (play) {
            player1.player.loadVideoById(URL);
        } else {
            player1.player.cueVideoById(URL);
        }
    } else if (id == "r2") {
        if (play) {
            player2.player.loadVideoById(URL);
        } else {
            player2.player.cueVideoById(URL);
        }
    }
}