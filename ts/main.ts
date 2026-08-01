import {
    cargarCatalogo,
    cargarResenas,
    cargarAnuncios,
    initialCatalog
} from "./api.js";

import {
    renderMovies,
    openModal
} from "./render.js";

import {
    crearCachePeliculas
} from "./cache.js";

const moviesContainer = document.getElementById("moviesContainer") as HTMLElement;
const spinner = document.getElementById("spinner") as HTMLElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const favoriteCounter = document.getElementById("favoriteCounter") as HTMLElement;
const modal = document.getElementById("movieModal") as HTMLElement;
const modalBody = document.getElementById("modalBody") as HTMLElement;
const closeModal = document.querySelector(".closeModal") as HTMLElement;
const langToggle = document.getElementById("langToggle") as HTMLElement;

const filters = document.querySelectorAll<HTMLElement>(".filters .filter");

let movies: any[] = [];
let currentMovies: any[] = [];
let currentGenre: string = "all";
let currentLang: "es" | "en" = "es";

const cachePeliculas = crearCachePeliculas();

function createFavoriteCounter() {

    let total = 0;

    return {

        add() {

            total++;

            favoriteCounter.textContent = total.toString();

        },

        getTotal(): number {

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

async function cargarSistema(busqueda: string | string[] = initialCatalog) {

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

        } else {

            movies = [];
            currentMovies = [];

            alert("No fue posible cargar el catálogo.");

        }

        if (resultados[1].status === "fulfilled") {

            console.log("Reseñas cargadas correctamente.");

        } else {

            console.warn("No fue posible cargar las reseñas.");

        }

        if (resultados[2].status === "fulfilled") {

            console.log("Anuncios cargados correctamente.");

        } else {

            console.warn("No fue posible cargar los anuncios.");

        }

        renderMovies(
            currentMovies,
            moviesContainer,
            currentLang,
            i18n
        );

    } catch (error) {

        console.error(error);

    } finally {

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

    const spinnerText = document.querySelector("#spinner p") as HTMLElement;

    spinnerText.textContent = t.loading;

    filters.forEach((btn: HTMLElement) => {

        const genero = btn.dataset.genre as keyof typeof t.filters;

        btn.textContent = t.filters[genero];

    });

    renderMovies(
        currentMovies,
        moviesContainer,
        currentLang,
        i18n
    );

}

filters.forEach((btn: HTMLElement) => {

    btn.addEventListener("click", async () => {

        filters.forEach((b: HTMLElement) => b.classList.remove("active"));

        btn.classList.add("active");

        currentGenre = btn.dataset.genre ?? "all";

        if (currentGenre === "all") {

            currentMovies = [...movies];

        } else {

            currentMovies = await cachePeliculas.filtrar(
                currentGenre,
                movies
            );

        }

        renderMovies(
            currentMovies,
            moviesContainer,
            currentLang,
            i18n
        );

    });

});

searchInput.addEventListener("keydown", async (e: KeyboardEvent) => {

    if (e.key !== "Enter") return;

    const texto = searchInput.value.trim();

    if (texto === "") {

        cargarSistema();

        return;

    }

    currentGenre = "all";

    filters.forEach((btn: HTMLElement) => btn.classList.remove("active"));

    const allButton = document.querySelector(
        '.filters .filter[data-genre="all"]'
    ) as HTMLElement;

    allButton.classList.add("active");

    await cargarSistema(texto);

});

moviesContainer.addEventListener("click", (e: MouseEvent) => {

    const target = e.target as HTMLElement;

    if (target.classList.contains("movie-poster")) {

        const id = target.dataset.id;

        const movie = movies.find((m: any) => m.imdbID === id);

        if (movie) {

            openModal(
                movie,
                modal,
                modalBody,
                currentLang,
                i18n
            );

        }

    }

    const boton = target.closest(".favoriteBtn") as HTMLButtonElement | null;

    if (!boton) return;

    favorites.add();

    boton.disabled = true;

    boton.innerHTML = i18n[currentLang].added;

    boton.style.background = "#22c55e";

});

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});

window.addEventListener("click", (e: MouseEvent) => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});

window.addEventListener("DOMContentLoaded", () => {

    cargarSistema();

});