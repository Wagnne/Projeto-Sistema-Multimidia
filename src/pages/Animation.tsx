import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Sparkles, Play, Layers, Zap } from "lucide-react";
import WaveAnimation from "@/components/WaveAnimation";

const Animation = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Animação Digital</h1>
          <p className="text-xl text-muted-foreground mb-12">
            A arte de dar vida a imagens estáticas
          </p>

          {/* O que é Animação */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">O que é Animação?</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Animação é a técnica de criar a ilusão de movimento através da exibição rápida de uma 
              sequência de imagens ou frames. Pode ser feita de forma tradicional (quadro a quadro), 
              por computador (2D/3D), ou através de código (CSS/JavaScript).
            </p>
          </Card>

          {/* Tipos de Animação */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="card-studio">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Layers className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Quadro a Quadro</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cada frame é desenhado individualmente. Técnica tradicional usada em animações clássicas.
              </p>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className="w-10 h-14 bg-gradient-to-br from-primary/50 to-secondary/50 rounded flex items-center justify-center text-xs font-bold"
                      style={{ transform: `rotate(${(i - 3) * 5}deg)` }}
                    >
                      F{i}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  12-24 frames por segundo
                </p>
              </div>
            </Card>

            <Card className="card-studio">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Play className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Interpolação (Tweening)</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                O computador calcula os frames intermediários entre dois keyframes.
              </p>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="relative h-12">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-primary" />
                  <div className="absolute left-1/4 w-6 h-6 rounded-full bg-primary/70 opacity-50" />
                  <div className="absolute left-1/2 w-6 h-6 rounded-full bg-primary/50 opacity-50" />
                  <div className="absolute left-3/4 w-6 h-6 rounded-full bg-primary/30 opacity-50" />
                  <div className="absolute right-0 w-6 h-6 rounded-full bg-secondary" />
                </div>
                <p className="text-xs text-center mt-4 text-muted-foreground">
                  Keyframe A → frames gerados → Keyframe B
                </p>
              </div>
            </Card>

            <Card className="card-studio">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Animação 3D</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Objetos tridimensionais são modelados e animados em espaço virtual.
              </p>
              <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center">
                <div className="relative w-20 h-20" style={{ perspective: "200px" }}>
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg animate-spin"
                    style={{ 
                      transformStyle: "preserve-3d",
                      animation: "spin 4s linear infinite"
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Vídeo de Animação  */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Play className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-semibold">Exemplo de Animação</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Vídeo demonstrando animação digital 
            </p>
            <div className="bg-muted/30 rounded-xl p-4">
              <video 
                controls 
                className="w-full rounded-lg"
                preload="metadata"
              >
                <source src="/videos/animation-demo.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          </Card>

          {/* Animação CSS/JS ao vivo */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Animação CSS/JavaScript</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Animação procedural gerada em tempo real pelo navegador
            </p>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8">
              <WaveAnimation />
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Barras animadas usando CSS animations e JavaScript
            </p>
          </Card>

          {/* Ferramentas */}
          <Card className="card-studio">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/10">
                <Layers className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-semibold">Ferramentas de Animação</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "CSS Animations", type: "Web", desc: "Animações nativas do navegador" },
                { name: "JavaScript/Canvas", type: "Web", desc: "Controle total via código" },
                { name: "Synfig Studio", type: "2D", desc: "Software livre para animação 2D" },
                { name: "Piskel", type: "Pixel Art", desc: "Editor de sprites animados" },
                { name: "Blender", type: "3D", desc: "Modelagem e animação 3D" },
                { name: "Adobe Animate", type: "2D/Web", desc: "Profissional para web e vídeo" },
              ].map((tool) => (
                <div key={tool.name} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{tool.name}</span>
                    <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                      {tool.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Animation;
