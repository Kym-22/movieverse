export function crearCachePeliculas() {

    const cache = {};

    return {

        async filtrar(genero, peliculas) {

            if (cache[genero]) {

                console.log("Datos cargados desde la caché.");

                return cache[genero];

            }

            console.log("Consultando datos del servidor...");

            await new Promise(resolve => setTimeout(resolve, 1000));

            let resultado;

            if (genero === "all") {

                resultado = peliculas;

            } else {

                resultado = peliculas.filter(movie =>
                    movie.Genre &&
                    movie.Genre.toLowerCase().includes(genero.toLowerCase())
                );

            }

            cache[genero] = resultado;

            return resultado;

        }

    };

}