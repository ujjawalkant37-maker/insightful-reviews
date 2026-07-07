import Link from 'next/link';
import React from 'react';

export default function Breadcrumbs({ items }: { items: Array<{ href?: string; label: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center gap-2 text-gray-600 dark:text-zinc-300">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className="hover:underline text-indigo-600">{it.label}</Link>
            ) : (
              <span className="text-gray-900 dark:text-zinc-50">{it.label}</span>
            )}
            {i < items.length - 1 && <span className="text-gray-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
