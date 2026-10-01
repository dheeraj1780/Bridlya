import type { SceneKey } from '../components/scenes/scenes'

export type PhotoOverride = { src: string; srcSet?: string; position?: string }

/**
 * Photography slots.
 *
 * Every image on the site is a named "scene". By default each scene renders as an
 * art-directed vector composition so the prototype has zero broken image URLs and
 * zero third-party requests. To replace a scene with real photography, add an
 * entry here — nothing else in the codebase needs to change:
 *
 *   mandap: { src: '/photos/mandap.jpg', srcSet: '/photos/mandap-800.jpg 800w, /photos/mandap-1600.jpg 1600w', position: '50% 40%' },
 */
export const imageOverrides: Partial<Record<SceneKey, PhotoOverride>> = {}
