import moment from 'moment';
export const validateDate = (date) => {
  let response = false;
  let separadores = ['-', '/'];
  let splitedDate = date.split(new RegExp(separadores.join('|'), 'g'));
  let day;
  let month;
  let year;
  let daysInMonth;
  if (splitedDate[0].length == 4) {
    year = splitedDate[0];
    month = splitedDate[1];
    day = splitedDate[2];
    daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
  } else {
    day = splitedDate[0];
    month = splitedDate[1];
    year = splitedDate[2];
    daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
  }
  if (year >= 2000 && year < 3000) {
    if (month > 0 && month < 13) {
      if (day > 0 && day <= daysInMonth) {
        response = true;
      }
    }
  }
  return response;
};

export const dateDiffInText = date => {
  let response;
  let currentDate = new Date();
  let diffInMiliseconds = currentDate.getTime() - date.getTime();
  let diffDays = Math.round(diffInMiliseconds / (1000 * 60 * 60 * 24));
  switch (diffDays) {
    case 0: response = 'Hoy'; break;
    case 1: response = 'Ayer'; break;
    case 2: response = 'Hace 2 días'; break;
    case 3: response = 'Hace 3 días'; break;
    default: response = formatYYYMMDD(date); break;
  }
  return response;
};

export const formatYYYMMDD = (date) => {
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  return [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, date.getFullYear()].join('/');
};
