interface Rating {
  Source: string;
  Value: string;
}

export class OmdbFilm {
  Title?: string;

  Year?: string;

  Rated?: string;

  Released?: string;

  Runtime?: string;

  Genre?: string;

  Director?: string;

  Writer?: string;

  Actors?: string;

  Plot?: string;

  Language?: string;

  Country?: string;

  Awards?: string;

  Poster?: string;

  Ratings?: Rating[];

  Metascore?: string;

  imdbRating?: string;

  imdbVotes?: string;

  imdbID?: string;

  Type?: string;

  DVD?: string;

  BoxOffice?: string;

  Production?: string;

  Website?: string;

  Response?: string;

  meta: { [key: string]: string } = {};

  constructor(data?: OmdbFilm) {
    Object.assign(this, data);
  }

  includesActor(actor: string): boolean {
    return this.Actors?.split(', ').includes(actor) || false;
  }

  compareToFilm<A extends keyof OmdbFilm, B>(
    otherFilm: OmdbFilm,
    compareFuncs: {
      [key in A]?: (
        thisFilmValue: OmdbFilm[key] | undefined,
        otherFilmValue: OmdbFilm[key] | undefined,
        thisFilm?: OmdbFilm,
        otherFilm?: OmdbFilm
      ) => any;
    }
  ): { [key in A]?: B } {
    const results: { [key in A]?: B } = {};
    for (const key in compareFuncs) {
      const compareFunc = compareFuncs[key];
      const thisValue = this[key];
      const otherValue = otherFilm[key];
      if (compareFunc) {
        results[key] = compareFunc(thisValue, otherValue);
      }
    }
    return results;
  }
}
