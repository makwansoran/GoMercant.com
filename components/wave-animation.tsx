"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WaveAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const SEPARATION = 200
    const AMOUNTX = 40
    const AMOUNTY = 60

    let camera: THREE.PerspectiveCamera
    let scene: THREE.Scene
    let renderer: THREE.WebGLRenderer
    let particles: THREE.Sprite[] = []
    let count = 0

    // Initialize
    const getSize = () => {
      const rect = container.getBoundingClientRect()
      return {
        width: Math.max(1, Math.floor(rect.width)),
        height: Math.max(1, Math.floor(rect.height)),
      }
    }

    const initialSize = getSize()
    camera = new THREE.PerspectiveCamera(65, initialSize.width / initialSize.height, 1, 10000)
    camera.position.set(0, 355, 122)

    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000) // White fog

    // Create canvas for sprite texture
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const context = canvas.getContext('2d')!
    context.beginPath()
    context.arc(16, 16, 16, 0, Math.PI * 2, true)
    context.fillStyle = '#2563eb' // Blue color
    context.fill()

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.SpriteMaterial({
      map: texture,
      color: 0x2563eb, // Blue color
      transparent: true,
      opacity: 0.6,
    })

    // Create particles
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const particle = new THREE.Sprite(material)
        particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
        scene.add(particle)
        particles.push(particle)
      }
    }

    renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(initialSize.width, initialSize.height)
    renderer.setClearColor(0xffffff, 1) // White background
    container.appendChild(renderer.domElement)

    // Animation
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate)

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = particles[i++]
          particle.position.y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
          const scale = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4
          particle.scale.set(scale, scale, 1)
        }
      }

      renderer.render(scene, camera)
      count += 0.1
    }

    // Handle resize
    function onWindowResize() {
      const { width, height } = getSize()
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', onWindowResize)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      texture.dispose()
      material.dispose()
      particles.forEach(particle => {
        scene.remove(particle)
      })
    }
  }, [])

  return (
    <div
      id="home_wave"
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none bg-white"
      style={{
        zIndex: 0,
      }}
    />
  )
}
