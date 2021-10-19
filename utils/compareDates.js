export const isMajor = (date1, date2) => {
  let splitedDate1 = date1.split('/');
  let splitedDate2 = date2.split('/');
  let response = false;
  if (splitedDate1[0] > splitedDate2[0]) {
    response = true;
  } else {
    if (splitedDate1[1] > splitedDate2[1]) {
      response = true;
    } else {
      if (splitedDate1[2] > splitedDate2[2]) {
        response = true;
      }
    }
  }
  return response;
};

export const validateBetweenTwoDates = (dateFrom, dateTo, check) => {
  let validDate = false;
  let date1 = dateFrom.split('/');
  let date2 = dateTo.split('/');
  let dateValidate = check.split('/');

  let from = new Date(date1[2], parseInt(date1[1] - 1), date1[0]);
  let to = new Date(date2[2], parseInt(date2[1] - 1), date2[0]);
  let dateCheck = new Date(dateValidate[2], parseInt(dateValidate[1] - 1), dateValidate[0]);
  if (dateCheck >= from && dateCheck <= to) {
    validDate = true;
    return validDate;
  }
  return validDate;
};