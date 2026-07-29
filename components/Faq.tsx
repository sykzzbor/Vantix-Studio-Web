import {
  FAQS,
  type FaqDefinition,
  type Locale,
} from "@/content";

export function Faq({
  locale = "es",
  items = FAQS,
}: {
  locale?: Locale;
  items?: readonly FaqDefinition[];
}) {
  return (
    <div className="faq-list">
      {items.map((faq) => {
        const summaryId = `faq-${faq.id}-question`;
        const answerId = `faq-${faq.id}-answer`;

        return (
          <details
            className="faq-item"
            key={faq.id}
            aria-labelledby={summaryId}
          >
            <summary id={summaryId} aria-controls={answerId}>
              <span>{faq.question[locale]}</span>
              <span className="faq-symbol" aria-hidden="true">
                +
              </span>
            </summary>
            <div id={answerId} className="faq-answer">
              <p>{faq.answer[locale]}</p>
            </div>
          </details>
        );
      })}
    </div>
  );
}
