import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2"><h4 className="text-lg font-bold">Insightful Reviews</h4><p className="mt-3 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-400">A trust-first decision platform combining structured information, community reviews and AI-assisted insights.</p></div>
        <div><h5 className="font-semibold">Explore</h5><div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400"><Link className="block hover:text-indigo-600" href="/products">Products</Link><Link className="block hover:text-indigo-600" href="/directory">Directory</Link><Link className="block hover:text-indigo-600" href="/guides">Guides</Link><Link className="block hover:text-indigo-600" href="/compare">Compare</Link></div></div>
        <div><h5 className="font-semibold">Community</h5><div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400"><Link className="block hover:text-indigo-600" href="/write-review">Write a Review</Link><Link className="block hover:text-indigo-600" href="/wishlist">Wishlist</Link><Link className="block hover:text-indigo-600" href="/dashboard">Dashboard</Link><Link className="block hover:text-indigo-600" href="/profile">Profile</Link></div></div>
        <div><h5 className="font-semibold">Company & Legal</h5><div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400"><Link className="block hover:text-indigo-600" href="/about">About</Link><Link className="block hover:text-indigo-600" href="/contact">Contact</Link><Link className="block hover:text-indigo-600" href="/privacy">Privacy</Link><Link className="block hover:text-indigo-600" href="/terms">Terms</Link><Link className="block hover:text-indigo-600" href="/affiliate-disclosure">Affiliate Disclosure</Link><Link className="block hover:text-indigo-600" href="/review-policy">Review Policy</Link></div></div>
      </div>
      <div className="border-t border-gray-100 dark:border-zinc-800"><div className="container flex flex-col gap-2 py-5 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between"><div>© {new Date().getFullYear()} Insightful Reviews</div><div>Independent information • Community driven • AI assisted</div></div></div>
    </footer>
  );
}
