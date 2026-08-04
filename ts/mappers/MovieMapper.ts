import { MovieDTO } from "../dtos/MovieDTO";
import { Movie } from "../entities/Movie";

// Convierte el DTO recibido de la API en una entidad Movie
export function mapMovie(dto: Partial<MovieDTO>): Movie {

    return {

        title: dto.Title ?? "Sin título",
        year: dto.Year ?? "Desconocido",
        imdbID: dto.imdbID ?? "",
        poster: dto.Poster ?? "",
        genre: dto.Genre ?? "No disponible",
        plot: dto.Plot ?? "Sin descripción",
        director: dto.Director ?? "Desconocido",
        actors: dto.Actors ?? "Desconocidos",
        runtime: dto.Runtime ?? "0 min",
        country: dto.Country ?? "Desconocido",
        language: dto.Language ?? "Desconocido",
        rating: dto.imdbRating ?? "0"

    };

}

// Solo devuelve la información básica de una película
export type MoviePreview = Pick<Movie, "title" | "year" | "poster">;

export function mapPreview(movie: Movie): MoviePreview {

    return {

        title: movie.title,
        year: movie.year,
        poster: movie.poster

    };

}

// Devuelve la película sin la sinopsis
export type MovieWithoutPlot = Omit<Movie, "plot">;