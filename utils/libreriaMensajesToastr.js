import toastr from './Notificacion';

export function warningMessage(text) {
    clearMessage();
    return toastr.warning(text);
}

export function infoMessage(text) {
    clearMessage();
    return toastr.info(text);
}

export function errorMessage(text) {
    clearMessage();
    return toastr.error(text);
}

export function successMessage(text) {
    clearMessage();
    return toastr.success(text);
}

export function clearMessage() {
    toastr.clear();
}