import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Volume2, Sliders } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Mixing = () => {
  const [tracks, setTracks] = useState([
    { id: 1, name: null as string | null, volume: 75, pan: 0 },
    { id: 2, name: null as string | null, volume: 75, pan: 0 },
    { id: 3, name: null as string | null, volume: 75, pan: 0 },
  ]);

  const handleFileUpload = (trackId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTracks(tracks.map(track => 
        track.id === trackId ? { ...track, name: file.name } : track
      ));
      toast.success(`Áudio "${file.name}" carregado na Faixa ${trackId}!`);
    }
  };

  const updateTrack = (trackId: number, field: 'volume' | 'pan', value: number) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, [field]: value } : track
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Mixagem de Áudio</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Controle múltiplas faixas de áudio simultaneamente
          </p>

          {/* Mixer Console */}
          <Card className="card-studio mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Sliders className="w-6 h-6 mr-2 text-primary" />
              Console de Mixagem
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {tracks.map((track) => (
                <div key={track.id} className="bg-muted/50 rounded-lg p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-4">Faixa {track.id}</h3>

                  {/* Upload */}
                  <div className="mb-6">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleFileUpload(track.id, e)}
                      className="hidden"
                      id={`track-${track.id}`}
                    />
                    <label
                      htmlFor={`track-${track.id}`}
                      className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs font-medium">
                          {track.name || "Carregar áudio"}
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Volume Fader */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Volume</span>
                      <span className="text-sm text-muted-foreground">{track.volume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={track.volume}
                      onChange={(e) => updateTrack(track.id, 'volume', Number(e.target.value))}
                      className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(217, 91%, 60%) 0%, hsl(217, 91%, 60%) ${track.volume}%, hsl(217, 33%, 15%) ${track.volume}%, hsl(217, 33%, 15%) 100%)`
                      }}
                    />
                  </div>

                  {/* Pan Control */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Pan</span>
                      <span className="text-sm text-muted-foreground">
                        {track.pan === 0 ? "C" : track.pan < 0 ? `L${Math.abs(track.pan)}` : `R${track.pan}`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={track.pan}
                      onChange={(e) => updateTrack(track.id, 'pan', Number(e.target.value))}
                      className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>L</span>
                      <span>Centro</span>
                      <span>R</span>
                    </div>
                  </div>

                  {/* VU Meter Simulation */}
                  <div className="bg-background rounded p-3">
                    <div className="flex items-end justify-center space-x-1 h-20">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const isActive = i < (track.volume / 100) * 12;
                        return (
                          <div
                            key={i}
                            className={`w-2 rounded-t transition-all ${
                              isActive
                                ? i < 8
                                  ? "bg-primary"
                                  : i < 10
                                  ? "bg-yellow-500"
                                  : "bg-destructive"
                                : "bg-muted"
                            }`}
                            style={{ height: `${(i + 1) * 8}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Master Section */}
          <Card className="card-studio mb-8">
            <h2 className="text-2xl font-semibold mb-6">Master Output</h2>
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Volume2 className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Volume Master</span>
                    <span className="text-sm text-muted-foreground">100%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="100"
                    className="w-full h-3 bg-background rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Master VU Meter */}
              <div className="bg-background rounded-lg p-4">
                <div className="flex items-end justify-center space-x-2 h-32">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const height = Math.random() * 100;
                    return (
                      <div
                        key={i}
                        className={`w-3 rounded-t animate-wave ${
                          height > 80
                            ? "bg-destructive"
                            : height > 60
                            ? "bg-yellow-500"
                            : "bg-primary"
                        }`}
                        style={{
                          height: `${height}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Concepts Explanation */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-studio">
              <h3 className="text-xl font-semibold mb-4">Conceitos de Mixagem</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-primary mb-1">Master</h4>
                  <p className="text-muted-foreground">
                    Controle final que afeta todas as faixas. É onde o áudio mixado passa antes da saída final.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Equalização (EQ)</h4>
                  <p className="text-muted-foreground">
                    Ajuste de frequências específicas (graves, médios, agudos) para melhorar o som.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Compressor</h4>
                  <p className="text-muted-foreground">
                    Reduz a diferença entre sons altos e baixos, tornando o áudio mais consistente.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="card-studio">
              <h3 className="text-xl font-semibold mb-4">Normalização</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Processo que ajusta o volume geral do áudio para atingir um nível máximo sem distorção.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Antes da Normalização</div>
                    <div className="h-8 bg-background rounded overflow-hidden">
                      <div className="h-full bg-primary w-1/2"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Depois da Normalização</div>
                    <div className="h-8 bg-background rounded overflow-hidden">
                      <div className="h-full bg-primary w-11/12"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-4">
                Útil para garantir volume consistente entre diferentes faixas ou álbuns.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mixing;
