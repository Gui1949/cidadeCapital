let musicas = [
  "ojpwLz2NC0g",
  "6XFAfRY6Y2E",
  "D5OdFPTkFuc",
  "Fpyk4633_Pw",
  "tmITrwr4Og0",
  "Rx8R693uZn8",
  "k7IQsTGpCeo",
  "bOqxDs2SZ4U",
  "qBCTQvppgKA",
  "CKTkigVUNBc",
  "syqJAgTQdlU",
  "vras6sDSvOY",
  "_XT1cGqGjZY",
  "Ar1TGJbfhz0",
  "aRn4kzcFkos",
  "boLnQLYv7Rc",
  "VYVb7kC0dd4",
  "7z0Vt1zuuok",
  "CJSZPslHkFI",
  "oDiwabt_whg",
  "5Rq0LjdxTY8",
  "7Vpk1C0BXrY",
  "HD6LTOjDyxo",
  "lhpwtaPrI6c",
  "Gz01NmqN91g",
  "AzbzMZXMbCA",
  "DxQsx3p4MLc",
  "ZOlnLvgW5i0",
  "Tmy7wpGxnCs",
  "t9iB1Ji7Wxc",
  "oowBXzfcl90",
  "TFdO7oqkMzI",
  "az_mSxwMoEw",
  "7t23w7UQ8V8",
  "xCPT7KkIPOQ",
  "qNLxCBszQns",
  "zXCUNd8CNVk",
  "qTsaS1Tm-Ic",
  "H6wl-EyhXl0",
  "jxLYYf5bz0M",
  "SiEqEp_aXZQ",
  "P3Czn4ZgFOA",
  "_yhXdRIq-N0",
  "w_e5eKKX4qQ",
  "Uq8JErecZFQ",
];

let data = new Date();
let hora = data.getHours();

//Mecanismo - Musica Aleatória

musica_aleatoria = () => {
  let musica = Math.floor(Math.random() * musicas.length);
  return musicas[musica];
};

// TTS
tts = (texto) => {
  let msg = new SpeechSynthesisUtterance();
  msg.text = texto;
  msg.lang = "pt-BR";
  window.speechSynthesis.speak(msg);
};

// Chamada
chamada = (param) => {
  let audio = new Audio(param);
  audio.play();
};

// Chamar chamada
gera_tempo = () => {
    let tempo = Math.floor(Math.random() * 400000) + 180000;
    return tempo
}
setInterval(() => {
  chamada("src/cidade.ogg");
  gera_tempo()
  console.log(gera_tempo())
}, 3000);

//Ao iniciar

window.addEventListener("DOMContentLoaded", () => {
  chamada("src/cidade.ogg");
  //   tts("Radio Cidade Capital, agora são" + hora + "horas");
  let player;
  onYouTubePlayerAPIReady = () => {
    player = new YT.Player("player", {
      width: "640",
      height: "390",
      playsinline: 1,
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
      //   tts("Cidade");
      chamada("src/cidade1.ogg");
    }
  };
});
