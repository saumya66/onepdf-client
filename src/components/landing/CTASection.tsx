import { Link } from '@tanstack/react-router'
import { AnimatedSection } from './ui/AnimatedSection'
import { GlassButton } from './ui/GlassButton'
import { FloatingBlob } from './ui/FloatingBlob'
import { FileText, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 to-emerald-950 overflow-hidden">
      {/* Background Elements */}
      <FloatingBlob color="emerald" size="xl" className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <FloatingBlob color="teal" size="lg" className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Logo */}
        <AnimatedSection>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-600 mb-8 shadow-lg shadow-emerald-500/30">
            <FileText className="w-10 h-10 text-white" />
          </div>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience the Power of OnePdf<br />
            <span className="text-emerald-400">Start with a Free Demo Today</span>
          </h2>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.2}>
          <Link to="/signup">
            <GlassButton variant="primary" size="lg" glow className="flex items-center gap-2 mx-auto">
              <Sparkles className="w-5 h-5" />
              Get Started Free
            </GlassButton>
          </Link>
        </AnimatedSection>

        {/* Trust Indicators */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
          </div>
        </AnimatedSection>

        {/* Social Links */}
        <AnimatedSection delay={0.4}>
          <div className="flex items-center justify-center gap-4 mt-12">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="text-xs font-medium">{social[0]}</span>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

