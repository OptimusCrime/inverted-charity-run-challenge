import differenceInDays from 'date-fns/difference_in_days';

export const formatEntryDate = date => date.replace(' ', ' @ ');

const parseDate = str => {
  const [year, month, day] = str.split('-');

  return new Date(year, month, day);
};

const parseDateTime = str => parseDate(str.split(' ')[0]);

export const parseProgressDataSet = (entries, start, numberOfDays)  => {
  const parsedDateStart = parseDate(start);

  const entriesDays = entries.map(entry => differenceInDays(parseDateTime(entry.added), parsedDateStart)).reverse();

  return new Array(numberOfDays).fill(0).map((_, index) => entriesDays.filter(entry => entry <= index).length);
};

export const parseGrowthDataSet = (numberOfDays, tick) => new Array(numberOfDays).fill(0).map((_, index) => tick * index);

export const calculateTotalDays = (start, end) => differenceInDays(parseDate(end), parseDate(start)) + 1; // Add one, inclusive count

export const parseArea = (above, below) =>
  new Array(above.length)
    .fill(0)
    .map((_, index) => (above[index] > below[index] ? above[index] - below[index] : 0));

export const parseTransparent = (first, second) =>
  new Array(first.length)
    .fill(0)
    .map((_, index) => (first[index] <= second[index] ? first[index] : second[index]));
