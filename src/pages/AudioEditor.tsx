import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Volume2, VolumeX, Scissors, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AudioEditor = () => {
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [volume, setVolume] = useState(100);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file.name);
      toast.success(`Áudio "${file.name}" carregado com sucesso!`);
    }
  };

  const handleEdit = (action: string) => {
    if (!audioFile) {
      toast.error("Por favor, carregue um áudio primeiro!");
      return;
    }
    toast.success(`${action} aplicado com sucesso! (simulação)`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Edição de Áudio</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Simulador interativo de edição de áudio
          </p>

          {/* Upload Section */}
          <Card className="card-studio mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Carregar Áudio</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="audio-upload"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">
                  {audioFile ? audioFile : "Clique para carregar áudio"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Formatos suportados: MP3, WAV, OGG, FLAC
                </p>
              </label>
            </div>
          </Card>

          {/* Waveform Visualization */}
          {audioFile && (
            <Card className="card-studio mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Visualização da Forma de Onda</h2>
              <div className="bg-muted/50 rounded-lg p-4">
                <svg width="100%" height="150" viewBox="0 0 1000 150" className="bg-background/50 rounded">
                  {Array.from({ length: 100 }).map((_, i) => {
                    const height = Math.random() * 120 + 10;
                    const y = (150 - height) / 2;
                    return (
                      <rect
                        key={i}
                        x={i * 10}
                        y={y}
                        width="8"
                        height={height}
                        fill={`hsl(217, 91%, ${60 + Math.random() * 20}%)`}
                        opacity="0.8"
                      />
                    );
                  })}
                </svg>
              </div>
            </Card>
          )}

          {/* Editing Tools */}
          <Card className="card-studio mb-8">
            <h2 className="text-2xl font-semibold mb-6">3. Ferramentas de Edição</h2>
            
            {/* Volume Control */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Volume2 className="w-5 h-5 mr-2 text-primary" />
                Controle de Volume
              </h3>
              <div className="flex items-center space-x-4">
                <VolumeX className="w-5 h-5 text-muted-foreground" />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(217, 91%, 60%) 0%, hsl(217, 91%, 60%) ${volume/2}%, hsl(217, 33%, 15%) ${volume/2}%, hsl(217, 33%, 15%) 100%)`
                  }}
                />
                <Volume2 className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-semibold min-w-[60px]">{volume}%</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => handleEdit("Aumento de volume")}
                className="h-auto py-4 flex-col space-y-2 bg-primary hover:bg-primary/90"
              >
                <TrendingUp className="w-6 h-6" />
                <span>Aumentar Volume</span>
              </Button>

              <Button
                onClick={() => handleEdit("Redução de volume")}
                className="h-auto py-4 flex-col space-y-2 bg-primary hover:bg-primary/90"
              >
                <TrendingDown className="w-6 h-6" />
                <span>Diminuir Volume</span>
              </Button>

              <Button
                onClick={() => handleEdit("Fade In")}
                className="h-auto py-4 flex-col space-y-2 bg-secondary hover:bg-secondary/90"
              >
                <div className="w-8 h-6 bg-gradient-to-r from-transparent to-white rounded"></div>
                <span>Fade In</span>
              </Button>

              <Button
                onClick={() => handleEdit("Fade Out")}
                className="h-auto py-4 flex-col space-y-2 bg-secondary hover:bg-secondary/90"
              >
                <div className="w-8 h-6 bg-gradient-to-r from-white to-transparent rounded"></div>
                <span>Fade Out</span>
              </Button>

              <Button
                onClick={() => handleEdit("Corte de trecho")}
                className="h-auto py-4 flex-col space-y-2 bg-accent hover:bg-accent/90 md:col-span-2"
              >
                <Scissors className="w-6 h-6" />
                <span>Cortar Trecho</span>
              </Button>
            </div>
          </Card>

          {/* Explanation Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-studio">
              <h3 className="text-xl font-semibold mb-3">O que é Fade In/Out?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">Fade In:</strong> Aumento gradual do volume do silêncio até o nível normal.
                Usado no início de músicas para entrada suave.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                <strong className="text-foreground">Fade Out:</strong> Redução gradual do volume até o silêncio.
                Usado no final de músicas para saída suave.
              </p>
            </Card>

            <Card className="card-studio">
              <h3 className="text-xl font-semibold mb-3">Corte de Áudio</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Permite remover trechos indesejados do áudio. Útil para:
              </p>
              <ul className="text-muted-foreground text-sm mt-3 space-y-2">
                <li>• Remover silêncios longos</li>
                <li>• Eliminar erros de gravação</li>
                <li>• Criar versões editadas de músicas</li>
                <li>• Extrair trechos específicos</li>
              </ul>
            </Card>
          </div>

          {/* Wave Animation Background */}
          <div className="mt-8">
            <Card className="card-studio bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-center justify-center h-32 space-x-1">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full animate-wave"
                    style={{
                      height: `${Math.random() * 60 + 20}%`,
                      animationDelay: `${i * 0.03}s`,
                    }}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AudioEditor;
