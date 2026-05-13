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

export function FaqContent({ faqs }: FaqContentProps) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="group border border-border/50 bg-card rounded-xl px-4 md:px-6 data-[state=open]:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
          >
            <AccordionTrigger className="text-base md:text-lg hover:no-underline py-5 md:py-6">
              <div className="flex items-center gap-4 text-left">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors duration-300">
                  {faq.icon && iconMap[faq.icon] ? iconMap[faq.icon] : <HelpCircle className="w-5 h-5" />}
                </div>
                <span className="font-semibold">{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 pt-0 px-2 md:px-14">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
