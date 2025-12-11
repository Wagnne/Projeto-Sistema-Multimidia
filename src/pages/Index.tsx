// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { Music, Video, Sparkles, Brain, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import WaveAnimation from "@/components/WaveAnimation";
import Layout from "@/components/Layout";
import React from "react";

const Index: React.FC = () => {
  const features = [
    { icon: Music, title: "Áudio", path: "/audio", desc: "Som digital e formatos de áudio" },
    { icon: Video, title: "Vídeo", path: "/video", desc: "Vídeo digital e codecs" },
    { icon: Sparkles, title: "Animação", path: "/animation", desc: "Técnicas de animação digital" },
    { icon: Brain, title: "Quiz", path: "/quiz", desc: "Teste seus conhecimentos" },
    { icon: Users, title: "Equipe", path: "/team", desc: "Conheça os criadores" },
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden">

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <WaveAnimation />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-float">
              <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "hsl(217, 91%, 60%)" }} />
                    <stop offset="100%" style={{ stopColor: "hsl(271, 76%, 65%)" }} />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="55" fill="none" stroke="url(#logoGradient)" strokeWidth="4" />
                <path d="M45 60 L75 45 L75 75 Z" fill="url(#logoGradient)" />
                <circle cx="60" cy="60" r="45" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.3" className="animate-glow-pulse" />
              </svg>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-gradient glow-primary">aniView</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Protótipo Multimídia Educacional sobre <span className="text-primary font-semibold">Sistemas Multimídia</span>
            </p>

            <div className="text-sm text-muted-foreground mb-8">
              Áudio • Vídeo • Animação • Quiz
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.path} to={feature.path}>
                <Card
                  className="card-studio h-full hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action — imagem de fundo "praia1" por trás do conteúdo */}
        <section className="container mx-auto px-4 py-20">
          <div
            className="relative rounded-xl overflow-hidden shadow-lg border border-primary/20"
            style={{
              // imagem deve estar em public/praia1.jpg
              backgroundImage: "url('/images/praia1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* opcional: overlay escuro para garantir legibilidade */}
            <div className="absolute inset-0 bg-black/45" />

            {/* conteúdo sobre a imagem */}
            <div className="relative z-10 p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-sm">
                Explore o Mundo <span className="text-gradient">Multimídia</span>
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Navegação livre: acesse qualquer seção a qualquer momento. Aprenda no seu ritmo.
              </p>

              <Link
                to="/audio"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Começar Jornada
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Index;
