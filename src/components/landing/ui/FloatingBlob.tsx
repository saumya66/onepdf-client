import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface FloatingBlobProps {
  className?: string
  color?: 'emerald' | 'teal' | 'cyan'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  delay?: number
}

export function FloatingBlob({ 
  className, 
  color = 'emerald', 
  size = 'md',
  delay = 0 
}: FloatingBlobProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
  }

  const colorClasses = {
    emerald: 'bg-emerald-500/30',
    teal: 'bg-teal-500/30',
    cyan: 'bg-cyan-500/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 30, -10, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        x: { duration: 20, repeat: Infinity, ease: 'easeInOut', delay },
        y: { duration: 25, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      className={cn(
        'absolute rounded-full blur-3xl pointer-events-none',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  )
}

