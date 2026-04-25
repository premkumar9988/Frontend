"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ShieldCheck,
  Star,
  Users,
  MessageCircle,
  BookOpen,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status === "success") setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus(""), 6000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@bookstore.com",
      href: "mailto:support@bookstore.com",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Madurai, Tamil Nadu, India",
      href: "https://maps.google.com",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { icon: Star, value: "4.9", label: "Rating", color: "text-yellow-400" },
    { icon: Users, value: "25K+", label: "Readers", color: "text-blue-400" },
    { icon: MessageCircle, value: "2h", label: "Response", color: "text-emerald-400" },
    { icon: BookOpen, value: "10k+", label: "Books", color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">

      <div className="absolute inset-0">
    
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/90 to-emerald-900/80" />
        
     
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5 animate-pulse" />
        
  
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite_2s]" />
        
       
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
        </div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className="text-center py-20 md:py-28 mb-16 lg:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl text-sm font-bold border border-white/20 shadow-xl mb-8">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Lightning Fast Support · Average 2h Response Time
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white/95">LET'S</span>
              <span className="block bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                CONNECT
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12 px-4">
              Your reading journey deserves world-class support — from order assistance to 
              personalized book recommendations by our expert team.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map(({ icon: Icon, value, label, color }, i) => (
                <div
                  key={label}
                  className="group p-6 backdrop-blur-xl bg-white/8 rounded-3xl border border-white/15 hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-default shadow-xl"
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${color} group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-3xl lg:text-4xl font-black text-white mb-1">{value}</div>
                  <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-8 lg:sticky lg:top-28 h-fit">
              
              {/* Section Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-xl text-white px-5 py-3 rounded-2xl border border-white/20 text-sm font-bold shadow-lg">
                  <Send className="w-4 h-4" />
                  Quick Contact
                </div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight">
                  Reach Out{" "}
                  <span className="block text-3xl lg:text-4xl text-blue-200/90">Anytime</span>
                </h2>
              </div>

              {/* Contact Cards */}
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, title, value, href, gradient }, i) => (
                  <a
                    key={title}
                    href={href}
                    className="group relative overflow-hidden flex items-center gap-4 p-6 lg:p-7 bg-white/8 backdrop-blur-xl rounded-3xl border border-white/15 hover:border-white/30 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-2xl"
                  >
                    {/* Animated shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-[100%] group-hover:translate-x-[100vw] transition-transform duration-1000" />
                    
                    {/* Icon */}
                    <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-lg leading-tight">{title}</p>
                      <p className="text-white/75 text-base lg:text-lg truncate mt-1 font-medium">{value}</p>
                    </div>

                    <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-500 flex-shrink-0" />
                  </a>
                ))}
              </div>

              {/* Support Hours */}
              <div className="p-7 lg:p-8 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-red-500/10 backdrop-blur-xl rounded-3xl border border-orange-400/30 shadow-2xl">
                <h4 className="font-black text-xl lg:text-2xl text-orange-100 flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Clock className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  Support Hours
                </h4>
                <div className="space-y-3 text-sm lg:text-base">
                  {[
                    { dot: "bg-emerald-400", text: "📱 Phone: Mon–Fri  9AM–8PM IST" },
                    { dot: "bg-blue-400", text: "💬 Email / Chat: 24/7 Available" },
                    { dot: "bg-purple-400", text: "📦 Orders: Instant Tracking" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-4 text-white/90 font-semibold">
                      <div className={`w-3 h-3 ${item.dot} rounded-full animate-pulse flex-shrink-0 shadow-lg`} />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="space-y-10 lg:space-y-12">
              
              {/* Form Container */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 xl:p-12 border border-white/10 shadow-2xl">
                
                {/* Form Header */}
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-xl text-white px-6 py-4 rounded-2xl border border-white/20 mb-8 lg:mb-10 font-bold text-lg shadow-xl">
                  <Send className="w-6 h-6" />
                  Send Us A Message
                </div>

                {/* Success Message */}
                {status === "success" && (
                  <div className="p-6 lg:p-8 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border-2 border-emerald-400/40 rounded-3xl mb-8 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-start gap-5 text-emerald-50">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-emerald-500/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl">
                        <Send className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-300" />
                      </div>
                      <div>
                        <h4 className="font-black text-2xl lg:text-3xl mb-2">Message Sent Successfully! 🚀</h4>
                        <p className="text-lg lg:text-xl text-emerald-100/95 leading-relaxed">
                          Our support team will respond within 2 hours. 
                          You'll receive a confirmation email shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-7">
                  
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm lg:text-base font-black text-white/95 tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 lg:px-6 py-4 lg:py-5 bg-white/8 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-white/50 outline-none transition-all duration-300 text-base text-white placeholder-white/40 font-semibold shadow-xl hover:shadow-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm lg:text-base font-black text-white/95 tracking-wide">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 lg:px-6 py-4 lg:py-5 bg-white/8 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-white/50 outline-none transition-all duration-300 text-base text-white placeholder-white/40 font-semibold shadow-xl hover:shadow-2xl"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="block text-sm lg:text-base font-black text-white/95 tracking-wide">Subject *</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 lg:px-6 py-4 lg:py-5 bg-white/8 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-white/50 outline-none transition-all duration-300 text-base text-white font-semibold appearance-none shadow-xl hover:shadow-2xl cursor-pointer"
                    >
                      <option value="" disabled>Select a subject…</option>
                      <option value="order-issue">🛒 Order Issue / Tracking</option>
                      <option value="recommendation">📚 Book Recommendation</option>
                      <option value="partnership">🤝 Partnership / Wholesale</option>
                      <option value="support">🛠️ Technical Support</option>
                      <option value="other">💬 Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-sm lg:text-base font-black text-white/95 tracking-wide">Your Message *</label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Tell us more about what you need help with..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="w-full px-5 lg:px-6 py-4 lg:py-5 bg-white/8 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-white/50 outline-none transition-all duration-300 resize-vertical text-base text-white placeholder-white/40 font-semibold min-h-[140px] shadow-xl hover:shadow-2xl"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-600 hover:from-blue-700 hover:via-emerald-700 hover:to-cyan-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-5 lg:py-6 px-8 rounded-3xl text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex items-center justify-center gap-3 backdrop-blur-xl border border-white/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Secure Message
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { icon: ShieldCheck, title: "Secure", desc: "256-bit SSL", color: "text-emerald-400" },
                  { icon: Clock, title: "Fast", desc: "2–3 day delivery", color: "text-blue-400" },
                  { icon: Star, title: "Guaranteed", desc: "30-day returns", color: "text-yellow-400" },
                ].map(({ icon: Icon, title, desc, color }) => (
                  <div
                    key={title}
                    className="text-center p-5 lg:p-6 backdrop-blur-xl bg-white/10 rounded-lg shadow-lg"
                  >
                    <Icon className="w-10 h-10 mb-2" />
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}