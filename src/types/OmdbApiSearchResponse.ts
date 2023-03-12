import { Film } from './film';
export interface OmdbApiSearchResponse {
  Search: Film[];
  totalResults: number;
  Response: boolean;
}
