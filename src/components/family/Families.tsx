import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { familyPoints } from '../../content/site'
import { Button } from '../ui/Button'
import { Eyebrow, LineReveal, Reveal } from '../ui/Reveal'
import { Visual } from '../scenes/Visual'

export function Families() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(p, [0, 1], ['-9%', '9%'])
  return (
    <section id="families" aria-labelledby="fam" className="relative overflow-hidden bg-[#efe2c4] py-28 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-12 lg:grid-cols-[7fr_5fr]">
          <div>
            <Eyebrow className="mb-8 text-vermilion">For families</Eyebrow>
            <LineReveal as="h2" className="font-display text-[clamp(2.8rem,8vw,8.4rem)] font-light leading-[0.94]" lines={['One celebration.', <em key="t" className="text-vermilion">One team to call.</em>]} />
            <span id="fam" className="sr-only">For families</span>
            <p className="mt-8 max-w-lg text-[1.08rem] leading-relaxed text-ink-soft">
              Planning an Indian wedding usually means becoming a project manager for forty businesses. BRIDLYA gives the family one team, one plan and one place to ask.
            </p>
          </div>
          <div ref={ref} className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full lg:max-w-none">
            <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0"><Visual scene="family" label="A family gathered under strings of light" sizes="40vw" /></motion.div>
            <div aria-hidden="true" className="grain absolute inset-0" />
          </div>
        </div>

        <ul className="mt-20 grid border-t border-ink/20 sm:grid-cols-2 lg:mt-28">
          {familyPoints.map((f, i) => (
            <Reveal as="li" key={f} delay={(i % 2) * 0.08} className={`group flex items-baseline gap-5 border-b border-ink/20 py-6 sm:py-8 ${i % 2 === 0 ? 'sm:pr-10' : 'sm:border-l sm:pl-10'}`}>
              <span className="eyebrow !text-[0.62rem] text-vermilion">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-[clamp(1.5rem,2.4vw,2.2rem)] font-light leading-tight transition-transform duration-500 ease-silk group-hover:translate-x-2">{f}</span>
            </Reveal>
          ))}
        </ul>
        <div className="mt-14"><Button href="#contact">Tell Us About Your Wedding</Button></div>
      </div>
    </section>
  )
}
