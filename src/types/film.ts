export class Film {
  public id: string;

  public title: string;

  public year: string;

  public imdbId: string;

  public type: string;

  public poster: string;

  constructor(
    id: string,
    title: string,
    year: string,
    imdbId: string,
    type: string,
    poster: string
  ) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.imdbId = imdbId;
    this.type = type;
    this.poster = poster;
  }
}
