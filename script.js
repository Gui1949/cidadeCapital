let embed = "https://www.youtube.com/embed/";

let musicas = ["ojpwLz2NC0g", "6XFAfRY6Y2E", "D5OdFPTkFuc"];

let data = new Date()
let hora = data.getHours();

//Mecanismo - Musica Aleatória

musica_aleatoria = () => {
  let musica = Math.floor(Math.random() * musicas.length);
  return musicas[musica];
};

// TTS
tts = (texto) => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = texto
    msg.lang = "pt-BR"
    window.speechSynthesis.speak(msg);
}

//Ao iniciar

window.addEventListener("DOMContentLoaded", () => {
    tts("Radio Cidade Capital, agora são" + hora + "horas")
  let player;
  onYouTubePlayerAPIReady = () => {
    player = new YT.Player("player", {
      width: "640",
      height: "390",
      videoId: musica_aleatoria(),
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  onPlayerReady = (event) => {
    event.target.playVideo();
  };

  onPlayerStateChange = (event) => {
    if (event.data === 0) {
      player.loadVideoById(musica_aleatoria());
      tts("Cidade")
    }
  };
});
