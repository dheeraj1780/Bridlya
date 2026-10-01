import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Visual } from '../scenes/Visual'

export function PromiseStatement() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(p, [0, 1], ['-8%', '8%'])
  const o1 = useTransform(p, [0.28, 0.42], [0, 1])
  const o2 = useTransform(p, [0.4, 0.55], [0, 1])
  const y1 = useTransform(p, [0.28, 0.42], [40, 0])
  const y2 = useTransform(p, [0.4, 0.55], [40, 0])
  const ring = useTransform(p, [0.2, 0.7], [0.4, 1.3])
  return (
    <section ref={ref} aria-label="The promise" className="relative flex min-h-[110svh] items-center justify-center overflow-hidden bg-vermilion-deep text-ivory">
      <motion.div style={reduce ? undefined : { y: bgY }} className="absolute -inset-y-[10%] inset-x-0 opacity-90">
        <Visual scene="silk" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,6,6,0.55),rgba(40,6,6,0.1)_70%)]" />
      <svg aria-hidden="true" viewBox="0 0 800 800" className="pointer-events-none absolute left-1/2 top-1/2 w-[140vmin] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40">
        {[120, 190, 260, 330, 400].map((r, i) => (
          <motion.circle key={r} cx="400" cy="400" r={r} fill="none" stroke="#f4dba6" strokeWidth="0.8" style={reduce ? undefined : { scale: ring, transformOrigin: '400px 400px', opacity: 1 - i * 0.16 }} />
        ))}
      </svg>
      <div className="relative z-10 px-5 text-center">
        <motion.p style={reduce ? undefined : { opacity: o1, y: y1 }} className="font-display text-[clamp(2.6rem,8.4vw,8.4rem)] font-light italic leading-[1]">
          You celebrate.
        </motion.p>
        <motion.p style={reduce ? undefined : { opacity: o2, y: y2 }} className="font-display mt-2 text-[clamp(2.1rem,6.2vw,6.4rem)] font-light leading-[1.05]">
          We orchestrate everything<br className="hidden sm:block" /> around it.
        </motion.p>
        <p className="eyebrow mt-12 text-champagne">The BRIDLYA promise</p>
      </div>
    </section>
  )
}
