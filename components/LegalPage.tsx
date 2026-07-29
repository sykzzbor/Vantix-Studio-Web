import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale } from "@/content";
import { CONTACT_EMAIL, whatsAppLink } from "@/lib/site";

type LegalDocument = "privacy" | "terms";

interface LegalPageProps {
  locale: Locale;
  document: LegalDocument;
}

const whatsappHref = whatsAppLink(
  "Hola, tengo una consulta sobre la información legal del sitio de Vantix.",
);

function SpanishPrivacy() {
  return (
    <>
      <p>
        Esta política describe cómo Vantix trata la información relacionada con
        el uso de este sitio público y sus canales de contacto. No describe el
        tratamiento de datos dentro de una cuenta de VantixApp, que puede estar
        sujeto a condiciones específicas del producto.
      </p>

      <h2>Información que recibimos</h2>
      <p>
        Cuando completás el formulario de contacto recibimos los datos que
        ingresás: nombre, negocio, email, teléfono, volumen aproximado de
        conversaciones y mensaje. Si nos escribís por email, WhatsApp u otro
        canal, recibimos la información que decidas incluir allí.
      </p>
      <p>
        La infraestructura del sitio también puede procesar datos técnicos
        necesarios para operar y proteger el servicio, como la dirección IP,
        fecha, hora, ruta solicitada y datos básicos del navegador. La dirección
        IP se usa además para limitar envíos repetidos del formulario.
      </p>

      <h2>Formulario de contacto y entrega por email</h2>
      <p>
        El formulario envía los datos a un endpoint del sitio, donde se validan,
        se normalizan y se aplican controles básicos contra spam. Si la
        configuración de envío está activa, la consulta se entrega por email a
        Vantix mediante un proveedor técnico de correo. El sitio no guarda una
        copia de la consulta en una base de datos propia; el mensaje sí queda en
        los sistemas de correo necesarios para recibirlo y responderlo.
      </p>

      <h2>Preferencias guardadas en el dispositivo</h2>
      <p>
        Para recordar tu elección, el sitio guarda el tema y el idioma en el
        almacenamiento local del navegador. También utiliza una cookie de
        idioma y conserva temporalmente la moneda seleccionada para mostrar los
        precios. Estas preferencias no incluyen el contenido del formulario.
      </p>

      <h2>Para qué usamos la información</h2>
      <ul>
        <li>Responder consultas y coordinar una demostración.</li>
        <li>Evaluar un proyecto y preparar una propuesta solicitada.</li>
        <li>Dar seguimiento a una conversación comercial iniciada por vos.</li>
        <li>Prevenir abuso, spam y problemas de seguridad del sitio.</li>
        <li>Cumplir obligaciones aplicables cuando corresponda.</li>
      </ul>

      <h2>Proveedores y enlaces externos</h2>
      <p>
        Para operar el sitio podemos utilizar proveedores de hosting y entrega
        de email, que procesan la información necesaria para prestar esos
        servicios. No vendemos datos personales. Los enlaces a WhatsApp,
        Instagram, VantixApp o sitios de terceros se rigen por las políticas de
        cada servicio cuando salís de este sitio.
      </p>

      <h2>Conservación y seguridad</h2>
      <p>
        Conservamos la información recibida durante el tiempo razonablemente
        necesario para atender la consulta, mantener la relación comercial o
        cumplir obligaciones aplicables. Usamos controles técnicos y
        organizativos razonables, aunque ningún sistema conectado a Internet
        puede garantizar seguridad absoluta.
      </p>

      <h2>Consultas sobre tus datos</h2>
      <p>
        Podés pedir información, corrección o eliminación de los datos que nos
        hayas enviado escribiendo a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> o por{" "}
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        . Para proteger la información, podemos necesitar verificar que la
        solicitud corresponda a la persona indicada.
      </p>

      <h2>Cambios</h2>
      <p>
        Podemos actualizar esta política si cambia el sitio o la forma de
        gestionar las consultas. La fecha visible al comienzo identifica la
        versión publicada.
      </p>
    </>
  );
}

