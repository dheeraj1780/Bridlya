import type { ReactNode } from 'react'

/** Deterministic PRNG so every scene renders identically on server, client and re-render. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const W = 1200
export const H = 800

export type Stop = [number, string, number?]

export function Lin({ id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1 }: { id: string; stops: Stop[]; x1?: number; y1?: number; x2?: number; y2?: number }) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map(([o, c, a], i) => (
        <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />
      ))}
    </linearGradient>
  )
}

export function Rad({ id, stops }: { id: string; stops: Stop[] }) {
  return (
    <radialGradient id={id}>
      {stops.map(([o, c, a], i) => (
        <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />
      ))}
    </radialGradient>
  )
}

export function Sky({ id }: { id: string }) {
  return <rect width={W} height={H} fill={`url(#${id})`} />
}

export function Glow({ id, cx, cy, r, o = 1 }: { id: string; cx: number; cy: number; r: number; o?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} opacity={o} />
}

export function Bokeh({ seed, n, x0 = 0, x1 = W, y0 = 0, y1 = H, colors, rMin = 6, rMax = 38, o = 0.5 }: { seed: number; n: number; x0?: number; x1?: number; y0?: number; y1?: number; colors: string[]; rMin?: number; rMax?: number; o?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const rad = rMin + (rMax - rMin) * Math.pow(r(), 1.8)
        const c = colors[Math.floor(r() * colors.length)]
        return <circle key={i} cx={x0 + r() * (x1 - x0)} cy={y0 + r() * (y1 - y0)} r={rad} fill={c} opacity={o * (0.35 + r() * 0.65)} stroke={c} strokeOpacity={0.5} strokeWidth={1} />
      })}
    </g>
  )
}

/** Wall with cusped/pointed arch openings cut through (even-odd). */
export function ArchWall({ x0 = 0, x1 = W, top, bottom, count, fill, opacity = 1, archW = 0.62, apex = 0.7 }: { x0?: number; x1?: number; top: number; bottom: number; count: number; fill: string; opacity?: number; archW?: number; apex?: number }) {
  const span = (x1 - x0) / count
  const w = span * archW
  const yb = bottom
  const ah = (bottom - top) * apex
  const ys = yb - ah + w * 0.55
  let d = `M${x0} ${top}H${x1}V${bottom}H${x0}Z`
  for (let i = 0; i < count; i++) {
    const x = x0 + span * i + (span - w) / 2
    d += `M${x} ${yb}V${ys}C${x} ${ys - w * 0.34} ${x + w * 0.4} ${ys - w * 0.42} ${x + w / 2} ${ys - w * 0.62}C${x + w * 0.6} ${ys - w * 0.42} ${x + w} ${ys - w * 0.34} ${x + w} ${ys}V${yb}Z`
  }
  return <path d={d} fill={fill} fillRule="evenodd" opacity={opacity} />
}

export function Hills({ y, amp, freq = 1, phase = 0, fill, opacity = 1, bottom = H }: { y: number; amp: number; freq?: number; phase?: number; fill: string; opacity?: number; bottom?: number }) {
  let d = `M0 ${bottom}L0 ${y}`
  for (let x = 0; x <= W; x += 20) {
    const v = Math.sin((x / W) * Math.PI * 2 * freq + phase) * amp + Math.sin((x / W) * Math.PI * 5.3 * freq + phase * 2) * amp * 0.35
    d += `L${x} ${(y + v).toFixed(1)}`
  }
  d += `L${W} ${bottom}Z`
  return <path d={d} fill={fill} opacity={opacity} />
}

export function Beam({ x, w = 140, tilt = 0, id, o = 0.6, h = 700 }: { x: number; w?: number; tilt?: number; id: string; o?: number; h?: number }) {
  return <path d={`M${x - 6} 0L${x + 6} 0L${x + tilt + w} ${h}L${x + tilt - w} ${h}Z`} fill={`url(#${id})`} opacity={o} />
}

/** Catenary strings of light. */
export function LampStrings({ rows, color, seed = 3, o = 0.9 }: { rows: { y: number; sag: number; x0?: number; x1?: number; n?: number }[]; color: string; seed?: number; o?: number }) {
  const r = rng(seed)
  return (
    <g>
      {rows.map((row, k) => {
        const x0 = row.x0 ?? -20
        const x1 = row.x1 ?? W + 20
        const n = row.n ?? 22
        const pts = Array.from({ length: n + 1 }, (_, i) => {
          const t = i / n
          return [x0 + (x1 - x0) * t, row.y + Math.sin(Math.PI * t) * row.sag] as const
        })
        return (
          <g key={k}>
            <path d={`M${x0} ${row.y}Q${(x0 + x1) / 2} ${row.y + row.sag * 2} ${x1} ${row.y}`} stroke={color} strokeOpacity={0.35} fill="none" strokeWidth={1} />
            {pts.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y + 6} r={14 + r() * 4} fill={color} opacity={0.12 * o} />
                <circle cx={x} cy={y + 6} r={3.2} fill={color} opacity={o} />
              </g>
            ))}
          </g>
        )
      })}
    </g>
  )
}

/** Hanging marigold strands. */
export function Strands({ xs, top, len, color, color2, seed = 5, r0 = 7 }: { xs: number[]; top: number; len: number[] | number; color: string; color2: string; seed?: number; r0?: number }) {
  const r = rng(seed)
  return (
    <g>
      {xs.map((x, i) => {
        const l = Array.isArray(len) ? len[i % len.length] : len
        const n = Math.floor(l / (r0 * 1.5))
        return (
          <g key={i}>
            <line x1={x} y1={top} x2={x} y2={top + l} stroke={color2} strokeOpacity={0.5} />
            {Array.from({ length: n }, (_, j) => (
              <circle key={j} cx={x + Math.sin(j * 0.9 + i) * 1.4} cy={top + j * r0 * 1.5 + r0} r={r0 * (0.8 + r() * 0.35)} fill={j % 4 === 3 ? color2 : color} />
            ))}
          </g>
        )
      })}
    </g>
  )
}

