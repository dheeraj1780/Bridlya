import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../ui/Button'
import { Visual } from '../scenes/Visual'

const lines = ['The flowers will fade.', 'The music will end.', 'The guests will go home.', 'But the way it felt will stay.']

export function FinalMoment() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bgScale = useTransform(p, [0, 1], [1.2, 1])
  const linesO = useTransform(p, [0.52, 0.64], [1, 0])
  const linesY = useTransform(p, [0.52, 0.64], [0, -50])
  const finalO = useTransform(p, [0.64, 0.78], [0, 1])
  const finalY = useTransform(p, [0.64, 0.78], [40, 0])
  const veil = useTransform(p, [0.5, 0.7], [0.15, 0.55])

  if (reduce) {
    return (
      <section aria-label="Final moment" className="relative overflow-hidden bg-ink py-32 text-center text-ivory">
        <div className="absolute inset-0"><Visual scene="night" /></div>
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          {lines.map((l) => <p key={l} className="font-display text-4xl font-light leading-tight sm:text-6xl">{l}</p>)}
          <Closing />
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} aria-label="Final moment" className="relative h-[380svh] bg-ink text-ivory">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale: bgScale }} className="absolute inset-0"><Visual scene="night" /></motion.div>
        <motion.div aria-hidden="true" style={{ opacity: veil }} className="absolute inset-0 bg-black" />
        <div aria-hidden="true" className="grain absolute inset-0" />
        <motion.div style={{ opacity: linesO, y: linesY }} className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center sm:gap-4">
          {lines.map((l, i) => <Line key={l} text={l} i={i} p={p} last={i === lines.length - 1} />)}
        </motion.div>
        <motion.div style={{ opacity: finalO, y: finalY }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <Closing />
        </motion.div>
      </div>
    </section>
  )
}

function Line({ text, i, p, last }: { text: string; i: number; p: ReturnType<typeof useScroll>['scrollYProgress']; last: boolean }) {
  const s = 0.04 + i * 0.12
  const o = useTransform(p, [s, s + 0.1], [0, 1])
  const y = useTransform(p, [s, s + 0.1], [24, 0])
  return (
    <motion.p style={{ opacity: o, y }} className={`font-display text-[clamp(1.9rem,5.8vw,5.6rem)] font-light leading-[1.05] ${last ? 'mt-4 italic text-champagne' : ''}`}>
      {text}
    </motion.p>
  )
}

function Closing() {
  return (
    <>
      <p className="font-display text-[clamp(3rem,13vw,11rem)] font-light leading-none tracking-[0.1em]"><span className="ml-[0.1em]">BRIDLYA</span></p>
      <p className="font-display mt-3 text-[clamp(1.5rem,3.6vw,2.8rem)] font-light italic text-champagne">Where Forever Begins.</p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button href="#contact" variant="light">Begin Your Wedding Story</Button>
        <Button href="#contact-partner" variant="ghost">Partner With BRIDLYA</Button>
      </div>
    </>
  )
}
