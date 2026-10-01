import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { ecosystemNodes } from '../../content/site'
import { useIsDesktop } from '../../lib/hooks'
import { Eyebrow } from '../ui/Reveal'

const N = ecosystemNodes.length
const R = 34 // % of box

function pos(i: number) {
  const a = -Math.PI / 2 + (i / N) * Math.PI * 2
  return { a, x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R, c: Math.cos(a) }
}

export function Ecosystem() {
  const desktop = useIsDesktop()
  return (
    <section id="what-we-do" aria-labelledby="eco-title" className="relative bg-paper">
      <EcoInner key={desktop ? 'd' : 'm'} pinned={desktop} />
    </section>
  )
}

function EcoInner({ pinned }: { pinned: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: pinned ? ['start start', 'end end'] : ['start 75%', 'end 55%'] })
  const [lit, setLit] = useState(reduce ? N : 0)
  useMotionValueEvent(p, 'change', (v) => setLit(Math.max(0, Math.min(N, Math.floor((v - 0.08) / 0.7 * N + 1)))))
  const cur = reduce ? N : lit
  const unity = useTransform(p, [0.78, 0.92], [0, 1])
  const headO = useTransform(p, [0.72, 0.86], [0.18, 1])
  const coreO = useTransform(p, [0, 0.08], [0.4, 1])

  return (
    <div ref={ref} className={pinned ? 'h-[300svh]' : ''}>
      <div className={`${pinned ? 'sticky top-0 flex h-[100svh] items-center' : 'py-24'} overflow-hidden`}>
        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[5fr_7fr] lg:gap-6 lg:px-12">
          <div>
            <Eyebrow className="mb-7 text-vermilion">The BRIDLYA ecosystem</Eyebrow>
            <h2 id="eco-title" className="font-display text-[clamp(2.6rem,6.2vw,6rem)] font-light leading-[0.98]">
              <motion.span style={reduce ? undefined : { opacity: headO }} className="block">Many specialists.</motion.span>
              <motion.em style={reduce ? undefined : { opacity: headO }} className="block text-vermilion">One experience.</motion.em>
            </h2>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
              Venues, kitchens, florists, drivers, musicians and hotels are all independent businesses. BRIDLYA does not replace them. It connects them around one family, and holds the whole together.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 sm:hidden" aria-label="Parts of the ecosystem">
              {ecosystemNodes.map((n, i) => (
                <li key={n} className={`flex items-center gap-2 text-[0.8rem] transition-all duration-700 ${i < cur ? 'text-ink' : 'text-ink/25'}`}>
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-700 ${i < cur ? 'bg-vermilion' : 'bg-ink/20'}`} />{n}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[min(82svh,100%)]" role="img" aria-label="Diagram: a couple and family at the centre, connected to fourteen kinds of wedding specialist">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <motion.circle cx="50" cy="50" r={R} fill="none" stroke="#b3261e" strokeWidth="0.18" strokeDasharray="0.6 1.2" style={reduce ? undefined : { opacity: unity }} />
              {ecosystemNodes.map((n, i) => {
                const q = pos(i)
                const bend = (i % 2 ? 1 : -1) * 3
                const mx = 50 + Math.cos(q.a) * R * 0.5 - Math.sin(q.a) * bend
                const my = 50 + Math.sin(q.a) * R * 0.5 + Math.cos(q.a) * bend
                return <Thread key={n} d={`M50 50Q${mx} ${my} ${q.x} ${q.y}`} p={p} i={i} reduce={!!reduce} />
              })}
            </svg>
            <motion.div style={reduce ? undefined : { opacity: coreO }} className="absolute left-1/2 top-1/2 flex aspect-square w-[21%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-vermilion text-center text-ivory shadow-[0_0_0_10px_rgba(179,38,30,0.08),0_0_0_26px_rgba(179,38,30,0.05)]">
              <span className="font-display text-[clamp(0.9rem,2vw,1.7rem)] italic leading-tight">Couple<br />& Family</span>
            </motion.div>
            {ecosystemNodes.map((n, i) => {
              const q = pos(i)
              const on = i < cur
              const side = q.c > 0.35 ? 'left-full ml-3 text-left' : q.c < -0.35 ? 'right-full mr-3 text-right' : q.y < 50 ? 'bottom-full mb-2.5 -translate-x-1/2 left-1/2 text-center' : 'top-full mt-2.5 -translate-x-1/2 left-1/2 text-center'
              return (
                <div key={n} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${q.x}%`, top: `${q.y}%` }}>
                  <span className={`block h-2.5 w-2.5 rounded-full border transition-all duration-700 ease-silk ${on ? 'scale-100 border-vermilion bg-vermilion' : 'scale-50 border-ink/20 bg-transparent'}`} />
                  <span className="sr-only">{n}</span>
                  <span aria-hidden="true" className={`eyebrow absolute hidden whitespace-nowrap !text-[0.62rem] transition-all duration-700 ease-silk sm:block lg:!text-[0.66rem] ${side} ${on ? 'text-ink opacity-100' : 'text-ink/30 opacity-60'}`}>{n}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function Thread({ d, p, i, reduce }: { d: string; p: MotionValue<number>; i: number; reduce: boolean }) {
  const s = 0.08 + (i / N) * 0.7
  const len = useTransform(p, [s, s + 0.08], [0, 1])
  return <motion.path d={d} fill="none" stroke="#b3261e" strokeWidth="0.22" strokeLinecap="round" style={{ pathLength: reduce ? 1 : len, opacity: 0.55 }} />
}
