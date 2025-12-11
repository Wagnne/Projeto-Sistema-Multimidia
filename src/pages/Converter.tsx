import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Download, FileAudio } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Converter = () => {
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>("mp3");
  const [isConverting, setIsConverting] = useState(false);

  const formats = [
    { value: "mp3", label: "MP3", description: "Alta compatibilidade, menor tamanho" },
    { value: "wav", label: "WAV", description: "Qualidade máxima, sem compressão" },
    { value: "flac", label: "FLAC", description: "Lossless, tamanho médio" },
    { value: "ogg", label: "OGG", description: "Código aberto, boa qualidade" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file.name);
      toast.success(`Áudio "${file.name}" carregado com sucesso!`);
    }
  };

  const handleConvert = () => {
    if (!audioFile) {
      toast.error("Por favor, carregue um áudio primeiro!");
      return;
    }

    setIsConverting(true);
    
    // Simular conversão
    setTimeout(() => {
      setIsConverting(false);
      const formatLabel = formats.find(f => f.value === selectedFormat)?.label;
      toast.success(
        `Arquivo convertido para ${formatLabel} com sucesso! (demonstração)`,
        { duration: 5000 }
      );
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Conversor de Formatos</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Demonstração de conversão entre formatos de áudio
          </p>

          {/* Upload Section */}
          <Card className="card-studio mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Selecionar Arquivo</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="audio-upload-convert"
              />
              <label htmlFor="audio-upload-convert" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">
                  {audioFile ? audioFile : "Clique para carregar áudio"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Todos os formatos de áudio são aceitos
                </p>
              </label>
            </div>
          </Card>

          {/* Format Selection */}
          <Card className="card-studio mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Escolher Formato de Saída</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setSelectedFormat(format.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedFormat === format.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold">{format.label}</span>
                    <FileAudio className={`w-5 h-5 ${selectedFormat === format.value ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Conversion Flow */}
          <Card className="card-studio mb-8">
            <h2 className="text-2xl font-semibold mb-6">3. Processo de Conversão</h2>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-2">
                  <FileAudio className="w-10 h-10 text-primary" />
                </div>
                <p className="text-sm font-medium">Arquivo Original</p>
              </div>

              <ArrowRight className="w-8 h-8 text-primary animate-pulse" />

              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <div className="text-2xl font-bold text-primary">
                    {formats.find(f => f.value === selectedFormat)?.label}
                  </div>
                </div>
                <p className="text-sm font-medium">Formato Convertido</p>
              </div>
            </div>

            <Button
              onClick={handleConvert}
              disabled={!audioFile || isConverting}
              className="w-full h-12 text-lg btn-studio"
            >
              {isConverting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Convertendo...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Converter para {formats.find(f => f.value === selectedFormat)?.label}
                </>
              )}
            </Button>
          </Card>

          {/* Format Comparison */}
          <Card className="card-studio">
            <h2 className="text-2xl font-semibold mb-6">Comparação de Formatos</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">MP3 (MPEG-1 Audio Layer 3)</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-2"><strong>Vantagens:</strong></p>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Compatibilidade universal</li>
                      <li>• Arquivos pequenos</li>
                      <li>• Ideal para streaming</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2"><strong>Desvantagens:</strong></p>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Perda de qualidade</li>
                      <li>• Não ideal para edição</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">WAV (Waveform Audio File Format)</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-2"><strong>Vantagens:</strong></p>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Qualidade máxima</li>
                      <li>• Sem perda de dados</li>
                      <li>• Ideal para produção</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2"><strong>Desvantagens:</strong></p>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Arquivos muito grandes</li>
                      <li>• Consumo de espaço</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">FLAC (Free Lossless Audio Codec)</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-2"><strong>Vantagens:</strong></p>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Qualidade perfeita</li>
                      <li>• Compressão sem perda</li>
                      <li>• Código aberto</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2"><strong>Desvantagens:</strong></p>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Arquivos médios/grandes</li>
                      <li>• Menos compatível</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">OGG Vorbis</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-2"><strong>Vantagens:</strong></p>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Código aberto e livre</li>
                      <li>• Boa qualidade/tamanho</li>
                      <li>• Usado em jogos</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2"><strong>Desvantagens:</strong></p>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Menos conhecido</li>
                      <li>• Suporte limitado</li>
                    </ul>
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

export default Converter;
