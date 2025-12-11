import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import WaveAnimation from "@/components/WaveAnimation";
import { Volume2, Activity, Layers, Radio } from "lucide-react";

const WhatIsAudio = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">O que é Áudio Digital?</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Entenda os conceitos fundamentais do som digital
          </p>

          {/* Animated Wave */}
          <Card className="card-studio mb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
            <WaveAnimation />
          </Card>

          {/* Main Concepts */}
          <div className="space-y-8 mb-12">
            <Card className="card-studio">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Volume2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">Definição de Som Digital</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    O áudio digital é a representação de ondas sonoras através de valores numéricos discretos. 
                    Ao contrário do áudio analógico (ondas contínuas), o digital captura "amostras" do som em 
                    intervalos regulares, permitindo armazenamento, edição e transmissão via computadores.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="card-studio">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Activity className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">Sample Rate (Taxa de Amostragem)</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Número de vezes que o som é "capturado" por segundo, medido em Hz (Hertz). Quanto maior a 
                    taxa, mais fiel é a reprodução do som original.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-primary font-bold text-lg">44.1 kHz</div>
                      <div className="text-sm text-muted-foreground">Qualidade CD</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-primary font-bold text-lg">48 kHz</div>
                      <div className="text-sm text-muted-foreground">Vídeo profissional</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-primary font-bold text-lg">96 kHz</div>
                      <div className="text-sm text-muted-foreground">Alta fidelidade</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="card-studio">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">Bit Depth (Profundidade de Bits)</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Define a precisão com que cada amostra é gravada. Quanto maior a profundidade, maior a 
                    faixa dinâmica (diferença entre o som mais baixo e o mais alto) e menor o ruído.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-primary font-bold text-lg">16-bit</div>
                      <div className="text-sm text-muted-foreground">96 dB de faixa dinâmica</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-primary font-bold text-lg">24-bit</div>
                      <div className="text-sm text-muted-foreground">144 dB de faixa dinâmica</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="card-studio">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">Mono vs Stereo</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-primary">Mono</h4>
                      <p className="text-muted-foreground text-sm">
                        Um único canal de áudio. O som é idêntico em ambos os alto-falantes. 
                        Usado em podcasts, telefonia e narração.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-secondary">Stereo</h4>
                      <p className="text-muted-foreground text-sm">
                        Dois canais independentes (esquerdo e direito). Cria sensação espacial e 
                        profundidade. Padrão em música e cinema.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="card-studio">
              <h3 className="text-2xl font-semibold mb-4">Compressão de Áudio</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h4 className="font-semibold text-lg mb-2">Lossy (Com Perda)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Remove dados considerados "inaudíveis" para reduzir tamanho. 
                    Qualidade menor, mas arquivos muito menores.
                  </p>
                  <div className="text-xs text-muted-foreground">Exemplos: MP3, AAC, OGG</div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-semibold text-lg mb-2">Lossless (Sem Perda)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mantém qualidade original, apenas reorganiza dados. 
                    Qualidade perfeita, arquivos maiores.
                  </p>
                  <div className="text-xs text-muted-foreground">Exemplos: FLAC, WAV, ALAC</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Waveform Visualization */}
          <Card className="card-studio">
            <h3 className="text-2xl font-semibold mb-4">Forma de Onda</h3>
            <div className="mb-4">
              <svg width="100%" height="150" viewBox="0 0 800 150" className="bg-muted/30 rounded">
                <path
                  d="M 0 75 Q 50 25, 100 75 T 200 75 T 300 75 T 400 75 T 500 75 T 600 75 T 700 75 T 800 75"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth="3"
                  fill="none"
                />
                <line x1="0" y1="75" x2="800" y2="75" stroke="hsl(215, 20%, 65%)" strokeWidth="1" strokeDasharray="5,5" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Representação visual de uma onda sonora: o eixo X representa o tempo, e o eixo Y representa a amplitude (volume).
            </p>
          </Card>

          {/* Audio Player Demo */}
          <Card className="card-studio mt-8">
            <h3 className="text-2xl font-semibold mb-4">Áudio Demonstrativo (Narração)</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Simulação de player de áudio com explicação narrada sobre conceitos de áudio digital.
            </p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition">
                  <Volume2 className="w-6 h-6 text-primary-foreground" />
                </button>
                <div className="flex-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0:45</span>
                    <span>2:30</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WhatIsAudio;
