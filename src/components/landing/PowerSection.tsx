import { motion } from 'motion/react'
import { AnimatedSection } from './ui/AnimatedSection'
import { GlassCard } from './ui/GlassCard'
import { GlassButton } from './ui/GlassButton'
import { Scissors, Merge, FileDown, PenTool, Globe, Brain } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const operations = [
  { icon: Scissors, label: 'Split', color: 'text-emerald-400' },
  { icon: Merge, label: 'Merge', color: 'text-teal-400' },
  { icon: FileDown, label: 'Compress', color: 'text-cyan-400' },
  { icon: PenTool, label: 'Sign', color: 'text-blue-400' },
]

export function PowerSection() {
  return (
    <section className="relative py-24 bg-slate-950">
      {/* Subtle Pattern - same as WhyChoose */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Unlock the Power of OnePdf
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            One AI that understands exactly what you need and delivers instantly.
          </p>
        </AnimatedSection>

        {/* Main Feature Card */}
        <AnimatedSection delay={0.1}>
          <GlassCard variant="dark" glow className="p-8 md:p-12 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Intelligent Routing That Delivers
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Our AI automatically understands your request and routes it to the right operation. No menus to navigate, no buttons to click — just results.
                </p>
                <Link to="/signup">
                  <GlassButton variant="primary" glow className="flex items-center gap-2">
                    Get Started
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </GlassButton>
                </Link>
              </div>

              {/* Flow Diagram */}
              <div className="relative">
                <div className="flex flex-col items-center">
                  {/* Input */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-slate-800 rounded-xl px-6 py-4 mb-4 border border-white/10"
                  >
                    <span className="text-white/80 text-sm font-medium">"@report.pdf split pages 2-10"</span>
                  </motion.div>

                  {/* Arrow Down */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: 40 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="w-px bg-gradient-to-b from-white/20 to-emerald-400"
                  />

                  {/* AI Processing */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-emerald-600 text-white rounded-full px-6 py-3 my-4 shadow-lg shadow-emerald-500/30"
                  >
                    <span className="text-sm font-medium">AI Processing</span>
                  </motion.div>

                  {/* Branches */}
                  <div className="flex gap-4 flex-wrap justify-center">
                    {operations.map((op, i) => (
                      <motion.div
                        key={op.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2 border border-white/10 ${i === 0 ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-950' : ''}`}
                      >
                        <op.icon className={`w-4 h-4 ${op.color}`} />
                        <span className="text-sm font-medium text-white/80">{op.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Secondary Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedSection delay={0.2}>
            <GlassCard variant="dark" className="p-8 h-full">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Works in Any Language
                  </h3>
                  <p className="text-white/60">
                    Type in English, Spanish, French, German, or any language. Our AI understands them all.
                  </p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <GlassCard variant="dark" className="p-8 h-full">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Understands Context
                  </h3>
                  <p className="text-white/60">
                    Reference previous messages and files. Say "use the same settings" and we'll know what you mean.
                  </p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

