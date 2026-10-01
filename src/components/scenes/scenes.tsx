import type { ReactNode } from 'react'
import { ArchWall, Beam, Bokeh, Glow, Hills, LampStrings, Lin, Person, Petals, Rad, Rosette, Sky, Strands, rng, Folds, W, H } from './primitives'

export type SceneKey =
  | 'silk' | 'dawn' | 'venue' | 'mandap' | 'flowers' | 'decor' | 'table' | 'celebration' | 'music'
  | 'welcome' | 'hospitality' | 'car' | 'journey' | 'lens' | 'gift' | 'planning' | 'coordination'
  | 'honeymoon' | 'destination' | 'temple' | 'kolam' | 'kerala' | 'punjab' | 'bengal' | 'christian'
  | 'intimate' | 'multiday' | 'couple' | 'family' | 'night'

type Builder = (u: string) => ReactNode

const warm = ['#f6c26b', '#f3a64e', '#ffe2a8', '#e88a5b']

const Cupola = ({ x, y, r, fill }: { x: number; y: number; r: number; fill: string }) => (
  <g fill={fill}>
    <path d={`M${x - r} ${y}A${r} ${r} 0 0 1 ${x + r} ${y}Z`} />
    <rect x={x - r * 0.85} y={y} width={r * 1.7} height={r * 0.16} />
    <rect x={x - r * 0.04} y={y - r - r * 0.35} width={r * 0.08} height={r * 0.4} />
  </g>
)

const Palm = ({ x, y, h, lean, color }: { x: number; y: number; h: number; lean: number; color: string }) => {
  const tx = x + lean
  const ty = y - h
  return (
    <g stroke={color} fill="none" strokeLinecap="round">
      <path d={`M${x} ${y}Q${x + lean * 0.2} ${y - h * 0.6} ${tx} ${ty}`} strokeWidth={h * 0.025} />
      {[-150, -120, -92, -62, -32, -8, 18].map((a, i) => {
        const rad = (a * Math.PI) / 180
        const l = h * 0.5
        return <path key={i} d={`M${tx} ${ty}Q${tx + Math.cos(rad) * l * 0.6} ${ty + Math.sin(rad) * l * 0.6 - l * 0.25} ${tx + Math.cos(rad) * l} ${ty + Math.sin(rad) * l * 0.7 + l * 0.15}`} strokeWidth={h * 0.022} />
      })}
    </g>
  )
}

const Candles = ({ seed, n, y0, y1, color = '#ffd58a' }: { seed: number; n: number; y0: number; y1: number; color?: string }) => {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const t = r()
        const y = y0 + (y1 - y0) * t
        const s = 0.5 + t * 1.3
        const x = 40 + r() * (W - 80)
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={26 * s} fill={color} opacity={0.14} />
            <circle cx={x} cy={y} r={8 * s} fill={color} opacity={0.35} />
            <ellipse cx={x} cy={y} rx={2.4 * s} ry={4 * s} fill="#fff4d6" />
          </g>
        )
      })}
    </g>
  )
}

