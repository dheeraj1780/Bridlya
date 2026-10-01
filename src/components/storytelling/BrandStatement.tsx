import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { statement } from '../../content/site'
import { Eyebrow, ScrubWord } from '../ui/Reveal'
import { Visual } from '../scenes/Visual'

export function BrandStatement() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const words = statement.flatMap((line, li) => line.split(' ').map((w) => ({ w, li })))
  const n = words.length
  const bodyO = useTransform(p, [0.62, 0.78], [0, 1])
  const bodyY = useTransform(p, [0.62, 0.78], [30, 0])
  const archClip = useTransform(p, [0.1, 0.7], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const archY = useTransform(p, [0, 1], ['10%', '-10%'])
  const archImgScale = useTransform(p, [0.1, 1], [1.4, 1])
  const rule = useTransform(p, [0.05, 0.6], [0, 1])

  return (
    <section ref={ref} aria-labelledby="statement" className={`relative bg-ivory ${reduce ? 'py-28' : 'h-[260svh]'}`}>
      <div className={`${reduce ? '' : 'sticky top-0 h-[100svh]'} flex items-center overflow-hidden`}>
        <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.9fr_0.55fr] lg:px-12">
          <div>
            <Eyebrow className="mb-8 text-vermilion">The BRIDLYA philosophy</Eyebrow>
            <h2 id="statement" className="font-display text-[clamp(2.1rem,5vw,5.2rem)] font-light leading-[1.02] text-ink">
              {statement.map((_, li) => (
                <span key={li} className="block">
                  {words.map((x, i) => (x.li === li ? (
                    <span key={i}>
                      {reduce ? x.w : <ScrubWord progress={p} range={[0.04 + (i / n) * 0.5, 0.1 + (i / n) * 0.5]}>{x.w}</ScrubWord>}{' '}
                    </span>
                  ) : null))}
                </span>
              ))}
            </h2>
            <motion.div style={reduce ? undefined : { opacity: bodyO, y: bodyY }} className="mt-10 grid max-w-3xl gap-6 sm:mt-14">
              <motion.span aria-hidden="true" style={{ scaleX: reduce ? 1 : rule }} className="block h-px w-24 origin-left bg-vermilion" />
              <p className="text-[1.05rem] leading-relaxed text-ink-soft sm:text-[1.2rem]">
                From the first venue conversation to the final farewell, BRIDLYA brings the people, places, experiences and details of your celebration into one carefully orchestrated journey.
              </p>
            </motion.div>
          </div>
          <div className="relative hidden lg:block">
            <motion.div style={reduce ? undefined : { clipPath: archClip, y: archY }} className="absolute inset-x-0 top-1/2 aspect-[3/4] -translate-y-1/2 overflow-hidden rounded-t-[50%_32%]">
              <motion.div style={reduce ? undefined : { scale: archImgScale }} className="h-full w-full">
                <Visual scene="flowers" label="Marigold and rose florals in deep red light" sizes="30vw" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
