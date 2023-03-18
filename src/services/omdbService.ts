import { AxiosResponse } from 'axios';
import { OmdbFilm } from './../models';
import { Film, OmdbSearchFilm } from './../models';
import { createAxiosInstance, dotenv } from '../config';

export class OmdbService {
  private readonly baseUrl: string = 'http://www.omdbapi.com/';

  private readonly axios = createAxiosInstance({
    baseURL: this.baseUrl,
    data: { apikey: dotenv.OMDB_API_KEY, type: 'series' },
  });

  public async getMovieList(
    id: Film['id'],
    type?: Film['type']
  ): Promise<OmdbFilm[]> {
    let movies: OmdbSearchFilm[] = [];
    let response: AxiosResponse;

    let page = 1;
    let totalFilms = 0;
    let isResponded = false;

    do {
      response = await this.axios.get(this.baseUrl, {
        params: { s: id, page, type, apikey: dotenv.OMDB_API_KEY },
      });
      const { Search, totalResults, Response } = response.data;
      if (Response == 'True') {
        movies = Array.from(new Set(movies.concat(Search)));
        totalFilms = totalResults;
      }

      page++;
      isResponded = Response;
    } while (isResponded && movies.length < totalFilms);

    const fullDataMovieList: OmdbFilm[] = [];

    for (const index in movies) {
      fullDataMovieList[index] = await this.getMovie(movies[index].imdbID);
    }

    return fullDataMovieList;
  }

  public async getMovie(imdbId: string): Promise<OmdbFilm> {
    const response: AxiosResponse = await this.axios.get(this.baseUrl, {
      params: { i: imdbId, apikey: dotenv.OMDB_API_KEY },
    });
    const movie: OmdbFilm = new OmdbFilm(response.data);

    return movie;
  }
}
