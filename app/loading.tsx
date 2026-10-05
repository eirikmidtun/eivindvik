export default function Loading() {
  return (
    <main className="status-page" aria-busy="true" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>Hentar forteljingane …</p>
    </main>
  );
}