function EnglishPrivacy() {
  return (
    <>
      <p>
        This policy explains how Vantix handles information related to this
        public website and its contact channels. It does not cover data
        processing within a VantixApp account, which may be subject to
        product-specific terms.
      </p>

      <h2>Information we receive</h2>
      <p>
        When you submit the contact form, we receive the information you enter:
        name, business, email, phone number, approximate conversation volume
        and message. If you contact us by email, WhatsApp or another channel, we
        receive the information you choose to include there.
      </p>
      <p>
        The website infrastructure may also process technical data needed to
        operate and protect the service, such as IP address, date, time,
        requested path and basic browser information. The IP address is also
        used to limit repeated form submissions.
      </p>

      <h2>Contact form and email delivery</h2>
      <p>
        The form sends your data to a website endpoint, where it is validated,
        normalized and checked with basic anti-spam controls. When email
        delivery is configured, the enquiry is sent to Vantix by email through
        a technical email provider. The website does not write a copy of the
        enquiry to its own database; the message remains in the email systems
        needed to receive and reply to it.
      </p>

      <h2>Preferences stored on your device</h2>
      <p>
        The website saves theme and language preferences in your browser’s
        local storage. It also uses a language cookie and temporarily stores the
        selected pricing currency. These preferences do not contain the
        contents of the contact form.
      </p>

      <h2>How we use the information</h2>
      <ul>
        <li>To reply to enquiries and arrange a product demonstration.</li>
        <li>To assess a project and prepare a requested proposal.</li>
        <li>To follow up on a business conversation you started.</li>
        <li>To prevent abuse, spam and website security issues.</li>
        <li>To meet applicable obligations where required.</li>
      </ul>

      <h2>Service providers and external links</h2>
      <p>
        We may use hosting and email delivery providers to operate this
        website. They process the information needed to provide those services.
        We do not sell personal data. Links to WhatsApp, Instagram, VantixApp or
        other third-party websites are governed by each service’s own policies
        after you leave this website.
      </p>

      <h2>Retention and security</h2>
      <p>
        We keep received information for as long as reasonably necessary to
        handle the enquiry, maintain the business relationship or meet
        applicable obligations. We use reasonable technical and organizational
        controls, although no Internet-connected system can guarantee absolute
        security.
      </p>

      <h2>Questions about your data</h2>
      <p>
        You can ask about, correct or request deletion of information you sent
        us by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
        or contacting us on{" "}
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        . To protect the information, we may need to verify that the request
        relates to the person identified.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy when the website or our enquiry handling
        process changes. The date shown at the beginning identifies the
        published version.
      </p>
    </>
  );
}

function SpanishTerms() {
  return (
    <>
      <p>
        Estos términos regulan el uso del sitio público de Vantix. Al navegarlo
        o usar sus canales de contacto, aceptás utilizarlo de forma lícita y sin
        afectar su funcionamiento ni los derechos de otras personas.
      </p>

      <h2>Información del sitio</h2>
      <p>
        El sitio presenta VantixApp y los servicios de desarrollo de Vantix. Su
        contenido tiene fines informativos y comerciales. Las funciones,
        integraciones, planes y condiciones vigentes son las que se confirman
        en el flujo de contratación o en una propuesta específica.
      </p>

      <h2>VantixApp y servicios profesionales</h2>
      <p>
        El registro, inicio de sesión y uso de VantixApp se realizan en el sitio
        del producto y pueden requerir la aceptación de condiciones propias.
        Los proyectos de diseño o desarrollo se cotizan por alcance. Una
        consulta o demostración no crea por sí sola una contratación; el
        alcance, precio, plazos y forma de pago se confirman por separado.
      </p>

      <h2>Uso permitido</h2>
      <p>No debés utilizar este sitio para:</p>
      <ul>
        <li>Interferir con su operación o intentar acceder sin autorización.</li>
        <li>Enviar contenido ilícito, engañoso, abusivo o malicioso.</li>
        <li>Automatizar envíos masivos o eludir controles contra spam.</li>
        <li>Copiar o explotar sus contenidos de forma que vulnere derechos.</li>
      </ul>

      <h2>Propiedad intelectual</h2>
      <p>
        La marca Vantix, sus logos, textos, diseño y software pertenecen a sus
        respectivos titulares y están protegidos por las normas aplicables. Los
        nombres, marcas y capturas de terceros conservan la titularidad que les
        corresponda. Mostrar un proyecto no transfiere derechos sobre el
        contenido del cliente.
      </p>

      <h2>Enlaces de terceros</h2>
      <p>
        El sitio enlaza a VantixApp, WhatsApp, Instagram y proyectos externos.
        Esos servicios tienen sus propias condiciones, disponibilidad y
        políticas. Vantix no controla el contenido ni la operación de sitios de
        terceros.
      </p>

      <h2>Disponibilidad y exactitud</h2>
      <p>
        Procuramos mantener la información clara y actualizada, pero puede
        contener errores o quedar desactualizada. Podés consultarnos antes de
        tomar una decisión comercial. El sitio puede interrumpirse de manera
        temporal por mantenimiento, fallas de red o causas fuera de nuestro
        control.
      </p>

      <h2>Cambios y contacto</h2>
      <p>
        Podemos modificar el sitio y estos términos. La versión publicada y su
        fecha son las vigentes para el uso de este sitio. Si tenés una consulta,
        escribinos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> o
        por{" "}
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        .
      </p>
    </>
  );
}

