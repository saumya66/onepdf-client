import { AnimatedSection } from './ui/AnimatedSection'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "Is OnePdf really free?",
    answer: "Yes! You get 5 free PDF operations per day with no credit card required. For unlimited access and advanced features, you can upgrade to our Pro plan.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-level encryption for all file transfers. Your files are automatically deleted from our servers after 24 hours. We never store, share, or sell your documents.",
  },
  {
    question: "What file types are supported?",
    answer: "We support PDF files (up to 100MB) and common image formats (JPG, PNG, WEBP) for operations like adding signatures. We're constantly adding support for more formats.",
  },
  {
    question: "How does the AI understand my requests?",
    answer: "Our AI is trained to understand natural language requests about PDFs. Just type what you need like you'd tell a colleague: 'split pages 2-10', 'merge these files', or 'compress this PDF'. No technical jargon needed.",
  },
  {
    question: "Can I use OnePdf on mobile?",
    answer: "Yes! OnePdf is fully responsive and works great on tablets and smartphones. Access your PDF tools anywhere, anytime.",
  },
  {
    question: "What if I need help?",
    answer: "Our support team typically responds within 2 hours during business hours. Pro users get priority support with responses in under 30 minutes.",
  },
]

export function FAQSection() {
  return (
    <section className="relative py-24 bg-slate-900">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Questions? We've Got Answers.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-white hover:text-emerald-400 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}

