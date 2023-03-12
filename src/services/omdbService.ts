import { AxiosResponse } from 'axios';
import { Film } from './../types/film';
import { OmdbApiSearchResponse } from '../types/OmdbApiSearchResponse';
import createAxiosInstance from '../config/axios';
import dotenv from '../config/dotenv';

export class OmdbService {
  private readonly baseUrl: string = 'http://www.omdbapi.com/';

  private readonly axios = createAxiosInstance({
    baseURL: this.baseUrl,
    data: { apikey: dotenv.OMDB_API_KEY, type: 'series' },
  });

  public async getMovieList(
    id: Film['id'],
    type?: Film['type']
  ): Promise<OmdbApiSearchResponse> {
    let movies: Film[] = [];
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

    return {
      Search: movies,
      totalResults: totalFilms,
      Response: movies.length > 0,
    };
  }
}
