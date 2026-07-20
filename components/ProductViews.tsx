type ProductViewProps = {
  variant?: "hero" | "inbox" | "crm" | "appointment" | "knowledge" | "metrics" | "team";
};

function WindowBar({ title, action }: { title: string; action?: string }) {
  return (
    <div className="pv-window-bar">
      <div className="pv-window-title"><span className="pv-mark">V</span><strong>{title}</strong></div>
      {action ? <span className="pv-action">{action}</span> : null}
    </div>
  );
}

function ConversationView() {
  return (
    <div className="product-view product-view-conversation">
      <WindowBar title="Conversaciones" action="IA activa" />
      <div className="pv-conversation-grid">
        <div className="pv-chats">
          <div className="pv-search">Buscar conversación</div>
          <div className="pv-filter-row"><span className="is-active">Abiertas</span><span>Pendientes</span></div>
          {[
            ["MR", "María R.", "Consulta por disponibilidad", "2 min"],
            ["JC", "Julián C.", "Gracias por la información", "18 min"],
            ["LG", "Lucía G.", "Quiero reprogramar mi turno", "1 h"],
          ].map(([avatar, name, message, time], index) => (
            <div className={`pv-chat${index === 0 ? " is-selected" : ""}`} key={name}>
              <span className="pv-avatar">{avatar}</span>
              <span><strong>{name}</strong><small>{message}</small></span>
              <time>{time}</time>
            </div>
          ))}
        </div>
        <div className="pv-thread">
          <div className="pv-thread-head">
            <span className="pv-avatar">MR</span>
            <span><strong>María R.</strong><small>WhatsApp · Cliente identificado</small></span>
            <span className="status-tag ai">IA</span>
          </div>
          <div className="pv-messages">
            <p className="pv-message incoming">Hola, ¿hay turnos disponibles para el viernes?</p>
            <p className="pv-message outgoing">Sí. Hay disponibilidad a las 16:30 y a las 18:00. ¿Cuál preferís?<small>Respondido por IA</small></p>
            <p className="pv-message incoming">A las 18:00 me queda perfecto.</p>
            <p className="pv-message outgoing">Listo. El turno quedó agendado y ya envié la confirmación.<small>Google Calendar</small></p>
          </div>
          <div className="pv-composer"><span>Escribí un mensaje…</span><i aria-hidden="true">↑</i></div>
        </div>
        <aside className="pv-customer">
          <span className="pv-avatar pv-avatar-large">MR</span>
          <h3>María R.</h3>
          <p>Cliente desde marzo</p>
          <dl>
            <div><dt>Estado</dt><dd>Turno agendado</dd></div>
            <div><dt>Responsable</dt><dd>Sofía</dd></div>
            <div><dt>Atención</dt><dd>IA activa</dd></div>
          </dl>
          <div className="pv-related"><small>Turno relacionado</small><strong>Viernes · 18:00</strong><span>Confirmado</span></div>
        </aside>
      </div>
    </div>
  );
}

function CrmView() {
  const rows = [
    ["MR", "María R.", "Turno agendado", "Sofía", "Hoy, 10:42"],
    ["JC", "Julián C.", "En seguimiento", "Martín", "Hoy, 09:15"],
    ["LG", "Lucía G.", "Nueva consulta", "Sin asignar", "Ayer, 18:58"],
  ];
  return (
    <div className="product-view product-view-table">
      <WindowBar title="Clientes" action="Nuevo contacto" />
      <div className="pv-table-toolbar"><strong>Contactos</strong><span>Buscar por nombre o teléfono</span></div>
      <div className="pv-table">
        <div className="pv-table-row pv-table-head"><span>Cliente</span><span>Estado</span><span>Responsable</span><span>Último contacto</span></div>
        {rows.map(([avatar, name, status, owner, date]) => (
          <div className="pv-table-row" key={name}>
            <span className="pv-person"><i>{avatar}</i><strong>{name}</strong></span>
            <span><em>{status}</em></span><span>{owner}</span><span>{date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentView() {
  return (
    <div className="product-view product-view-appointment">
      <WindowBar title="Turnos" action="Google Calendar conectado" />
      <div className="pv-appointment-body">
        <div className="pv-date-card"><span>Viernes</span><strong>18</strong><small>Julio</small></div>
        <div className="pv-appointment-data">
          <span className="eyebrow">Turno confirmado</span>
          <h3>Consulta inicial · María R.</h3>
          <p>18:00 a 18:30 · Agenda principal</p>
          <div><span>Cliente identificado</span><span>Creado desde WhatsApp</span></div>
        </div>
        <span className="pv-confirmed">Confirmado</span>
      </div>
    </div>
  );
}

function KnowledgeView() {
  return (
    <div className="product-view product-view-knowledge">
      <WindowBar title="Base de conocimiento" action="Agregar documento" />
      <div className="pv-knowledge-body">
        {[
          ["PDF", "Catálogo de servicios", "Listo para consultar"],
          ["TXT", "Preguntas frecuentes", "Activo"],
          ["DOCX", "Información comercial", "Activo"],
        ].map(([type, title, state]) => (
          <div className="pv-document" key={title}><span>{type}</span><div><strong>{title}</strong><small>{state}</small></div><em>•••</em></div>
        ))}
      </div>
    </div>
  );
}

function MetricsView() {
  return (
    <div className="product-view product-view-metrics">
      <WindowBar title="Métricas" action="Últimos 30 días" />
      <div className="pv-metric-grid">
        <div><span>Conversaciones</span><strong>Actividad del período</strong><i className="pv-line-chart"><b /><b /><b /><b /><b /></i></div>
        <div><span>Tiempo de respuesta</span><strong>Seguimiento operativo</strong><i className="pv-bars"><b /><b /><b /><b /><b /><b /></i></div>
      </div>
      <p className="pv-metric-note">Datos reales de la organización, filtrados por período y canal.</p>
    </div>
  );
}

function TeamView() {
  return (
    <div className="product-view product-view-team">
      <WindowBar title="Equipo y permisos" action="Invitar persona" />
      <div className="pv-team-list">
        {["OWNER", "ADMIN", "AGENT", "VIEWER"].map((role, index) => (
          <div key={role}><span className="pv-avatar">{["SO", "MC", "LG", "JP"][index]}</span><span><strong>{["Sofía Ortiz", "Martín Costa", "Lucía Gómez", "Juan Pérez"][index]}</strong><small>{role}</small></span><em>{index < 3 ? "Activo" : "Solo lectura"}</em></div>
        ))}
      </div>
    </div>
  );
}

export function ProductView({ variant = "hero" }: ProductViewProps) {
  if (variant === "crm") return <CrmView />;
  if (variant === "appointment") return <AppointmentView />;
  if (variant === "knowledge") return <KnowledgeView />;
  if (variant === "metrics") return <MetricsView />;
  if (variant === "team") return <TeamView />;
  return <ConversationView />;
}