function EnglishTerms() {
  return (
    <>
      <p>
        These terms govern the use of the public Vantix website. By browsing it
        or using its contact channels, you agree to use it lawfully and without
        disrupting its operation or the rights of others.
      </p>

      <h2>Website information</h2>
      <p>
        This website presents VantixApp and Vantix development services. Its
        content is informational and commercial. The current features,
        integrations, plans and conditions are those confirmed during the
        subscription process or in a specific proposal.
      </p>

      <h2>VantixApp and professional services</h2>
      <p>
        Registration, sign-in and use of VantixApp take place on the product
        website and may require acceptance of product-specific terms. Design
        and development projects are quoted according to scope. An enquiry or
        demonstration does not by itself create a contract; scope, price,
        timing and payment terms are confirmed separately.
      </p>

      <h2>Permitted use</h2>
      <p>You must not use this website to:</p>
      <ul>
        <li>Disrupt its operation or attempt unauthorized access.</li>
        <li>Send unlawful, deceptive, abusive or malicious content.</li>
        <li>Automate bulk submissions or bypass anti-spam controls.</li>
        <li>Copy or exploit content in a way that infringes rights.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The Vantix brand, logos, text, design and software belong to their
        respective owners and are protected by applicable rules. Third-party
        names, brands and screenshots retain their respective ownership.
        Displaying a project does not transfer rights over the client’s content.
      </p>

      <h2>Third-party links</h2>
      <p>
        This website links to VantixApp, WhatsApp, Instagram and external
        projects. Those services have their own terms, availability and
        policies. Vantix does not control the content or operation of
        third-party websites.
      </p>

      <h2>Availability and accuracy</h2>
      <p>
        We work to keep the information clear and current, but it may contain
        errors or become outdated. You can contact us to verify details before
        making a business decision. The website may be temporarily unavailable
        because of maintenance, network failures or circumstances outside our
        control.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may change this website and these terms. The published version and
        date apply to the use of this website. If you have a question, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or contact us
        on{" "}
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        .
      </p>
    </>
  );
}

const documentCopy = {
  es: {
    privacy: {
      eyebrow: "Información legal",
      title: "Política de privacidad",
      updated: "Última actualización: 28 de julio de 2026",
    },
    terms: {
      eyebrow: "Información legal",
      title: "Términos de uso",
      updated: "Última actualización: 28 de julio de 2026",
    },
  },
  en: {
    privacy: {
      eyebrow: "Legal information",
      title: "Privacy policy",
      updated: "Last updated: July 28, 2026",
    },
    terms: {
      eyebrow: "Legal information",
      title: "Terms of use",
      updated: "Last updated: July 28, 2026",
    },
  },
} as const;

export function LegalPage({ locale, document }: LegalPageProps) {
  const heading = documentCopy[locale][document];
  const skip = locale === "es" ? "Saltar al contenido" : "Skip to content";
  const languagePaths =
    document === "privacy"
      ? { es: "/privacidad", en: "/en/privacy" }
      : { es: "/terminos", en: "/en/terms" };

  return (
    <>
      <a className="skip-link" href="#contenido">
        {skip}
      </a>
      <SiteHeader
        locale={locale}
        variant="legal"
        languagePaths={languagePaths}
      />

      <main className="legal-page" id="contenido">
        <header className="section legal-hero">
          <div className="container legal-container">
            <p className="eyebrow">{heading.eyebrow}</p>
            <h1>{heading.title}</h1>
            <p className="legal-updated">{heading.updated}</p>
          </div>
        </header>
        <section className="section legal-section">
          <div className="container legal-container legal-content">
            {document === "privacy" ? (
              locale === "es" ? (
                <SpanishPrivacy />
              ) : (
                <EnglishPrivacy />
              )
            ) : locale === "es" ? (
              <SpanishTerms />
            ) : (
              <EnglishTerms />
            )}
          </div>
        </section>
      </main>

      <SiteFooter
        locale={locale}
        variant="legal"
        languagePaths={languagePaths}
      />
    </>
  );
}
