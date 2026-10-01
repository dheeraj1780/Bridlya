import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { nav } from '../../content/site'
import { Button } from '../ui/Button'

export function Navigation() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => { const h = document.getElementById('top'); setSolid(window.scrollY > (h ? h.offsetHeight - window.innerHeight * 0.55 : window.innerHeight)) }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a,button')
        const items = [toggleRef.current!, ...f]
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const tone = solid || open ? 'text-ink' : 'text-ivory'

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[80] bg-ivory px-4 py-2 text-sm text-ink">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk ${solid ? 'bg-ivory/80 py-3 shadow-[0_1px_0_rgba(28,23,20,0.08)] backdrop-blur-xl' : 'py-6'} ${open ? '!bg-ivory' : ''}`}>
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="BRIDLYA, back to top" className={`font-display text-[1.7rem] font-medium tracking-[0.34em] transition-colors duration-500 ${tone}`}>
            BRIDLYA
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-9 xl:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className={`group relative text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${tone}`}>
                {n.label}
                <span aria-hidden="true" className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-silk group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden xl:block">
              <Button href="#contact" variant={solid ? 'solid' : 'light'} className="!px-6 !py-3">Begin Your Wedding Story</Button>
            </div>
            <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)} className={`relative z-[70] flex h-11 w-11 items-center justify-center xl:hidden ${tone}`}>
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-silk ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-silk ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" ref={panelRef} role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[55] flex flex-col justify-center bg-ivory px-8 pb-10 pt-28" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}>
            <ul className="space-y-1">
              {nav.map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.7 }}>
                  <a href={n.href} onClick={() => setOpen(false)} className="font-display block py-1.5 text-[2.6rem] font-light leading-tight text-ink">
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10" onClick={() => setOpen(false)}>
              <Button href="#contact">Begin Your Wedding Story</Button>
            </div>
            <p className="eyebrow mt-auto pt-10 text-ink-soft">Where Forever Begins.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
