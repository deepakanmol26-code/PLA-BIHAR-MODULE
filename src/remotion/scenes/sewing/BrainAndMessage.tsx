import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const BrainAndMessage = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Draw intense neural network connections
  const nodes = Array.from({ length: 60 }).map((_, i) => {
    // Math for a brain-like spherical distribution
    const phi = Math.acos(-1 + (2 * i) / 60);
    const theta = Math.sqrt(60 * Math.PI) * phi;
    
    // Pulse effect
    const pulseRadius = interpolate(Math.sin((frame + i * 10) / 20), [-1, 1], [150, 250]);
    
    const x = width / 2 + pulseRadius * Math.cos(theta) * Math.sin(phi);
    const y = height / 2 + pulseRadius * Math.sin(theta) * Math.sin(phi) * 0.8; // flatter brain shape

    const opacity = interpolate(frame, [0, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return { x, y, opacity, i };
  });

  const lines = nodes.map((n1, i) => {
    // connect to a few close nodes
    return nodes.slice(i + 1, i + 4).map((n2, j) => {
        const drawLength = interpolate(frame - i * 2, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        
        return (
            <line 
                key={`${i}-${j}`} 
                x1={n1.x} y1={n1.y} 
                x2={n1.x + (n2.x - n1.x) * drawLength} 
                y2={n1.y + (n2.y - n1.y) * drawLength} 
                stroke="rgba(168, 85, 247, 0.4)" 
                strokeWidth="2" 
                opacity={n1.opacity}
            />
        );
    });
  });

  const renderedNodes = nodes.map((n) => (
      <circle 
          key={n.i} 
          cx={n.x} cy={n.y} r={interpolate(Math.sin(frame/10 + n.i), [-1, 1], [2, 6])} 
          fill={n.i % 2 === 0 ? "#3b82f6" : "#c084fc"} 
          style={{ filter: "drop-shadow(0 0 10px #c084fc)", opacity: n.opacity }} 
      />
  ));

  const textOpacity = interpolate(frame, [150, 200], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const zoom = interpolate(frame, [0, 600], [1, 1.3]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
        <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
            {lines}
            {renderedNodes}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1 style={{
            color: "white",
            fontSize: "96px",
            fontWeight: "bold",
            fontFamily: "Inter, sans-serif",
            opacity: textOpacity,
            textShadow: "0 0 40px #a855f7, 0 0 80px #3b82f6",
            letterSpacing: "4px"
        }}>
          Into intelligence
        </h1>
      </AbsoluteFill>
      
      {/* Heavy vignette for dramatic effect */}
      <AbsoluteFill style={{
          background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none"
      }} />
    </AbsoluteFill>
  );
};
