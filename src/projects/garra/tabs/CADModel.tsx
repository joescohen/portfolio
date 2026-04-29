import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Grid, Environment, Html, Center } from '@react-three/drei'
import type { Group } from 'three'

const MODEL_PATH = '/models/garra.gltf'

function AircraftModel({ onLoad }: { onLoad: () => void }) {
  const { scene } = useGLTF(MODEL_PATH)
  const ref = useRef<Group>(null)

  useEffect(() => { onLoad() }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15
  })

  return (
    <Center>
      {/* outer group drives auto-rotate; inner group corrects CATIA Z-up → GLTF Y-up */}
      <group ref={ref}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <primitive object={scene} scale={0.001} />
        </group>
      </group>
    </Center>
  )
}

function LoadingOverlay() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-white/70">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <span className="text-xs tracking-widest uppercase">Loading model…</span>
      </div>
    </Html>
  )
}

function Scene({ onLoad }: { onLoad: () => void }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <Environment preset="studio" />
      <Suspense fallback={<LoadingOverlay />}>
        <AircraftModel onLoad={onLoad} />
      </Suspense>
      <Grid
        args={[30, 30]}
        position={[0, -0.85, 0]}
        cellColor="#334155"
        sectionColor="#475569"
        fadeDistance={25}
        infiniteGrid
      />
    </>
  )
}

export function CADModel() {
  const [loaded, setLoaded] = useState(false)
  const [controlsEnabled, setControlsEnabled] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-navy mb-1">Garra — Full Assembly</h2>
        <p className="text-sm text-slate-500">
          CATIA-designed full aircraft assembly, Rev 5 — drag to rotate, scroll to zoom, right-click to pan.
        </p>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-slate-200"
        style={{ height: 560, background: '#0f172a' }}
        onClick={() => setControlsEnabled(true)}
        onMouseLeave={() => setControlsEnabled(false)}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="flex flex-col items-center gap-3 text-white/50">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
              <span className="text-xs tracking-widest uppercase">Loading model…</span>
            </div>
          </div>
        )}

        <Canvas
          camera={{ position: [6, 3, 8], fov: 45 }}
          shadows
          dpr={[1, 2]}
        >
          <Scene onLoad={() => setLoaded(true)} />
          <OrbitControls
            enabled={controlsEnabled || loaded}
            autoRotate={!controlsEnabled}
            autoRotateSpeed={0.8}
            enablePan
            enableZoom
            minDistance={2}
            maxDistance={40}
          />
        </Canvas>

        {loaded && !controlsEnabled && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white/60 text-xs px-3 py-1.5 rounded-full pointer-events-none">
            Click to interact · drag to rotate · scroll to zoom
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {[
          { label: 'File', value: 'Full Aircraft R5' },
          { label: 'Format', value: 'STEP → GLB' },
          { label: 'Source', value: 'CATIA' },
          { label: 'Render', value: 'Three.js / R3F' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-slate-50 rounded-lg px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">{label}</div>
            <div className="text-sm font-semibold text-navy">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
