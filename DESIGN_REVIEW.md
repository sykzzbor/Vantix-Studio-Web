# Design review — web pública de Vantix

Fecha: 28 de julio de 2026
Alcance: home ES/EN, servicios ES/EN, tema claro/oscuro y estados interactivos.

## Veredicto

La home quedó orientada por completo a VantixApp y lista para revisión local. La composición toma del HTML de referencia su escala editorial, el hero centrado, el panel de producto dominante y el ritmo compacto, adaptados al sistema existente de Next.js.

## Jerarquía y conversión

- Hero centrado con mensaje concreto, dos acciones y una conversación real visible en el primer viewport.
- Hero, métricas con capacidades operativas, proceso, integraciones, planes, preguntas y contacto en una narrativa continua y sin secciones repetidas.
- Los servicios de Vantix permanecen en una ruta secundaria y se enlazan de forma discreta.
- Los tres planes principales se comparan juntos; Profesional se destaca y Personalizado queda como propuesta horizontal separada.

## Sistema visual

- Fondo neutro, azul Vantix funcional, bordes finos y sombras suaves; sin blobs, robots, cuadrículas ni efectos futuristas.
- Títulos, textos, acciones y bloques principales centrados, sin zigzag ni numeraciones decorativas.
- Las funciones centrales se resumen dentro del bloque de métricas, antes del muro visual.
- Solo se muestran capturas reales. El hero y cada panel de métricas usan un archivo distinto.
- Las integraciones aparecen en una grilla estática central, sin movimiento permanente.

## Responsive verificado

- 1440 × 900, 1280 × 800, 1024 × 768, 768 × 1024, 390 × 844 y 375 × 812.
- `scrollWidth === clientWidth` en todos los tamaños requeridos.
- Hero visible, navegación móvil operativa, precios legibles, plan Personalizado apilado y servicios sin cortes.
- Capturas de QA nuevas bajo `screenshots/redesign-*.png`.

## Accesibilidad e interacción

- Foco visible, skip link, jerarquía de headings, controles con nombre accesible y menú con `aria-expanded`.
- Apertura, Escape, trampa y devolución de foco verificadas en el menú móvil.
- Tema e idioma persistentes; `html[lang]` se actualiza al navegar.
- Formulario con validación accesible, errores asociados y foco en el primer campo inválido.
- `prefers-reduced-motion` elimina reveals y muestra completa la línea del proceso.

## Movimiento

- Entrada breve del hero, aparición progresiva del panel y reveals acotados.
- Métricas escalonadas por grupos.
- Línea de proceso animada al entrar en viewport.

## Riesgos reales

- El envío requiere `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` en el entorno de ejecución.
- No se publican testimonios hasta contar con testimonios reales autorizados.
- Las defensas de rate limiting del formulario son locales; un despliegue distribuido de alto tráfico necesitaría almacenamiento compartido.
