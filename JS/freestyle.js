const words = [
  // Prioridad alta: palabras y expresiones de uso frecuente
  { esp: "puede", eng: "may" },
  { esp: "podría", eng: "might" },
  { esp: "mientras", eng: "while" },
  { esp: "sin", eng: "without" },
  { esp: "significar", eng: "mean" },
  { esp: "construir", eng: "build" },
  { esp: "cambiar", eng: "to change" },
  { esp: "comportamiento", eng: "behavior" },
  { esp: "tienden a", eng: "tend to" },
  { esp: "a pesar de que", eng: "although" },
  { esp: "para evitar", eng: "to avoid" },
  { esp: "pero puede", eng: "but it can" },
  { esp: "junto a cada uno", eng: "next to each" },
  { esp: "cuál", eng: "which" },
  { esp: "su (de ellos/ellas)", eng: "their" },

  // Prioridad media: comunicación y trabajo
  { esp: "comunicación", eng: "communication" },
  { esp: "estilos", eng: "styles" },
  { esp: "enfoque", eng: "approach" },
  { esp: "aclarar", eng: "clarify" },
  { esp: "adaptar", eng: "adapt" },
  { esp: "respeto", eng: "respect" },
  { esp: "colegas", eng: "colleagues" },
  { esp: "directamente", eng: "directly" },
  { esp: "indirecto/a", eng: "indirect" },
  { esp: "educado/a; cortés", eng: "polite" },
  { esp: "desacuerdo", eng: "disagreement" },
  { esp: "suposiciones", eng: "assumptions" },
  { esp: "malentendidos", eng: "misunderstandings" },
  { esp: "provechoso/a; gratificante", eng: "rewarding" },

  // Prioridad específica: cultura y comunicación
  { esp: "jerarquía", eng: "hierarchy" },
  { esp: "expectativas culturales", eng: "cultural expectations" },
  { esp: "lenguaje corporal", eng: "body language" },
  { esp: "gesto", eng: "gesture" },
  { esp: "puntualidad", eng: "punctuality" },
  { esp: "creencias", eng: "beliefs" },
  { esp: "comportarse", eng: "behave" },
  { esp: "tiempo previsto", eng: "expected time" },
  { esp: "mente abierta", eng: "open-minded" },

  // Expresiones completas: aprende los bloques
  { esp: "la forma en que un/a...", eng: "the way a" },
  { esp: "explicar", eng: "to explain" },
  { esp: "para dejarlo claro", eng: "to make it clear" },
  { esp: "de una manera que...", eng: "in a way that..." },
  { esp: "de una manera...", eng: "in a _ way" },
  { esp: "para; con el fin de", eng: "in order to" },
  { esp: "indirectamente; sin expresarlo claramente", eng: "indirectly" },
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

  if (opciones.includes(r)) {
    // Respuesta correcta
    document.getElementById("resultado").innerText =
      "¡Correcto! — pasa a dominadas";

    wordsAciertos.push(actual);
    wordsPendientes.shift();
    actualizarLista();

    siguiente();

  } else {
    // Respuesta incorrecta: mostrar la forma correcta
    document.getElementById("resultado").innerText =
      "Incorrecto. Se escribe: " + actual.eng +
      ". El juego se reiniciará.";

    hablar(actual.eng);

    // Esperar 2 segundos para que puedas leer la respuesta
    setTimeout(() => {
      reiniciar();
    }, 2000);
  }
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
