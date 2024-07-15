interface MediaResult<T> {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface Base {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface Movie extends Base {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

interface TV extends Base {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}
