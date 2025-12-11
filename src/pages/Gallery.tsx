import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon, Music, Video, FileAudio, Sparkles } from "lucide-react";
import WaveAnimation from "@/components/WaveAnimation";

const Gallery = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Galeria Multimídia</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Todos os formatos multimídia em um só lugar
          </p>

          {/* Imagem Matricial */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Imagem Matricial (Raster)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Imagens compostas por pixels. Formato: PNG/JPG
            </p>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-12 flex items-center justify-center min-h-[300px]">
              <svg width="100%" height="250" viewBox="0 0 800 250">
                <defs>
                  <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "hsl(217, 91%, 60%)" }} />
                    <stop offset="100%" style={{ stopColor: "hsl(271, 76%, 65%)" }} />
                  </linearGradient>
                </defs>
                <path
                  d="M0,125 Q50,25 100,125 T200,125 T300,125 T400,125 T500,125 T600,125 T700,125 T800,125"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="4"
                />
                <path
                  d="M0,150 Q50,75 100,150 T200,150 T300,150 T400,150 T500,150 T600,150 T700,150 T800,150"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="3"
                  opacity="0.6"
                />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Representação visual de ondas sonoras em formato matricial
            </p>
          </Card>

          {/* Imagem Vetorial */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-semibold">Imagem Vetorial (SVG)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Imagens baseadas em fórmulas matemáticas. Formato: SVG
            </p>
            <div className="bg-muted/30 rounded-lg p-12 flex items-center justify-center min-h-[300px]">
              <svg width="300" height="250" viewBox="0 0 300 250">
                <defs>
                  <linearGradient id="spectrumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "hsl(271, 76%, 65%)" }} />
                    <stop offset="100%" style={{ stopColor: "hsl(217, 91%, 60%)" }} />
                  </linearGradient>
                </defs>
                {/* Equalizer Bars */}
                {[...Array(15)].map((_, i) => {
                  const height = 50 + Math.sin(i * 0.5) * 80;
                  return (
                    <rect
                      key={i}
                      x={i * 20}
                      y={200 - height}
                      width="15"
                      height={height}
                      fill="url(#spectrumGrad)"
                      rx="3"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="height"
                        values={`${height};${height * 1.3};${height}`}
                        dur={`${1 + i * 0.1}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="y"
                        values={`${200 - height};${200 - height * 1.3};${200 - height}`}
                        dur={`${1 + i * 0.1}s`}
                        repeatCount="indefinite"
                      />
                    </rect>
                  );
                })}
              </svg>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Espectro de frequências em formato vetorial animado
            </p>
          </Card>

          {/* Áudio Digital */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Music className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-semibold">Áudio Digital (MP3)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Arquivo de áudio comprimido em formato MP3
            </p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">Sample Audio Track - 44.1kHz 320kbps</div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-2/5 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1:23</span>
                    <span>3:45</span>
                  </div>
                </div>
              </div>
              <WaveAnimation />
            </div>
          </Card>

          {/* MIDI */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileAudio className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Música MIDI</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Musical Instrument Digital Interface - Dados de notas musicais
            </p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="bg-background rounded p-4 mb-4">
                {/* Piano Roll Visualization */}
                <div className="space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex space-x-1 h-6">
                      {[...Array(16)].map((_, j) => {
                        const isActive = Math.random() > 0.7;
                        return (
                          <div
                            key={j}
                            className={`flex-1 rounded ${
                              isActive
                                ? i % 2 === 0
                                  ? "bg-primary"
                                  : "bg-secondary"
                                : "bg-muted"
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition">
                  ▶ Play MIDI
                </button>
                <span className="text-sm text-muted-foreground">Piano Roll - 120 BPM</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              MIDI não contém áudio, apenas instruções para sintetizadores
            </p>
          </Card>

          {/* Vídeo */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Video className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-semibold">Vídeo Digital (MP4)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Arquivo de vídeo educacional sobre o tema do projeto
            </p>
            <div className="rounded-lg overflow-hidden bg-background">
              <video 
                controls 
                className="w-full aspect-video"
                poster="/placeholder.svg"
              >
                <source src="/videos/video-educacional.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>Vídeo educacional • MP4 • H.264</span>
              <span>Produzido pela equipe</span>
            </div>
          </Card>

          {/* Animação CSS/JS */}
          <Card className="card-studio">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-semibold">Animação (CSS/JavaScript)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Animação procedural de ondas sonoras
            </p>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <WaveAnimation />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Animação em tempo real gerada por código CSS e JavaScript
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
