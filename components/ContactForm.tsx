"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
import { whatsAppLink } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [need, setNeed] = useState("VantixApp");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const greeting = name.trim() ? `Hola, soy ${name.trim()}.` : "Hola.";
    const text = `${greeting} Quiero consultar por ${need}.`;
    window.open(whatsAppLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        <span>Nombre</span>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="¿Cómo te llamás?" autoComplete="name" />
      </label>
      <label>
        <span>¿Qué necesitás?</span>
        <select value={need} onChange={(event) => setNeed(event.target.value)}>
          <option>VantixApp</option>
          <option>Landing page</option>
          <option>Sitio web</option>
          <option>E-commerce</option>
          <option>Sistema a medida</option>
        </select>
      </label>
      <button className="button button-dark" type="submit">Preparar consulta <ArrowIcon /></button>
      <p>El formulario abre WhatsApp con tu consulta preparada. No almacenamos tus datos.</p>
    </form>
  );
}
