
const words = [
  { esp: "provechosa/o", eng: "rewarding" },
  { esp: "pero puede", eng: "but it can" },
  { esp: "malentendidos", eng: "misunderstandings" },
  { esp: "puede", eng: "may" },
  { esp: "mientras", eng: "while" },
  { esp: "enfoque", eng: "approach" },
  { esp: "jerarquía", eng: "hierarchy" },
  { esp: "gesto", eng: "gesture" },
  { esp: "para evitar", eng: "to avoid" },
  { esp: "su", eng: "their" },
  { esp: "de mente abierta", eng: "open-minded" },
  { esp: "construir", eng: "build" },
];

let wordsPendientes = [...words];
let wordsAciertos = [];
let actual;

function siguiente() {
  if (wordsPendientes.length === 0) {
    document.getElementById("verbo").innerText = "¡Completado!";
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

  if (r === "") return;

  const opciones = actual.eng.split("/");

  // Sacar la palabra del frente de la cola
  wordsPendientes.shift();

  if (opciones.includes(r)) {
    document.getElementById("resultado").innerText =
      "Correcto — pasa a dominadas";

    wordsAciertos.push(actual);
    actualizarLista();
  } else {
    document.getElementById("resultado").innerText =
      "Era: " + actual.eng + " — vuelve al final";

    hablar(opciones[0]);

    // Mandar la palabra al final de la cola
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
