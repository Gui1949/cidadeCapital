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
  "Qum7tgkvFV4",
  "kI3Y4TiD0oM",
  "GSY9OWNo3WU",
  "_vML7_eUkZw",
  "4XKGfziuw5c",
  "aKdcUM2M5z4",
  "B3gAZvncfa0",
  "meUBH1viVrA",
  "X1p4TerTwok",
  "fUjOfsoBhMY",
  "MuQPWd1ybH4",
  "4waQ7092O5c",
  "6SCv3DHUSXA",
  "4vQnz2wEgXY",
  "AjSSh9bQnU8",
  "Nzye4n8xDtw",
  "_HJ9LdmppYU",
  "aQkPcPqTq4M",
  "pvG9VvsNgCk",
  "5f6_JkX-_Iw",
  "M1n0s60dL44",
  "_kD37ytFU10",
  "f4H9-Gq9i2Y",
  "jLBmNU3Ly6c",
  "am0y9DKLs8A",
  "sEsGEfKPYME",
  "H0BF9sueJ1Q",
  "r0-CC7z89qI",
  "0FUSKO_6NFA",
  "tNTHwVhL8Mo",
  "cb7lRInEa6c",
  "fwCWg-L_TNE",
  "El9vS2Aj6o0",
  "RIBkK5X_3mo",
  "O2IP1zRJe50",
  "1NyGDqJj0EU",
  "NvS351QKFV4",
  "fjB4tOvPpKw",
  "ll0sSBzL2cs",
  "8BZU1vNLXX0",
  "dEh3dJORNU4",
  "BtKg458XAHk",
  "kVGIIvnG1_E",
  "P4TAy1NiOho",
  "LcJIy3KO7Uw",
];

let noticias = [];
let contador_musicas = 0;

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
  return tempo;
};

setInterval(() => {
  chamada("src/cidade.ogg");
  gera_tempo();
  console.log(gera_tempo());
}, gera_tempo());

//XML
carregarXML = () => {
  let url = "https://www.bbc.co.uk/portuguese/index.xml";
  let i = 0;
  feednami.load(url).then((feed) => {
    for (let entrada of feed.entries) {
      noticias.push(`De BBC: ${entrada.title}, ${entrada.description}`);
    }
  });
  console.log(noticias);
};

//Noticia
lerNoticia = () => {
  chamada("src/noticias1.ogg");
  setTimeout(() => {
    tts(noticias[Math.floor(Math.random() * noticias.length) + 1]);
  }, 2000);
};

//Ao iniciar

window.addEventListener("DOMContentLoaded", () => {
  carregarXML();
  chamada("src/cidade.ogg");
  //   tts("Radio Cidade Capital, agora são" + hora + "horas");
  let player;
  onYouTubePlayerAPIReady = () => {
    player = new YT.Player("player", {
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
      contador_musicas++;
      if (contador_musicas == 5) {
        setTimeout(() => {
          player.setVolume(20);
          lerNoticia();
          setTimeout(() => {
            player.setVolume(100);
          }, 30000);
        }, 10000);
        contador_musicas = 0;
      }
    }
  };
});
