import { GlassCard } from './ui/GlassCard'
import { AnimatedSection } from './ui/AnimatedSection'
import { Bot, Zap, Shield, Layers } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Conversations',
    description: 'Just describe what you need in plain English. No complex menus, no learning curve.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Processing',
    description: 'Most tasks complete in under 10 seconds. Your time is valuable.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your files auto-delete after 24 hours. We never store or share your documents.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Layers,
    title: 'All-in-One Solution',
    description: 'Split, merge, compress, sign — everything in one place. No more tool-hopping.',
    gradient: 'from-blue-500 to-indigo-500',
  },
]

export function WhyChooseSection() {
  return (
    <section id="features" className="relative py-24 bg-slate-950">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose OnePdf
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            We built the PDF tool we always wanted — simple, fast, and actually enjoyable to use.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.1}>
              <GlassCard variant="dark" className="p-8 h-full">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

