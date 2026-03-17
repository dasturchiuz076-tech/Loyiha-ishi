/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Target, 
  Lightbulb, 
  Users, 
  Quote, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Heart,
  Star,
  Award
} from 'lucide-react';

// --- Types ---
interface Slide {
  id: number;
  image: string;
  text: string;
}

interface TeamMember {
  name: string;
  role: string;
}

// --- Data ---
const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80",
    text: "Harakat - muvaffaqiyatning kalitidir."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1920&q=80",
    text: "Bugungi mehnat - ertangi rohat."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80",
    text: "Maqsad sari to'xtamasdan intiling."
  }
];

const team: TeamMember[] = [
  { name: "Jamoliddin Kamoliddinov", role: "Jamoa a'zosi" },
  { name: "Azizov Abbos", role: "Jamoa a'zosi" },
  { name: "Olimov Muhammadsolih", role: "Jamoa a'zosi" }
];

const successStories = [
  {
    title: "Tomas Edison",
    story: "Lampochkani ixtiro qilishdan oldin u 1000 marta muvaffaqiyatsizlikka uchragan. Ammo u hech qachon to'xtamagan.",
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Sportchi irodasi",
    story: "Olimpiada chempionlari minglab soatlik mashg'ulotlar va qiyinchiliklar evaziga oltin medalga erishadilar.",
    icon: <Award className="w-8 h-8 text-blue-500" />
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Asosiy", href: "#home" },
    { name: "Ma'nosi", href: "#meaning" },
    { name: "Ahamiyati", href: "#importance" },
    { name: "Misollar", href: "#examples" },
    { name: "Jamoa", href: "#team" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <span className={`text-2xl font-bold tracking-tighter ${scrolled ? 'text-indigo-600' : 'text-white'}`}>
              Harakat & Baxt
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${scrolled ? 'text-slate-700 hover:text-indigo-600' : 'text-white/90 hover:text-white'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-slate-700' : 'text-white'}`}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight"
              >
                Harakat qilmagan baxtga yetolmas
              </motion.h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl text-white/90 mb-10 font-light italic"
              >
                "{slides[current].text}"
              </motion.p>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <a 
                  href="#meaning"
                  className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg group"
                >
                  Boshlash
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${current === idx ? 'bg-white w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg text-slate-600 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-20 h-1.5 bg-indigo-600 mx-auto mt-6 rounded-full" />
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      {/* Section 1: Home */}
      <HeroSlider />

      {/* Section 2: Meaning */}
      <section id="meaning" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Ibora Ma'nosi" 
            subtitle="Bu qadimiy hikmat bizga hayotning eng muhim qonuniyatini eslatadi."
          />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center">
                  <Target className="mr-3 text-indigo-600" />
                  Asosiy tushuncha
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  "Harakat qilmagan baxtga yetolmas" iborasi shuni anglatadiki, inson o'z oldiga qo'ygan maqsadlariga, orzu qilgan baxtiga faqatgina tinimsiz mehnat, izlanish va harakat orqali erishishi mumkin. Baxt osmondan tushmaydi, uni o'z qo'llarimiz bilan yaratishimiz kerak.
                </p>
              </div>
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center">
                  <Users className="mr-3 text-emerald-600" />
                  Hayotiy misol
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  Tasavvur qiling, bir dehqon hosil olishni istaydi, lekin yerga urug' qadamaydi, uni sug'ormaydi. U qanchalik ko'p orzu qilmasin, harakat bo'lmasa, hosil ham bo'lmaydi. Hayot ham xuddi shunday - harakat hosilning urug'idir.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                alt="Effort" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <Star className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Muvaffaqiyat darajasi</p>
                    <p className="text-xl font-bold text-slate-900">100% Harakat</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Importance of Effort */}
      <section id="importance" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Harakatning Ahamiyati" 
            subtitle="Nima uchun mehnat va intilish hayotimizda hal qiluvchi rol o'ynaydi?"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Maqsadga yetaklaydi",
                desc: "Harakat - bu orzu va natija o'rtasidagi ko'prikdir. Usiz har qanday buyuk g'oya shunchaki xayol bo'lib qolaveradi.",
                icon: <ArrowRight className="w-6 h-6" />
              },
              {
                title: "Irodani mustahkamlaydi",
                desc: "Qiyinchiliklarni yengib o'tish jarayonida inson xarakteri shakllanadi va irodasi po'latdek mustahkam bo'ladi.",
                icon: <CheckCircle2 className="w-6 h-6" />
              },
              {
                title: "O'ziga ishonchni oshiradi",
                desc: "Kichik bo'lsa-da, mehnat evaziga erishilgan natija insonda o'z kuchiga bo'lgan ishonchni uyg'otadi.",
                icon: <Heart className="w-6 h-6" />
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Quotes */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 bg-indigo-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden"
          >
            <Quote className="absolute top-10 left-10 w-20 h-20 text-white/10" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif italic mb-6">
                "Mehnat, mehnatning tagi rohat."
              </h3>
              <p className="text-indigo-200 text-lg">- O'zbek xalq maqoli</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Examples */}
      <section id="examples" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Muvaffaqiyat Hikoyalari" 
            subtitle="Harakat orqali cho'qqilarni zabt etgan insonlar hayotidan namunalar."
          />
          
          <div className="grid md:grid-cols-2 gap-12">
            {successStories.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row bg-slate-50 rounded-3xl overflow-hidden hover:bg-slate-100 transition-colors"
              >
                <div className="p-8 flex-1">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg italic">
                    "{item.story}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Conclusion + Team */}
      <section id="team" className="py-24 bg-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Xulosa</h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
              Xulosa qilib aytganda, hayotda hech narsa o'z-o'zidan sodir bo'lmaydi. Baxt - bu manzil emas, balki harakat jarayonidir. Har bir qadam, har bir urinish sizni orzularingizga yaqinlashtiradi. Hech qachon to'xtamang!
            </p>
          </div>

          <div className="border-t border-white/10 pt-20">
            <h3 className="text-2xl font-semibold mb-12 text-center text-indigo-300 uppercase tracking-widest">Loyiha Jamoasi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center"
                >
                  <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-indigo-400" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                  <p className="text-indigo-300 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <p className="text-2xl font-light italic text-indigo-200 mb-4">E'tiboringiz uchun rahmat!</p>
            <div className="flex justify-center space-x-4">
              <Star className="text-yellow-500 animate-pulse" />
              <Star className="text-yellow-500 animate-pulse delay-75" />
              <Star className="text-yellow-500 animate-pulse delay-150" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <footer className="py-8 bg-black text-white/40 text-center text-sm border-t border-white/5">
        <p>&copy; 2026 Maktab loyihasi. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}
