const isMovie = (media?: Movie | TV): media is Movie => {
  return media !== undefined && 'title' in media;
};

const isTV = (media?: Movie | TV): media is TV => {
  return media !== undefined && 'name' in media;
};

const getTitle = (media: Movie | TV) => {
  return isMovie(media)
    ? media.title
    : isTV(media)
    ? media.name
    : 'Unknown title';
};

export { getTitle };