export const builders: Record<SceneKey, Builder> = {
  silk: (u) => (
    <>
      <defs>
        <Lin id={`${u}a`} stops={[[0, '#d23a2c'], [0.5, '#a31d17'], [1, '#5a0d0b']]} />
        <Rad id={`${u}g`} stops={[[0, '#ffb89a', 0.7], [1, '#ffb89a', 0]]} />
      </defs>
      <Sky id={`${u}a`} />
      <Folds n={11} light="#ff9a7a" dark="#3d0805" amp={26} />
      <Glow id={`${u}g`} cx={380} cy={220} r={520} />
      <Folds n={5} light="#ffd2bd" dark="#2a0503" seed={4} amp={34} />
    </>
  ),

  dawn: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#2a1230'], [0.32, '#7d3249'], [0.55, '#d9765a'], [0.74, '#f7bf84'], [1, '#fde7bd']]} />
        <Rad id={`${u}g`} stops={[[0, '#fff3d0', 0.95], [0.35, '#ffc27a', 0.55], [1, '#ff9a5a', 0]]} />
        <Lin id={`${u}w`} stops={[[0, '#f6c488'], [0.5, '#a24f5a'], [1, '#3a1936']]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={560} r={560} />
      <circle cx={600} cy={560} r={46} fill="#fff6dc" />
      <Hills y={540} amp={14} fill="#a8496a" opacity={0.5} phase={1} bottom={600} />
      <ArchWall x0={170} x1={1030} top={520} bottom={616} count={11} fill="#6a2a48" opacity={0.85} archW={0.45} apex={0.6} />
      {[250, 420, 600, 780, 950].map((x, i) => <Cupola key={x} x={x} y={520 - (i === 2 ? 14 : 0)} r={i === 2 ? 44 : 28} fill="#6a2a48" />)}
      <rect x={0} y={616} width={W} height={200} fill={`url(#${u}w)`} />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={600 - (50 + i * 16) * (1 + (i % 3) * 0.25)} y={628 + i * 20} width={(50 + i * 16) * (1 + (i % 3) * 0.25) * 2} height={2 + i * 0.4} fill="#fff1c9" opacity={0.5 - i * 0.04} />)}
      <path fillRule="evenodd" fill="#1d0c1f" d={`M-20 -20H1220V820H-20Z M140 820V330C140 190 400 150 600 -30C800 150 1060 190 1060 330V820Z`} />
      <path d="M140 820V330C140 190 400 150 600 -30C800 150 1060 190 1060 330V820" fill="none" stroke="#f0b36a" strokeOpacity={0.35} strokeWidth={2} />
      <Strands xs={[175, 200, 225, 975, 1000, 1025]} top={170} len={[150, 210, 110]} color="#f0a22e" color2="#c8321f" r0={6} />
      <Bokeh seed={9} n={24} x0={200} x1={1000} y0={420} y1={760} colors={warm} o={0.3} rMax={20} />
    </>
  ),

  venue: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#f4c9a0'], [0.6, '#fbe3c0'], [1, '#fff3da']]} />
        <Rad id={`${u}g`} stops={[[0, '#fff6dc', 0.9], [1, '#ffd89a', 0]]} />
        <Lin id={`${u}f`} stops={[[0, '#e9b27f'], [1, '#a35c3c']]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={760} cy={300} r={420} />
      <Hills y={400} amp={20} fill="#cc8f6e" opacity={0.5} phase={2} />
      {[170, 380, 590, 800, 1010].map((x, i) => <Cupola key={x} x={x} y={250 + (i % 2) * 14} r={i % 2 ? 36 : 48} fill="#b4694a" />)}
      <ArchWall top={260} bottom={620} count={5} fill="#c47651" archW={0.6} apex={0.78} />
      <rect x={0} y={250} width={W} height={12} fill="#9d5238" />
      <rect y={620} width={W} height={180} fill={`url(#${u}f)`} />
      <rect x={380} y={640} width={440} height={110} fill="#fbe1b8" opacity={0.5} />
      <rect x={380} y={640} width={440} height={110} fill="none" stroke="#fff3da" strokeOpacity={0.6} />
      <LampStrings rows={[{ y: 120, sag: 40 }, { y: 175, sag: 34, n: 18 }]} color="#ffb44f" />
      <Petals seed={4} n={40} colors={['#d6342a', '#f0a22e', '#fff2d2']} y0={620} y1={800} size={9} />
    </>
  ),

  mandap: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#2a0a12'], [0.6, '#6d1a1d'], [1, '#c4462a']]} />
        <Rad id={`${u}g`} stops={[[0, '#ffd48a', 0.95], [0.5, '#f08a3a', 0.35], [1, '#f08a3a', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={560} r={440} />
      <path d="M250 190L600 80L950 190L910 215H290Z" fill="#f2d79a" />
      <path d="M290 215H910L890 240H310Z" fill="#c8321f" />
      {[270, 380, 820, 930].map((x) => (
        <g key={x}>
          <rect x={x - 14} y={240} width={28} height={420} fill="#f2d79a" />
          <rect x={x - 22} y={240} width={44} height={14} fill="#c8321f" />
          <rect x={x - 22} y={646} width={44} height={14} fill="#c8321f" />
        </g>
      ))}
      <Strands xs={Array.from({ length: 22 }, (_, i) => 320 + i * 25)} top={240} len={[90, 130, 70, 160, 100]} color="#f0a22e" color2="#e0431f" r0={6} seed={8} />
      <rect x={220} y={660} width={760} height={34} fill="#f2d79a" opacity={0.95} />
      <rect x={240} y={694} width={720} height={80} fill="#1f0709" opacity={0.6} />
      <ellipse cx={600} cy={640} rx={44} ry={12} fill="#2a0a12" />
      <path d="M580 636Q600 580 620 636Q600 620 580 636Z" fill="#ffe39a" />
      <Rosette cx={230} cy={700} r={46} color="#f0a22e" color2="#e0431f" />
      <Rosette cx={970} cy={700} r={46} color="#f0a22e" color2="#e0431f" />
      <Bokeh seed={2} n={20} colors={warm} o={0.3} rMax={26} />
    </>
  ),

  flowers: (u) => {
    const r = rng(21)
    const cols: [string, string][] = [['#f0a22e', '#d6501f'], ['#e6537a', '#a21c4a'], ['#fff1d6', '#e9c88a'], ['#e0431f', '#8f1a10'], ['#f6c26b', '#e9833a']]
    return (
      <>
        <defs><Lin id={`${u}s`} stops={[[0, '#7a1a16'], [1, '#2c0a0a']]} /></defs>
        <Sky id={`${u}s`} />
        {Array.from({ length: 34 }, (_, i) => {
          const c = cols[Math.floor(r() * cols.length)]
          return <Rosette key={i} cx={r() * W} cy={r() * H} r={50 + r() * 100} petals={10 + Math.floor(r() * 8)} color={c[0]} color2={c[1]} />
        })}
        <rect width={W} height={H} fill="#1a0505" opacity={0.18} />
      </>
    )
  },

  decor: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#f7d9cc'], [1, '#fdf1e2']]} />
        <Rad id={`${u}g`} stops={[[0, '#fff', 0.9], [1, '#fff', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={420} r={460} />
      <Strands xs={Array.from({ length: 36 }, (_, i) => 20 + i * 33)} top={0} len={[260, 380, 200, 460, 320, 150]} color="#e6537a" color2="#fff1d6" r0={8} seed={5} />
      <Strands xs={Array.from({ length: 24 }, (_, i) => 40 + i * 50)} top={0} len={[140, 220, 90]} color="#f0a22e" color2="#c8321f" r0={7} seed={6} />
      {[180, 420, 700, 960].map((x, i) => <Rosette key={x} cx={x} cy={300 + (i % 2) * 140} r={64} color="#e6537a" color2="#fff1d6" />)}
      <LampStrings rows={[{ y: 90, sag: 30 }]} color="#ffb44f" />
      <rect y={680} width={W} height={120} fill="#e8b48f" opacity={0.6} />
    </>
  ),

  table: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#1d0f1b'], [0.55, '#4a1a28'], [1, '#8a3a2a']]} />
        <Lin id={`${u}t`} stops={[[0, '#fff4dd'], [1, '#e8cfa4']]} />
      </defs>
      <Sky id={`${u}s`} />
      <ArchWall top={120} bottom={430} count={6} fill="#14080f" opacity={0.7} />
      <LampStrings rows={[{ y: 70, sag: 36 }, { y: 130, sag: 30, n: 18 }]} color="#ffc15f" />
      {[0, 1, 2].map((row) => {
        const y = 470 + row * 120
        const s = 0.55 + row * 0.35
        return [0, 1, 2, 3].map((c) => {
          const x = 150 + c * (300 - row * 10) + (row % 2) * 70
          return (
            <g key={`${row}${c}`}>
              <ellipse cx={x} cy={y + 18 * s} rx={110 * s} ry={34 * s} fill="#000" opacity={0.3} />
              <ellipse cx={x} cy={y} rx={104 * s} ry={30 * s} fill={`url(#${u}t)`} />
              <ellipse cx={x} cy={y - 4 * s} rx={60 * s} ry={14 * s} fill="none" stroke="#c8321f" strokeOpacity={0.55} strokeWidth={2} />
              <circle cx={x} cy={y - 14 * s} r={30 * s} fill="#ffcf7a" opacity={0.22} />
              <ellipse cx={x} cy={y - 14 * s} rx={2.6 * s} ry={5 * s} fill="#fff4d6" />
              <circle cx={x - 40 * s} cy={y - 6 * s} r={5 * s} fill="#fff4d6" opacity={0.9} />
              <circle cx={x + 40 * s} cy={y - 6 * s} r={5 * s} fill="#fff4d6" opacity={0.9} />
            </g>
          )
        })
      })}
      <Bokeh seed={3} n={14} y0={80} y1={420} colors={warm} o={0.3} rMax={30} />
    </>
  ),

  celebration: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#12091f'], [0.7, '#3a1238'], [1, '#7a1f3a']]} />
        <Lin id={`${u}b`} stops={[[0, '#ffd48a', 0.9], [1, '#ffd48a', 0]]} />
        <Lin id={`${u}b2`} stops={[[0, '#ff6a8a', 0.9], [1, '#ff6a8a', 0]]} />
        <Rad id={`${u}f`} stops={[[0, '#ffb35c', 0.7], [1, '#ffb35c', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Beam id={`${u}b`} x={220} tilt={160} w={110} o={0.5} />
      <Beam id={`${u}b2`} x={600} tilt={-80} w={130} o={0.45} />
      <Beam id={`${u}b`} x={980} tilt={-200} w={110} o={0.5} />
      <ellipse cx={600} cy={700} rx={640} ry={140} fill={`url(#${u}f)`} />
      <Bokeh seed={4} n={30} colors={['#ffc15f', '#ff6a8a', '#fff1d6']} o={0.35} rMax={30} />
      {[
        [220, 'up'], [360, 'wide'], [480, 'up'], [610, 'up'], [740, 'wide'], [860, 'up'], [990, 'up'],
      ].map(([x, a], i) => <Person key={i} x={x as number} y={760 - (i % 3) * 18} h={300 - (i % 3) * 36} color="#0c0612" arms={a as 'up' | 'wide'} dress={i % 2 === 1} />)}
    </>
  ),

  music: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#2a0f10'], [1, '#a8432a']]} />
        <Rad id={`${u}g`} stops={[[0, '#ffc86a', 0.8], [1, '#ffc86a', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={420} r={500} />
      {[1, 2, 3, 4, 5, 6].map((i) => <circle key={i} cx={600} cy={420} r={90 + i * 62} fill="none" stroke="#ffe3a8" strokeOpacity={0.5 - i * 0.07} strokeWidth={1.5} />)}
      <g>
        <path d="M470 330Q470 420 470 510Q600 560 730 510Q730 420 730 330Q600 290 470 330Z" fill="#6a2412" />
        <ellipse cx={600} cy={315} rx={132} ry={30} fill="#f2d79a" />
        <ellipse cx={600} cy={315} rx={116} ry={22} fill="#e8c27a" />
        <ellipse cx={600} cy={522} rx={132} ry={30} fill="#d9a85a" />
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${482 + i * 29} 330L${472 + i * 32} 520`} stroke="#f2d79a" strokeOpacity={0.7} strokeWidth={3} />)}
        <path d="M470 340Q560 380 480 500M730 340Q640 380 720 500" stroke="#c8321f" strokeWidth={10} fill="none" />
      </g>
      <rect y={650} width={W} height={150} fill="#1a0707" opacity={0.7} />
      <LampStrings rows={[{ y: 80, sag: 40 }]} color="#ffc15f" />
      <Bokeh seed={8} n={18} colors={warm} o={0.3} y0={500} y1={800} rMax={24} />
    </>
  ),

  welcome: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#f3d2b4'], [1, '#fdeed6']]} />
        <Rad id={`${u}g`} stops={[[0, '#fff3cc', 1], [1, '#ffd88a', 0.2]]} />
      </defs>
      <Sky id={`${u}s`} />
      <rect x={380} y={110} width={440} height={540} fill={`url(#${u}g)`} />
      <path fillRule="evenodd" fill="#8f3b2a" d={`M0 0H1200V660H0Z M380 660V300C380 210 520 180 600 80C680 180 820 210 820 300V660Z`} />
      <path d="M380 660V300C380 210 520 180 600 80C680 180 820 210 820 300V660" fill="none" stroke="#f2d79a" strokeOpacity={0.6} strokeWidth={3} />
      <Strands xs={Array.from({ length: 15 }, (_, i) => 430 + i * 24)} top={235} len={[60, 100, 40, 120]} color="#f0a22e" color2="#e0431f" r0={6} />
      <rect y={660} width={W} height={140} fill="#c98a62" />
      <rect y={660} width={W} height={6} fill="#fff3d6" opacity={0.7} />
      <Person x={520} y={750} h={330} color="#2b1410" dress arms="hold" />
      <Person x={610} y={760} h={350} color="#4a1a1c" arms="down" />
      <Person x={700} y={752} h={300} color="#7a2a22" dress arms="down" />
      <rect x={770} y={706} width={64} height={46} rx={3} fill="#2b1410" />
      <Petals seed={14} n={40} colors={['#e0431f', '#f0a22e', '#fff3d6']} y0={660} y1={800} size={9} />
    </>
  ),

  hospitality: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#9fc7c4'], [0.6, '#f4dcb8'], [1, '#f7b98a']]} />
        <Lin id={`${u}w`} stops={[[0, '#efe5d3'], [1, '#d9c9ad']]} />
      </defs>
      <rect width={W} height={H} fill={`url(#${u}w)`} />
      <path d="M380 700V300C380 190 480 130 600 90C720 130 820 190 820 300V700Z" fill={`url(#${u}s)`} />
      <Hills y={500} amp={20} fill="#2f6b6a" opacity={0.55} bottom={700} />
      <Hills y={560} amp={14} fill="#1c4a4c" opacity={0.7} phase={2} bottom={700} />
      <circle cx={680} cy={400} r={50} fill="#fff1c9" opacity={0.9} />
      <path d="M600 90L600 700M380 480H820" stroke="#d9c9ad" strokeWidth={8} />
      <Folds n={4} light="#ffffff" dark="#b9a784" amp={14} />
      <rect y={700} width={W} height={100} fill="#6d4b36" />
      <rect x={140} y={560} width={150} height={140} fill="#8a6244" />
      <path d="M215 560V470" stroke="#2a1f19" strokeWidth={5} />
      <path d="M170 470H260L240 410H190Z" fill="#fff1c9" />
      <circle cx={215} cy={440} r={90} fill="#ffe2a0" opacity={0.25} />
      <rect x={900} y={520} width={170} height={180} fill="#fffaf0" />
      <rect x={900} y={520} width={170} height={36} fill="#c8321f" />
    </>
  ),

  car: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#1d1230'], [0.55, '#6b2a4a'], [1, '#f0a070']]} />
        <Lin id={`${u}r`} stops={[[0, '#2a1426'], [1, '#0c0710']]} />
        <Rad id={`${u}h`} stops={[[0, '#fff3cc', 0.95], [1, '#ffd88a', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Hills y={470} amp={14} fill="#1b0f22" opacity={0.9} />
      <ArchWall top={150} bottom={500} count={7} fill="#12081a" opacity={0.85} archW={0.5} apex={0.7} />
      <LampStrings rows={[{ y: 110, sag: 22, n: 26 }]} color="#ffc15f" />
      <rect y={500} width={W} height={300} fill={`url(#${u}r)`} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={0} y={650 + i * 34} width={W} height={1.5} fill="#ffd88a" opacity={0.08} />)}
      <path d="M150 640C170 600 260 560 380 545L500 500C560 478 700 474 760 488L880 540C960 548 1040 575 1060 612C1068 630 1058 646 1040 646H180C160 646 146 654 150 640Z" fill="#0b0508" />
      <path d="M470 524L520 502C570 488 690 486 740 500L810 540H470Z" fill="#33202e" />
      <ellipse cx={1055} cy={600} rx={36} ry={10} fill="#fff3cc" />
      <Glow id={`${u}h`} cx={1070} cy={604} r={160} />
      <path d="M1070 604L1200 540V680Z" fill={`url(#${u}h)`} opacity={0.4} />
      {[330, 880].map((x) => (
        <g key={x}>
          <circle cx={x} cy={650} r={54} fill="#050205" />
          <circle cx={x} cy={650} r={30} fill="#6d5a68" />
          <circle cx={x} cy={650} r={10} fill="#d9a85a" />
        </g>
      ))}
      <ellipse cx={600} cy={710} rx={460} ry={24} fill="#ffb86a" opacity={0.12} />
      <Petals seed={2} n={24} colors={['#f0a22e', '#e0431f']} y0={660} y1={760} size={7} />
    </>
  ),

  journey: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#7fb0c9'], [0.6, '#f6d4b4'], [1, '#fbe6c4']]} />
        <Lin id={`${u}r`} stops={[[0, '#5a4a48'], [1, '#2a2022']]} />
      </defs>
      <Sky id={`${u}s`} />
      <path d="M120 250Q420 90 780 150" stroke="#fff" strokeWidth={2} fill="none" strokeDasharray="2 10" strokeLinecap="round" opacity={0.9} />
      <path d="M780 150l30 -10 -8 18 -10 -2z" fill="#fff" />
      <Hills y={440} amp={50} freq={1.4} fill="#8aa6a8" opacity={0.7} phase={1} />
      <Hills y={480} amp={34} freq={2} fill="#5a7f7c" opacity={0.85} phase={3} />
      <Hills y={510} amp={16} fill="#2f5754" phase={5} />
      <path d="M520 800Q640 640 700 560Q730 520 735 500L745 500Q750 520 780 560Q900 660 1010 800Z" fill={`url(#${u}r)`} />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${742 - i * 3} ${520 + i * 52}L${744 + i * 3} ${520 + i * 52 + 14 + i * 4}`} stroke="#ffd88a" strokeWidth={2 + i * 1.4} />)}
      <circle cx={760} cy={500} r={90} fill="#fff6e0" opacity={0.25} />
    </>
  ),

  lens: (u) => (
    <>
      <defs>
        <Rad id={`${u}g`} stops={[[0, '#ffcf8a', 0.9], [1, '#ffcf8a', 0]]} />
        <Lin id={`${u}s`} stops={[[0, '#2a1a1a'], [1, '#0e0809']]} />
        <Lin id={`${u}i`} stops={[[0, '#ffb86a'], [0.5, '#8a2a3a'], [1, '#1a1030']]} />
      </defs>
      <Sky id={`${u}s`} />
      {[330, 300, 270, 240, 200].map((r, i) => <circle key={r} cx={600} cy={400} r={r} fill={i === 4 ? `url(#${u}i)` : '#000'} stroke={['#6d5a50', '#3a2c28', '#8a7468', '#2a1e1c', '#c9a87a'][i]} strokeWidth={i === 0 ? 8 : 3} />)}
      <clipPath id={`${u}c`}><circle cx={600} cy={400} r={196} /></clipPath>
      <g clipPath={`url(#${u}c)`}>
        <ArchWall x0={400} x1={800} top={330} bottom={600} count={3} fill="#1a0a14" archW={0.6} />
        <Glow id={`${u}g`} cx={560} cy={360} r={170} />
      </g>
      {Array.from({ length: 72 }, (_, i) => <line key={i} x1={600 + Math.cos((i * Math.PI) / 36) * 322} y1={400 + Math.sin((i * Math.PI) / 36) * 322} x2={600 + Math.cos((i * Math.PI) / 36) * 306} y2={400 + Math.sin((i * Math.PI) / 36) * 306} stroke="#9a8576" strokeWidth={2} />)}
      <ellipse cx={520} cy={310} rx={34} ry={16} fill="#fff" opacity={0.35} transform="rotate(-30 520 310)" />
      <Bokeh seed={12} n={10} colors={warm} o={0.2} rMax={40} />
    </>
  ),

  gift: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#b52a20'], [1, '#6a110e']]} />
        <Lin id={`${u}b`} stops={[[0, '#fbf1da'], [1, '#e8d2a2']]} />
      </defs>
      <Sky id={`${u}s`} />
      <Folds n={9} light="#ff9a7a" dark="#2a0503" seed={6} amp={30} />
      <ellipse cx={600} cy={640} rx={300} ry={36} fill="#000" opacity={0.35} />
      <path d="M340 380L600 300L860 380V640L600 700L340 640Z" fill={`url(#${u}b)`} />
      <path d="M340 380L600 460L860 380L600 300Z" fill="#fff8e6" />
      <path d="M600 460V700L340 640V380Z" fill="#d6bb85" opacity={0.35} />
      <path d="M570 455L630 455L630 700L570 700Z" fill="#c8321f" />
      <path d="M340 400L600 480L860 400L860 440L600 520L340 440Z" fill="#c8321f" opacity={0.9} />
      <path d="M600 300C520 200 440 230 470 290C490 330 570 310 600 300ZM600 300C680 200 760 230 730 290C710 330 630 310 600 300Z" fill="#e0431f" />
      <circle cx={600} cy={306} r={22} fill="#a31d17" />
      <Petals seed={31} n={22} colors={['#f0a22e', '#fff1d6']} y0={560} y1={800} size={9} />
    </>
  ),

  planning: (u) => (
    <>
      <rect width={W} height={H} fill="#f3eadb" />
      <defs><Lin id={`${u}s`} stops={[[0, '#c8321f'], [1, '#8f1a10']]} /></defs>
      {Array.from({ length: 14 }, (_, i) => <line key={i} x1={0} y1={i * 60} x2={W} y2={i * 60} stroke="#c9b595" strokeOpacity={0.4} />)}
      {Array.from({ length: 21 }, (_, i) => <line key={i} x1={i * 60} y1={0} x2={i * 60} y2={H} stroke="#c9b595" strokeOpacity={0.4} />)}
      <rect x={90} y={90} width={620} height={440} fill="none" stroke="#1c1714" strokeWidth={2} />
      <rect x={90} y={90} width={140} height={60} fill="#1c1714" />
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => <circle key={`${r}${c}`} cx={160 + c * 120} cy={200 + r * 90} r={30} fill="none" stroke="#1c1714" strokeWidth={1.6} strokeDasharray={(r + c) % 3 === 0 ? '4 4' : undefined} />))}
      <path d="M160 200L400 380L640 290" stroke="#c8321f" strokeWidth={2} fill="none" strokeDasharray="3 6" />
      {[['#c8321f', 760, 120], ['#e79a2c', 860, 170], ['#0e5257', 960, 120], ['#eadcbc', 800, 250], ['#e6a595', 920, 270], ['#7d1712', 1020, 220]].map(([c, x, y], i) => (
        <rect key={i} x={x as number} y={y as number} width={100} height={130} fill={c as string} transform={`rotate(${(i - 3) * 5} ${x as number} ${y as number})`} />
      ))}
      <rect x={760} y={470} width={330} height={190} fill="#fffaf0" stroke="#1c1714" strokeOpacity={0.4} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={786} y={496 + i * 30} width={150 + (i % 2) * 90} height={8} fill="#1c1714" opacity={0.7} />)}
      <circle cx={170} cy={640} r={90} fill="#c8321f" opacity={0.9} />
      <circle cx={250} cy={660} r={90} fill="#e79a2c" opacity={0.85} style={{ mixBlendMode: 'multiply' }} />
    </>
  ),

  coordination: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#17100f'], [1, '#2a1614']]} />
        <Rad id={`${u}g`} stops={[[0, '#e79a2c', 0.4], [1, '#e79a2c', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={400} r={520} />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 110 + i * 70
        const x0 = 120 + ((i * 97) % 300)
        const w = 220 + ((i * 53) % 340)
        return (
          <g key={i}>
            <line x1={80} y1={y + 14} x2={1120} y2={y + 14} stroke="#f3e6cc" strokeOpacity={0.08} />
            <rect x={x0} y={y} width={w} height={28} fill={i % 3 === 0 ? '#c8321f' : i % 3 === 1 ? '#e79a2c' : '#eadcbc'} opacity={0.9} />
            <circle cx={x0 + w} cy={y + 14} r={6} fill="#fff4d6" />
          </g>
        )
      })}
      <line x1={640} y1={60} x2={640} y2={760} stroke="#fff4d6" strokeOpacity={0.7} strokeWidth={1.5} />
      <circle cx={640} cy={60} r={7} fill="#fff4d6" />
    </>
  ),

  honeymoon: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#6b3a68'], [0.4, '#e8788a'], [0.62, '#fbb07a'], [1, '#ffe0ae']]} />
        <Lin id={`${u}w`} stops={[[0, '#f8a577'], [1, '#43355f']]} />
        <Rad id={`${u}g`} stops={[[0, '#fff1c9', 1], [1, '#ffc27a', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={430} r={300} />
      <circle cx={600} cy={430} r={54} fill="#fff6dc" />
      <rect y={470} width={W} height={330} fill={`url(#${u}w)`} />
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={600 - (140 - i * 6) * (1 + i * 0.35)} y={478 + i * 18} width={(140 - i * 6) * (1 + i * 0.35) * 2} height={2 + i * 0.2} fill="#fff1c9" opacity={0.6 - i * 0.03} />)}
      <Hills y={450} amp={20} fill="#3a2a56" opacity={0.7} phase={4} bottom={475} />
      <path d="M860 560H980L940 580H900Z" fill="#1a1030" />
      <path d="M920 560V460L970 556Z" fill="#fbe3b8" />
      <path d="M914 560V480L880 556Z" fill="#fbe3b8" opacity={0.8} />
      <Palm x={140} y={800} h={430} lean={60} color="#1a1030" />
      <Palm x={1080} y={800} h={360} lean={-70} color="#1a1030" />
    </>
  ),

  destination: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#a9c4d6'], [0.5, '#f4d7cc'], [1, '#fdebd0']]} />
        <Lin id={`${u}w`} stops={[[0, '#e7c9b8'], [1, '#7a8fa6']]} />
      </defs>
      <Sky id={`${u}s`} />
      <Hills y={380} amp={36} freq={1.2} fill="#8b9fb4" opacity={0.6} phase={2} bottom={520} />
      <Hills y={430} amp={22} fill="#5f7390" opacity={0.7} phase={5} bottom={520} />
      <rect y={520} width={W} height={280} fill={`url(#${u}w)`} />
      <g>
        <ArchWall x0={260} x1={940} top={400} bottom={520} count={9} fill="#fdf3e2" archW={0.5} apex={0.6} />
        {[320, 460, 600, 740, 880].map((x, i) => <Cupola key={x} x={x} y={400 - (i === 2 ? 20 : 0)} r={i === 2 ? 52 : 32} fill="#fdf3e2" />)}
      </g>
      <g transform="translate(0 1040) scale(1 -1)" opacity={0.28}>
        <ArchWall x0={260} x1={940} top={400} bottom={520} count={9} fill="#fdf3e2" archW={0.5} apex={0.6} />
      </g>
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={200 + i * 40} y={540 + i * 26} width={800 - i * 80} height={1.5} fill="#fff" opacity={0.35} />)}
    </>
  ),

  temple: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#7a2a1c'], [0.55, '#d9743a'], [1, '#f6c27a']]} />
        <Lin id={`${u}t`} stops={[[0, '#2a0f0c'], [1, '#4a1a12']]} />
      </defs>
      <Sky id={`${u}s`} />
      <circle cx={600} cy={420} r={300} fill="#ffd89a" opacity={0.28} />
      {Array.from({ length: 9 }, (_, i) => {
        const w = 520 - i * 48
        const y = 640 - i * 56
        return (
          <g key={i}>
            <path d={`M${600 - w / 2} ${y}L${600 + w / 2} ${y}L${600 + w / 2 - 20} ${y - 52}L${600 - w / 2 + 20} ${y - 52}Z`} fill={`url(#${u}t)`} />
            {Array.from({ length: Math.max(3, 11 - i) }, (_, k) => <rect key={k} x={600 - w / 2 + 26 + (k * (w - 52)) / Math.max(3, 11 - i)} y={y - 40} width={8} height={26} fill="#f6c27a" opacity={0.5} />)}
            <rect x={600 - w / 2 + 14} y={y - 4} width={w - 28} height={4} fill="#f2d79a" opacity={0.7} />
          </g>
        )
      })}
      <path d="M520 136Q600 70 680 136Z" fill="#2a0f0c" />
      <path d="M570 640V560Q600 520 630 560V640Z" fill="#ffc15f" opacity={0.9} />
      <rect y={640} width={W} height={160} fill="#2a0f0c" />
      <LampStrings rows={[{ y: 690, sag: 14, n: 40 }, { y: 735, sag: 10, n: 40 }]} color="#ffc15f" />
      <Strands xs={[470, 500, 530, 670, 700, 730]} top={560} len={60} color="#f0a22e" color2="#e0431f" r0={5} />
    </>
  ),

  kolam: (u) => {
    const dots: ReactNode[] = []
    const loops: ReactNode[] = []
    const g = 80
    for (let r = 0; r < 11; r++) {
      for (let c = 0; c < 16; c++) {
        const x = 60 + c * g + (r % 2) * (g / 2)
        const y = 40 + r * (g * 0.5)
        dots.push(<circle key={`d${r}-${c}`} cx={x} cy={y} r={3.4} fill="#fff4de" />)
        if ((r + c) % 2 === 0 && r < 10) loops.push(<path key={`l${r}-${c}`} d={`M${x} ${y}C${x + g * 0.5} ${y - g * 0.1} ${x + g * 0.5} ${y + g * 0.6} ${x} ${y + g}C${x - g * 0.5} ${y + g * 0.6} ${x - g * 0.5} ${y - g * 0.1} ${x} ${y}Z`} stroke="#fff4de" strokeOpacity={0.8} strokeWidth={2} fill="none" />)
      }
    }
    return (
      <>
        <defs><Lin id={`${u}s`} stops={[[0, '#b9482a'], [1, '#7a2414']]} /></defs>
        <Sky id={`${u}s`} />
        {loops}
        {dots}
        <rect width={W} height={26} fill="#f2d79a" />
        <rect y={H - 26} width={W} height={26} fill="#f2d79a" />
      </>
    )
  },

  kerala: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#cfe6d2'], [0.6, '#f6ecc6'], [1, '#f6d9a0']]} />
        <Lin id={`${u}w`} stops={[[0, '#9fc9b0'], [1, '#2f6e5f']]} />
      </defs>
      <Sky id={`${u}s`} />
      <Hills y={430} amp={14} fill="#6ea284" opacity={0.7} bottom={500} />
      <rect y={480} width={W} height={320} fill={`url(#${u}w)`} />
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={120 + i * 70} y={510 + i * 24} width={500 - i * 30} height={1.5} fill="#fff" opacity={0.3} />)}
      <Palm x={110} y={520} h={420} lean={50} color="#1f4a3c" />
      <Palm x={200} y={520} h={340} lean={-30} color="#2b5d4a" />
      <Palm x={1060} y={520} h={400} lean={-60} color="#1f4a3c" />
      <g transform="translate(0 20)">
        <path d="M400 580C420 600 760 600 800 570L780 590C740 620 440 620 420 590Z" fill="#3a2a1c" />
        <path d="M420 580H780L760 560H440Z" fill="#7a4a2a" />
        <path d="M440 560C480 470 720 470 760 560Z" fill="#e8c66a" />
        <path d="M440 560C480 490 720 490 760 560" stroke="#a8742a" strokeWidth={4} fill="none" />
        {Array.from({ length: 9 }, (_, i) => <line key={i} x1={470 + i * 32} y1={558} x2={480 + i * 31} y2={500 - Math.sin(i / 8 * Math.PI) * 8} stroke="#a8742a" strokeOpacity={0.6} />)}
      </g>
      <ellipse cx={600} cy={640} rx={260} ry={14} fill="#fff" opacity={0.18} />
    </>
  ),

  punjab: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#f4a640'], [0.55, '#fbd27a'], [1, '#fff1c6']]} />
        <Lin id={`${u}f`} stops={[[0, '#e6b73a'], [1, '#8a6a1a']]} />
        <Rad id={`${u}g`} stops={[[0, '#fffbe6', 1], [1, '#ffe08a', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={470} r={400} />
      <circle cx={600} cy={470} r={80} fill="#fffdf0" />
      <rect y={470} width={W} height={330} fill={`url(#${u}f)`} />
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${600 + (i - 11) * 6} 470L${600 + (i - 11) * 120} 800`} stroke="#6a4a10" strokeOpacity={0.3} strokeWidth={2 + Math.abs(i - 11) * 0.3} />)}
      <Hills y={472} amp={4} fill="#4a5a2a" opacity={0.6} bottom={490} />
      {[300, 380, 450, 760, 840, 930].map((x, i) => <Person key={x} x={x} y={600 + (i % 3) * 40} h={150 + (i % 3) * 50} color="#3a1a0a" arms={i % 2 ? 'up' : 'wide'} dress={i % 3 === 0} />)}
    </>
  ),

  bengal: (u) => {
    const ring = (r: number, n: number, rx: number, ry: number) =>
      Array.from({ length: n }, (_, i) => <ellipse key={`${r}${i}`} cx={600} cy={400 - r} rx={rx} ry={ry} fill="none" stroke="#fff6e8" strokeWidth={3} transform={`rotate(${(360 / n) * i} 600 400)`} />)
    return (
      <>
        <defs><Lin id={`${u}s`} stops={[[0, '#c8321f'], [1, '#8a1812']]} /></defs>
        <Sky id={`${u}s`} />
        {ring(300, 16, 36, 84)}
        {ring(210, 12, 30, 64)}
        {ring(130, 8, 24, 46)}
        <circle cx={600} cy={400} r={46} fill="none" stroke="#fff6e8" strokeWidth={4} />
        <circle cx={600} cy={400} r={20} fill="#fff6e8" />
        {Array.from({ length: 36 }, (_, i) => <circle key={i} cx={600 + Math.cos((i * Math.PI) / 18) * 372} cy={400 + Math.sin((i * Math.PI) / 18) * 372} r={5} fill="#fff6e8" />)}
        <rect y={0} width={W} height={36} fill="#fff6e8" /><rect y={H - 36} width={W} height={36} fill="#fff6e8" />
      </>
    )
  },

  christian: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#f2efe6'], [1, '#d8d4c4']]} />
        <Lin id={`${u}l`} stops={[[0, '#fff8dc', 0.85], [1, '#fff8dc', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <path d="M470 560V240C470 150 540 110 600 70C660 110 730 150 730 240V560Z" fill="#fffaf0" />
      <path d="M470 560V240C470 150 540 110 600 70C660 110 730 150 730 240V560Z" fill="none" stroke="#a9a48e" strokeWidth={6} />
      <path d="M600 90V560M470 330H730" stroke="#a9a48e" strokeWidth={5} />
      <path d="M470 560L120 800H1080L730 560Z" fill={`url(#${u}l)`} />
      <path d="M470 560L330 800H870L730 560Z" fill="#e8e0cc" />
      {[-2, -1, 0, 1, 2].map((k) => <path key={k} d={`M${600 + k * 20} 560L${600 + k * 90} 800`} stroke="#c9c2a8" strokeWidth={1.5} />)}
      {[[-1, 640], [1, 640], [-1, 720], [1, 720]].map(([s, y], i) => (
        <g key={i}>
          <circle cx={600 + s * (y === 640 ? 110 : 200)} cy={y} r={34} fill="#ffe9a8" opacity={0.2} />
          <ellipse cx={600 + s * (y === 640 ? 110 : 200)} cy={y} rx={3} ry={6} fill="#fff6d6" />
        </g>
      ))}
      <Petals seed={19} n={60} colors={['#ffffff', '#f4e6da', '#e6a595']} x0={380} x1={820} y0={560} y1={800} size={8} />
      <ArchWall x0={0} x1={400} top={0} bottom={800} count={2} fill="#c9c4ac" opacity={0.7} />
      <ArchWall x0={800} x1={1200} top={0} bottom={800} count={2} fill="#c9c4ac" opacity={0.7} />
    </>
  ),

  intimate: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#16241f'], [0.6, '#2f4a3e'], [1, '#6a7f5a']]} />
        <Rad id={`${u}g`} stops={[[0, '#ffe2a0', 0.6], [1, '#ffe2a0', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={560} r={380} />
      <path d="M-20 0H1220V200C1100 260 960 190 820 250C700 290 520 250 380 270C240 290 120 230 -20 280Z" fill="#0f1b17" />
      <LampStrings rows={[{ y: 250, sag: 40, n: 24 }, { y: 210, sag: 30, n: 18, x0: 200, x1: 1000 }]} color="#ffd58a" />
      <rect y={650} width={W} height={150} fill="#1a2a22" />
      <ellipse cx={600} cy={640} rx={170} ry={36} fill="#f7efdc" />
      <rect x={596} y={640} width={8} height={90} fill="#d8cdb0" />
      <ellipse cx={600} cy={724} rx={80} ry={14} fill="#d8cdb0" />
      {[540, 600, 660].map((x) => <g key={x}><ellipse cx={x} cy={622} rx={2.6} ry={5} fill="#fff4d6" /><circle cx={x} cy={622} r={20} fill="#ffd58a" opacity={0.3} /></g>)}
      {[420, 780].map((x) => <g key={x}><ellipse cx={x} cy={690} rx={30} ry={8} fill="#0b140f" /><rect x={x - 22} y={600} width={44} height={86} rx={20} fill="#0b140f" /></g>)}
      <Bokeh seed={6} n={14} colors={['#ffe2a0']} o={0.25} y0={180} y1={520} rMax={26} />
    </>
  ),

  multiday: (u) => (
    <>
      <defs><Lin id={`${u}s`} stops={[[0, '#150a33'], [0.6, '#5a1a52'], [1, '#c8402a']]} /></defs>
      <Sky id={`${u}s`} />
      <LampStrings rows={[{ y: 60, sag: 30 }, { y: 150, sag: 40, n: 20 }, { y: 260, sag: 50, n: 16 }]} color="#ffb44f" />
      <LampStrings rows={[{ y: 100, sag: 36, n: 14, x0: 100, x1: 1100 }]} color="#ff6a8a" seed={9} />
      <LampStrings rows={[{ y: 205, sag: 36, n: 14, x0: 100, x1: 1100 }]} color="#58d0c4" seed={10} o={0.8} />
      <Bokeh seed={15} n={44} colors={['#ffb44f', '#ff6a8a', '#58d0c4', '#fff1d6']} o={0.4} rMax={34} y0={300} y1={800} />
      <Strands xs={Array.from({ length: 30 }, (_, i) => 20 + i * 40)} top={280} len={[60, 110, 80, 140]} color="#f0a22e" color2="#e0431f" r0={6} seed={4} />
      <ArchWall top={520} bottom={H} count={5} fill="#12061f" opacity={0.85} archW={0.55} />
    </>
  ),

  couple: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#3a1228'], [0.6, '#b04a3a'], [1, '#f6b878']]} />
        <Rad id={`${u}g`} stops={[[0, '#fff0c4', 0.95], [1, '#ffbf70', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={430} r={380} />
      <ArchWall top={90} bottom={H} count={3} fill="#241022" archW={0.7} apex={0.85} />
      <Strands xs={[470, 500, 530, 700, 730, 760]} top={120} len={[90, 150, 60]} color="#f0a22e" color2="#e0431f" r0={6} />
      <Person x={560} y={770} h={430} color="#150812" arms="hold" />
      <Person x={650} y={775} h={400} color="#150812" dress arms="hold" veil="#3a1832" />
      <Petals seed={8} n={50} colors={['#f0a22e', '#e0431f', '#fff1d6']} size={8} y0={100} y1={800} o={0.6} />
    </>
  ),

  family: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#2b1220'], [0.7, '#7a2a2a'], [1, '#d68a4a']]} />
        <Rad id={`${u}g`} stops={[[0, '#ffd48a', 0.7], [1, '#ffd48a', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={520} r={460} />
      <LampStrings rows={[{ y: 80, sag: 36 }, { y: 150, sag: 30, n: 18 }]} color="#ffc15f" />
      <rect y={650} width={W} height={150} fill="#1a0a10" opacity={0.7} />
      {[200, 330, 450, 570, 690, 810, 930, 1040].map((x, i) => <Person key={x} x={x} y={730 + (i % 2) * 20} h={[330, 260, 360, 200, 340, 300, 250, 330][i]} color="#150810" arms={[ 'up', 'down', 'wide', 'up', 'down', 'up', 'wide', 'down'][i] as 'up'} dress={i % 3 === 1} />)}
      <Bokeh seed={11} n={16} colors={warm} o={0.3} y0={200} y1={600} rMax={30} />
    </>
  ),

  night: (u) => (
    <>
      <defs>
        <Lin id={`${u}s`} stops={[[0, '#0d0710'], [0.6, '#2a0f18'], [1, '#5a1a1a']]} />
        <Rad id={`${u}g`} stops={[[0, '#ffb35c', 0.5], [1, '#ffb35c', 0]]} />
      </defs>
      <Sky id={`${u}s`} />
      <Glow id={`${u}g`} cx={600} cy={560} r={560} />
      <ArchWall top={90} bottom={470} count={7} fill="#07040a" opacity={0.85} archW={0.5} apex={0.7} />
      <LampStrings rows={[{ y: 60, sag: 30, n: 30 }, { y: 120, sag: 26, n: 26 }]} color="#ffc15f" />
      {[0, 1, 2].map((i) => <rect key={i} x={0} y={470 + i * 110} width={W} height={1.5} fill="#ffb35c" opacity={0.12} />)}
      <Candles seed={7} n={70} y0={470} y1={780} />
      <Bokeh seed={5} n={22} colors={warm} o={0.25} y0={100} y1={460} rMax={28} />
    </>
  ),
}
