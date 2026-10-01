import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { dayEvents } from '../../content/site'
import { Visual } from '../scenes/Visual'

export function DayExperience() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 40%', 'end 60%'] })
  const bg = useTransform(p, [0, 0.12, 0.45, 0.62, 0.72, 1], ['#f6dcc4', '#fbf3e3', '#f6e2b8', '#e9b78a', '#2a1020', '#241022'])
  const fg = useTransform(p, [0, 0.58, 0.7, 1], ['#1c1714', '#1c1714', '#f7f1e6', '#f7f1e6'])
  const [active, setActive] = useState(0)
  const ev = dayEvents[active]

  return (
    <motion.section ref={ref} aria-labelledby="day" style={reduce ? { backgroundColor: '#fbf3e3' } : { backgroundColor: bg, color: fg }} className="relative">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 pb-24 pt-24 sm:px-8 lg:grid-cols-[5.5fr_6.5fr] lg:gap-20 lg:px-12 lg:pb-40 lg:pt-36">
        <div className="lg:sticky lg:top-0 lg:h-[100svh] lg:py-20">
          <div className="flex h-full flex-col">
            <p className="eyebrow inline-flex w-fit items-center gap-3 border border-current px-4 py-2 !text-[0.64rem]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-vermilion" />Illustrative Experience
            </p>
            <h2 id="day" className="font-display mt-6 text-[clamp(2.2rem,3.9vw,4rem)] font-light leading-[0.98]">
              A day in the <em>BRIDLYA experience.</em>
            </h2>
            <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed opacity-75">
              A fictional wedding, followed hour by hour. Names, numbers and timings are invented for illustration.
            </p>
            <div className="mt-6">
              <p className="font-display text-[1.7rem] font-light italic leading-none">Ananya &amp; Arjun</p>
              <p className="eyebrow mt-3 opacity-70">Chennai · 450 Guests · December 2027</p>
            </div>
            <div className="relative mt-6 hidden min-h-0 flex-1 lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-t-[50%_14%]" role="img" aria-label={`${ev.title}`}>
                <AnimatePresence initial={false}>
                  <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: [0.22, 0.8, 0.2, 1] }}>
                    <Visual scene={ev.scene} sizes="40vw" />
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden="true" className="grain absolute inset-0" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-ivory">
                  <p className="font-display text-[clamp(3rem,5vw,5rem)] font-light leading-none">{ev.time}{ev.next && <span className="eyebrow ml-3 align-middle opacity-85">next day</span>}</p>
                  <p className="eyebrow mt-3 opacity-85">{ev.team}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ol className="relative">
          <div aria-hidden="true" className="absolute bottom-6 left-[0.35rem] top-6 w-px bg-current opacity-20" />
          {dayEvents.map((e, i) => <Moment key={e.title} i={i} onActive={setActive} />)}
        </ol>
      </div>
    </motion.section>
  )
}

function Moment({ i, onActive }: { i: number; onActive: (i: number) => void }) {
  const e = dayEvents[i]
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: '-42% 0px -42% 0px' })
  useEffect(() => { if (inView) onActive(i) }, [inView, i, onActive])
  return (
    <li ref={ref} className={`relative pl-9 transition-opacity duration-700 lg:flex lg:min-h-[56svh] lg:items-center ${inView ? 'opacity-100' : 'lg:opacity-35'} pb-14 lg:pb-0`}>
      <span aria-hidden="true" className={`absolute left-0 top-[0.55rem] h-3 w-3 rounded-full border border-current transition-all duration-700 lg:top-1/2 lg:-translate-y-1/2 ${inView ? 'scale-125 !border-vermilion bg-vermilion' : 'bg-transparent'}`} />
      <div className="max-w-md">
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-t-[45%_18%] lg:hidden" role="img" aria-label={e.title}>
          <Visual scene={e.scene} sizes="90vw" />
          <div aria-hidden="true" className="grain absolute inset-0" />
        </div>
        <p className="eyebrow flex items-center gap-3"><span aria-hidden="true" className="h-px w-6 bg-vermilion" />{e.next ? 'Next day · ' : ''}{e.time}</p>
        <h3 className="font-display mt-2 text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.02]">{e.title}</h3>
        <p className="mt-4 text-[1rem] leading-relaxed opacity-80">{e.copy}</p>
        <p className="eyebrow mt-5 !text-[0.62rem] opacity-60">{e.team}</p>
      </div>
    </li>
  )
}
