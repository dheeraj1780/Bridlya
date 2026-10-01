import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { traditions, type Tradition } from '../../content/site'
import { useIsDesktop } from '../../lib/hooks'
import { Eyebrow, LineReveal } from '../ui/Reveal'
import { Visual } from '../scenes/Visual'

export function Traditions() {
  const desktop = useIsDesktop()
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="personal" className="relative bg-ivory">
      {desktop && !reduce ? <Horizontal /> : <Swipe />}
    </section>
  )
}

function Intro() {
  return (
    <div>
      <Eyebrow className="mb-8 text-vermilion">Weddings are personal</Eyebrow>
      <LineReveal as="h2" lineClassName="" className="font-display text-[clamp(2.6rem,6.4vw,6.4rem)] font-light leading-[0.98]" lines={['No two families', <em key="c" className="text-vermilion">celebrate the same way.</em>]} />
      <p className="font-display mt-8 max-w-md text-[1.5rem] font-light italic leading-snug text-ink-soft sm:text-[1.7rem]">
        Tradition changes from family to family, community to community, and generation to generation.
      </p>
      <p id="personal" className="sr-only">Weddings are personal</p>
    </div>
  )
}

function Outro() {
  return (
    <div className="max-w-sm">
      <p className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-[1.05]">
        BRIDLYA adapts the experience around you, <em className="text-vermilion">not the other way around.</em>
      </p>
      <p className="eyebrow mt-8 text-ink-soft">Ten examples. Not a checklist. Yours may be none of them.</p>
    </div>
  )
}

function Arch({ t, i, w }: { t: Tradition; i: number; w: string }) {
  return (
    <figure className={`group relative shrink-0 ${w}`}>
      <div className="relative aspect-[3/4.1] overflow-hidden rounded-t-full">
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.07]"><Visual scene={t.scene} label={t.name} sizes="30vw" /></div>
        <div aria-hidden="true" className="grain absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-80" />
        <span className="eyebrow absolute inset-x-0 bottom-5 text-center !text-[0.62rem] text-ivory/85">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <figcaption className="mt-5 max-w-[17rem]">
        <h3 className="font-display text-[1.7rem] font-light leading-tight">{t.name}</h3>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{t.copy}</p>
      </figcaption>
    </figure>
  )
}

function Horizontal() {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(2000)
  useEffect(() => {
    const m = () => trackRef.current && setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    m()
    const ro = new ResizeObserver(m)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', m)
    return () => { ro.disconnect(); window.removeEventListener('resize', m) }
  }, [])
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(p, [0, 1], [0, -dist])
  const bar = useTransform(p, [0, 1], [0, 1])
  return (
    <div ref={ref} style={{ height: `calc(100svh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-[5vw] pl-12 pr-[12vw] will-change-transform">
          <div className="w-[34vw] shrink-0"><Intro /></div>
          {traditions.map((t, i) => <Arch key={t.name} t={t} i={i} w={i % 2 ? 'w-[21vw] mt-24' : 'w-[23vw] -mt-6'} />)}
          <div className="shrink-0 pl-[3vw]"><Outro /></div>
        </motion.div>
        <div aria-hidden="true" className="absolute inset-x-12 bottom-10 h-px bg-ink/10"><motion.div className="h-full origin-left bg-vermilion" style={{ scaleX: bar }} /></div>
      </div>
    </div>
  )
}

function Swipe() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12"><Intro /></div>
      <div className="hide-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8" tabIndex={0} role="region" aria-label="Wedding traditions, swipe to explore">
        {traditions.map((t, i) => <div key={t.name} className="snap-center"><Arch t={t} i={i} w="w-[72vw] max-w-[320px] sm:w-[40vw]" /></div>)}
      </div>
      <div className="mx-auto mt-14 max-w-[1500px] px-5 sm:px-8 lg:px-12"><Outro /></div>
    </div>
  )
}
