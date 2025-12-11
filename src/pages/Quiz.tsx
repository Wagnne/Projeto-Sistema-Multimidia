import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Brain, CheckCircle2, XCircle } from "lucide-react";

interface Question {
  pergunta: string;
  alternativas: string[];
  correta: number;
}

const allQuestions: Question[] = [
  {
    pergunta: "O que é Sample Rate (Taxa de Amostragem)?",
    alternativas: [
      "O número de amostras de áudio capturadas por segundo",
      "A profundidade de bits de um arquivo",
      "O tamanho do arquivo de áudio",
      "A frequência máxima reproduzível"
    ],
    correta: 0
  },
  {
    pergunta: "Qual formato de áudio NÃO utiliza compressão com perda (lossy)?",
    alternativas: ["MP3", "AAC", "FLAC", "OGG"],
    correta: 2
  },
  {
    pergunta: "O que significa 'Bit Depth' de 16 bits?",
    alternativas: [
      "16 canais de áudio",
      "65.536 níveis possíveis de amplitude",
      "16 kHz de taxa de amostragem",
      "16 MB de tamanho de arquivo"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a taxa de amostragem padrão de um CD de áudio?",
    alternativas: ["48 kHz", "96 kHz", "44.1 kHz", "32 kHz"],
    correta: 2
  },
  {
    pergunta: "O que é Fade Out em edição de áudio?",
    alternativas: [
      "Aumento gradual do volume",
      "Redução gradual do volume até o silêncio",
      "Equalização de frequências",
      "Compressão dinâmica"
    ],
    correta: 1
  },
  {
    pergunta: "Qual formato é mais adequado para arquivamento sem perda de qualidade?",
    alternativas: ["MP3", "AAC", "WAV", "WMA"],
    correta: 2
  },
  {
    pergunta: "O que diferencia áudio Mono de Stereo?",
    alternativas: [
      "A qualidade do som",
      "O número de canais (1 vs 2)",
      "A taxa de amostragem",
      "O formato do arquivo"
    ],
    correta: 1
  },
  {
    pergunta: "Para que serve um Compressor em mixagem de áudio?",
    alternativas: [
      "Reduzir o tamanho do arquivo",
      "Aumentar o volume geral",
      "Reduzir a diferença entre sons altos e baixos",
      "Remover frequências indesejadas"
    ],
    correta: 2
  },
  {
    pergunta: "O que é Normalização de áudio?",
    alternativas: [
      "Conversão entre formatos",
      "Ajuste do volume para atingir um nível máximo",
      "Remoção de ruídos",
      "Equalização automática"
    ],
    correta: 1
  },
  {
    pergunta: "Qual formato é mais usado em streaming de música?",
    alternativas: ["WAV", "FLAC", "MP3/AAC", "MIDI"],
    correta: 2
  },
  {
    pergunta: "O que significa 'Pan' em mixagem?",
    alternativas: [
      "Volume geral da faixa",
      "Posicionamento do som entre esquerda e direita",
      "Efeito de reverberação",
      "Compressão dinâmica"
    ],
    correta: 1
  },
  {
    pergunta: "MIDI é:",
    alternativas: [
      "Um formato de áudio comprimido",
      "Dados de notas musicais, não áudio",
      "Um tipo de microfone",
      "Um software de edição"
    ],
    correta: 1
  },
  {
    pergunta: "Qual formato oferece melhor qualidade/tamanho em compressão lossless?",
    alternativas: ["MP3", "FLAC", "AAC", "OGG"],
    correta: 1
  },
  {
    pergunta: "O que é Fade In?",
    alternativas: [
      "Redução gradual do volume",
      "Aumento gradual do volume desde o silêncio",
      "Corte abrupto do áudio",
      "Efeito de eco"
    ],
    correta: 1
  },
  {
    pergunta: "Qual a vantagem principal do formato AAC sobre o MP3?",
    alternativas: [
      "É gratuito",
      "Melhor qualidade no mesmo tamanho",
      "Maior compatibilidade",
      "Não usa compressão"
    ],
    correta: 1
  }
];

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    // Sortear 5 perguntas aleatórias
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 5));
  }, []);

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === questions[currentQuestion].correta) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 5));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfeito! Você é um expert em áudio digital! 🎉";
    if (percentage >= 80) return "Excelente! Você domina bem os conceitos! 🎵";
    if (percentage >= 60) return "Muito bom! Continue estudando! 📚";
    if (percentage >= 40) return "Bom esforço! Revise alguns conceitos! 💡";
    return "Continue aprendendo! O conhecimento vem com o tempo! 🌱";
  };

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-primary text-xl">Carregando quiz...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Quiz Interativo</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Teste seus conhecimentos sobre áudio digital
          </p>

          {!showResult ? (
            <Card className="card-studio">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Questão {currentQuestion + 1} de {questions.length}</span>
                  <span>Pontuação: {score}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <div className="flex items-start space-x-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold flex-1">
                    {questions[currentQuestion].pergunta}
                  </h2>
                </div>

                {/* Alternatives */}
                <div className="space-y-3">
                  {questions[currentQuestion].alternativas.map((alt, index) => {
                    const isCorrect = index === questions[currentQuestion].correta;
                    const isSelected = index === selectedAnswer;
                    const showCorrect = answered && isCorrect;
                    const showIncorrect = answered && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={answered}
                        className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                          showCorrect
                            ? "border-green-500 bg-green-500/10"
                            : showIncorrect
                            ? "border-destructive bg-destructive/10"
                            : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        } ${answered ? "cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex-1">{alt}</span>
                          {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                          {showIncorrect && <XCircle className="w-5 h-5 text-destructive" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Button */}
              {answered && (
                <Button
                  onClick={handleNext}
                  className="w-full h-12 btn-studio"
                >
                  {currentQuestion < questions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
                </Button>
              )}
            </Card>
          ) : (
            <Card className="card-studio text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {Math.round((score / questions.length) * 100)}%
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Quiz Finalizado!</h2>
                <p className="text-xl text-muted-foreground mb-4">
                  Você acertou <span className="text-primary font-bold">{score}</span> de{" "}
                  <span className="font-bold">{questions.length}</span> questões
                </p>
                <p className="text-lg text-muted-foreground">{getResultMessage()}</p>
              </div>

              {/* Result Breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-500 mb-1">{score}</div>
                  <div className="text-sm text-muted-foreground">Acertos</div>
                </div>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="text-2xl font-bold text-destructive mb-1">
                    {questions.length - score}
                  </div>
                  <div className="text-sm text-muted-foreground">Erros</div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Aproveitamento</div>
                </div>
              </div>

              <Button onClick={handleRestart} className="w-full h-12 btn-studio">
                Tentar Novamente
              </Button>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
