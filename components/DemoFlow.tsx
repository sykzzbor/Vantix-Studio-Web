"use client";

import { useEffect, useRef, useState } from "react";

const chatSteps = [
  {
    kind: "incoming" as const,
    text: "Hola, ¿tienen stock de pintura exterior en color blanco?",
  },
  {
    kind: "outgoing" as const,
    text: "Sí, tenemos presentaciones de 4, 10 y 20 litros. ¿Cuántos metros necesitás cubrir?",
    meta: "Respondido por IA",
  },
  {
    kind: "incoming" as const,
    text: "Unos 60 m². ¿Me conviene la de 20 litros?",
  },
  {
    kind: "outgoing" as const,
    text: "Para 60 m² a dos manos, la presentación de 20 litros alcanza. ¿Querés que una persona del equipo te prepare el pedido?",
    meta: "Respondido por IA",
  },
] as const;

const systemEvents = [
  {
    label: "Consulta recibida",
    detail: "WhatsApp · Conversación nueva",
  },
  {
    label: "Base de conocimiento consultada",
    detail: "Catálogo de productos · Presentaciones y rendimiento",
  },
  {
    label: "Cliente registrado en el CRM",
    detail: "Contacto creado con historial de la conversación",
  },
  {
    label: "Conversación derivada al equipo",
    detail: "Pasa de IA a atención humana para cerrar el pedido",
  },
] as const;

export function DemoFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallback = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`demo-flow${visible ? " is-visible" : ""}`}
    >
      <div className="demo-chat" aria-label="Conversación de demostración">
        <div className="demo-chat-head">
          <span className="pv-avatar">MP</span>
          <span>
            <strong>Mariano P.</strong>
            <small>WhatsApp · Demostración</small>
          </span>
          <span className="status-tag ai">IA</span>
        </div>
        <div className="demo-messages">
          {chatSteps.map((step, index) => (
            <p
              className={`pv-message ${step.kind}`}
              style={{ "--step": index } as React.CSSProperties}
              key={step.text}
            >
              {step.text}
              {"meta" in step && step.meta ? <small>{step.meta}</small> : null}
            </p>
          ))}
        </div>
        <p className="demo-tag">Conversación de ejemplo</p>
      </div>

      <ol className="demo-events" aria-label="Qué hace VantixApp durante la conversación">
        {systemEvents.map((event, index) => (
          <li key={event.label} style={{ "--step": index } as React.CSSProperties}>
            <span className="demo-event-index">{index + 1}</span>
            <div>
              <strong>{event.label}</strong>
              <small>{event.detail}</small>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
