import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Truck, HeartPulse, Sparkles, Award, ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Haqqımızda | VitaminAz - Premium Sağlamlıq",
  description: "VitaminAz haqqında. Bakıda orijinal vitaminlər, sürətli çatdırılma və 100% müştəri məmnuniyyəti.",
}

export default function AboutPage() {
  return (
    <div className="bg-gray-50/50 dark:bg-slate-950/50 min-h-screen font-sans selection:bg-primary/20">
      
      {/* 1. HERO SECTION (Immersive & Cinematic) */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDuration: '10s' }}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-8 uppercase tracking-widest ring-1 ring-primary/20 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Sizin Sağlamlıq Bələdçiniz
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-gray-900 dark:text-white tracking-tighter leading-[1.1]">
            Sağlamlığa <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Dəyər Qatırıq</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium text-balance">
            Məqsədimiz Azərbaycanda hər kəsin orijinal, keyfiyyətli və sərfəli qiymətə vitamin və qida əlavələrinə çıxışını təmin etməkdir.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY (Sophisticated Editorial Layout) */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Image / Visual */}
            <div className="relative group perspective-[1000px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-[3rem] rotate-3 scale-105 opacity-20 blur-xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-700"></div>
              <div className="relative h-[500px] md:h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl bg-white dark:bg-slate-800 border border-white/20 dark:border-slate-700/50 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center transition-transform duration-700 group-hover:rotate-y-2 group-hover:rotate-x-2">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-600/90 mix-blend-multiply"></div>
                 <HeartPulse className="w-24 h-24 text-white/80 mb-8 relative z-10" strokeWidth={1} />
                 <h3 className="text-4xl md:text-5xl font-black text-white relative z-10 leading-tight">
                   "Sağlam həyat tərzi seçilən deyil, yaşanan bir fəlsəfədir."
                 </h3>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Biz Kimik?</h2>
              
              <div className="w-20 h-2 bg-gradient-to-r from-primary to-blue-500 rounded-full"></div>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-pretty">
                <strong>VitaminAz</strong> olaraq uzun illərdir ki, Bakı və ətraf ərazilərdə müştərilərimizə xidmət göstəririk. Biz yalnız məhsul satmırıq, eyni zamanda müştərilərimizə sağlam yaşamaq üçün düzgün məsləhətlər və yol göstərici təqdim edirik.
              </p>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-pretty">
                Bütün məhsullarımız rəsmi distribyutorlardan və etibarlı xarici tərəfdaşlardan birbaşa tədarük edilir. Bu o deməkdir ki, aldığınız hər bir məhsulun orijinallığına və təmizliyinə tam zəmanət veririk.
              </p>

              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "100% Orijinal Məhsullar", 
                  "Rəsmi Sertifikatlar", 
                  "Sürətli Çatdırılma", 
                  "7/24 Müştəri Dəstəyi"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-semibold">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (Glassmorphism Cards) */}
      <section className="py-24 bg-gray-100 dark:bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6">Niyə Biz?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Bizim üçün ən vacib meyar müştəri məmnuniyyəti və insan sağlamlığıdır.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="group bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-gray-200 dark:border-slate-700 p-10 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mütləq Keyfiyyət</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Təqdim etdiyimiz hər bir məhsul ciddi keyfiyyət yoxlanışından keçir. Beynəlxalq standartlara cavab verməyən heç bir məhsul mağazamızda yer ala bilməz.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-gray-200 dark:border-slate-700 p-10 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 delay-100">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sürətli Çatdırılma</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Vaxtınızın dəyərini bilirik. Sifarişləriniz təsdiqləndiyi andan etibarən ən qısa müddətdə operativ şəkildə qapınıza çatdırılır.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-gray-200 dark:border-slate-700 p-10 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 delay-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sərfəli Qiymətlər</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sağlamlıq hər kəs üçün əlçatan olmalıdır. Birbaşa təchizatçılarla işlədiyimiz üçün ən premium məhsulları ən uyğun qiymətlərlə təklif edirik.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-slate-800 dark:from-primary/20 dark:to-blue-900/20 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border dark:border-slate-800 shadow-2xl">
            {/* Decors */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10 tracking-tight">
              Sağlamlığınız Üçün İlk Addımı Atın
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Minlərlə məmnun müştərimiz arasına qatılın. Orijinal vitamin və minerallarla immunitetinizi bu gündən gücləndirin.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link 
                href="/" 
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-[#848482] rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
              >
                Kataloqa Bax
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Bizimlə Əlaqə
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
