export interface FeaturedResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Media {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends Media {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TV extends Media {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}