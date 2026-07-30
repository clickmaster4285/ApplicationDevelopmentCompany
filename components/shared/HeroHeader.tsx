'use client';
// app/components/shared/HeroHeader.tsx
import React, { useState } from "react";
import { 
  Zap, Users, Sparkles, Check, MapPin, GitCompare, 
  ArrowRight, Shield, Clock, Star, Mail, Phone, 
  MessageCircle, Send, Award, TrendingUp, Headphones 
} from "lucide-react";
import { MagneticButton } from "../landingPage/MagneticButton";

// Local Badge component that supports className
const Badge = ({ 
  children, 
  variant = "default", 
  className = "" 
}: { 
  children: React.ReactNode; 
  variant?: "default" | "primary" | "success";
  className?: string;
}) => {
  const variantClasses = {
    default: "bg-white/5 border-white/10 text-white/60",
    primary: "bg-primary/20 border-primary/30 text-primary",
    success: "bg-green-500/20 border-green-500/30 text-green-400"
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export interface PageMetadata {
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  funnel: string;
  schema: string[];
  cta: string;
  wordCount: number;
  tier: string | number;
  searchVolume?: string;
  productionNote?: string;
}

export interface PageData {
  url: string;
  meta: {
    title: string;
    description: string;
  };
  content: string;
  metadata: PageMetadata;
  internalLinks: string[];
  related: {
    services: string[];
    solutions: string[];
    platforms: string[];
    technologies: string[];
    industries: string[];
    compare: string[];
    resources: string[];
    parent: string;
    siblings: string[];
    children: string[];
  };
  structured: {
    faqs: Array<{ question: string; answer: string }>;
    tables: Array<{ headers: string[]; rows: Record<string, string>[] }>;
    cta: string | null;
    sourceFile: string | null;
  };
}

export function HeroHeader({
  pageData,
  type = "Service",
}: {
  pageData: PageData;
  type?:
    | "Industry"
    | "Service"
    | "Technology"
    | "Solution"
    | "Location"
    | "Compare"
    | "Framework"
    | "Cost"
    | "About"
    | "Resource"
    | "Platform"
    | "Blog"
    | "Case Study"
    | "Ebooks";
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const iconMap: Record<string, React.ReactElement> = {
    Service: <Zap className="h-5 w-5" />,
    Industry: <Users className="h-5 w-5" />,
    Technology: <Sparkles className="h-5 w-5" />,
    Solution: <Check className="h-5 w-5" />,
    Location: <MapPin className="h-5 w-5" />,
    Compare: <GitCompare className="h-5 w-5" />,
    Framework: <Sparkles className="h-5 w-5" />,
    Cost: <Zap className="h-5 w-5" />,
    About: <Users className="h-5 w-5" />,
    Resource: <Sparkles className="h-5 w-5" />,
    Platform: <Sparkles className="h-5 w-5" />,
    Blog: <Sparkles className="h-5 w-5" />,
    "Case Study": <Check className="h-5 w-5" />,
    Ebooks: <Sparkles className="h-5 w-5" />,
  };

  const stripMarkdown = (text: string) =>
    text
      .replace(/\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^-\s+/gm, "")
      .trim();

  const title = stripMarkdown(pageData.meta.title || "");
  const description = stripMarkdown(pageData.meta.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />

      <div className="mx-auto w-full max-w-[85vw] px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          
          {/* Left side - Content */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60 backdrop-blur-sm">
                {iconMap[type] || iconMap.Service}
                {type}
              </span>
              {pageData.metadata.tier && (
                <Badge variant="primary" className="backdrop-blur-sm">
                  Tier {pageData.metadata.tier}
                </Badge>
              )}
              <Badge variant="success" className="backdrop-blur-sm">
                <Star className="h-3 w-3 mr-1" />
                4.9/5 Rating
              </Badge>
            </div>

            <h1 className="text-chrome text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] tracking-[-0.03em]">
              {title}
           
            </h1>

            <p className="max-w-xl text-white/60 leading-relaxed text-base md:text-lg">
              {description}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-2">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Secure & Trusted</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span>500+ Clients</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {pageData.metadata.intent && (
                <Badge>{pageData.metadata.intent}</Badge>
              )}
              {pageData.metadata.primaryKeyword && (
                <Badge variant="success">
                  {pageData.metadata.primaryKeyword}
                </Badge>
              )}
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
                <MagneticButton variant="chrome">
                         Start Free Trial
                        </MagneticButton>


            


                 <MagneticButton variant="ghost">  Schedule Demo</MagneticButton>
            </div>
          </div>

          {/* Right side - Enhanced Form/CTA */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 justify-self-end">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white text-2xl font-semibold">
                    Get Started Today
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-medium uppercase tracking-wider block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium uppercase tracking-wider block mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-white/60 text-xs font-medium uppercase tracking-wider block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs font-medium uppercase tracking-wider block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs font-medium uppercase tracking-wider block mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none"
                  />
                </div>

      <div className="flex justify-center">
  <MagneticButton
    type="submit"
    variant="chrome"
    disabled={isSubmitting}
    className="flex items-center justify-center gap-2"
  >
    {isSubmitting ? (
      <>
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Submitting...</span>
      </>
    ) : (
      <>
        <Send className="h-4 w-4" />
        <span>{pageData.metadata.cta || "Get Started Now"}</span>
        <ArrowRight className="h-4 w-4" />
      </>
    )}
  </MagneticButton>
</div>
              </form>
              
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <p className="text-white/40">
                    <Shield className="h-3 w-3 inline mr-1" />
                    No spam. Unsubscribe anytime.
                  </p>
                  <div className="flex items-center gap-1 text-white/40">
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-primary" />
                      Trusted by 500+
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social proof mini section */}
            <div className="mt-4 flex items-center justify-center gap-6 text-white/40 text-xs">
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                4.9/5
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span>500+ Happy Clients</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                98% Satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}