import { memo, useId } from 'react'
import { Frame } from './primitives'
import { builders, type SceneKey } from './scenes'
import { imageOverrides } from '../../content/images'

type Props = {
  scene: SceneKey
  /** Accessible description; leave empty for purely decorative imagery. */
  label?: string
  className?: string
  /** Hint for browsers when a photographic override is supplied. */
  sizes?: string
}

/**
 * The single seam for imagery. By default it renders an art-directed vector scene
 * (always available, no network). Add a URL for the scene in `content/images.ts`
 * and every use of that scene swaps to the photograph.
 */
function VisualBase({ scene, label, className = '', sizes = '100vw' }: Props) {
  const id = useId().replace(/[^a-z0-9]/gi, '')
  const photo = imageOverrides[scene]
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const }
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} {...a11y}>
      {photo ? (
        <img src={photo.src} srcSet={photo.srcSet} sizes={sizes} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: photo.position ?? 'center' }} />
      ) : (
        <Frame id={scene}>{builders[scene](id)}</Frame>
      )}
    </div>
  )
}

export const Visual = memo(VisualBase)
