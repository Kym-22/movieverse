export function crearCachePeliculas() {

    const cache: Record<string, any[]> = {};

    return {

        async filtrar(genero: string, peliculas: any[]): Promise<any[]> {

            if (cache[genero]) {

                console.log("Resultados obtenidos del caché.");

                return cache[genero];

            }

            await new Promise(resolve => setTimeout(resolve, 800));

            let resultado: any[] = [];

            if (genero === "all") {

                resultado = peliculas;

            } else {

                resultado = peliculas.filter((movie: any) =>

                    movie.Genre &&
                    movie.Genre.includes(genero)

                );

            }

            cache[genero] = resultado;

            return resultado;

        }

    };

}