import { roles } from '../../content/site'
import { Eyebrow, LineReveal, Reveal } from '../ui/Reveal'
import { Visual } from '../scenes/Visual'

export function People() {
  return (
    <section aria-labelledby="people" className="relative bg-paper py-28 lg:py-44">
      <div className="mx-auto grid max-w-[1500px] gap-16 px-5 sm:px-8 lg:grid-cols-[5fr_7fr] lg:gap-24 lg:px-12">
        <div className="relative">
          <Eyebrow className="mb-8 text-vermilion">The people behind the moment</Eyebrow>
          <LineReveal as="h2" className="font-display text-[clamp(2.2rem,4.4vw,4.4rem)] font-light leading-[1.04]" lines={['Technology helps us', 'organise the celebration.', <em key="p" className="text-vermilion">People make sure it</em>, <em key="p2" className="text-vermilion">happens beautifully.</em>]} />
          <span id="people" className="sr-only">The people behind the moment</span>
          <Reveal className="relative mt-12 hidden aspect-[4/5] max-w-md overflow-hidden rounded-t-full lg:block" delay={0.1}>
            <Visual scene="coordination" label="A run sheet of overlapping tasks, lit in marigold and red" sizes="30vw" />
            <div aria-hidden="true" className="grain absolute inset-0" />
          </Reveal>
        </div>
        <ul className="divide-y divide-ink/12 border-y border-ink/12 self-start">
          {roles.map((r, i) => (
            <li key={r.title} className="group grid gap-3 py-7 transition-colors duration-500 hover:bg-champagne/30 focus-within:bg-champagne/30 sm:grid-cols-[3.2rem_1fr_1fr] sm:items-baseline sm:gap-6 sm:px-3">
              <span className="eyebrow !text-[0.62rem] text-vermilion">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-[clamp(1.8rem,3vw,2.7rem)] font-light leading-tight transition-transform duration-500 ease-silk group-hover:translate-x-2">{r.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">{r.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
