import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-header not-found">
      <span className="watermark watermark-sm" aria-hidden="true">ψ</span>
      <div className="container">
        <h1>Page not found</h1>
        <p className="page-intro">That page doesn't exist. It may have moved.</p>
        <Link className="btn btn-primary" to="/">Go to the home page</Link>
      </div>
    </section>
  );
}
