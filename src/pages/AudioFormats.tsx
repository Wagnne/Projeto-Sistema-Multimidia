import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { FileAudio, Play } from "lucide-react";

const AudioFormats = () => {
  const formats = [
    {
      name: "MP3",
      fullName: "MPEG-1 Audio Layer 3",
      compression: "Lossy",
      size: "~1MB por minuto",
      usage: "Streaming, dispositivos portáteis, música online",
      description: "Formato mais popular. Compressão com perda que remove frequências inaudíveis. Compatibilidade universal.",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "WAV",
      fullName: "Waveform Audio File Format",
      compression: "Lossless",
      size: "~10MB por minuto",
      usage: "Produção profissional, masterização, edição",
      description: "Qualidade máxima, sem compressão. Padrão em estúdios profissionais. Arquivos grandes.",
      color: "from-purple-500 to-purple-700",
    },
    {
      name: "FLAC",
      fullName: "Free Lossless Audio Codec",
      compression: "Lossless",
      size: "~5MB por minuto",
      usage: "Arquivamento, audiófilos, coleções de alta qualidade",
      description: "Compressão sem perda de qualidade. Código aberto. Ideal para backup de música.",
      color: "from-green-500 to-green-700",
    },
    {
      name: "AAC",
      fullName: "Advanced Audio Coding",
      compression: "Lossy",
      size: "~1MB por minuto",
      usage: "Apple Music, YouTube, transmissão de vídeo",
      description: "Sucessor do MP3 com melhor qualidade no mesmo tamanho. Usado por Apple e YouTube.",
      color: "from-orange-500 to-orange-700",
    },
    {
      name: "OGG",
      fullName: "Ogg Vorbis",
      compression: "Lossy",
      size: "~1MB por minuto",
      usage: "Jogos, streaming alternativo, Spotify",
      description: "Formato livre e aberto. Melhor qualidade que MP3 em bitrates baixos. Usado em jogos.",
      color: "from-red-500 to-red-700",
    },
    {
      name: "WMA",
      fullName: "Windows Media Audio",
      compression: "Lossy/Lossless",
      size: "~1-5MB por minuto",
      usage: "Windows Media Player, sistemas Microsoft",
      description: "Formato proprietário da Microsoft. Suporte nativo no Windows. Menos universal.",
      color: "from-indigo-500 to-indigo-700",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Formatos de Áudio</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Conheça os principais formatos e suas características
          </p>

          {/* Formats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {formats.map((format, index) => (
              <Card key={format.name} className="card-studio hover:border-primary transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${format.color}`}>
                    <FileAudio className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{format.name}</h3>
                    <p className="text-sm text-muted-foreground">{format.fullName}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {format.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="text-xs text-muted-foreground mb-1">Compressão</div>
                    <div className="font-semibold">{format.compression}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="text-xs text-muted-foreground mb-1">Tamanho</div>
                    <div className="font-semibold text-sm">{format.size}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted mb-4">
                  <div className="text-xs text-muted-foreground mb-1">Uso Principal</div>
                  <div className="font-semibold text-sm">{format.usage}</div>
                </div>

                {/* Audio Player Demo */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition">
                      <Play className="w-5 h-5 text-primary-foreground ml-1" />
                    </button>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Sample Audio ({format.name})</div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${format.color}`}
                          style={{ width: "30%", transition: "width 0.3s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card className="card-studio">
            <h2 className="text-3xl font-bold mb-6">Tabela Comparativa</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Formato</th>
                    <th className="text-left py-3 px-4 font-semibold">Compressão</th>
                    <th className="text-left py-3 px-4 font-semibold">Qualidade</th>
                    <th className="text-left py-3 px-4 font-semibold">Tamanho</th>
                    <th className="text-left py-3 px-4 font-semibold">Compatibilidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-muted/50 transition">
                    <td className="py-3 px-4 font-semibold">MP3</td>
                    <td className="py-3 px-4">Lossy</td>
                    <td className="py-3 px-4">Boa</td>
                    <td className="py-3 px-4">Pequeno</td>
                    <td className="py-3 px-4">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/50 transition">
                    <td className="py-3 px-4 font-semibold">WAV</td>
                    <td className="py-3 px-4">Lossless</td>
                    <td className="py-3 px-4">Excelente</td>
                    <td className="py-3 px-4">Grande</td>
                    <td className="py-3 px-4">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/50 transition">
                    <td className="py-3 px-4 font-semibold">FLAC</td>
                    <td className="py-3 px-4">Lossless</td>
                    <td className="py-3 px-4">Excelente</td>
                    <td className="py-3 px-4">Médio</td>
                    <td className="py-3 px-4">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/50 transition">
                    <td className="py-3 px-4 font-semibold">AAC</td>
                    <td className="py-3 px-4">Lossy</td>
                    <td className="py-3 px-4">Muito Boa</td>
                    <td className="py-3 px-4">Pequeno</td>
                    <td className="py-3 px-4">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/50 transition">
                    <td className="py-3 px-4 font-semibold">OGG</td>
                    <td className="py-3 px-4">Lossy</td>
                    <td className="py-3 px-4">Boa</td>
                    <td className="py-3 px-4">Pequeno</td>
                    <td className="py-3 px-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="hover:bg-muted/50 transition">
                    <td className="py-3 px-4 font-semibold">WMA</td>
                    <td className="py-3 px-4">Lossy/Lossless</td>
                    <td className="py-3 px-4">Boa</td>
                    <td className="py-3 px-4">Pequeno/Médio</td>
                    <td className="py-3 px-4">⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AudioFormats;
