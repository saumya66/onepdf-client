import { motion, useInView, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function CountUp({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 2,
  className 
}: CountUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0 
  })
  
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.floor(current).toLocaleString()}${suffix}`
  )

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}

