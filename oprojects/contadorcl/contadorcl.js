// Autora: Suellen Santana
// Data: 2025-03-22
// Descrição: Script para calcular a quantidade de dias que uma pessoa ficou fora do Chile

let entryCount = 0;
let currentLang = 'pt';


const translations = {
  pt: {
    title: "Calculadora de Dias Fora do Chile",
    add: "Adicionar Entrada/Saída",
    calc: "Calcular Dias Fora",
    saida: "Saída do Chile",
    entrada: "Entrada no Chile",
    remover: "Remover",
    resultado: dias => `Você ficou fora do Chile por um total de ${dias} dia(s).`,
    footer: "Desenvolvido por [Seu Nome] – © 2025",
    alertaPreencher: i => `Preencha todos os horários da entrada ${i}`,
    alertaOrdem: i => `A entrada ${i} deve ser posterior à saída`
  },
  en: {
    title: "Days Outside Chile Calculator",
    add: "Add Entry/Exit",
    calc: "Calculate Days Outside",
    saida: "Exit from Chile",
    entrada: "Entry to Chile",
    remover: "Remove",
    resultado: dias => `You were outside Chile for a total of ${dias} day(s).`,
    footer: "Developed by [Your Name] – © 2025",
    alertaPreencher: i => `Please fill in all times for entry ${i}`,
    alertaOrdem: i => `Entry ${i} must be after exit`
  },
  es: {
    title: "Calculadora de Días Fuera de Chile",
    add: "Agregar Salida/Entrada",
    calc: "Calcular Días Fuera",
    saida: "Salida de Chile",
    entrada: "Ingreso a Chile",
    remover: "Eliminar",
    resultado: dias => `Estuviste fuera de Chile por un total de ${dias} día(s).`,
    footer: "Desarrollado por [Su Nombre] – © 2025",
    alertaPreencher: i => `Complete todas las horas para la entrada ${i}`,
    alertaOrdem: i => `La entrada ${i} debe ser posterior a la salida`
  }
};

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  
  document.getElementById('title').innerText = t.title;
  document.getElementById('add-button').innerText = t.add;
  document.getElementById('calc-button').innerText = t.calc;
  document.getElementById('footer-text').innerText = t.footer;

 
  document.getElementById("entries-container").innerHTML = "";
  entryCount = 0;

 
  addEntry();
}

function addEntry() {
  const container = document.getElementById("entries-container");
  const t = translations[currentLang];

  const entryWrapper = document.createElement("div");
  entryWrapper.classList.add("entry-wrapper");
  entryWrapper.setAttribute("id", `entry-${entryCount}`);

  entryWrapper.innerHTML = `
    <div class="entry">
      <label id="label-saida-${entryCount}">${t.saida}: <input type="datetime-local" id="saida-${entryCount}"></label>
      <label id="label-entrada-${entryCount}">${t.entrada}: <input type="datetime-local" id="entrada-${entryCount}"></label>
      <button class="remove-button" id="remove-${entryCount}" onclick="removerEntrada(${entryCount})">${t.remover}</button>
    </div>
  `;

  container.appendChild(entryWrapper);
  entryCount++;
}

function removerEntrada(index) {
  const entry = document.getElementById(`entry-${index}`);
  if (entry) {
    entry.remove();
  }
}

function calcularDias() {
  let totalHoras = 0;
  let valid = true;
  const t = translations[currentLang];

  for (let i = 0; i < entryCount; i++) {
    const saidaEl = document.getElementById(`saida-${i}`);
    const entradaEl = document.getElementById(`entrada-${i}`);

    if (!saidaEl || !entradaEl) continue;

    const saida = saidaEl.value;
    const entrada = entradaEl.value;

    if (!saida || !entrada) {
      alert(t.alertaPreencher(i + 1));
      valid = false;
      break;
    }

    const saidaDate = new Date(saida);
    const entradaDate = new Date(entrada);

    if (entradaDate <= saidaDate) {
      alert(t.alertaOrdem(i + 1));
      valid = false;
      break;
    }

    const diffMs = entradaDate - saidaDate;
    const diffHoras = diffMs / (1000 * 60 * 60);
    totalHoras += diffHoras;
  }

  if (valid) {
    const diasFora = Math.ceil(totalHoras / 24);
    document.getElementById("results").innerText = t.resultado(diasFora);
  } else {
    document.getElementById("results").innerText = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
});