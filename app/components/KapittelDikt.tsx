type KapittelDiktProps = {
  stanzas: string[][];
  title?: string;
  source?: string;
};

export function KapittelDikt({ stanzas, title, source }: KapittelDiktProps) {
  return (
    <figure className="kapittel-dikt">
      {title && <p className="kapittel-dikt-title">{title}</p>}
      <blockquote>
        {stanzas.map((lines, stanzaIndex) => (
          <p key={stanzaIndex}>
            {lines.map((line, lineIndex) => (
              <span className="kapittel-dikt-line" key={lineIndex}>
                {line}
              </span>
            ))}
          </p>
        ))}
      </blockquote>
      {source && <figcaption>{source}</figcaption>}
    </figure>
  );
}
