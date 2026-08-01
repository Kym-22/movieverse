import { cargarCatalogo, cargarResenas, cargarAnuncios, initialCatalog } from "./api.js";
import { renderMovies, openModal } from "./render.js";
import { crearCachePeliculas } from "./cache.js";
const moviesContainer = document.getElementById("moviesContainer");
const spinner = document.getElementById("spinner");
const searchInput = document.getElementById("searchInput");
const favoriteCounter = document.getElementById("favoriteCounter");
const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.querySelector(".closeModal");
const langToggle = document.getElementById("langToggle");
const filters = document.querySelectorAll(".filters .filter");
let movies = [];
let currentMovies = [];
let currentGenre = "all";
let currentLang = "es";
const cachePeliculas = crearCachePeliculas();
function createFavoriteCounter() {
    let total = 0;
    return {
        add() {
            total++;
            favoriteCounter.textContent = total.toString();
        },
        getTotal() {
            return total;
        }
    };
}
const favorites = createFavoriteCounter();
const i18n = {
    es: {
        search: "Buscar películas...",
        loading: "Cargando películas...",
        year: "Año",
        genre: "Género",
        director: "Director",
        actors: "Actores",
        runtime: "Duración",
        country: "País",
        language: "Idioma",
        plot: "Sinopsis",
        add: "❤️ Agregar a Favoritos",
        added: "❤️ Agregado",
        filters: {
            all: "Todas",
            Action: "Acción",
            Adventure: "Aventura",
            Comedy: "Comedia",
            Drama: "Drama",
            Romance: "Romance",
            Animation: "Animación",
            Horror: "Terror"
        }
    },
    en: {
        search: "Search movies...",
        loading: "Loading movies...",
        year: "Year",
        genre: "Genre",
        director: "Director",
        actors: "Actors",
        runtime: "Runtime",
        country: "Country",
        language: "Language",
        plot: "Plot",
        add: "❤️ Add to Favorites",
        added: "❤️ Added",
        filters: {
            all: "All",
            Action: "Action",
            Adventure: "Adventure",
            Comedy: "Comedy",
            Drama: "Drama",
            Romance: "Romance",
            Animation: "Animation",
            Horror: "Horror"
        }
    }
};
function showSpinner() {
    spinner.style.display = "flex";
}
function hideSpinner() {
    spinner.style.display = "none";
}
async function cargarSistema(busqueda = initialCatalog) {
    showSpinner();
    try {
        const resultados = await Promise.allSettled([
            cargarCatalogo(busqueda),
            cargarResenas(),
            cargarAnuncios()
        ]);
        if (resultados[0].status === "fulfilled") {
            movies = resultados[0].value;
            currentMovies = [...movies];
        }
        else {
            movies = [];
            currentMovies = [];
            alert("No fue posible cargar el catálogo.");
        }
        if (resultados[1].status === "fulfilled") {
            console.log("Reseñas cargadas correctamente.");
        }
        else {
            console.warn("No fue posible cargar las reseñas.");
        }
        if (resultados[2].status === "fulfilled") {
            console.log("Anuncios cargados correctamente.");
        }
        else {
            console.warn("No fue posible cargar los anuncios.");
        }
        renderMovies(currentMovies, moviesContainer, currentLang, i18n);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        hideSpinner();
    }
}
langToggle.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    langToggle.textContent =
        currentLang === "es"
            ? "Inglés"
            : "Español";
    actualizarIdioma();
});
function actualizarIdioma() {
    const t = i18n[currentLang];
    searchInput.placeholder = t.search;
    const spinnerText = document.querySelector("#spinner p");
    spinnerText.textContent = t.loading;
    filters.forEach((btn) => {
        const genero = btn.dataset.genre;
        btn.textContent = t.filters[genero];
    });
    renderMovies(currentMovies, moviesContainer, currentLang, i18n);
}
filters.forEach((btn) => {
    btn.addEventListener("click", async () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentGenre = btn.dataset.genre ?? "all";
        if (currentGenre === "all") {
            currentMovies = [...movies];
        }
        else {
            currentMovies = await cachePeliculas.filtrar(currentGenre, movies);
        }
        renderMovies(currentMovies, moviesContainer, currentLang, i18n);
    });
});
searchInput.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter")
        return;
    const texto = searchInput.value.trim();
    if (texto === "") {
        cargarSistema();
        return;
    }
    currentGenre = "all";
    filters.forEach((btn) => btn.classList.remove("active"));
    const allButton = document.querySelector('.filters .filter[data-genre="all"]');
    allButton.classList.add("active");
    await cargarSistema(texto);
});
moviesContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("movie-poster")) {
        const id = target.dataset.id;
        const movie = movies.find((m) => m.imdbID === id);
        if (movie) {
            openModal(movie, modal, modalBody, currentLang, i18n);
        }
    }
    const boton = target.closest(".favoriteBtn");
    if (!boton)
        return;
    favorites.add();
    boton.disabled = true;
    boton.innerHTML = i18n[currentLang].added;
    boton.style.background = "#22c55e";
});
closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});
window.addEventListener("DOMContentLoaded", () => {
    cargarSistema();
});
//# sourceMappingURL=main.js.map