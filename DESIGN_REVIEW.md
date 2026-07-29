# Design review — web pública de Vantix

Fecha: 28 de julio de 2026
Alcance: home ES/EN, servicios ES/EN, privacidad, términos, tema claro/oscuro y estados interactivos.

## Veredicto

El rediseño está listo para revisión local. La home se presenta como una landing SaaS de VantixApp, usa producto real como prueba principal y mantiene los servicios web en una ruta secundaria. No se realizó commit ni deployment.

## Capturas verificadas

- `screenshots/home-es-375-dark.png` — móvil exacto, 375 × 812.
- `screenshots/home-es-768-light.png` — tablet exacta, 768 × 1024.
- `screenshots/home-es-1280-light.png` — laptop exacta, 1280 × 800.
- `screenshots/home-es-1280-dark.png` — variante oscura, 1280 × 800.
- `screenshots/home-es-1024-light.png` — breakpoint intermedio.
- `screenshots/home-es-1440-dark.png` — desktop amplio.
- `screenshots/home-en-390-light.png` — contenido inglés móvil.
- `screenshots/services-es-1280-dark.png` y `screenshots/services-es-390-dark.png` — servicios.
- `screenshots/privacy-es-390-dark.png` — página legal móvil.

## Evaluación

### Jerarquía y conversión

- El mensaje principal, la demo y los accesos al producto aparecen antes de cualquier contenido de servicios.
- La captura real de conversaciones queda visible desde el primer viewport en móvil y comienza dentro del área inicial en desktop amplio.
- Funciones, integraciones, proceso, casos, comparación, planes, preguntas y contacto forman una narrativa comercial continua.
- Profesional se destaca sin alterar la comparación de los cuatro planes.

### Consistencia visual

- La interfaz usa superficies claras u oscuras, contraste alto y azul Vantix como acento funcional.
- No quedan cuadrículas, partículas, blobs, fondos futuristas, glows grandes ni interfaces ficticias.
- Las secciones alternan capturas, listas editoriales, comparaciones y bloques de proceso; no repiten una única grilla de tarjetas.
- Las capturas mantienen su proporción y cambian con el tema sin provocar layout shift.

### Responsive

- Sin overflow horizontal en 375, 390, 768, 1024, 1280 y 1440 px.
- Menú móvil funcional, precios en una o dos columnas según el ancho y formularios sin controles cortados.
- Servicios y legales conservan lectura cómoda en móvil.

### Accesibilidad

- Skip link, jerarquía de headings válida, foco visible y contraste alto.
- Menú móvil con `aria-expanded`, foco inicial, trampa de foco, Escape, devolución del foco e `inert`.
- Cambio ES/EN actualiza también `html[lang]` durante navegación cliente.
- Formularios con etiquetas, errores asociados, anuncio mediante `role="alert"` y foco en el primer campo inválido.
- FAQ con `details/summary`; carrusel con región, controles etiquetados y estado de diapositiva.
- Tema inicial según el sistema, persistencia de preferencias y soporte de `prefers-reduced-motion`.

### Movimiento

- Carrusel con pausa por hover/foco, flechas manuales, indicadores, teclado y gesto táctil.
- Testimonios de demostración pausan por hover/tacto y quedan explícitamente marcados como no reales.
- Las apariciones al scroll son breves y se desactivan con movimiento reducido.

## Problemas encontrados y corregidos durante la revisión

- Atributo `lang` desactualizado al navegar entre idiomas sin recarga.
- Advertencia de Next.js por `scroll-behavior: smooth`.
- Foco ausente tras una validación fallida del formulario.
- Contraste insuficiente del azul original en botones con texto pequeño.
- Breakpoint desalineado entre el menú móvil y la navegación de escritorio.
- Contenido de fondo todavía navegable por tecnologías asistivas con el menú abierto.
- Dimensiones del logotipo y prioridad de carga de la captura principal.
- Ícono oficial de Tiendanube sin contraste en tema oscuro.
- Textos y enlaces heredados de la versión anterior.

## Pendientes reales

- Configurar `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` para habilitar el envío real del formulario.
- Sustituir los testimonios de demostración cuando existan testimonios autorizados.
- No se recibieron capturas específicas de CRM o equipo; se usaron únicamente las vistas reales entregadas que muestran contacto, responsable y control humano.
- El rate limit del formulario es una defensa local de mejor esfuerzo; para alta exposición conviene un almacenamiento distribuido.
- `npm audit --omit=dev` informa dos avisos altos heredados por el `sharp` opcional de Next.js. La corrección automática propone un downgrade incompatible de Next y no se aplicó.
