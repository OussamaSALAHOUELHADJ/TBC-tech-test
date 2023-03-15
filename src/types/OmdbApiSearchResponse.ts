import { OmdbSearchFilm } from './../models';
export interface OmdbApiSearchResponse {
  Search: OmdbSearchFilm[];
  totalResults: number;
  Response: boolean;
}
