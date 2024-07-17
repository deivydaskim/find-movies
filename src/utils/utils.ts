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

/**
 * Extracts the year from a date".
 * @param {string | number} fullYear - The date string in "YYYY-MM-DD" format.
 * @returns {number} The extracted year "YYYY".
 */

const getYear = (fullYear: string) => {
  const year = new Date(fullYear).getFullYear();
  return year;
};

/**
 * Converts total minutes into a formatted string representing hours and minutes.
 * @param {number} totalMinutes - The total number of minutes to convert.
 * @returns {string} The formatted string representing hours and minutes (e.g., "2h 6m").
 */
const formatMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

/**
 * Converts a date string in "YYYY-MM-DD" format to "Month Day, Year" format.
 * @param {string} dateString - The date string in "YYYY-MM-DD" format.
 * @returns {string} The formatted date string in "Month Day, Year" format (e.g., "May 8, 2024").
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export { getTitle, getYear, formatMinutes, formatDate };
