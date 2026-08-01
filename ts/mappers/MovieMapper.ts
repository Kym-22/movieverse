import { MovieDTO } from "../dtos/MovieDTO";
import { Movie } from "../entities/Movie";

export function mapMovie(dto: MovieDTO): Movie {

    return {

        title: dto.Title,
        year: dto.Year,
        imdbID: dto.imdbID,
        poster: dto.Poster,
        genre: dto.Genre ?? "",
        plot: dto.Plot ?? "",
        director: dto.Director ?? "",
        actors: dto.Actors ?? "",
        runtime: dto.Runtime ?? "",
        country: dto.Country ?? "",
        language: dto.Language ?? "",
        rating: dto.imdbRating ?? ""

    };

}