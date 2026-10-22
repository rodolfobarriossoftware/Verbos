const words = [

  { esp: "apostar", eng: "bet" },
  
];

let wordsPendientes = [...words];
let WordsAciertos = [];
let actual;

function siguiente() {

  if (wordsPendientes.length === 0) {
    document.getElementById("Word").innerText = "¡Completado!";
    actual = null;
    return;
  }

  document.getElementById("resultado").innerText = "";
  document.getElementById("respuesta").value = "";

  
  actual = wordsPendientes[0];

  document.getElementById("verbo").innerText = actual.esp;
}


function verificar() {
  if (!actual) return;

  const r = document.getElementById("respuesta").value
    .toLowerCase()
    .trim();

  const opciones = actual.past.split("/");

  // sacar de la cola (siempre está al frente)
  wordsPendientes.shift();

  if (opciones.includes(r)) {

    document.getElementById("resultado").innerText =
      "Correcto — pasa a dominados";

    wordsAciertos.push(actual);
    actualizarLista();

  } else {

    document.getElementById("resultado").innerText =
      "Era: " + actual.past + " — vuelve al final";

    hablar(opciones[0]);

    // mandar al final de la cola
    wordsPendientes.push(actual);
  }

  siguiente();
}

function actualizarLista() {
  const ul = document.getElementById("listaAciertos");
  ul.innerHTML = "";

  wordsAciertos.forEach(w => {
    const li = document.createElement("li");
    li.textContent = w.esp + " → " + w.eng;
    ul.appendChild(li);
  });
}

function reiniciar() {
  wordsPendientes = [...words];
  wordsAciertos = [];
  actualizarLista();
  siguiente();
}

document.getElementById("respuesta")
  .addEventListener("keydown", e => {
    if (e.key === "Enter") verificar();
  });

siguiente();

