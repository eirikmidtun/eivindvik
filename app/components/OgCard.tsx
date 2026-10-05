// Rendered by ImageResponse, which only supports inline styles and flexbox.
type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer: string;
};

export function OgCard({ eyebrow, title, subtitle, footer }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#f5f2ea",
        color: "#15213a",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", color: "#9a3a22", fontSize: 28, letterSpacing: 3 }}>{eyebrow}</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: title.length > 24 ? 88 : 120, lineHeight: 1.05 }}>
        <span>{title}</span>
        {subtitle && <span style={{ color: "#15213a", fontStyle: "italic" }}>{subtitle}</span>}
      </div>
      <div style={{ display: "flex", color: "#5d636e", fontSize: 30 }}>{footer}</div>
    </div>
  );
}
