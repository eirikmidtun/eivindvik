import type { Tema } from "../content";

type KapittelGroupProps = {
  tema: Tema;
};

export function KapittelGroup({ tema }: KapittelGroupProps) {
  return (
    <section className="kapittel-group" id={tema.id} aria-labelledby={`${tema.id}-title`}>
      <div className="kapittel-group-heading">
        <p className="eyebrow">Kapittel {tema.kapittelRange}</p>
        <h3 id={`${tema.id}-title`}>{tema.title}</h3>
      </div>
      <ol className="kapittel-list">
        {tema.kapitler.map((kapittel) => (
          <li key={kapittel.number}>
            <span className="kapittel-number">{String(kapittel.number).padStart(2, "0")}</span>
            <span>{kapittel.title}</span>
            <span className="kapittel-arrow" aria-hidden="true">↗</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
