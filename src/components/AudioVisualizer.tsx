import { useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioVisualizer = ({ audioRef }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const initAudioContext = () => {
      if (audioContextRef.current) return;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
    };

    const draw = () => {
      if (!analyserRef.current || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, "hsl(280, 100%, 60%)");
        gradient.addColorStop(0.5, "hsl(220, 100%, 50%)");
        gradient.addColorStop(1, "hsl(180, 100%, 40%)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    if (isPlaying) {
      initAudioContext();
      draw();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, audioRef]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={150}
        className="w-full h-32 rounded-lg bg-background/50"
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <p className="text-sm">Dê play na música para ver a visualização</p>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
