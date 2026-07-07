import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-800 mt-16">
      <div className="container py-10 grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-zinc-50">Insightful Reviews</h4>
          <p className="mt-2 text-xs text-gray-600 dark:text-zinc-300">AI summaries of expert and user feedback to help you buy with confidence.</p>
        </div>

        <div>
          <h5 className="font-medium text-gray-900 dark:text-zinc-50">Product</h5>
          <ul className="mt-2 text-sm text-gray-600 dark:text-zinc-300 space-y-1">
            <li><a href="#trending" className="hover:underline">Trending</a></li>
            <li><a href="#categories" className="hover:underline">Categories</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium text-gray-900 dark:text-zinc-50">Company</h5>
          <ul className="mt-2 text-sm text-gray-600 dark:text-zinc-300 space-y-1">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium text-gray-900 dark:text-zinc-50">Legal</h5>
          <ul className="mt-2 text-sm text-gray-600 dark:text-zinc-300 space-y-1">
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-zinc-800">
        <div className="container py-4 text-sm text-gray-600 dark:text-zinc-300 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Insightful Reviews</div>
          <div className="flex items-center gap-3">Made with ❤️ — Data-driven recommendations</div>
        </div>
      </div>
    </footer>
  );
}
