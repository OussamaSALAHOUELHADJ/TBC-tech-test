import { OmdbService } from '../services';
import { Film, OmdbApiSearchResponse } from '../types';

export class FilmController {
  async getFilm(id: string, type?: string) {
    const ombd = new OmdbService();
    const data: OmdbApiSearchResponse = await ombd.getMovieList(id, type);
    const films: Film[] = data.Search;
    return films;
  }
}
