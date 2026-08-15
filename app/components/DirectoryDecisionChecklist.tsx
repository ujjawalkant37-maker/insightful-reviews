const FACTORS: Record<string, string[]> = {
  healthcare: ["Clinical/services fit", "Emergency & availability", "Cleanliness & safety", "Staff responsiveness", "Billing / insurance support", "Waiting time"],
  education: ["Curriculum / board", "Teaching quality", "Fees & value", "Safety & discipline", "Infrastructure", "Transport / hostel", "Placements or outcomes where applicable"],
  hospitality: ["Location", "Room / property quality", "Cleanliness", "Service", "Value for money", "Amenities"],
  food: ["Taste & consistency", "Hygiene", "Portion / value", "Service speed", "Ambience", "Dietary options"],
  travel: ["Itinerary / experience quality", "Price transparency", "Safety", "Support", "Cancellation terms", "On-ground reliability"],
  finance: ["Product / service fit", "Fees & charges", "Service quality", "Transparency", "Branch accessibility", "Complaint handling"],
  automotive: ["Vehicle/service quality", "Pricing transparency", "Workshop quality", "Turnaround time", "Warranty support", "Parts availability"],
  property: ["Location", "Builder / agent track record", "Price & total cost", "Approvals / documentation", "Construction / service quality", "After-sales support"],
  beauty: ["Service quality", "Hygiene", "Staff skill", "Price transparency", "Appointment reliability", "After-service support"],
};

export default function DirectoryDecisionChecklist({ sector }: { sector: string }) {
  const factors = FACTORS[sector] ?? ["Service quality", "Value for money", "Reliability", "Cleanliness / safety", "Staff responsiveness", "Transparency"];
  return (
    <section className="mt-8 rounded-3xl border bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Decision framework</span>
      <h2 className="mt-2 text-2xl font-bold">What to compare before choosing</h2>
      <p className="mt-2 text-sm text-gray-500">Use the same evidence-first checklist across providers instead of relying on a single star rating.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{factors.map((factor) => <div key={factor} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold dark:bg-zinc-800">✓ {factor}</div>)}</div>
    </section>
  );
}
