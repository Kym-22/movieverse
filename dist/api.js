const API_KEY = "5e61ba99";
const BASE_URL = "https://www.omdbapi.com/";
export const initialCatalog = [
    "Avengers",
    "Batman",
    "Conjuring",
    "Shrek",
    "Titanic",
    "Matrix",
    "Scream",
    "Toy Story",
    "Notebook"
];
export async function cargarCatalogo(busqueda = initialCatalog) {
    const terminos = Array.isArray(busqueda)
        ? busqueda
        : [busqueda];
    let peliculas = [];
    for (const termino of terminos) {
        const respuesta = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(termino)}`);
        const datos = await respuesta.json();
        if (datos.Response === "True") {
            peliculas = peliculas.concat(datos.Search.slice(0, 3));
        }
    }
    const unicas = Array.from(new Set(peliculas.map((movie) => movie.imdbID))).map(id => peliculas.find((movie) => movie.imdbID === id)).filter(Boolean);
    const detalles = await Promise.all(unicas.map(async (movie) => {
        const respuesta = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`);
        return await respuesta.json();
    }));
    return detalles;
}
export function cargarResenas() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject("Error al cargar las reseñas.");
            }
            else {
                resolve([
                    {
                        usuario: "Carlos",
                        comentario: "Excelente catálogo."
                    },
                    {
                        usuario: "Ana",
                        comentario: "Muy buenas películas."
                    }
                ]);
            }
        }, 1000);
    });
}
export function cargarAnuncios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject("Error al cargar los anuncios.");
            }
            else {
                resolve([
                    "🎬 Suscríbete a MovieVerse Premium",
                    "🍿 Compra tus entradas con descuento"
                ]);
            }
        }, 800);
    });
}
//# sourceMappingURL=api.js.map