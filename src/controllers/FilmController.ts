import { OmdbService } from '../services/omdbService';
import { Film } from '../types/film';
import { OmdbApiSearchResponse } from '../types/OmdbApiSearchResponse';

export class FilmController {
  async getFilm(id: string, type?: string) {
    const ombd = new OmdbService();
    const data: OmdbApiSearchResponse = await ombd.getMovieList(id, type);
    const films: Film[] = data.Search;
    return films;
  }
}
