/* eslint-disable @typescript-eslint/no-explicit-any */
export const isMovie = (
  media: MovieDetails | SeriesDetails
): media is MovieDetails => {
  return media !== undefined && 'title' in media;
};

export const getTitle = (media: any) => {
  return isMovie(media) ? media.title : media.name;
};

export const getYear = (media: any) => {
  const year = isMovie(media) ? media.release_date : media.last_air_date;
  return new Date(year).getFullYear();
};

export const formatMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
