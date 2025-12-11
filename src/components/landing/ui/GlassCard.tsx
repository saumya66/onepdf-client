import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { forwardRef, ReactNode } from 'react'

interface GlassCardProps {
  variant?: 'dark' | 'light'
  hover?: boolean
  glow?: boolean
  className?: string
  children?: ReactNode
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'light', hover = true, glow = false, children }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl backdrop-blur-xl border transition-all duration-300',
          variant === 'dark' 
            ? 'bg-emerald-950/20 border-white/10 text-white' 
            : 'bg-white/70 border-emerald-200/30 text-slate-800',
          hover && 'hover:-translate-y-1 hover:shadow-xl',
          glow && variant === 'dark' && 'shadow-lg shadow-emerald-500/20',
          glow && variant === 'light' && 'shadow-lg shadow-emerald-500/10',
          className
        )}
      >
        {children}
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

