export default function Section({ id, title, soft = false, className = '', children }) {
  return (
    <section className={`section${soft ? ' section-soft' : ''} ${className}`.trim()} id={id}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
