import { errorMessage } from './libreriaMensajesToastr';

export const isNotNull = (parameter, message) => {
    if (parameter == null || parameter == 'null') {
        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotEmpty = (parameter, message) => {
    if (parameter === '') {
        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotUndefined = (parameter, message) => {
    if (typeof parameter == 'undefined') {
        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotNullOrEmpty = (parameter, message) => {
    if (parameter == null || parameter == 'null') {
        throw new Error(errorMessage(message));
    }
    if (parameter === '') {
        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotEmptyOrNullOrUnidefined = (parameter, message) => {
    if (parameter === '' || parameter == 'null' || parameter == 'undefined'
        || parameter == null) {
        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotNullWithFocus = (parameter, message, input) => {

    if (parameter == null || parameter == 'null' || parameter == '') {
        input.focus();
        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotEmptyWithFocus = (parameter, message, input) => {

    if (parameter === '') {
        input.focus();

        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotUndefinedWithFocus = (parameter, message, input) => {
    if (typeof parameter == 'undefined') {
        input.focus();

        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotNullOrEmptyWithFocus = (parameter, message, input) => {
    if (parameter == null || parameter == 'null') {
        input.focus();
        throw new Error(errorMessage(message));
    }

    if (parameter === '') {
        input.focus();
        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotEmptyOrNullOrUnidefinedWithFocus = (parameter, message, input) => {
    if (parameter === '' || parameter == 'null' || parameter == 'undefined'
        || parameter == null) {
        input.focus();
        throw new Error(errorMessage(message));
    }
    return true;
};

export const isNotNullReturn = (parameter) => {
    if (parameter == null || parameter == 'null') {
        return false;
    }
    return true;
};

export const isNotEmptyReturn = (parameter) => {
    if (parameter === '') {
        return false;
    }
    return true;
};

export const isNotUndefinedReturn = (parameter) => {
    if (typeof parameter == 'undefined') {
        return false;
    }
    return true;
};

export const isNotNullOrEmptyReturn = (parameter) => {
    if (parameter == null || parameter == 'null' || parameter === '') {
        return false;
    }
    return true;
};

export const isNotEmptyOrNullOrUnidefinedReturn = (parameter) => {
    if (parameter === '' || parameter == 'null' || parameter == 'undefined'
        || parameter == null) {
        return false;
    }
    return true;
};
