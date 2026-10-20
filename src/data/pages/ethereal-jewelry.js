export default {
  status: { es: 'Proyecto web para un cliente (full-stack)', en: 'Client web project (full-stack)' },
  related: ['bodega-contabilidad-farmacia', 'laboratorio-fractales', 'deteccion-personas-aforo'],
  es: {
    lead: 'Una tienda online para una marca de joyería demi-fine que tiene que verse editorial y, además, vender de verdad en Chile: pagos locales, cupones, stock, correos transaccionales y un panel de administración para gestionar todo sin tocar código.',
    context: [
      'La marca necesitaba una tienda con estética de alta gama. Pero una tienda solo visual no vende: sin pasarelas de pago locales y sin gestión de pedidos, cada venta sería manual.',
      'El proyecto cubre las dos mitades: una vitrina pública cuidada (14 páginas) y un back-office con 8 vistas de administración, conectados por un servidor que cobra, descuenta stock y avisa.',
    ],
    how: [
      { t: 'Catálogo y carrito persistente', d: 'El frontend es una aplicación React con Vite y React Router. El carrito y el checkout viven en un estado de Zustand que se persiste, así que un cliente que cierra la pestaña no pierde lo que había elegido.' },
      { t: 'Checkout con datos, envío y cupón', d: 'El cliente ingresa sus datos, elige el envío y puede aplicar un cupón. La pantalla muestra el total, pero ese total no se toma como verdad.' },
      { t: 'El servidor recalcula todo', d: 'El backend en Express calcula de nuevo precios, descuentos y costo de envío con los datos del catálogo. Lo que el navegador diga que cuesta algo no cuenta: un cliente malintencionado podría alterarlo.' },
      { t: 'Pago con tres pasarelas', d: 'Con la orden creada, el cliente paga por Transbank Webpay, Mercado Pago o Flow, los medios que se usan en Chile.' },
      { t: 'Confirmación y pedido', d: 'Cuando la pasarela confirma el pago, el servidor marca el pedido como pagado, y se envían los correos transaccionales. El cliente puede seguir el estado de su pedido.' },
      { t: 'Panel de administración', d: 'El equipo gestiona productos, stock, cupones y pedidos desde 8 vistas de administración, protegidas con autenticación JWT.' },
    ],
    concepts: [
      { t: 'SPA con React Router', d: 'Aplicación de una sola página: el navegador carga el programa una vez y cambia de «página» sin recargar.' },
      { t: 'Zustand', d: 'Librería mínima de estado global para React. Aquí guarda el carrito y el checkout.' },
      { t: 'JWT', d: 'Token firmado que el servidor entrega al administrador al iniciar sesión y que luego se envía en cada petición.' },
      { t: 'Rate limiting', d: 'Límite de peticiones por minuto, para frenar abusos y fuerza bruta.' },
      { t: 'Pasarela de pago', d: 'Servicio que procesa la tarjeta o la transferencia y avisa al comercio el resultado, sin que los datos de la tarjeta pasen por la tienda.' },
    ],
    decisions: [
      { t: 'Precio y envío calculados en el servidor', d: 'Es la decisión de seguridad central del carrito: el navegador solo muestra; el servidor decide cuánto se cobra.' },
      { t: 'Tres pasarelas locales', d: 'Cada una cubre medios y preferencias distintas. Ofrecer las tres evita perder ventas porque la tarjeta o el método del cliente no estaba disponible.' },
      { t: 'Panel en vez de código', d: 'Poder cambiar productos, stock y cupones sin tocar el programa es lo que permite que el negocio opere solo.' },
      { t: 'Verificar de punta a punta', d: 'El flujo de compra se prueba con Playwright como un cliente real, y la lógica con Vitest, para detectar un carrito roto antes que un cliente.' },
    ],
    verified: [
      '3 pasarelas de pago integradas, 8 vistas de administración y 14 páginas públicas.',
      'Verificación de punta a punta con Playwright y pruebas de lógica con Vitest.',
    ],
    limits: [
      'Es un sitio de un cliente con pagos reales, así que no hay demo pública ni se muestran claves, datos de pedidos o del panel.',
      'Esta página describe la arquitectura y las decisiones, no el contenido comercial de la tienda.',
    ],
    next: [
      'Agregar conciliación automática entre pedidos y abonos de cada pasarela.',
      'Medir el tiempo de carga de las páginas del catálogo y optimizar las imágenes.',
    ],
  },
  en: {
    lead: 'An online store for a demi-fine jewellery brand that has to look editorial and also really sell in Chile: local payments, coupons, stock, transactional emails and an admin panel to manage everything without touching code.',
    context: [
      'The brand needed a high-end looking store. But a store that is only visual does not sell: without local payment gateways and order management, every sale would be manual.',
      'The project covers both halves: a polished public storefront (14 pages) and a back-office with 8 admin views, connected by a server that charges, deducts stock and notifies.',
    ],
    how: [
      { t: 'Catalogue and persistent cart', d: 'The frontend is a React app with Vite and React Router. The cart and checkout live in a Zustand store that is persisted, so a customer who closes the tab does not lose what they picked.' },
      { t: 'Checkout with details, shipping and coupon', d: 'The customer enters their details, picks shipping and can apply a coupon. The screen shows the total, but that total is not taken as truth.' },
      { t: 'The server recomputes everything', d: 'The Express backend recalculates prices, discounts and shipping from the catalogue data. Whatever the browser says something costs does not count: a malicious customer could tamper with it.' },
      { t: 'Payment with three gateways', d: 'With the order created, the customer pays through Transbank Webpay, Mercado Pago or Flow, the methods used in Chile.' },
      { t: 'Confirmation and order', d: 'When the gateway confirms payment, the server marks the order as paid and the transactional emails go out. The customer can follow their order status.' },
      { t: 'Admin panel', d: 'The team manages products, stock, coupons and orders from 8 admin views, protected by JWT authentication.' },
    ],
    concepts: [
      { t: 'SPA with React Router', d: 'A single-page app: the browser loads the program once and switches "pages" without reloading.' },
      { t: 'Zustand', d: 'A minimal global-state library for React. Here it holds the cart and checkout.' },
      { t: 'JWT', d: 'A signed token the server hands the administrator on login and which is then sent with every request.' },
      { t: 'Rate limiting', d: 'A cap on requests per minute, to curb abuse and brute force.' },
      { t: 'Payment gateway', d: 'A service that processes the card or transfer and tells the merchant the result, without card data passing through the store.' },
    ],
    decisions: [
      { t: 'Price and shipping computed on the server', d: 'This is the core security decision of the cart: the browser only displays; the server decides how much is charged.' },
      { t: 'Three local gateways', d: 'Each covers different methods and preferences. Offering all three avoids losing sales because the customer’s card or method was not available.' },
      { t: 'A panel instead of code', d: 'Being able to change products, stock and coupons without touching the program is what lets the business run on its own.' },
      { t: 'Verify end to end', d: 'The purchase flow is tested with Playwright like a real customer, and the logic with Vitest, to catch a broken cart before a customer does.' },
    ],
    verified: [
      '3 payment gateways integrated, 8 admin views and 14 public pages.',
      'End-to-end verification with Playwright and logic tests with Vitest.',
    ],
    limits: [
      'It is a client site with real payments, so there is no public demo and no keys, order data or panel are shown.',
      'This page describes the architecture and decisions, not the store’s commercial content.',
    ],
    next: [
      'Add automatic reconciliation between orders and each gateway’s settlements.',
      'Measure catalogue page load time and optimise images.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Del carrito al pedido', en: 'From cart to order' },
      caption: {
        es: 'El navegador nunca decide el precio: el servidor lo recalcula, cobra a través de la pasarela y solo confirma el pedido cuando ella avisa que el pago se hizo.',
        en: 'The browser never decides the price: the server recomputes it, charges through the gateway and only confirms the order when the gateway reports the payment was made.',
      },
      nodes: [
        { id: 'spa', label: 'React SPA', sub: { es: 'carrito Zustand', en: 'Zustand cart' }, col: 0, row: 0 },
        { id: 'api', label: { es: 'API Express', en: 'Express API' }, sub: 'JWT · rate limit', col: 1, row: 0, tone: 'magenta' },
        { id: 'pay', label: { es: 'Pasarelas', en: 'Gateways' }, sub: 'Webpay · MP · Flow', col: 2, row: 0, tone: 'amber' },
        { id: 'ord', label: { es: 'Pedidos', en: 'Orders' }, sub: { es: 'email + admin', en: 'email + admin' }, col: 3, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'spa', to: 'api', label: { es: 'orden', en: 'order' } },
        { from: 'api', to: 'pay', label: { es: 'cobro', en: 'charge' } },
        { from: 'pay', to: 'ord', label: { es: 'pagado', en: 'paid' } },
        { from: 'pay', to: 'api', loop: true, dashed: true, label: { es: 'confirmación de pago', en: 'payment confirmation' } },
      ],
    },
  ],
}
