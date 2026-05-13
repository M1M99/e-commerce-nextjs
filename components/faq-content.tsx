"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Package, Truck, CreditCard, ShieldCheck, MapPin, Clock, RotateCcw, CalendarCheck } from "lucide-react"

export interface FAQItem {
  question: string
  answer: string
  icon?: string
}

interface FaqContentProps {
  faqs: FAQItem[]
}

const iconMap: Record<string, React.ReactNode> = {
  package: <Package className="w-5 h-5" />,
  truck: <Truck className="w-5 h-5" />,
  creditcard: <CreditCard className="w-5 h-5" />,
  shieldcheck: <ShieldCheck className="w-5 h-5" />,
  mappin: <MapPin className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  rotateccw: <RotateCcw className="w-5 h-5" />,
  calendarcheck: <CalendarCheck className="w-5 h-5" />,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function FaqContent({ faqs }: FaqContentProps) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-3xl mx-auto space-y-4"
    >
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <motion.div key={index} variants={itemAnim}>
            <AccordionItem 
              value={`item-${index}`} 
              className="border border-border/50 bg-card rounded-xl px-4 md:px-6 data-[state=open]:shadow-md transition-all duration-300"
            >
              <AccordionTrigger className="text-base md:text-lg hover:no-underline py-5 md:py-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {faq.icon && iconMap[faq.icon] ? iconMap[faq.icon] : <HelpCircle className="w-5 h-5" />}
                  </div>
                  <span className="font-semibold">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 pt-0 px-14">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  )
}
