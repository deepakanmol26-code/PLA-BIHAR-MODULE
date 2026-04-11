import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const StructuredPatterns = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Grid of data
  const gridCells = Array.from({ length: 48 }).map((_, i) => {
    const col = i % 8;
    const row = Math.floor(i / 8);
    const delay = (col + row) * 5;
    
    const opacity = interpolate(frame - delay, [0, 20], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const scale = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    
    // Simulate dashboard bar chart variation
    const barHeight = 20 + Math.abs(Math.sin(i * 123.4)) * 60;
    
    return (
      <div key={i} style={{
        width: "60px",
        height: `${barHeight}px`,
        backgroundColor: i % 3 === 0 ? "#c084fc" : "#3b82f6",
        opacity,
        transform: `scale(${scale})`,
        borderRadius: "4px 4px 0 0",
        boxShadow: `0 0 15px ${i % 3 === 0 ? "#a855f7" : "#2563eb"}`
      }} />
    );
  });

  const textOpacity = interpolate(frame, [60, 120], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  const rotateX = interpolate(frame, [0, 300], [45, 15], { extrapolateRight: "clamp" });
  const rotateZ = interpolate(frame, [0, 300], [0, -10], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "black", perspective: "1000px" }}>
      <AbsoluteFill style={{ 
          justifyContent: "center", 
          alignItems: "center",
          transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(1.2)`,
          transformStyle: "preserve-3d"
      }}>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 60px)",
            gap: "20px",
            alignItems: "end",
            height: "100px"
        }}>
            {gridCells}
        </div>
        
        {/* Glowing rings representing connections */}
        <div style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            border: "2px solid rgba(59, 130, 246, 0.5)",
            borderRadius: "50%",
            transform: `rotateX(70deg) translateZ(-50px) rotateZ(${frame}deg)`,
            boxShadow: "inset 0 0 50px rgba(168, 85, 247, 0.4)"
        }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: height * 0.3 }}>
        <h1 style={{
            color: "white",
            fontSize: "64px",
            fontFamily: "Inter, sans-serif",
            opacity: textOpacity,
            textShadow: "0 0 30px rgba(255,255,255,0.5)"
        }}>
          When connections are stitched...
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
