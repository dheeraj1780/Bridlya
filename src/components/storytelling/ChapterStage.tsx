import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { chapters, type Chapter } from '../../content/site'
import { useIsDesktop } from '../../lib/hooks'
import { Eyebrow, LineReveal } from '../ui/Reveal'
import { Visual } from '../scenes/Visual'

const N = chapters.length
const num = (i: number) => String(i + 1).padStart(2, '0')

export function ChapterStage() {
  const desktop = useIsDesktop()
  const reduce = useReducedMotion()
  return (
    <section id="experience" aria-labelledby="reimagined" className="relative bg-ivory">
      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-24 lg:pt-36">
        <Eyebrow className="mb-8 text-vermilion">Chapter by chapter</Eyebrow>
        <LineReveal as="h2" className="font-display text-[clamp(2.6rem,7.4vw,7rem)] font-light leading-[0.98]" lines={['The wedding,', <em key="r" className="text-vermilion">reimagined.</em>]} />
        <p className="mt-8 max-w-xl text-[1.05rem] text-ink-soft sm:text-lg">
          Twelve parts of a celebration, usually bought from twelve different places. Here they read as one story, told in order.
        </p>
      </div>
      {desktop && !reduce ? <PinnedStage /> : <StackedChapters />}
    </section>
  )
}

function PinnedStage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))))))
  const c = chapters[active]

  return (
    <div ref={ref} style={{ height: `${N * 80 + 100}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid h-[84svh] w-full max-w-[1500px] grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 px-12">
          <div className="relative flex flex-col justify-between py-4">
            <ol className="flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Chapters">
              {chapters.map((ch, i) => (
                <li key={ch.label} aria-current={i === active ? 'step' : undefined} className={`eyebrow !text-[0.62rem] transition-all duration-700 ${i === active ? 'text-vermilion' : 'text-ink/30'}`}>
                  {num(i)}
                </li>
              ))}
            </ol>
            <div>
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}>
                  <p className="font-display text-[clamp(6rem,11vw,11rem)] font-light leading-[0.8] text-vermilion/90">{num(active)}</p>
                  <p className="eyebrow mt-8 flex items-center gap-4 text-ink-soft">
                    <span aria-hidden="true" className="h-px w-8 bg-vermilion" />{c.chapter} · {c.label}
                  </p>
                  <h3 className="font-display mt-4 text-[clamp(2.4rem,4.4vw,4.4rem)] font-light leading-[1.02]">{c.title}</h3>
                  <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">{c.copy}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="h-px w-full bg-ink/10">
              <motion.div className="h-full origin-left bg-vermilion" style={{ scaleX: p }} />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-t-[50%_18%]" role="img" aria-label={`${c.label}: ${c.title}`}>
            {chapters.map((ch, i) => (i >= active - 1 && i <= active + 2 ? <Layer key={ch.label} ch={ch} i={i} p={p} /> : null))}
            <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Layer({ ch, i, p }: { ch: Chapter; i: number; p: MotionValue<number> }) {
  const a = Math.max(0, (i - 1) / (N - 1))
  const b = i / (N - 1)
  const clip = useTransform(p, i === 0 ? [0, 1] : [a, b], i === 0 ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const scale = useTransform(p, i === 0 ? [0, b] : [a, b + 1 / (N - 1)], [1.18, 1])
  return (
    <motion.div className="absolute inset-0" style={{ clipPath: clip, zIndex: i }}>
      <motion.div className="h-full w-full will-change-transform" style={{ scale }}>
        <Visual scene={ch.scene} sizes="60vw" />
      </motion.div>
    </motion.div>
  )
}

/** Touch / tablet / small screens: full-bleed chapters that stack over one another like pages. */
function StackedChapters() {
  return (
    <div>
      {chapters.map((ch, i) => (
        <article key={ch.label} className="sticky top-0 h-[100svh] overflow-hidden bg-ink text-ivory" aria-label={`${ch.label}: ${ch.title}`}>
          <div className="absolute inset-0"><Visual scene={ch.scene} /></div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div aria-hidden="true" className="grain absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-2xl px-6 pb-16 sm:px-12 sm:pb-20">
            <Reveal2>
              <p className="font-display text-7xl font-light leading-none text-champagne/90">{num(i)}</p>
              <p className="eyebrow mt-5 text-ivory/80">{ch.chapter} · {ch.label}</p>
              <h3 className="font-display mt-3 text-[2.6rem] font-light leading-[1.02] sm:text-6xl">{ch.title}</h3>
              <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ivory/85 sm:text-lg">{ch.copy}</p>
            </Reveal2>
          </div>
        </article>
      ))}
    </div>
  )
}

function Reveal2({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.4, once: true }} transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}
