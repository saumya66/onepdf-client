import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { GlassButton } from './ui/GlassButton'
import { FloatingBlob } from './ui/FloatingBlob'
import { Play, Sparkles, Star } from 'lucide-react'
import demoHeroImage from '@/assets/images/demoHero.png'

export function HeroSection() {
  const companyLogos = [
    'Stripe', 'Notion', 'Linear', 'Vercel', 'Arc'
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/50">
      {/* Floating Blobs */}
      <FloatingBlob color="emerald" size="xl" className="top-0 right-0 -translate-y-1/2 translate-x-1/2" delay={0} />
      <FloatingBlob color="teal" size="lg" className="bottom-0 left-0 translate-y-1/2 -translate-x-1/2" delay={0.5} />
      <FloatingBlob color="cyan" size="md" className="top-1/3 left-1/4" delay={1} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-300 font-medium">AI-Powered PDF Processing</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Talk to Your PDFs.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Get Stuff Done.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-8"
          >
            AI-powered processing that understands natural language.<br />
            Split, merge, compress, sign — all in one conversation.
          </motion.p>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/60 text-sm ml-2">Loved by 2,847+ users</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <Link to="/signup">
              <GlassButton variant="primary" size="lg" glow className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Free
              </GlassButton>
            </Link>
            <GlassButton variant="secondary" size="lg" className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </GlassButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40"
          >
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
              Try for free
            </span>
          </motion.div>

          {/* App Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <div className="relative mx-auto max-w-5xl">
              {/* Gradient overlay - inside max-w container */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none rounded-2xl" /> */}
              {/* Glass Frame */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-emerald-500/10">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-slate-700/50 rounded-lg px-4 py-1 text-xs text-white/40">
                      app.onepdf.ai
                    </div>
                  </div>
                </div>
                {/* App Preview - Actual Screenshot */}
                <div className="rounded-b-xl overflow-hidden">
                  <img 
                    src={demoHeroImage} 
                    alt="OnePdf App Demo" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16"
          >
            <p className="text-sm text-white/40 mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {companyLogos.map((logo, i) => (
                <motion.span
                  key={logo}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  className="text-xl font-semibold text-white/20 hover:text-white/40 transition-colors"
                >
                  {logo}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

