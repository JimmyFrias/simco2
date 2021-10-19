# <p align=center>SIMCO - Módulo de Tesorería</p>
---

#### Este repositorio corresponde al módulo de Tesorería.

La finalidad de este `README` es agilizar y documentar las rutas y permisos para el archivo de configuración en el Backend.

**Las rutas y permisos para este proyecto se manejan en el siguiente JSON.**

```json
{
  "modulo": "Tesorería",
  "orden": 16,
  "multiempresa": false,
  "path": "/tesoreria",
  "idGandalf": "cejabb",
  "opciones": [
    {
      "orden": 1,
      "path": "/mtesoreria-consultacomprobante",
      "name": "Comprobante SPEI BBVA",
      "auxiliares": [
      ],
      "permisos": [
        "visualizar",
        "ejecutar"
      ]
    },
    {
      "orden": 2,
      "path": "/mtesoreria-consultacancelacionrstsantander",
      "name": "Consulta / Cancelación de RST Santander",
      "auxiliares": [
      ],
      "permisos": [
        "visualizar",
        "crear",
        "ejecutar"
      ]
    },
    {
      "orden": 3,
      "path": "/mtesoreria-cargarcatalogoatmbbva",
      "name": "Catálogo ATM BBVA",
      "auxiliares": [
      ],
      "permisos": [
        "visualizar",
        "crear",
        "ejecutar"
      ]
    },
    {
      "orden": 4,
      "path": "/mtesoreria-comprobanterst",
      "name": "Comprobante RST BBVA",
      "auxiliares": [
      ],
      "permisos": [
        "visualizar",
        "crear",
        "ejecutar"
      ]
    },
    {
      "orden": 5,
      "path": "/mtesoreria-consultaconciliacionmercadopago",
      "name": "Consulta / Conciliación Mercado Pago",
      "auxiliares": [
      ],
      "permisos": [
        "visualizar",
        "crear",
        "ejecutar"
      ]
    },
    {
      "orden": 6,
      "path": "/mtesoreria-reactivaciondeprestamos",
      "name": "Reactivación de Préstamos",
      "auxiliares": [
      ],
      "permisos": [
        "visualizar"
      ]
    },
    {
      "orden": 7,
      "path": "/mtesoreria-reclamaciones",
      "name": "Listado de solicitud de reclamaciones",
      "auxiliares": [
      ],
      "permisos": [
        "visualizar",
        "crear",
        "ejecutar"
      ]
    }
  ]
}

Con el proxy
tesoreria:
  	path: /tesoreria/**
  	sensitiveHeaders: Cookie,Set-Cookie
  	strip-prfix: false
  	serviceId: http://10.128.0.63:8085/credex/api/tesoreria
```

**Nota:** Si se agregan nuevas rutas o permisos a las opciones, actualizar este archivo.
