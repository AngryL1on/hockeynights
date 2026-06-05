/**
 * SPEC-UI-7.1 - Scroll-Driven Storytelling using GSAP ScrollTrigger
 */

import {useRef, type ReactNode} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ScrollReveal({children, direction = 'up'}: {children: ReactNode, direction?: 'up' | 'down' | 'left' | 'right'}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const vars = {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    }

    gsap.from(containerRef.current, vars)
  }, {scope: containerRef})

  return <div ref={containerRef}>{children}</div>
}

export function ScrollParallax({children, speed = 0.5}: {children: ReactNode, speed?: number}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(containerRef.current, {
      y: () => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, {scope: containerRef})

  return <div ref={containerRef}>{children}</div>
}
