import { motion, useReducedMotion, type MotionValue, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 0.8, 0.2, 1] as const

/** Fade + rise on enter. Respects reduced motion by rendering static. */
export function Reveal({ children, delay = 0, className = '', as = 'div', y = 28 }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'p' | 'li' | 'span'; y?: number }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  if (reduce) return <M className={className}>{children}</M>
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -12% 0px' }} transition={{ duration: 1, delay, ease }}>
      {children}
    </M>
  )
}

/** Headline that reveals line by line from behind a mask. Pass lines explicitly for art-directed breaks. */
export function LineReveal({ lines, className = '', lineClassName = '', delay = 0, as: Tag = 'h2' }: { lines: ReactNode[]; className?: string; lineClassName?: string; delay?: number; as?: 'h1' | 'h2' | 'h3' | 'p' }) {
  const reduce = useReducedMotion()
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          {reduce ? (
            <span className={`block ${lineClassName}`}>{l}</span>
          ) : (
            <motion.span className={`block ${lineClassName}`} initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: 1.1, delay: delay + i * 0.12, ease }}>
              {l}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  )
}

/** A word whose opacity is scrubbed by scroll progress. */
export function ScrubWord({ children, progress, range }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${className}`}>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  )
}
