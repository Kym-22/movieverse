const API_KEY = "5e61ba99";
const BASE_URL = "https://www.omdbapi.com/";

export const initialCatalog: string[] = [
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

export async function cargarCatalogo(
    busqueda: string | string[] = initialCatalog
): Promise<any[]> {

    const terminos: string[] = Array.isArray(busqueda)
        ? busqueda
        : [busqueda];

    let peliculas: any[] = [];

    for (const termino of terminos) {

        const respuesta = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(termino)}`
        );

        const datos: any = await respuesta.json();

        if (datos.Response === "True") {

            peliculas = peliculas.concat(datos.Search.slice(0, 3));

        }

    }

    const unicas = Array.from(

        new Set(

            peliculas.map((movie: any) => movie.imdbID)

        )

    ).map(id =>

        peliculas.find((movie: any) => movie.imdbID === id)

    ).filter(Boolean);

    const detalles: any[] = await Promise.all(

        unicas.map(async (movie: any) => {

            const respuesta = await fetch(

                `${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`

            );

            return await respuesta.json();

        })

    );

    return detalles;

}

export function cargarResenas(): Promise<any[]> {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (Math.random() < 0.5) {

                reject("Error al cargar las reseñas.");

            } else {

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

export function cargarAnuncios(): Promise<any[]> {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (Math.random() < 0.5) {

                reject("Error al cargar los anuncios.");

            } else {

                resolve([

                    "🎬 Suscríbete a MovieVerse Premium",
                    "🍿 Compra tus entradas con descuento"

                ]);

            }

        }, 800);

    });

}