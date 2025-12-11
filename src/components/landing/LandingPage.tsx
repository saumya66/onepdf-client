import { Navbar } from './Navbar'
import { HeroSection } from './HeroSection'
import { WhyChooseSection } from './WhyChooseSection'
import { HowItWorksSection } from './HowItWorksSection'
import { PowerSection } from './PowerSection'
import { StatsSection } from './StatsSection'
import { TestimonialsSection } from './TestimonialsSection'
import { FAQSection } from './FAQSection'
import { CTASection } from './CTASection'
import { Footer } from './Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseSection />
        <HowItWorksSection />
        <PowerSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

