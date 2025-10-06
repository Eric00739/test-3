import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentLabel?: string;
  className?: string;
}

const separator = "›";

export function Breadcrumb({ items, currentLabel, className }: BreadcrumbProps) {
  const last = items[items.length - 1];
  const trail = currentLabel
    ? [...items.slice(0, -1), { ...last }]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center text-sm text-slate-500">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1 && !currentLabel;
          const label = index === trail.length - 1 && currentLabel ? currentLabel : item.name;

          return (
            <li key={`${item.url}-${label}`} className="flex items-center">
              {isLast ? (
                <span className="font-semibold text-slate-900" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-blue-600 hover:underline focus:underline"
                >
                  {label}
                </Link>
              )}
              {index < trail.length - 1 && (
                <span className="mx-1 text-slate-400" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
