import Link from "next/link";
import { 
  BookOpen, 
  Users, 
  Star, 
  Heart, 
  Award, 
  Globe, 
  Truck,
  ShieldCheck 
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Serving readers in 50+ countries
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BookStore</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Discover extraordinary stories that inspire, educate, and transform lives. 
              Our carefully curated collection brings the world's best books to your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/books">
                <button className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                  <span>Explore Collection</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>4.9/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>250K+</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-5 h-5" />
                  <span>10M+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  OUR STORY */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 px-4 py-2 rounded-full w-fit">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              Our Journey
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              From a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">passion project</span> 
              to a global bookstore
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                BookStore was born from a simple yet powerful belief: every reader deserves access to 
                transformative stories. What began as a weekend project in a small apartment has grown 
                into a thriving platform serving readers across 50+ countries.
              </p>
              
              <p>
                Today, we partner with publishers worldwide to bring you carefully curated collections 
                that inspire growth, spark imagination, and create lasting memories.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
                <Award className="w-8 h-8 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Happy Readers</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
                <Truck className="w-8 h-8 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Delivery Success</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
              <BookOpen className="w-48 h-48 mx-auto text-blue-500/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl" />
            </div>
          </div>
        </section>

        {/*  CORE VALUES */}
        <section className="text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-800 px-4 py-2 rounded-full w-fit mx-auto">
                <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                What Drives Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6">
                Our <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Core Values</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Star, title: "Curated Quality", desc: "Every book is handpicked by literary experts for maximum impact.", color: "text-amber-600" },
                { icon: Users, title: "Reader First", desc: "Your discovery journey is our top priority, always.", color: "text-blue-600" },
                { icon: Heart, title: "Community", desc: "Building connections between readers who share your passions.", color: "text-pink-600" },
                { icon: BookOpen, title: "Lifelong Learning", desc: "Every page turns you into a better version of yourself.", color: "text-indigo-600" }
              ].map(({ icon: Icon, title, desc, color }, i) => (
                <div 
                  key={title}
                  className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 hover:border-blue-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:bg-white"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-10 h-10 ${color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  SOCIAL PROOF & TESTIMONIALS */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-800 px-4 py-2 rounded-full w-fit">
                <ShieldCheck className="w-4 h-4" />
                Trusted Worldwide
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
                Loved by <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">250K+</span> readers
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Sarah Chen</span>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  "BookStore completely transformed my reading habits. The curation is impeccable 
                  and their recommendations feel like they're made just for me."
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  Readers' Choice 2024
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  50+ Countries
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  99.9% Delivery
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:order-1 lg:row-span-2">
            <div className="bg-gradient-to-br from-gradient-600/5 to-purple-600/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl h-[500px] flex items-center justify-center">
              <div className="text-center">
                <Users className="w-32 h-32 mx-auto text-blue-400/50 mb-8" />
                <div className="text-6xl font-bold text-gray-900 mb-4">250K+</div>
                <div className="text-2xl text-gray-600 font-semibold">Readers Worldwide</div>
              </div>
            </div>
          </div>
        </section>

        {/*  FINAL CTA */}
        <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600/90 rounded-3xl text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to discover your <span className="block bg-gradient-to-r from-white/90 to-white bg-clip-text text-transparent">next favorite book?</span>
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center pt-8">
              <Link href="/books">
                <button className="group relative bg-white/20 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-3 hover:scale-105">
                  <span>Start Browsing</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <div className="text-white/80 text-lg">
                Join 250K+ readers today
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}