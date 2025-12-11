import { motion } from 'motion/react'
import { AnimatedSection } from './ui/AnimatedSection'
import { GlassCard } from './ui/GlassCard'
import { Upload, MessageSquare, Download, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Your PDF',
    description: 'Drag and drop or click to upload. We support files up to 100MB.',
  },
  {
    icon: MessageSquare,
    number: '02',
    title: 'Tell Us What You Need',
    description: 'Just type naturally: "Split pages 2-10" or "Merge these files"',
  },
  {
    icon: Download,
    number: '03',
    title: 'Download & Done',
    description: 'Your processed file is ready in seconds. No waiting, no hassle.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Three Steps. That's It.
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            We stripped away everything unnecessary. What's left is pure simplicity.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-px">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-emerald-500/50 via-emerald-500 to-emerald-500/50 origin-left"
            />
          </div>

          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.2}>
              <GlassCard variant="dark" className="p-8 text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm border-4 border-slate-950">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-6">
                  <step.icon className="w-8 h-8 text-emerald-400" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/60">
                  {step.description}
                </p>

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <ArrowRight className="w-6 h-6 text-emerald-500 rotate-90" />
                  </div>
                )}
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

