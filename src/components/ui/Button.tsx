import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost' | 'light' | 'ink'
  className?: string
  onClick?: () => void
}

const base =
  'group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-silk'

const variants = {
  solid: 'bg-vermilion text-ivory hover:text-vermilion-deep',
  ghost: 'border border-current text-current hover:text-ivory',
  light: 'bg-ivory text-vermilion-deep hover:text-ivory',
  ink: 'bg-ink text-ivory hover:text-ink',
}
const fills = {
  solid: 'bg-champagne',
  ghost: 'bg-vermilion',
  light: 'bg-vermilion-deep',
  ink: 'bg-champagne',
}

/** Link-as-button with a silk-wipe hover and a drifting arrow. */
export function Button({ href, children, variant = 'solid', className = '', onClick }: Props) {
  return (
    <a href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      <span aria-hidden="true" className={`absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-500 ease-silk group-hover:scale-y-100 group-focus-visible:scale-y-100 ${fills[variant]}`} />
      <span className="relative z-10">{children}</span>
      <svg className="relative z-10 h-3 w-5 transition-transform duration-500 ease-silk group-hover:translate-x-1.5" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M0 6h18M13 1l5 5-5 5" />
      </svg>
    </a>
  )
}
