const faqs = [
  {
    question: "¿Qué puede responder el agente?",
    answer:
      "Responde con la información que cargás en tu espacio: productos, servicios, preguntas frecuentes, datos del negocio y documentos (PDF, DOCX y TXT). Si algo no está en esa base, no lo inventa: pide ayuda o deriva la conversación al equipo.",
  },
  {
    question: "¿Puedo tomar el control de una conversación?",
    answer:
      "Sí. Desde la bandeja podés pasar cualquier conversación de IA a atención humana en el momento, responder vos y devolverla a la IA cuando quieras. El historial completo queda visible para el equipo.",
  },
  {
    question: "¿Qué ocurre cuando la IA no sabe responder?",
    answer:
      "Cuando la consulta no coincide con la información cargada o necesita criterio humano, la conversación se deriva al equipo y queda marcada como pendiente de atención humana. La IA no completa huecos con datos inventados.",
  },
  {
    question: "¿Cómo aprende sobre mi negocio?",
    answer:
      "Cargás la información desde el panel: datos del negocio, productos con precios, servicios, preguntas frecuentes y documentos. El agente usa exactamente ese contenido para responder, así controlás qué puede decir.",
  },
  {
    question: "¿Necesito cambiar mi número de WhatsApp?",
    answer:
      "VantixApp funciona con la API oficial de WhatsApp Business y la conexión del número se hace con un proceso guiado desde la app. En la prueba podés explorar toda la plataforma y coordinar con nosotros la conexión de tu número.",
  },
  {
    question: "¿Cuánto demora la configuración?",
    answer:
      "Crear tu espacio lleva unos minutos: registrás tu cuenta, completás los datos del negocio y ya podés cargar información y probar el agente en el chat de prueba. La conexión del canal de WhatsApp se coordina según cada caso.",
  },
  {
    question: "¿Qué ocurre al terminar la prueba?",
    answer:
      "La prueba dura 5 días. Al vencer, el acceso se pausa pero tu información no se borra ni se modifica: activando un plan seguís exactamente donde quedaste.",
  },
  {
    question: "¿Cómo se protegen mis datos?",
    answer:
      "Cada organización tiene su propio espacio aislado: tu equipo solo ve la información de tu negocio. El acceso se controla con roles y permisos (OWNER, ADMIN, AGENT y VIEWER) validados en el servidor, y las sesiones están protegidas con autenticación.",
  },
] as const;

export function Faq() {
  return (
    <div className="faq-list">
      {faqs.map((faq) => (
        <details className="faq-item" key={faq.question}>
          <summary>
            {faq.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
