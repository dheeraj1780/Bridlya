import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from '../ui/Reveal'

const rings = [
  { name: 'Where we begin', items: ['Wedding planning', 'Guest experience'] },
  { name: 'Growing outward', items: ['Destination travel', 'Honeymoon planning', 'Couple experiences'] },
  { name: 'Further out', items: ['Family celebrations', 'Anniversaries', 'Private events', 'Hospitality', 'Travel partnerships'] },
]

export function Future() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const s1 = useTransform(p, [0.1, 0.4], [0.2, 1])
  const s2 = useTransform(p, [0.25, 0.6], [0.2, 1])
  const s3 = useTransform(p, [0.4, 0.8], [0.2, 1])
  const o1 = useTransform(p, [0.1, 0.3], [0, 1])
  const o2 = useTransform(p, [0.25, 0.5], [0, 1])
  const o3 = useTransform(p, [0.4, 0.7], [0, 1])
  const sc = [s1, s2, s3]
  const op = [o1, o2, o3]
  return (
    <section ref={ref} aria-labelledby="future" className="relative overflow-hidden bg-paper py-28 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Eyebrow className="mb-8 justify-center text-vermilion">The future</Eyebrow>
        <h2 id="future" className="font-display mx-auto text-center text-[clamp(2.3rem,6.4vw,6.4rem)] font-light leading-[1]">
          Today, a wedding.<br /><em className="text-vermilion">Tomorrow, an entire celebration ecosystem.</em>
        </h2>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-[640px] lg:mt-24" aria-hidden="true">
          {[100, 70, 40].map((size, k) => {
            const i = 2 - k
            const off = `${(100 - size) / 2}%`
            return (
              <motion.div key={size} style={{ width: `${size}%`, left: off, top: off, ...(reduce ? {} : { scale: sc[i], opacity: op[i] }) }} className="absolute aspect-square rounded-full border border-vermilion/50 bg-vermilion/[0.03]">
                <span className="eyebrow absolute left-1/2 top-3 -translate-x-1/2 !text-[0.56rem] text-vermilion">{rings[i].name}</span>
              </motion.div>
            )
          })}
          <div className="absolute left-1/2 top-1/2 flex aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-vermilion text-ivory">
            <span className="font-display text-[clamp(1rem,2.4vw,1.8rem)] italic">a wedding</span>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-ink/15 pt-12 md:grid-cols-3">
          {rings.map((r, i) => (
            <div key={r.name}>
              <p className="eyebrow text-vermilion">{String(i + 1).padStart(2, '0')} · {r.name}</p>
              <ul className="mt-5 space-y-2">
                {r.items.map((it) => <li key={it} className="font-display text-[1.7rem] font-light leading-tight">{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-xl text-[0.9rem] leading-relaxed text-ink-soft">A direction of travel, not a roadmap or a promise of availability.</p>
      </div>
    </section>
  )
}
