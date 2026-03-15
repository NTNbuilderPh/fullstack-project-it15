export default function LoadingSkeleton({ className = "" }) {
  return <span className={`skeleton ${className}`.trim()} aria-hidden="true" />;
}
