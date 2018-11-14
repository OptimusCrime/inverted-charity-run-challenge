import differenceInDays from 'date-fns/difference_in_days';

import { DECIMALS_TO_KEEP } from "./constants";

const thousandSepNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

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

export const formatDonations = value => {
  const donations = value.toFixed(DECIMALS_TO_KEEP);

  if (donations.includes('.')) {
    return thousandSepNumber(donations);
  }

  const [num, dec] = donations.split('.');

  return `${thousandSepNumber(num)}.${dec}`;
};