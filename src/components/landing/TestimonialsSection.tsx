import { AnimatedSection } from './ui/AnimatedSection'
import { GlassCard } from './ui/GlassCard'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "Saved me 2 hours every week. I used to dread PDF tasks, now they take seconds.",
    author: "Sarah Chen",
    role: "Operations Lead",
    company: "Stripe",
    rating: 5,
  },
  {
    quote: "Finally, a PDF tool that doesn't make me want to pull my hair out. The AI actually understands what I need.",
    author: "Mike Thompson",
    role: "Developer",
    company: "Vercel",
    rating: 5,
  },
  {
    quote: "The @ mentions feature is genius. I can reference files so easily.",
    author: "Lisa Park",
    role: "Product Manager",
    company: "Linear",
    rating: 5,
  },
  {
    quote: "Replaced Adobe Acrobat for our entire team. Everyone picked it up in minutes.",
    author: "David Kim",
    role: "CTO",
    company: "TechStartup",
    rating: 5,
  },
  {
    quote: "So fast! I blinked and my 50-page PDF was already split.",
    author: "Alex Rivera",
    role: "Designer",
    company: "Notion",
    rating: 5,
  },
  {
    quote: "Love the clean UI. No clutter, no confusion — just results.",
    author: "Emma Wilson",
    role: "Freelancer",
    company: "Self-employed",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 bg-slate-950">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98110_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See How Our Users Are Living the<br />
            <span className="text-emerald-400">Future of PDF Work</span>
          </h2>
        </AnimatedSection>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={testimonial.author} 
              delay={index * 0.1}
              className="break-inside-avoid"
            >
              <GlassCard variant="dark" className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/80 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-white/50">
                      {testimonial.role} @ {testimonial.company}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

