import { trust } from '../../content/site'
import { Eyebrow, LineReveal, Reveal } from '../ui/Reveal'

export function Trust() {
  return (
    <section aria-labelledby="trust" className="relative bg-ivory py-28 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Eyebrow className="mb-8 text-vermilion">Trust &amp; operations</Eyebrow>
        <LineReveal as="h2" className="font-display max-w-5xl text-[clamp(2.4rem,6vw,6rem)] font-light leading-[1]" lines={['Beautiful weddings need', <em key="s" className="text-vermilion">serious operations</em>, 'behind them.']} />
        <span id="trust" className="sr-only">Trust and operations</span>
        <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
          BRIDLYA is not a directory of listings. These are the operating principles it is being built on. They are commitments to design towards, not certifications held today.
        </p>
        <ol className="mt-16 grid gap-x-12 border-t border-ink/20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {trust.map(([t, c], i) => (
            <Reveal as="li" key={t} delay={(i % 3) * 0.08} className="border-b border-ink/15 py-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[1.75rem] font-light leading-tight">{t}</h3>
                <span className="eyebrow !text-[0.6rem] text-vermilion">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft">{c}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
