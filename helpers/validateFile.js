export const validateFile = (e) => {
    const files = Array.from(e.target.files);
    const file = e.target.files[0];
    if (file.size > 5000000) {
        toastr.warning('No se pueden cargar archivos mayores a 5 MB');
        return false;

    } else {
        return files;
    }
};