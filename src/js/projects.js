const projects = [
  {
    name: "Ada",
    path: "ada/",
    children: [
      { name: "1", path: "devf/cajero/" },
      { name: "2", path: "devf/ejercicios/" },
      { name: "3", path: "imdb/" },
      { name: "4", path: "pokedex/" },
      { name: "5", path: "portafolio/" },
    ],
  },

  {
    name: "DevF",
    path: "devf/",
    children: [
      { name: "Cajero", path: "devf/cajero/index.html" },
      { name: "Disney", path: "devf/sitiofamoso/sitiofamoso.html" },
      { name: "Ejercicios", path: "devf/ejercicios/ejercicios.html" },
      { name: "IMDb", path: "devf/imdb/imdb.html" },
      { name: "Pokedex", path: "devf/pokedex/pokedex.html" },
      { name: "Portafolio", path: "devf/portafolio/portafolio.html" },
    ],
  },

  {
    name: "DIO",
    path: "dio/",
    children: [
      { name: "1", path: "devf/cajero/" },
      { name: "2", path: "devf/ejercicios/" },
      { name: "3", path: "imdb/" },
      { name: "4", path: "pokedex/" },
      { name: "5", path: "portafolio/" },
    ],
  },

  {
    name: "Jeux",
    path: "jeux/",
    children: [
      { name: "1", path: "devf/cajero/" },
      { name: "2", path: "devf/ejercicios/" },
      { name: "3", path: "imdb/" },
      { name: "4", path: "pokedex/" },
      { name: "5", path: "portafolio/" },
    ],
  },

  {
    name: "Others Projects",
    path: "oprojects/",
    children: [
      { name: "1", path: "devf/cajero/" },
      { name: "2", path: "devf/ejercicios/" },
      { name: "3", path: "imdb/" },
      { name: "4", path: "pokedex/" },
      { name: "5", path: "portafolio/" },
    ],
  },

  {
    name: "Oracle",
    path: "oracle/",
    children: [
      { name: "1", path: "devf/cajero/" },
      { name: "2", path: "devf/ejercicios/" },
      { name: "3", path: "imdb/" },
      { name: "4", path: "pokedex/" },
      { name: "5", path: "portafolio/" },
    ],
  },

  {
    name: "Platzi",
    path: "platzi/",
    children: [
      { name: "1", path: "devf/cajero/" },
      { name: "2", path: "devf/ejercicios/" },
      { name: "3", path: "imdb/" },
      { name: "4", path: "pokedex/" },
      { name: "5", path: "portafolio/" },
    ],
  },

  {
    name: "Software Engineering",
    path: "software-engineering/",
    children: [
      { name: "1", path: "devf/cajero/" },
      { name: "2", path: "devf/ejercicios/" },
      { name: "3", path: "imdb/" },
      { name: "4", path: "pokedex/" },
      { name: "5", path: "portafolio/" },
    ],
  },
];

// Função recursiva para renderizar o menu
function renderProjects(projects, parentUl) {
  projects.forEach((project, idx) => {
    const li = document.createElement("li");

    if (project.children && project.children.length) {
      // Cria botão/link para abrir/fechar filhos
      const parentLink = document.createElement("a");
      parentLink.href = project.path;
      parentLink.textContent = `▶ ${project.name}`;
      parentLink.className = "parent-project";
      parentLink.style.cursor = "pointer";

      // Sub-lista inicialmente oculta
      const ul = document.createElement("ul");
      ul.classList.add("sub-list");
      ul.style.display = "none";

      // Botão de toggle para expandir/collapse
      parentLink.addEventListener("click", function(e) {
        e.preventDefault(); // Não ir para a página ao clicar
        const opened = ul.style.display === "block";
        ul.style.display = opened ? "none" : "block";
        parentLink.textContent = (opened ? "▶ " : "▼ ") + project.name;
      });

      li.appendChild(parentLink);
      renderProjects(project.children, ul);
      li.appendChild(ul);
    } else {
      // Projeto simples
      li.innerHTML = `<a href="${project.path}" target="_blank">${project.name}</a>`;
    }
    parentUl.appendChild(li);
  });
}

const list = document.getElementById("project-list");
renderProjects(projects, list);
