fetch("./assets/js/pokedex.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("pokemonContainer");
    const searchInput = document.getElementById("searchInput");

    function mostrarPokemones(lista) {
      container.innerHTML = "";

      lista.forEach(pokemon => {
        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

        const tipos = pokemon.type.join(", ");
        const nome = pokemon.name.english;
        const habilidades = pokemon.profile.ability.map(a => a[0]).join(", ");
        const peso = pokemon.profile.weight;
        const altura = pokemon.profile.height;
        
        const descripcion = pokemon.description;
        const imgURL = pokemon.image.hires;

        card.innerHTML = `
          <div class="card shadow h-100 card-pokemon" style="cursor: pointer;">
            <img src="${imgURL}" class="card-img-top" alt="${nome}" />
            <div class="card-body">
              <h5 class="card-title">${nome}</h5>
              <p class="card-text"><strong>Tipo:</strong> ${tipos}</p>
            </div>
          </div>
        `;

        // Evento para abrir modal ao clicar na carta
        card.addEventListener("click", () => {
          document.getElementById("pokemonModalLabel").textContent = nome;
          document.getElementById("modalImage").src = imgURL;
          document.getElementById("modalTipo").textContent = tipos;
          document.getElementById("modalPeso").textContent = peso;
          document.getElementById("modalAltura").textContent = altura;
          document.getElementById("modalHabilidades").textContent = habilidades;
          document.getElementById("modalDescripcion").textContent = descripcion;

          const modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
          modal.show();
        });

        container.appendChild(card);
      });
    }

    // Mostrar os Pokémons ao carregar
    mostrarPokemones(data);

    // Filtrar Pokémons
    searchInput.addEventListener("input", () => {
      const texto = searchInput.value.toLowerCase();
      const filtrados = data.filter(p =>
        p.name.english.toLowerCase().includes(texto)
      );
      mostrarPokemones(filtrados);
    });

    const btnTop = document.getElementById("btnTop");

  // Mostrar el botón después de bajar 300px
  window.onscroll = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      btnTop.style.display = "block";
    } else {
      btnTop.style.display = "none";
    }
  };

  // Subir al hacer clic
  btnTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  });