import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Stitching = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Draw a path that looks like a needle threading data
  const threadLength = interpolate(frame, [0, 200], [0, 2000], { extrapolateRight: "clamp" });

  const textOpacity = interpolate(frame, [50, 150], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Render scattered points that snap to the thread line
  const dots = Array.from({ length: 15 }).map((_, i) => {
    // Math to position along a zig-zag path
    const targetX = width * 0.1 + (i * width * 0.8) / 14;
    const targetY = height * 0.5 + (i % 2 === 0 ? 100 : -100);

    // Initial scatter position
    const startX = targetX + (Math.random() - 0.5) * 400;
    const startY = targetY + (Math.random() - 0.5) * 400;

    // Time when the thread reaches this dot
    const timeToSnap = i * 13;
    const snapProgress = interpolate(frame - timeToSnap, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const x = startX + (targetX - startX) * snapProgress;
    const y = startY + (targetY - startY) * snapProgress;
    
    const glow = snapProgress > 0.8 ? "0 0 20px #a855f7" : "none";

    return (
      <div key={i} style={{
        position: 'absolute',
        left: x, top: y,
        width: 10, height: 10,
        backgroundColor: '#3b82f6',
        borderRadius: '50%',
        boxShadow: glow
      }} />
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
        <path 
            d={`M ${width*0.1} ${height*0.5 + 100} L ${width*0.1 + (1*width*0.8)/14} ${height*0.5 - 100} L ${width*0.1 + (2*width*0.8)/14} ${height*0.5 + 100} L ${width*0.1 + (3*width*0.8)/14} ${height*0.5 - 100} L ${width*0.1 + (4*width*0.8)/14} ${height*0.5 + 100} L ${width*0.1 + (5*width*0.8)/14} ${height*0.5 - 100} L ${width*0.1 + (6*width*0.8)/14} ${height*0.5 + 100} L ${width*0.1 + (7*width*0.8)/14} ${height*0.5 - 100} L ${width*0.1 + (8*width*0.8)/14} ${height*0.5 + 100} L ${width*0.1 + (9*width*0.8)/14} ${height*0.5 - 100} L ${width*0.1 + (10*width*0.8)/14} ${height*0.5 + 100} L ${width*0.1 + (11*width*0.8)/14} ${height*0.5 - 100} L ${width*0.1 + (12*width*0.8)/14} ${height*0.5 + 100} L ${width*0.1 + (13*width*0.8)/14} ${height*0.5 - 100} L ${width*0.1 + (14*width*0.8)/14} ${height*0.5 + 100}`}
            stroke="url(#neonGradient)" 
            strokeWidth="4" 
            fill="none" 
            strokeDasharray="2000"
            strokeDashoffset={2000 - threadLength}
            style={{ filter: "drop-shadow(0px 0px 10px rgba(192, 132, 252, 0.8))" }}
        />
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      {dots}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: height * 0.2 }}>
        <h1 style={{
            color: "white",
            fontSize: "64px",
            fontFamily: "Inter, sans-serif",
            opacity: textOpacity,
            textShadow: "0 0 30px rgba(255,255,255,0.5)"
        }}>
          But meaning is created...
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
