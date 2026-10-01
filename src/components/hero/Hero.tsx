import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import { Visual } from '../scenes/Visual'
import { SilkCurtain } from './SilkCurtain'

const ease = (t: number) => t * t * (3 - 2 * t)

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: P } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // A small automatic parting on load so the first frame already glows through the seam.
  const intro = useMotionValue(0)
  useEffect(() => {
    if (reduce) return
    const c = animate(intro, 0.05, { duration: 2.4, delay: 0.3, ease: [0.22, 0.8, 0.2, 1] })
    return () => c.stop()
  }, [intro, reduce])

  const open = useTransform([P, intro], ([p, i]: number[]) => (reduce ? 1 : Math.max(i, ease(Math.min(1, p / 0.55)))))

  const sceneScale = useTransform(P, [0, 0.7], [1.28, 1])
  const sceneBlur = useTransform(P, [0, 0.45], [10, 0])
  const sceneFilter = useTransform(sceneBlur, (b) => `blur(${b.toFixed(1)}px) saturate(${1 + (10 - b) * 0.02})`)
  const markScale = useTransform(P, [0, 0.6], [0.88, 1])
  const markY = useTransform(P, [0, 0.6], ['2vh', '0vh'])
  const tagO = useTransform(P, [0.34, 0.5], [0, 1])
  const tagY = useTransform(P, [0.34, 0.5], [28, 0])
  const subO = useTransform(P, [0.44, 0.58], [0, 1])
  const ctaO = useTransform(P, [0.54, 0.68], [0, 1])
  const ctaY = useTransform(P, [0.54, 0.68], [24, 0])
  const cueO = useTransform(P, [0, 0.08], [1, 0])
  const mist = useTransform(P, [0.8, 1], ['100%', '0%'])
  const mistO = useTransform(P, [0.78, 0.84], [0, 1])

  if (reduce) {
    return (
      <section id="top" aria-label="BRIDLYA" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden text-ivory">
        <div className="absolute inset-0"><Visual scene="dawn" /></div>
        <HeroCopy tag />
      </section>
    )
  }

  return (
    <section id="top" ref={ref} aria-label="BRIDLYA" className="relative h-[330svh] sm:h-[360svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-vermilion-deep text-ivory">
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: sceneScale, filter: sceneFilter }}>
          <Visual scene="dawn" />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(30,8,24,0.45),transparent_62%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <motion.div style={{ scale: markScale, y: markY }} className="relative">
            <h1 className="font-display text-[clamp(3.3rem,16.4vw,13.5rem)] font-light leading-none tracking-[0.1em] [text-shadow:0_2px_60px_rgba(40,8,20,0.45)]">
              <span className="sr-only">BRIDLYA — </span>
              <span aria-hidden="true" className="ml-[0.1em]">BRIDLYA</span>
            </h1>
          </motion.div>
          <motion.p style={{ opacity: tagO, y: tagY }} className="font-display mt-5 text-[clamp(1.6rem,4.4vw,3.4rem)] font-light italic leading-tight">
            Where Forever Begins.
          </motion.p>
          <motion.p style={{ opacity: subO }} className="eyebrow mt-6 max-w-[26rem] !normal-case !tracking-[0.12em] text-ivory/85 sm:max-w-none sm:!text-[0.8rem]">
            Every detail, beautifully brought together.
          </motion.p>
          <motion.div style={{ opacity: ctaO, y: ctaY }} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button href="#contact" variant="light">Begin Your Wedding Story</Button>
            <Button href="#experience" variant="ghost">Explore the BRIDLYA Experience</Button>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10" style={{ contain: 'strict' }}>
          <SilkCurtain progress={open} />
        </div>

        <motion.div style={{ opacity: cueO }} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-4 px-6 pb-8 text-ivory">
          <p className="eyebrow !tracking-[0.34em] text-center">Scroll to part the curtain</p>
          <span aria-hidden="true" className="relative h-14 w-px overflow-hidden bg-ivory/30">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_2.4s_ease-in-out_infinite] bg-ivory" />
          </span>
        </motion.div>
        <motion.p style={{ opacity: cueO }} className="eyebrow pointer-events-none absolute bottom-9 left-8 z-20 hidden max-w-[16rem] !normal-case !tracking-[0.08em] text-ivory/75 lg:block">
          An orchestration layer for the Indian wedding ecosystem.
        </motion.p>

        <motion.div aria-hidden="true" style={{ y: mist, opacity: mistO }} className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[70%] bg-gradient-to-t from-ivory via-ivory/90 to-transparent" />
      </div>
    </section>
  )
}

function HeroCopy({ tag }: { tag?: boolean }) {
  return (
    <div className="relative z-10 flex flex-col items-center px-5 py-32 text-center">
      <h1 className="font-display text-[clamp(3.3rem,16.4vw,13.5rem)] font-light leading-none tracking-[0.1em]">BRIDLYA</h1>
      {tag && <p className="font-display mt-5 text-[clamp(1.6rem,4.4vw,3.4rem)] font-light italic">Where Forever Begins.</p>}
      <p className="eyebrow mt-6 !normal-case !tracking-[0.12em]">Every detail, beautifully brought together.</p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button href="#contact" variant="light">Begin Your Wedding Story</Button>
        <Button href="#experience" variant="ghost">Explore the BRIDLYA Experience</Button>
      </div>
    </div>
  )
}
