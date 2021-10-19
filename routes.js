import React from 'react';

import MainPageRoute from '../../components/MainPage/RoutesControllers/MainPageRoute';

import ConsultaComprobantesSPEI from './components/ConsultaComprobantesSPEI';
import ConsultaCancelacionRSTSantander from './components/ConsultaCancelacionRSTSantander';
import CatalogoAtmBbva from './components/CatalogoAtmBbva';
import ConsultaComprobantesRstBbva from './components/ConsultaComprobantesRstBbva';
import ConsultaConciliacionMercadoPago from './components/ConsultaConciliacionMercadoPago';
import ConsultaReclamaciones from './components/pages/ConsultaReclamaciones';
import DetailReclaim from './components/pages/DetailReclaim';

import * as Routes from './constRoutes';


let routesTesoreria = [];

routesTesoreria.push(<MainPageRoute exact={true} path={Routes.CONSULTA_COMPROBANTES_SPEI} component={ConsultaComprobantesSPEI} />);
routesTesoreria.push(<MainPageRoute exact={true} path={Routes.CONSULTA_CANCELACION_RST_SANTANDER} component={ConsultaCancelacionRSTSantander} />);
routesTesoreria.push(<MainPageRoute exact={true} path={Routes.CATALOGO_ATM_BBVA} component={CatalogoAtmBbva} />);
routesTesoreria.push(<MainPageRoute exact={true} path={Routes.CONSULTA_COMPROBANTES_RST} component={ConsultaComprobantesRstBbva} />);
routesTesoreria.push(<MainPageRoute exact={true} path={Routes.CONSULTA_CONCILIACION_MERCADOPAGO} component={ConsultaConciliacionMercadoPago} />);
routesTesoreria.push(<MainPageRoute exact={true} path={Routes.CONSULTA_RECLAMACIONES} component={ConsultaReclamaciones} />);
routesTesoreria.push(<MainPageRoute exact={true} path={Routes.DETALLE_RECLAMACION} component={DetailReclaim} />);

export default routesTesoreria;