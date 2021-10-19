import moment from "moment";

export const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
};

export const endDate = moment().format('DD/MM/YYYY');

export const startDate = moment().subtract(1, 'month').format('DD/MM/YYYY');