import { nav } from '../../content/site'

const social = ['Instagram', 'LinkedIn']
const legal = ['Privacy', 'Terms', 'Partner Terms']

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-vermilion-deep text-ivory">
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-[6fr_3fr_3fr]">
          <div>
            <p className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-none tracking-[0.1em]">BRIDLYA</p>
            <p className="font-display mt-4 text-[1.8rem] font-light italic text-champagne">Where Forever Begins.</p>
            <p className="mt-3 max-w-sm text-[0.95rem] text-ivory/70">Every detail, beautifully brought together.</p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow text-champagne">Navigation</p>
            <ul className="mt-6 space-y-3">
              {nav.map((n) => <li key={n.href}><a href={n.href} className="text-[0.95rem] text-ivory/85 underline-offset-8 transition-colors hover:text-champagne hover:underline">{n.label}</a></li>)}
            </ul>
          </nav>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="eyebrow text-champagne">Follow</p>
              <ul className="mt-6 space-y-3">{social.map((s) => <li key={s} className="text-[0.95rem] text-ivory/60">{s} <span className="eyebrow ml-2 !text-[0.55rem] opacity-70">placeholder</span></li>)}</ul>
            </div>
            <div>
              <p className="eyebrow text-champagne">Legal</p>
              <ul className="mt-6 space-y-3">{legal.map((s) => <li key={s} className="text-[0.95rem] text-ivory/60">{s} <span className="eyebrow ml-2 !text-[0.55rem] opacity-70">placeholder</span></li>)}</ul>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-ivory/15 pt-8 text-[0.78rem] leading-relaxed text-ivory/60 lg:flex-row lg:justify-between">
          <p>BRIDLYA is a fictional brand prototype. Imagery, names, scenarios and figures are illustrative; no real businesses, customers, partners or locations are represented.</p>
          <p className="shrink-0">© 2026 BRIDLYA (concept)</p>
        </div>
      </div>
    </footer>
  )
}
