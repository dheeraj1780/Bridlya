import { partnerSteps, partnerTypes } from '../../content/site'
import { Button } from '../ui/Button'
import { Eyebrow, LineReveal, Reveal } from '../ui/Reveal'

export function Partners() {
  const loop = [...partnerTypes, ...partnerTypes]
  return (
    <section id="partners" aria-labelledby="partners-title" className="relative overflow-hidden bg-[#14100e] text-ivory">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#f7f1e6_1px,transparent_1px),linear-gradient(90deg,#f7f1e6_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative mx-auto max-w-[1500px] px-5 pb-24 pt-28 sm:px-8 lg:px-12 lg:pb-36 lg:pt-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow className="mb-8 text-marigold">For partners</Eyebrow>
            <LineReveal as="h2" className="font-display text-[clamp(2.8rem,8.4vw,8.8rem)] font-light leading-[0.94]" lines={['Your craft.', <em key="m" className="text-marigold">More celebrations.</em>]} />
            <span id="partners-title" className="sr-only">For partners</span>
          </div>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-ivory/70">
            BRIDLYA works with independent businesses, never in place of them. Partners gain access to qualified wedding demand and a structured way to deliver it.
          </p>
        </div>
      </div>

      <div className="relative border-y border-ivory/15 py-6" aria-label="Partner categories">
        <div className="marquee-track flex items-center gap-10 whitespace-nowrap" aria-hidden="true">
          {loop.map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light italic text-transparent [-webkit-text-stroke:1px_rgba(247,241,230,0.7)]">{t}</span>
              <span className="h-2 w-2 rotate-45 bg-vermilion" />
            </span>
          ))}
        </div>
        <ul className="sr-only">{partnerTypes.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <p className="eyebrow mb-10 text-ivory/60">How partnership is designed to work</p>
        <ol className="grid border-l border-ivory/15 md:grid-cols-3 md:border-l-0 lg:grid-cols-6">
          {partnerSteps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.07} className="relative border-ivory/15 py-6 pl-8 md:border-l md:py-0 md:pb-10 md:pl-6 md:pr-4 md:pt-2">
              <span aria-hidden="true" className="absolute -left-[5px] top-8 h-2.5 w-2.5 bg-marigold md:hidden" />
              <p className="font-display text-[3.4rem] font-light leading-none text-marigold">{s.n}</p>
              <h3 className="mt-4 text-[0.82rem] font-medium uppercase leading-snug tracking-[0.12em]">{s.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/65">{s.copy}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 border border-ivory/15 p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow text-marigold">Partner verification</p>
            <p className="font-display mt-4 text-[2rem] font-light leading-tight">Verified before they are visible.</p>
          </div>
          <p className="text-[0.98rem] leading-relaxed text-ivory/70">
            When BRIDLYA opens to partners, every business will be asked for legal and business information, and reviewed before it is presented to families. This is how the programme is designed to work. BRIDLYA is a prototype today: no partners have been onboarded or verified, and none are shown on this site.
          </p>
        </div>

        <div className="mt-12"><Button href="#contact-partner" variant="light">Become a BRIDLYA Partner</Button></div>
      </div>
    </section>
  )
}
