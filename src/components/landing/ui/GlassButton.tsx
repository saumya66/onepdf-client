import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { forwardRef, ReactNode } from 'react'

interface GlassButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  className?: string
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, onClick, disabled }, ref) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const variantClasses = {
      primary: 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500/50',
      secondary: 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-lg',
      outline: 'bg-transparent hover:bg-emerald-50 text-emerald-700 border-emerald-300 hover:border-emerald-400',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'rounded-xl font-semibold border transition-all duration-200 cursor-pointer',
          sizeClasses[size],
          variantClasses[variant],
          glow && variant === 'primary' && 'shadow-lg shadow-emerald-500/40',
          glow && variant === 'secondary' && 'shadow-lg shadow-white/10',
          className
        )}
      >
        {children}
      </motion.button>
    )
  }
)

GlassButton.displayName = 'GlassButton'

