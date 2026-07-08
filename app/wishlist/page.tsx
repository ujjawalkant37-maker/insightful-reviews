import React from 'react';
import WishlistClient from './WishlistClient';

export default function WishlistPage() {
  return (
    <React.Suspense>
      {/* client-only wishlist viewer */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <WishlistClient />
    </React.Suspense>
  );
}
