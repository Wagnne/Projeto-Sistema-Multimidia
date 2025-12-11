const WaveAnimation = () => {
  const bars = 40;
  
  return (
    <div className="flex items-center justify-center h-32 space-x-1">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full animate-wave"
          style={{
            height: `${Math.random() * 60 + 20}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
};

export default WaveAnimation;
