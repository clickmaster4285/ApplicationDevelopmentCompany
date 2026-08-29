'use client';

import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, Users, Sparkles, Check, MapPin, GitCompare, 
  ArrowRight, Shield, Clock, Star, Mail, Phone, 
  MessageCircle, Send, Award, TrendingUp, Headphones,
  ChevronDown,
  MousePointer2
} from "lucide-react";
import { MagneticButton } from "../landingPage/MagneticButton";

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
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] ${variantClasses[variant]} ${className}`}>
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

function FloatingOrb({ className, style, delay = 0 }: { className?: string; style?: React.CSSProperties; delay?: number }) {
  return (
    <div 
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        animation: `float-orb 20s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        ...style
      }}
    />
  );
}

function GridPattern() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-2H24v2h12zM36 24v-2H24v2h12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

function NoiseOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
      }}
    />
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll to explore</span>
      <div className="relative w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[scroll-wheel_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `particle-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); opacity: 0.1; }
          25% { transform: translate(30px, -30px); opacity: 0.3; }
          50% { transform: translate(-20px, -50px); opacity: 0.1; }
          75% { transform: translate(-40px, 20px); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name,
          email,
          message,
          phone: formData.phone.trim(),
          company: formData.company.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      setSubmitStatus('success');
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      <FloatingOrb 
        className="w-[600px] h-[600px] -top-40 -right-40 bg-primary/10" 
        delay={0}
      />
      <FloatingOrb 
        className="w-[500px] h-[500px] -bottom-40 -left-40 bg-blue-500/5" 
        delay={2}
      />
      <FloatingOrb 
        className="w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500/3" 
        delay={4}
      />
      <GridPattern />
      <NoiseOverlay />
      <ParticleField />

      <div className="mx-auto w-full max-w-[85vw] px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          
          {/* Left side - Content */}
          <div className="flex flex-col gap-6 relative">
            {/* Animated entrance wrapper */}
            <div className="animate-[fade-slide-up_0.8s_ease-out_forwards]" style={{ animationDelay: '0.1s' }}>
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
                <Badge variant="primary" className="backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  4.9/5 Rating
                </Badge>
              </div>
            </div>

            <div className="animate-[fade-slide-up_0.8s_ease-out_forwards]" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-chrome text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] tracking-[-0.03em]">
                {title}
              </h1>
            </div>

            <div className="animate-[fade-slide-up_0.8s_ease-out_forwards]" style={{ animationDelay: '0.3s' }}>
              <p className="max-w-xl text-white/60 leading-relaxed text-base md:text-lg">
                {description}
              </p>
            </div>

            <div className="animate-[fade-slide-up_0.8s_ease-out_forwards]" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>500+ Clients</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Award className="h-4 w-4 text-primary" />
                  <span>98% Retention</span>
                </div>
              </div>
            </div>

            <div className="animate-[fade-slide-up_0.8s_ease-out_forwards]" style={{ animationDelay: '0.5s' }}>
              <div className="flex flex-wrap gap-2.5">
                {pageData.metadata.intent && (
                  <Badge>{pageData.metadata.intent}</Badge>
                )}
                {pageData.metadata.primaryKeyword && (
                  <Badge variant="primary">
                    {pageData.metadata.primaryKeyword}
                  </Badge>
                )}
              </div>
            </div>

            <div className="animate-[fade-slide-up_0.8s_ease-out_forwards]" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-wrap gap-3">
                <MagneticButton variant="chrome" className="group">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </MagneticButton>
                <MagneticButton variant="ghost">Schedule Demo</MagneticButton>
              </div>
            </div>
          </div>

          {/* Right side - Premium Form */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 justify-self-end animate-[fade-slide-up_1s_ease-out_forwards]" style={{ animationDelay: '0.3s' }}>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:border-white/20 transition-all duration-500">
              {/* Glow accents */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent pointer-events-none" />
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white text-2xl font-semibold">Get Started Today</h3>
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

                {submitStatus === 'success' ? (
                  <div className="text-center py-12 animate-[fade-in_0.5s_ease-out]">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                    <h4 className="text-white text-xl font-medium mb-2">Message Sent!</h4>
                    <p className="text-white/50">We'll reach out to you shortly. Check your email for confirmation.</p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field 
                        label="Full Name *" 
                        name="name" 
                        type="text" 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        required
                        focused={focusedField === 'name'}
                        error={!formData.name && submitStatus === 'error'}
                      />
                      <Field 
                        label="Company Name" 
                        name="company" 
                        type="text" 
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => handleFocus('company')}
                        onBlur={handleBlur}
                        focused={focusedField === 'company'}
                      />
                    </div>
                    
                    <Field 
                      label="Email Address *" 
                      name="email" 
                      type="email" 
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                      focused={focusedField === 'email'}
                      error={!formData.email && submitStatus === 'error'}
                    />

                    <Field 
                      label="Phone Number" 
                      name="phone" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      focused={focusedField === 'phone'}
                    />

                    <Field 
                      label="Message *" 
                      name="message" 
                      type="textarea"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      rows={3}
                      required
                      focused={focusedField === 'message'}
                      error={!formData.message && submitStatus === 'error'}
                    />

                    <div className="flex justify-center pt-2">
                      <MagneticButton
                        type="submit"
                        variant="chrome"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto"
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
                            <span>Get Started Now</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </MagneticButton>
                    </div>
                  </form>
                )}

                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <p className="text-white/40 flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5" />
                      No spam. Unsubscribe anytime. GDPR compliant.
                    </p>
                    <div className="flex items-center gap-3 text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-primary" />
                        Trusted by 500+
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        4.9/5 Rating
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social proof mini section */}
                <div className="mt-6 flex items-center justify-center gap-6 text-white/40 text-xs">
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
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>

      <style jsx global>{`
        @keyframes fade-slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes scroll-wheel {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 0.8; }
          100% { transform: translateY(0); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  required,
  focused,
  error,
  rows,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  required?: boolean;
  focused: boolean;
  error?: boolean;
  rows?: number;
}) {
  const hasValue = value.length > 0;
  const isTextarea = type === 'textarea';

  return (
    <div className="relative">
      <label className="sr-only">{label}</label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows || 3}
          required={required}
          className={`
            w-full px-4 py-3.5 bg-white/5 border rounded-lg text-white placeholder:text-white/30
            focus:outline-none focus:bg-white/10 transition-all duration-300 resize-none
            ${focused ? 'border-primary/50 shadow-[0_0_0_1px_rgba(232,237,242,0.2)]' : 'border-white/10'}
            ${error && !hasValue ? 'border-red-400/50 bg-red-400/5' : ''}
            ${hasValue ? 'border-white/20' : ''}
          `}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-3.5 bg-white/5 border rounded-lg text-white placeholder:text-white/30
            focus:outline-none focus:bg-white/10 transition-all duration-300
            ${focused ? 'border-primary/50 shadow-[0_0_0_1px_rgba(232,237,242,0.2)]' : 'border-white/10'}
            ${error && !hasValue ? 'border-red-400/50 bg-red-400/5' : ''}
            ${hasValue ? 'border-white/20' : ''}
          `}
        />
      )}
      {focused && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-tr-lg transition-all duration-300" style={{ width: '100%' }} />
      )}
    </div>
  );
}
