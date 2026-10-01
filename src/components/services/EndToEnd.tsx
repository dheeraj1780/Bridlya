import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { timeline } from '../../content/site'
import { Eyebrow } from '../ui/Reveal'
import { Visual } from '../scenes/Visual'

export function EndToEnd() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress: p } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] })
  return (
    <section id="approach" aria-labelledby="e2e" className="relative overflow-hidden bg-vermilion-deep text-ivory">
      <div aria-hidden="true" className="absolute inset-0 opacity-25 mix-blend-soft-light"><Visual scene="silk" /></div>
      <div className="relative mx-auto grid max-w-[1500px] gap-14 px-5 py-28 sm:px-8 lg:grid-cols-[4.5fr_7.5fr] lg:gap-20 lg:px-12 lg:py-40">
        <div>
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="mb-8 text-champagne">End to end</Eyebrow>
            <h2 id="e2e" className="font-display text-[clamp(2.6rem,6vw,5.8rem)] font-light leading-[0.98]">
              From a first idea to a <em className="text-champagne">farewell.</em>
            </h2>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ivory/80">
              The BRIDLYA team coordinates the moving pieces, so the family does not spend the wedding week chasing vendors. Ten stages, one team, one thread of record.
            </p>
          </div>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-[0.55rem] top-0 w-px bg-ivory/15 sm:left-[0.7rem]">
            <motion.div className="h-full w-full origin-top bg-champagne" style={{ scaleY: p }} />
          </div>
          <ol ref={listRef} className="space-y-3 sm:space-y-6">
            {timeline.map((t, i) => <Stage key={t.name} i={i} name={t.name} copy={t.copy} />)}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Stage({ i, name, copy }: { i: number; name: string; copy: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 85%', 'start 45%'] })
  const o = useTransform(p, [0, 1], [0.22, 1])
  const x = useTransform(p, [0, 1], [24, 0])
  const dot = useTransform(p, [0, 1], [0.4, 1])
  return (
    <motion.li ref={ref} style={reduce ? undefined : { opacity: o }} className="relative grid grid-cols-[1.6rem_1fr] gap-x-5 pb-4 sm:grid-cols-[2rem_1fr] sm:gap-x-8 sm:pb-8">
      <motion.span aria-hidden="true" style={reduce ? undefined : { scale: dot }} className="mt-[1.1rem] block h-3 w-3 rounded-full border border-champagne bg-vermilion-deep sm:mt-[1.7rem] sm:h-3.5 sm:w-3.5" />
      <motion.div style={reduce ? undefined : { x }} className="grid gap-x-10 gap-y-2 md:grid-cols-[1fr_1fr] md:items-end">
        <div className="flex items-baseline gap-4">
          <span className="eyebrow !text-[0.62rem] text-champagne">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="font-display text-[clamp(2.4rem,5.2vw,5rem)] font-light leading-none">{name}</h3>
        </div>
        <p className="max-w-sm pb-1 text-[0.98rem] leading-relaxed text-ivory/75">{copy}</p>
      </motion.div>
    </motion.li>
  )
}
