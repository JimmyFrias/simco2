import toastr from 'toastr';

toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    positionClass: 'toast-top-center',
    preventDuplicates: false,
    onclick: null,
    timeOut: 0,
    extendedTimeOut: 0,
    showDuration: 300,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
};

export default toastr;
