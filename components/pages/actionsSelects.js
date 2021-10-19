export const actions = [
    {
        value: 1,
        text: 'Autorizar',
        className: 'bg-primary'
    },
    {
        value: 2,
        text: 'Rechazar',
    },
];

export const motivoRechazo = [
    {
        value: 0,
        text: 'Motivo Autorizaciòn',
    },
    {
        value: 601,
        text: '601 - Cliente desistío',
    },
    {
        value: 602,
        text: '602 - Falta documentación del cliente',
    },
    {
        value: 603,
        text: '603 - Plazo vencido al cliente',
    },
    {
        value: 604,
        text: '604 - Reclamación reportada en mas de una ocasión',
    },
];

export const motivoAutorizacion = [
    {
        value: 0,
        text: 'Motivo Autorizaciòn',
    },
    {
        value: 650,
        text: '650 - POR NORMATIVIDAD',
    },
    {
        value: 651,
        text: '651 - Evídencia a favor del cliente',
    },
    {
        value: 652,
        text: '652 - Plazo vencido a la entidad',
    },
    {
        value: 653,
        text: '653 - Por política interna',
    },
];