export function Rosette({ cx, cy, r, petals = 12, color, color2 }: { cx: number; cy: number; r: number; petals?: number; color: string; color2: string }) {
  return (
    <g>
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx={cx} cy={cy - r * 0.62} rx={r * 0.26} ry={r * 0.42} fill={i % 2 ? color : color2} opacity={0.92} transform={`rotate(${(360 / petals) * i} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.22} fill={color2} />
    </g>
  )
}

export function Petals({ seed, n, colors, x0 = 0, x1 = W, y0 = 0, y1 = H, size = 10, o = 0.85 }: { seed: number; n: number; colors: string[]; x0?: number; x1?: number; y0?: number; y1?: number; size?: number; o?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + r() * (x1 - x0)
        const y = y0 + r() * (y1 - y0)
        const s = size * (0.6 + r() * 0.9)
        return <ellipse key={i} cx={x} cy={y} rx={s} ry={s * 0.5} fill={colors[Math.floor(r() * colors.length)]} opacity={o * (0.5 + r() * 0.5)} transform={`rotate(${r() * 180} ${x} ${y})`} />
      })}
    </g>
  )
}

/** Soft vertical folds of fabric. */
export function Folds({ n, y0 = 0, y1 = H, light, dark, seed = 11, amp = 22 }: { n: number; y0?: number; y1?: number; light: string; dark: string; seed?: number; amp?: number }) {
  const r = rng(seed)
  const w = W / n
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = i * w
        const a = amp * (0.6 + r() * 0.8)
        const ph = r() * 6
        const wob = (t: number) => Math.sin(t * 4 + ph) * a
        const path = (xo: number, ww: number) => {
          let d = `M${xo + wob(0)} ${y0}`
          for (let k = 1; k <= 16; k++) d += `L${xo + wob(k / 16) + (k / 16) * 6} ${y0 + ((y1 - y0) * k) / 16}`
          for (let k = 16; k >= 0; k--) d += `L${xo + ww + wob(k / 16) + (k / 16) * 6} ${y0 + ((y1 - y0) * k) / 16}`
          return d + 'Z'
        }
        return (
          <g key={i}>
            <path d={path(x, w * 0.5)} fill={light} opacity={0.2 + r() * 0.2} />
            <path d={path(x + w * 0.5, w * 0.5)} fill={dark} opacity={0.18 + r() * 0.2} />
          </g>
        )
      })}
    </g>
  )
}

export type PersonProps = { x: number; y: number; h: number; color: string; arms?: 'up' | 'down' | 'wide' | 'hold'; dress?: boolean; veil?: string }

export function Person({ x, y, h, color, arms = 'down', dress = false, veil }: PersonProps) {
  const hr = h * 0.062
  const sy = y - h * 0.8
  const sw = h * (dress ? 0.075 : 0.1)
  const hy = y - h * 0.48
  const hw = h * 0.075
  const body = dress
    ? `M${x - sw} ${sy}L${x + sw} ${sy}L${x + hw} ${hy}C${x + h * 0.14} ${hy + h * 0.2} ${x + h * 0.3} ${y - h * 0.08} ${x + h * 0.3} ${y}L${x - h * 0.3} ${y}C${x - h * 0.3} ${y - h * 0.08} ${x - h * 0.14} ${hy + h * 0.2} ${x - hw} ${hy}Z`
    : `M${x - sw} ${sy}L${x + sw} ${sy}L${x + hw + 4} ${hy}L${x - hw - 4} ${hy}Z`
  const armEnd = {
    up: [h * 0.2, -h * 0.97],
    down: [h * 0.12, -h * 0.5],
    wide: [h * 0.3, -h * 0.72],
    hold: [h * 0.05, -h * 0.62],
  }[arms]
  return (
    <g fill={color} stroke={color} strokeLinecap="round">
      <circle cx={x} cy={y - h + hr} r={hr} stroke="none" />
      <rect x={x - hr * 0.35} y={y - h + hr * 1.8} width={hr * 0.7} height={hr * 0.9} stroke="none" />
      <path d={body} stroke="none" />
      {!dress && (
        <>
          <rect x={x - h * 0.065} y={hy} width={h * 0.05} height={y - hy} stroke="none" />
          <rect x={x + h * 0.015} y={hy} width={h * 0.05} height={y - hy} stroke="none" />
        </>
      )}
      <line x1={x - sw} y1={sy + 4} x2={x - armEnd[0]} y2={y + armEnd[1]} strokeWidth={h * 0.04} fill="none" />
      <line x1={x + sw} y1={sy + 4} x2={x + armEnd[0]} y2={y + armEnd[1]} strokeWidth={h * 0.04} fill="none" />
      {veil && <path d={`M${x - hr} ${y - h + hr * 0.4}C${x - h * 0.2} ${y - h * 0.6} ${x - h * 0.22} ${y - h * 0.2} ${x - h * 0.18} ${y}L${x - h * 0.1} ${y}C${x - h * 0.12} ${y - h * 0.4} ${x - h * 0.08} ${y - h * 0.7} ${x} ${y - h + hr * 0.2}Z`} fill={veil} stroke="none" opacity={0.85} />}
    </g>
  )
}

export function Frame({ children, id }: { children: ReactNode; id: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true" focusable="false" data-scene={id}>
      {children}
    </svg>
  )
}
