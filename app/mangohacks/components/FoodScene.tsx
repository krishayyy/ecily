"use client"

import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

const clamp = (v: number) => Math.min(1, Math.max(0, v))
/** Smooth ease in/out (smootherstep), zero velocity at both ends so segments chain without jerks. */
const seg = (p: number, a: number, b: number) => {
  const t = clamp((p - a) / (b - a))
  return t * t * t * (t * (t * 6 - 15) + 10)
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const phys = (color: number, o: THREE.MeshPhysicalMaterialParameters = {}) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: 0.6, ...o })

// Cup profile: inner wall radius at height y
const CUP_BOTTOM = -0.82
const CUP_TOP = 1.0
const innerR = (y: number) => 0.72 + ((y - CUP_BOTTOM) / (CUP_TOP - CUP_BOTTOM)) * (0.94 - 0.72)

const HINGE = new THREE.Vector3(-0.47, 0.09, 0) // back edge of the pizza box, model space
const LID_CLOSED = -1.047
const LID_OPEN = 0.7

/** Scroll-driven scene. `progress.current` (0..1) is the target; the scene eases toward it. */
export function startFoodScene(canvas: HTMLCanvasElement, progress: { current: number }, onIdle?: () => void) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" })
  renderer.localClippingEnabled = true
  const scene = new THREE.Scene()
  scene.add(new THREE.HemisphereLight(0xffffff, 0x4450b0, 1.4))
  const sun = new THREE.DirectionalLight(0xfff1d0, 2.2)
  sun.position.set(3, 5, 5)
  scene.add(sun)
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60)

  // ---------- pizza box (hinged lid) + pizza ----------
  const pizzaGroup = new THREE.Group()
  scene.add(pizzaGroup)
  const pizzaPivot = new THREE.Group()
  pizzaGroup.add(pizzaPivot)
  let lidPivot: THREE.Group | undefined
  let ready = false
  const loader = new GLTFLoader()
  Promise.all([loader.loadAsync("/mangohacks/models/pizza-box.glb"), loader.loadAsync("/mangohacks/models/pizza.glb")]).then(([box, pizza]) => {
    const fit = (o: THREE.Object3D, w: number) => o.scale.setScalar(w / new THREE.Box3().setFromObject(o).getSize(new THREE.Vector3()).x)
    // re-parent the lid under a pivot sitting on the hinge edge, so it rotates attached to the box
    const lid = box.scene.getObjectByName("lid")!
    lidPivot = new THREE.Group()
    lidPivot.position.copy(HINGE)
    box.scene.add(lidPivot)
    lidPivot.add(lid)
    lid.position.set(lid.position.x - HINGE.x, lid.position.y - HINGE.y, 0)
    fit(box.scene, 3.6)
    box.scene.rotation.y = -Math.PI / 2
    pizzaGroup.add(box.scene)
    fit(pizza.scene, 2.5)
    pizzaPivot.add(pizza.scene)
    ready = true
    kick()
  })

  // ---------- can ----------
  const label = new THREE.TextureLoader().load("/mangohacks/images/food/can-label.jpg", () => kick())
  label.colorSpace = THREE.SRGBColorSpace
  label.anisotropy = 4
  const R = 0.62
  const H = 2.8
  const MOUTH = H / 2 + 0.3
  const can = new THREE.Group()
  const alu = new THREE.MeshStandardMaterial({ color: 0xd5dae6, metalness: 0.85, roughness: 0.28 })
  const dark = new THREE.MeshStandardMaterial({ color: 0x6e758c, metalness: 0.8, roughness: 0.4 })
  const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 40, 1, true), new THREE.MeshStandardMaterial({ map: label, roughness: 0.4, metalness: 0.15 }))
  body.rotation.y = Math.PI
  can.add(body)
  const add = (g: THREE.BufferGeometry, m: THREE.Material, y: number) => {
    const mesh = new THREE.Mesh(g, m)
    mesh.position.y = y
    can.add(mesh)
    return mesh
  }
  add(new THREE.CylinderGeometry(R, R * 0.84, 0.14, 40), alu, -H / 2 - 0.07)
  add(new THREE.CylinderGeometry(R * 0.82, R, 0.2, 40), alu, H / 2 + 0.1)
  add(new THREE.CylinderGeometry(R * 0.8, R * 0.82, 0.1, 40), alu, H / 2 + 0.25)
  add(new THREE.CylinderGeometry(R * 0.76, R * 0.76, 0.03, 40), dark, H / 2 + 0.27)
  add(new THREE.TorusGeometry(R * 0.8, 0.035, 8, 40), alu, MOUTH).rotation.x = Math.PI / 2
  const tab = add(new THREE.CylinderGeometry(0.16, 0.16, 0.025, 20), alu, MOUTH)
  tab.scale.set(1, 1, 1.5)
  tab.position.x = 0.2
  const canPivot = new THREE.Group()
  canPivot.add(can)
  scene.add(canPivot)

  // ---------- cup + liquid ----------
  const cup = new THREE.Group()
  scene.add(cup)
  const prof = [[0, -1], [0.74, -1], [0.78, -0.95], [1.0, 1.0], [0.94, 1.0], [0.72, -0.82], [0, -0.82]].map(([x, y]) => new THREE.Vector2(x, y))
  const glassMesh = new THREE.Mesh(new THREE.LatheGeometry(prof, 32), phys(0xcfeff8, { transparent: true, opacity: 0.28, roughness: 0.05, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false }))
  glassMesh.renderOrder = 3
  cup.add(glassMesh)
  const rimRing = new THREE.Mesh(new THREE.TorusGeometry(0.97, 0.03, 8, 32), phys(0xffffff, { transparent: true, opacity: 0.7 }))
  rimRing.rotation.x = Math.PI / 2
  rimRing.position.y = 1
  cup.add(rimRing)
  // liquid fills the inner wall shape (shrunk 4% so it never pokes through the glass), clipped at the live level
  const level = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)
  const liqProf = [[0, CUP_BOTTOM], [0.7, CUP_BOTTOM], [0.92, CUP_TOP], [0, CUP_TOP]].map(([x, y]) => new THREE.Vector2(x * 0.96, y))
  const liqMat = phys(0xffa800, { emissive: 0xff7a00, emissiveIntensity: 0.55, roughness: 0.2, clearcoat: 0.8, transparent: true, opacity: 0.88, clippingPlanes: [level], side: THREE.DoubleSide })
  const liquid = new THREE.Mesh(new THREE.LatheGeometry(liqProf, 32), liqMat)
  liquid.renderOrder = 1
  cup.add(liquid)
  const surface = new THREE.Mesh(new THREE.CircleGeometry(1, 32), phys(0xffc21f, { emissive: 0xff8a00, emissiveIntensity: 0.6, roughness: 0.2 }))
  surface.rotation.x = -Math.PI / 2
  surface.renderOrder = 1
  cup.add(surface)
  const iceMat = phys(0xe8faff, { transparent: true, opacity: 0.62, roughness: 0.08, clearcoat: 1, emissive: 0x9fe3f5, emissiveIntensity: 0.25 })
  const ice: { m: THREE.Mesh; y: number; float: number }[] = []
  ;[[-0.32, -0.35, 0.1, 0.27, 0.4], [0.3, -0.3, -0.2, 0.25, 1.1], [0, -0.25, 0.34, 0.23, 2], [0.32, -0.55, 0.25, 0.23, 0.7], [-0.32, -0.6, -0.28, 0.25, 1.7], [0, -0.6, 0, 0.23, 0.3]].forEach(([x, y, z, k, r], i) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(k * 2, k * 2, k * 2, 2, k * 0.35), iceMat)
    m.position.set(x, y, z)
    m.rotation.set(r, r * 1.7, r * 0.6)
    cup.add(m)
    ice.push({ m, y, float: i < 3 ? 1 : 0.4 })
  })

  // ---------- stream (curved, rebuilt per frame while pouring) ----------
  const streamMat = phys(0xffa800, { emissive: 0xff7a00, emissiveIntensity: 0.6, roughness: 0.15, clearcoat: 1 })
  let stream: THREE.Mesh | null = null
  const setStream = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, r: number) => {
    stream?.geometry.dispose()
    if (r <= 0.003) {
      if (stream) stream.visible = false
      return
    }
    const g = new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a, b, c), 18, r, 8, false)
    if (!stream) {
      stream = new THREE.Mesh(g, streamMat)
      scene.add(stream)
    } else stream.geometry = g
    stream.visible = true
  }

  // ---------- layout ----------
  let aspect = 1
  function resize() {
    const r = canvas.getBoundingClientRect()
    const w = Math.max(1, r.width)
    const h = Math.max(1, r.height)
    aspect = w / h
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 640 ? 1.5 : 2))
    renderer.setSize(w, h, false)
    camera.aspect = aspect
    camera.updateProjectionMatrix()
    kick()
  }

  // ---------- timeline ----------
  const CUP_X = 0.9
  const CUP_Y = -0.45
  const CUP_S = 0.95
  const TIP_END = 2.0
  const v3 = new THREE.Vector3()
  function draw(p: number, t: number) {
    const narrow = aspect < 0.8
    camera.position.set(0, 3.0, narrow ? 21 : aspect < 1.3 ? 14 : 11.5)
    camera.lookAt(0, 1.3, 0)

    // pizza: lid opens, pizza lifts out, then box slides off while the can arrives (stages overlap on purpose)
    const open = seg(p, 0.02, 0.2)
    const rise = seg(p, 0.16, 0.4)
    const leave = seg(p, 0.42, 0.58)
    if (lidPivot) lidPivot.rotation.z = lerp(LID_CLOSED, LID_OPEN, open)
    pizzaGroup.visible = ready && leave < 1
    pizzaGroup.position.set(-leave * 10, -0.5 - leave * 0.4, 0)
    pizzaGroup.rotation.y = 0.28 + Math.sin(p * 6) * 0.04
    pizzaPivot.position.set(0, lerp(0.22, 2.3, rise), lerp(0, 1.0, rise))
    pizzaPivot.rotation.set(rise * 0.55, rise * 0.5 + Math.sin(t * 1.4) * 0.03 * rise, 0)
    pizzaPivot.visible = open > 0.3 || rise > 0

    // can + cup arrive from the right, can tips, drink pours
    const arrive = seg(p, 0.46, 0.64)
    const tip = seg(p, 0.64, 0.82)
    const pour = seg(p, 0.76, 0.99)
    const theta = tip * TIP_END
    canPivot.visible = arrive > 0
    cup.visible = arrive > 0
    const mouthEnd = new THREE.Vector2(CUP_X - 0.45, 2.15)
    const startPivot = new THREE.Vector2(-1.9, 1.3)
    const endPivot = new THREE.Vector2(mouthEnd.x - MOUTH * Math.sin(TIP_END), mouthEnd.y - MOUTH * Math.cos(TIP_END))
    const pivot = new THREE.Vector2(lerp(startPivot.x, endPivot.x, tip), lerp(startPivot.y, endPivot.y, tip))
    const ax = lerp(9, 0, arrive) // x offset while entering
    canPivot.position.set(pivot.x + ax * 1.1 + (narrow ? 0.9 : 0), pivot.y + Math.sin(arrive * Math.PI) * 0.25, 0)
    canPivot.rotation.z = -theta + (1 - arrive) * 0.35
    cup.scale.setScalar(CUP_S)
    cup.position.set(CUP_X + ax, CUP_Y, 0)

    // liquid level (cup space) rises with the pour
    const lvl = CUP_BOTTOM + 0.02 + pour * 1.35
    level.constant = cup.position.y + lvl * CUP_S // clipping planes are world-space: keep world y <= level
    liquid.visible = pour > 0
    surface.visible = pour > 0
    surface.scale.setScalar(innerR(lvl) * 0.96)
    surface.position.y = lvl + 0.002
    ice.forEach(({ m, y, float }) => {
      const lift = Math.max(0, lvl - (CUP_BOTTOM + 0.5)) * float * 0.55
      m.position.y = y + lift
    })

    // curved stream from the can mouth to the liquid surface
    const flow = seg(p, 0.8, 0.86)
    if (flow > 0 && tip > 0.95) {
      canPivot.updateMatrixWorld(true)
      const m = new THREE.Vector3(0, MOUTH - 0.05, 0).applyMatrix4(can.matrixWorld)
      const end = new THREE.Vector3(cup.position.x, cup.position.y + lvl * CUP_S, 0)
      const mid = new THREE.Vector3(lerp(m.x, end.x, 0.8), lerp(m.y, end.y, 0.28), 0)
      setStream(m, mid, end, 0.085 * flow * (1 - 0.35 * pour))
    } else setStream(v3, v3, v3, 0)

    renderer.render(scene, camera)
  }

  // ---------- damped follow: current chases target, so scrolling feels weighted, not mechanical ----------
  let cur = progress.current
  let raf = 0
  let last = 0
  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
    last = now
    const target = progress.current
    cur += (target - cur) * (1 - Math.exp(-dt * 7))
    if (Math.abs(target - cur) < 0.0004) cur = target
    draw(cur, now / 1000)
    if (cur !== target) raf = requestAnimationFrame(frame)
    else {
      raf = 0
      onIdle?.()
    }
  }
  function kick() {
    if (!raf) {
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
  }

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  return {
    render: kick,
    dispose() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose?.()
        const mat = m.material as THREE.Material | THREE.Material[] | undefined
        ;(Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose())
      })
      label.dispose()
      renderer.dispose()
    },
  }
}
