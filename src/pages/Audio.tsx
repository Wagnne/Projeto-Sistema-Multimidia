import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Music, Volume2, Waves, FileAudio, Image, Piano } from "lucide-react";
import WaveAnimation from "@/components/WaveAnimation";
import AudioVisualizer from "@/components/AudioVisualizer";
import MidiPlayer from "@/components/MidiPlayer";
import { useRef } from "react";

const Audio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Áudio Digital</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Entenda como o som é digitalizado e manipulado
          </p>

          {/* O que é Áudio Digital */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Waves className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">O que é Áudio Digital?</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Áudio digital é a representação do som através de números binários. Diferente do som analógico 
              (ondas contínuas), o som digital é "amostrado" em intervalos regulares, convertendo a onda 
              sonora em uma sequência de valores numéricos.
            </p>
            <div className="bg-muted/30 rounded-xl p-6">
              <WaveAnimation />
            </div>
          </Card>

          {/* Comparação Raster vs Vetorial */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Image className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-semibold">Imagem Raster vs Vetorial (SVG)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Comparação entre imagem matricial (pixels) e vetorial (SVG). 
              Demonstração com botões de controle de áudio.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Imagem Raster (Matricial) */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-center">Imagem Matricial (Raster)</h3>
                <div className="flex justify-center mb-4">
                  <img 
                    src="/images/matricial.png" 
                    alt="Imagem matricial - headphones pixel art" 
                    className="w-48 h-48 object-contain rounded-lg"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  PNG - baseada em pixels, perde qualidade ao ampliar
                </p>
              </div>

              {/* Imagem Vetorial (SVG) */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-center">Imagem Vetorial (SVG)</h3>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <img src="/images/botao_play.svg" alt="Botão play" className="w-16 h-16" />
                  <img src="/images/botao_pause.svg" alt="Botão pause" className="w-16 h-16" />
                  <img src="/images/botao_stop.svg" alt="Botão stop" className="w-16 h-16" />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  SVG - vetorial, qualidade infinita em qualquer escala
                </p>
              </div>
            </div>
          </Card>

          {/* MIDI */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/10">
                <Piano className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-semibold">MIDI (Musical Instrument Digital Interface)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              MIDI não é áudio, mas sim um protocolo que transmite instruções musicais.
              Clique em "Tocar MIDI" para ouvir e visualizar as notas sendo tocadas.
            </p>
            <div className="bg-muted/30 rounded-xl p-6">
              <MidiPlayer midiUrl="/audio/midi-file.mid" />
            </div>
          </Card>

          {/* Conceitos Principais */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="card-studio">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Volume2 className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Sample Rate (Taxa de Amostragem)</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Quantidade de amostras capturadas por segundo. CD: 44.100 Hz | DVD: 48.000 Hz | Hi-Res: 96.000 Hz
              </p>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-end space-x-1 h-16">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t"
                      style={{ height: `${30 + Math.sin(i * 0.5) * 25}%` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  Mais amostras = maior fidelidade
                </p>
              </div>
            </Card>

            <Card className="card-studio">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <FileAudio className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Bit Depth (Profundidade de Bits)</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Precisão de cada amostra. CD: 16 bits | Profissional: 24 bits | Alta resolução: 32 bits
              </p>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs w-16">8 bits</span>
                    <div className="flex-1 h-3 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-primary/50 w-1/4" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs w-16">16 bits</span>
                    <div className="flex-1 h-3 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-primary/70 w-1/2" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs w-16">24 bits</span>
                    <div className="flex-1 h-3 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-primary w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Formatos de Áudio */}
          <Card className="card-studio mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Music className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Formatos de Áudio</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { name: "MP3", type: "Lossy", desc: "Comprimido com perdas, popular" },
                { name: "WAV", type: "Lossless", desc: "Sem compressão, alta qualidade" },
                { name: "FLAC", type: "Lossless", desc: "Comprimido sem perdas" },
                { name: "AAC", type: "Lossy", desc: "Melhor que MP3, usado em streaming" },
                { name: "OGG", type: "Lossy", desc: "Formato livre, boa qualidade" },
                { name: "MIDI", type: "Dados", desc: "Instruções musicais, não áudio" },
              ].map((format) => (
                <div key={format.name} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{format.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      format.type === "Lossless" ? "bg-green-500/20 text-green-400" :
                      format.type === "Lossy" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>
                      {format.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{format.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Player de Áudio com Visualização */}
          <Card className="card-studio">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Volume2 className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-semibold">Player de Áudio com Visualização</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Visualização em tempo real das frequências do áudio
            </p>
            <div className="bg-muted/30 rounded-xl p-6 space-y-4">
              <AudioVisualizer audioRef={audioRef} />
              <audio ref={audioRef} controls className="w-full" crossOrigin="anonymous">
                <source src="/audio/paying-the-dues.wav" type="audio/wav" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
              <p className="text-xs text-muted-foreground text-center">
                Exemplo de áudio digital em formato WAV
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Audio;
