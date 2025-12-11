import { AnimatedSection } from './ui/AnimatedSection'
import { CountUp } from './ui/CountUp'
import { FloatingBlob } from './ui/FloatingBlob'

const stats = [
  { value: 2847, suffix: '+', label: 'Happy Users' },
  { value: 50000, suffix: '+', label: 'PDFs Processed' },
  { value: 4.9, suffix: '/5', label: 'User Rating' },
  { value: 10, suffix: 's', label: 'Avg. Task Time' },
]

export function StatsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-r from-emerald-600 to-teal-600 overflow-hidden">
      {/* Background Elements */}
      <FloatingBlob color="cyan" size="lg" className="top-0 right-0 opacity-30" />
      <FloatingBlob color="teal" size="md" className="bottom-0 left-0 opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 font-medium">
                {stat.label}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

