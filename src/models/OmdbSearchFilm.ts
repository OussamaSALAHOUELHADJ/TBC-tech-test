export class OmdbSearchFilm {
  public Title: string;

  public Year: string;

  public imdbID: string;

  public Type: string;

  public Poster: string;

  constructor(
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
  ) {
    this.Title = Title;
    this.Year = Year;
    this.imdbID = imdbID;
    this.Type = Type;
    this.Poster = Poster;
  }
}
