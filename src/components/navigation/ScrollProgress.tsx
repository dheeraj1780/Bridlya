import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <motion.div className="h-full origin-left bg-gradient-to-r from-vermilion via-marigold to-champagne" style={{ scaleX }} />
    </div>
  )
}
