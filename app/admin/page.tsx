 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const tools = [
  ["Products","/products","Catalogue and product detail pages"],
  ["Reviews","/my-reviews","Review workflow"],
  ["Categories","/products","Category catalogue"],
  ["Users","/dashboard","Account and profile workflow"],
  ["Analytics","/dashboard","GA4 and Clarity are configured through environment variables"],
  ["Directory","/directory","Hospitals, schools, colleges, hotels and services"],
  ["Guides","/guides","SEO-friendly decision content"],
];

export default function AdminPage() {
  const [email,setEmail]=useState<string|null>(null);
  const [allowed,setAllowed]=useState(false);
  useEffect(()=>{supabase.auth.getUser().then(({data})=>{const value=data.user?.email??null;setEmail(value);const list=(process.env.NEXT_PUBLIC_ADMIN_EMAILS??"").split(",").map(v=>v.trim().toLowerCase()).filter(Boolean);setAllowed(list.length>0&&!!value&&list.includes(value.toLowerCase()));});},[]);
  if (!email) return <main className="container py-16"><h1 className="text-3xl font-bold">Admin</h1><p className="mt-3 text-gray-500">Please log in first.</p><Link href="/login" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-white">Login</Link></main>;
  if (!allowed) return <main className="container py-16"><h1 className="text-3xl font-bold">Admin access required</h1><p className="mt-3 text-gray-500">Your account is signed in as {email}, but it is not listed in NEXT_PUBLIC_ADMIN_EMAILS.</p></main>;
  return <main className="container py-12"><span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">Admin Control Center</span><h1 className="mt-5 text-4xl font-bold">Launch & Content Operations</h1><p className="mt-3 max-w-3xl text-gray-500">Manage the application through its existing catalogue, review, directory and analytics workflows.</p><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{tools.map(([title,href,desc])=><Link key={title} href={href} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"><h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-sm text-gray-500">{desc}</p></Link>)}</div><div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-900">Production note: NEXT_PUBLIC_ADMIN_EMAILS is only a UI gate. Keep Supabase Row Level Security enabled and never expose a service-role key to the browser.</div></main>;
}
