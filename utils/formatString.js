
export const formatAccountingCountNumber = (number) => {
  let completeNumber = number.replace(/-/g, '').trim();
  while (completeNumber.length < 16) {
    completeNumber += '0';
  }
  let splitedNumber = completeNumber.match(/.{1,4}/g);
  let numberOfSplits = parseInt(completeNumber.length / 4);
  let response = '';
  for (let i = 0; i < numberOfSplits; i++) {
    if ((i + 1) == numberOfSplits) {
      response += splitedNumber[i];
    } else {
      response += splitedNumber[i] + '-';
    }
  }
  return response;
};

export const capitalizeFirstLetterEachWorld = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

export const isNumber = (str) => {
  let regExp = /^[0-9]*$/;
  return regExp.test(str);
};

export const isString = (str) => {
  let regExp = /^[a-zA-Z\u00C0-\u00FF][\sa-zA-Z\u00C0-\u00FF]*$/;
  return regExp.test(str);
};
