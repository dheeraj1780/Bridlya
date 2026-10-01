import { useEffect, useRef, useState } from 'react'
import type { MotionValue } from 'framer-motion'
import { Visual } from '../scenes/Visual'

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

/**
 * Two panels of silk, shaded procedurally. Folds are a function of *fabric* coordinates, so as the
 * panel is drawn aside the same cloth is compressed into a narrower strip: pleats tighten and deepen,
 * exactly as gathered fabric does. Light is derived from the fold slope (diffuse + anisotropic sheen).
 */
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uOpen; uniform float uFolds;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fold(float x, float y, float amp){
  float t = uTime;
  float warp = sin(y * 2.1 + t * 0.45 + x * 0.35) * 0.45 + sin(y * 5.3 - t * 0.3) * 0.12;
  float a = sin(x + warp);
  a += 0.38 * sin(2.31 * x + 1.7 + y * 1.4 + t * 0.22);
  a += 0.14 * sin(5.07 * x + y * 3.0 - t * 0.15);
  return a * amp;
}

vec3 silk(float s, float y, float amp, float open){
  float ph = s * uFolds * 6.2831853;
  float e = 0.012;
  float h = fold(ph, y, amp);
  float d = (fold(ph + e, y, amp) - fold(ph - e, y, amp)) / (2.0 * e);
  float lit = clamp(0.58 - d * 0.16, 0.0, 1.0);
  float ao = 0.55 + 0.45 * smoothstep(-1.6, 1.2, h);
  float sheen = pow(clamp(1.0 - abs(d) * 0.34, 0.0, 1.0), 9.0);
  vec3 deep = vec3(0.30, 0.018, 0.026);
  vec3 mid = vec3(0.70, 0.105, 0.085);
  vec3 col = mix(deep, mid, lit) * ao;
  col += vec3(1.0, 0.56, 0.42) * sheen * (0.34 + 0.2 * open);
  float weave = hash(floor(gl_FragCoord.xy * 0.5)) * 0.035;
  col += weave * vec3(1.0, 0.5, 0.4);
  // drape: slightly lighter near the top where the cloth is gathered on the rail, darker at the pool
  col *= mix(0.78, 1.04, smoothstep(0.0, 1.0, y));
  return col;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float o = smoothstep(0.0, 1.0, uOpen);
  float sway = sin(uv.y * 2.4 + uTime * 0.7) * 0.0035 + sin(uv.y * 6.0 - uTime * 0.5) * 0.0012;
  float drape = 0.075 * o * (1.0 - uv.y);
  float eL = mix(0.508, 0.075, o) + drape + sway;
  float eR = mix(0.492, 0.925, o) - drape + sway;

  vec4 outc = vec4(0.0);
  if (uv.x < eL) {
    float s = uv.x / eL;
    float amp = 0.7 + 0.6 * o;
    vec3 c = silk(s, uv.y, amp, o);
    float trim = smoothstep(0.012, 0.0, eL - uv.x);
    c = mix(c, vec3(0.95, 0.72, 0.42), trim * 0.5);
    outc = vec4(c, 1.0);
  } else if (uv.x > eR) {
    float s = (1.0 - uv.x) / (1.0 - eR);
    float amp = 0.7 + 0.6 * o;
    vec3 c = silk(s + 0.37, uv.y, amp, o);
    float trim = smoothstep(0.012, 0.0, uv.x - eR);
    c = mix(c, vec3(0.95, 0.72, 0.42), trim * 0.5);
    outc = vec4(c, 1.0);
  } else {
    float dist = min(uv.x - eL, eR - uv.x);
    float a = exp(-dist * 16.0) * 0.42;
    outc = vec4(vec3(0.0), a);
  }
  float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * vec2(1.0, 1.15)));
  outc.rgb *= mix(0.82, 1.0, vig);
  gl_FragColor = vec4(outc.rgb * outc.a, outc.a);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader')
  return s
}

type Props = { progress: MotionValue<number>; className?: string }

export function SilkCurtain({ progress, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'high-performance' })
    if (!gl) { setFailed(true); return }
    let prog: WebGLProgram
    try {
      prog = gl.createProgram()!
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link')
    } catch {
      setFailed(true)
      return
    }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uOpen = gl.getUniformLocation(prog, 'uOpen')
    const uFolds = gl.getUniformLocation(prog, 'uFolds')

    let raf = 0
    let visible = true
    const t0 = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uRes, w, h)
      gl.uniform1f(uFolds, canvas.clientWidth < 700 ? 0.95 : 1.55)
    }
    const frame = () => {
      raf = 0
      if (!visible) return
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, (performance.now() - t0) / 1000)
      gl.uniform1f(uOpen, progress.get())
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (!raf && visible) raf = requestAnimationFrame(frame) }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start() }, { threshold: 0 })
    io.observe(canvas)
    const onVis = () => { visible = !document.hidden; if (visible) start() }
    document.addEventListener('visibilitychange', onVis)
    start()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [progress])

  if (failed) return <CssCurtain progress={progress} className={className} />
  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />
}

/** Fallback when WebGL is unavailable: the same silk composition, parted with transforms. */
function CssCurtain({ progress, className }: Props) {
  const l = useRef<HTMLDivElement>(null)
  const r = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const apply = (v: number) => {
      const o = Math.min(1, Math.max(0, v))
      if (l.current) l.current.style.transform = `translateX(${-o * 88}%) scaleX(${1 - o * 0.2})`
      if (r.current) r.current.style.transform = `translateX(${o * 88}%) scaleX(${1 - o * 0.2})`
    }
    apply(progress.get())
    return progress.on('change', apply)
  }, [progress])
  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <div ref={l} className="absolute inset-y-0 left-0 w-[50.5%] origin-left will-change-transform"><Visual scene="silk" /></div>
      <div ref={r} className="absolute inset-y-0 right-0 w-[50.5%] origin-right will-change-transform"><Visual scene="silk" /></div>
    </div>
  )
}
