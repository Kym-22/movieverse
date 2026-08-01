export function crearCachePeliculas() {
    const cache = {};
    return {
        async filtrar(genero, peliculas) {
            if (cache[genero]) {
                console.log("Resultados obtenidos del caché.");
                return cache[genero];
            }
            await new Promise(resolve => setTimeout(resolve, 800));
            let resultado = [];
            if (genero === "all") {
                resultado = peliculas;
            }
            else {
                resultado = peliculas.filter((movie) => movie.Genre &&
                    movie.Genre.includes(genero));
            }
            cache[genero] = resultado;
            return resultado;
        }
    };
}
//# sourceMappingURL=cache.js.map