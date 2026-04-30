import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'

function latLngToVec3(lat: number, lng: number, r: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

const PINS = [
  { lat: 40.71, lng: -74.01 },
  { lat: 51.51, lng: -0.13 },
  { lat: 35.68, lng: 139.65 },
  { lat: 48.86, lng: 2.35 },
  { lat: -33.87, lng: 151.21 },
  { lat: 25.20, lng: 55.27 },
  { lat: 19.43, lng: -99.13 },
  { lat: 41.90, lng: 12.50 },
  { lat: -1.29, lng: 36.82 },
  { lat: 1.35, lng: 103.82 },
]

function GlobeScene() {
  const earthTexture = useTexture('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg')
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.06, 32, 32]} />
        <meshStandardMaterial color="#60c8f0" transparent opacity={0.06} />
      </mesh>
      {PINS.map((p, i) => (
        <mesh key={i} position={latLngToVec3(p.lat, p.lng, 2.12)}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  )
}

interface VoyageGlobeProps {
  className?: string
}

export function VoyageGlobe({ className = 'w-full h-full' }: VoyageGlobeProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" />
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.8}
        />
      </Canvas>
    </div>
  )
}
