import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Video as VideoIcon, Film, MonitorPlay, Settings } from "lucide-react";

const Video = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Vídeo Digital</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Como o vídeo é capturado, processado e reproduzido
          </p>

          {/* O que é Vídeo Digital */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <VideoIcon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">O que é Vídeo Digital?</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Vídeo digital é uma sequência de imagens (frames) exibidas rapidamente para criar a 
              ilusão de movimento. Cada frame é uma imagem completa, e a taxa de frames por segundo 
              (FPS) determina a fluidez do vídeo.
            </p>
          </Card>

          {/* Conceitos Principais */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="card-studio">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <MonitorPlay className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Resolução</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Quantidade de pixels em cada frame do vídeo
              </p>
              <div className="space-y-3">
                {[
                  { name: "4K UHD", res: "3840x2160", width: "100%" },
                  { name: "Full HD", res: "1920x1080", width: "50%" },
                  { name: "HD", res: "1280x720", width: "33%" },
                  { name: "SD", res: "720x480", width: "19%" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center space-x-3">
                    <div 
                      className="h-8 bg-gradient-to-r from-primary to-secondary rounded"
                      style={{ width: item.width }}
                    />
                    <span className="text-sm whitespace-nowrap">{item.name} ({item.res})</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-studio">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Film className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Taxa de Frames (FPS)</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Frames por segundo - determina a fluidez do vídeo
              </p>
              <div className="space-y-3">
                {[
                  { fps: "24 FPS", use: "Cinema", color: "bg-yellow-500" },
                  { fps: "30 FPS", use: "TV / Streaming", color: "bg-blue-500" },
                  { fps: "60 FPS", use: "Games / Esportes", color: "bg-green-500" },
                  { fps: "120 FPS", use: "Slow Motion", color: "bg-purple-500" },
                ].map((item) => (
                  <div key={item.fps} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-medium">{item.fps}</span>
                    <span className="text-muted-foreground text-sm">- {item.use}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Formatos de Vídeo */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Formatos e Codecs</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { name: "MP4", codec: "H.264/H.265", desc: "Mais popular, compatível" },
                { name: "WebM", codec: "VP8/VP9", desc: "Otimizado para web" },
                { name: "MOV", codec: "ProRes", desc: "Profissional Apple" },
                { name: "AVI", codec: "Vários", desc: "Formato legado" },
              ].map((format) => (
                <div key={format.name} className="bg-muted/30 rounded-lg p-4">
                  <span className="font-bold text-2xl text-gradient">{format.name}</span>
                  <p className="text-xs text-primary mt-1">{format.codec}</p>
                  <p className="text-sm text-muted-foreground mt-2">{format.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Player de Vídeo */}
          <Card className="card-studio">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10">
                <VideoIcon className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-semibold">Vídeo Educacional</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Vídeo produzido pela equipe sobre o tema do projeto
            </p>
            <div className="rounded-xl overflow-hidden bg-background">
              <video 
                controls 
                className="w-full aspect-video"
              >
                <source src="/videos/video-educacional.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Vídeo original produzido para a disciplina de Sistemas Multimídia
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Video;
