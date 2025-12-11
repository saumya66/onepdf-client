import { motion, useInView } from 'motion/react'
import { useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
}

export function AnimatedSection({ 
  children, 
  className, 
  delay = 0,
  direction = 'up',
  once = true
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

