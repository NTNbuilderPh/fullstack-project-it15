import LoadingSkeleton from "../common/LoadingSkeleton";

export default function DashboardSkeleton() {
  return (
    <main className="dashboard-page">
      <section className="hero-banner hero-banner-skeleton">
        <div className="hero-content">
          <LoadingSkeleton className="skeleton-line skeleton-hero-title" />
          <LoadingSkeleton className="skeleton-line skeleton-hero-text" />
        </div>
      </section>

      <section className="stats-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <article className="stat-card" key={index}>
            <LoadingSkeleton className="skeleton-line skeleton-card-label" />
            <LoadingSkeleton className="skeleton-line skeleton-card-value" />
            <LoadingSkeleton className="skeleton-line skeleton-card-caption" />
          </article>
        ))}
      </section>

      <section className="charts-grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <article className="card" key={index}>
            <LoadingSkeleton className="skeleton-line skeleton-card-label" />
            <LoadingSkeleton className="skeleton-block skeleton-chart" />
          </article>
        ))}
      </section>

      <section className="content-grid">
        {Array.from({ length: 2 }).map((_, index) => (
          <article className="card" key={index}>
            <LoadingSkeleton className="skeleton-line skeleton-card-label" />
            <LoadingSkeleton className="skeleton-block skeleton-table" />
          </article>
        ))}
      </section>
    </main>
  );
}
