import { useEffect, useState, type FormEvent } from 'react'
import { Eyebrow, LineReveal } from '../ui/Reveal'

type Mode = 'family' | 'partner' | 'other'
const modes: { id: Mode; label: string }[] = [
  { id: 'family', label: 'I’m planning a wedding' },
  { id: 'partner', label: 'I run a wedding business' },
  { id: 'other', label: 'Something else' },
]

const field = 'w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 font-sans text-base text-ink placeholder:text-ink/35 transition-colors focus:border-vermilion focus:outline-none focus:ring-0'
const label = 'eyebrow !text-[0.62rem] text-ink-soft'

export function Contact() {
  const [mode, setMode] = useState<Mode>('family')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const on = () => {
      if (location.hash === '#contact-partner') setMode('partner')
      else if (location.hash === '#contact') setMode((m) => m)
    }
    on()
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    // Prototype: nothing leaves the browser.
    setSent(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-0 bg-ivory py-28 lg:py-40">
      <span id="contact-partner" className="absolute top-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1500px] gap-16 px-5 sm:px-8 lg:grid-cols-[5fr_6fr] lg:gap-24 lg:px-12">
        <div>
          <Eyebrow className="mb-8 text-vermilion">Contact</Eyebrow>
          <LineReveal as="h2" className="font-display text-[clamp(2.6rem,6vw,6rem)] font-light leading-[0.98]" lines={['Begin your', <em key="w" className="text-vermilion">wedding story.</em>]} />
          <span id="contact-title" className="sr-only">Contact BRIDLYA</span>
          <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
            Tell us a little about the celebration you have in mind, or the craft you practise. BRIDLYA is an early prototype, so this form is a preview of how the conversation will begin.
          </p>
        </div>

        <div>
          <div role="radiogroup" aria-label="I am…" className="mb-10 flex flex-wrap gap-2">
            {modes.map((m) => (
              <button key={m.id} type="button" role="radio" aria-checked={mode === m.id} onClick={() => { setMode(m.id); setSent(false) }} className={`border px-5 py-3 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${mode === m.id ? 'border-vermilion bg-vermilion text-ivory' : 'border-ink/25 text-ink hover:border-ink'}`}>
                {m.label}
              </button>
            ))}
          </div>

          {sent ? (
            <div role="status" className="border-t border-ink/20 pt-10">
              <p className="font-display text-4xl font-light italic leading-tight">Thank you. Consider this a first hello.</p>
              <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
                BRIDLYA is a fictional prototype, so nothing you entered was sent or stored. In the real thing, a member of the team would reply personally.
              </p>
              <button type="button" onClick={() => setSent(false)} className="eyebrow mt-8 border-b border-ink pb-1 text-ink">Write another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-x-8 gap-y-8 sm:grid-cols-2" aria-label={`Contact form: ${modes.find((m) => m.id === mode)!.label}`}>
              <label className="grid gap-1"><span className={label}>Your name</span><input required name="name" autoComplete="name" className={field} placeholder="Full name" /></label>
              <label className="grid gap-1"><span className={label}>Email</span><input required type="email" name="email" autoComplete="email" className={field} placeholder="you@example.com" /></label>
              <label className="grid gap-1"><span className={label}>Phone (optional)</span><input type="tel" name="phone" autoComplete="tel" className={field} placeholder="+91" /></label>
              {mode === 'family' && <label className="grid gap-1"><span className={label}>Approximate date and place</span><input name="when" className={field} placeholder="e.g. winter 2027, Chennai" /></label>}
              {mode === 'partner' && <label className="grid gap-1"><span className={label}>Business type &amp; city</span><input name="business" className={field} placeholder="e.g. Caterer, Coimbatore" /></label>}
              {mode === 'other' && <label className="grid gap-1"><span className={label}>Organisation (optional)</span><input name="org" className={field} placeholder="Where you are writing from" /></label>}
              {mode === 'family' && <label className="grid gap-1"><span className={label}>Guests</span><select name="guests" defaultValue="" className={`${field} appearance-none`}><option value="" disabled>Approximate number</option><option>Under 100</option><option>100 – 300</option><option>300 – 600</option><option>600+</option></select></label>}
              <label className="grid gap-1 sm:col-span-2"><span className={label}>{mode === 'partner' ? 'About your work' : mode === 'family' ? 'Tell us about your wedding' : 'Your message'}</span><textarea required name="message" rows={4} className={`${field} resize-none`} placeholder={mode === 'family' ? 'Traditions, places, the feeling you want…' : 'A few lines is plenty.'} /></label>
              <div className="sm:col-span-2">
                <button type="submit" className="group relative inline-flex items-center gap-3 overflow-hidden bg-vermilion px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:text-vermilion-deep">
                  <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-500 ease-silk group-hover:scale-y-100" />
                  <span className="relative">{mode === 'partner' ? 'Request partner access' : 'Send to BRIDLYA'}</span>
                </button>
                <p className="mt-4 text-[0.78rem] text-ink-soft">Prototype form. Nothing is transmitted.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
