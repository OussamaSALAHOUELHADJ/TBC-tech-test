import { OmdbFilm } from '../models';
import { OmdbService } from '../services';

export class FilmController {
  async searchFilmList(id: string, type?: string) {
    const ombd = new OmdbService();
    const films: OmdbFilm[] = await ombd.getMovieList(id, type);

    return films;
  }

  async getFilm(id: string) {
    const ombd = new OmdbService();
    const film: OmdbFilm = await ombd.getMovie(id);
    return film;
  }
}
