import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Chaos = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const dataPoints = Array.from({ length: 50 }).map((_, i) => {
    // Random math logic
    const seed = i * 1421.31;
    const xBase = (Math.sin(seed) * 0.5 + 0.5) * width;
    const yBase = (Math.cos(seed) * 0.5 + 0.5) * height;
    
    // Float physics
    const floatDist = interpolate(frame, [0, 150], [0, 50 * Math.sin(seed)]);
    const y = yBase + floatDist;
    const x = xBase + floatDist * 0.5;

    const op = interpolate(frame, [0, 30], [0, Math.sin(seed) * 0.5 + 0.5], { extrapolateLeft: 'clamp' });
    const isCode = i % 3 === 0;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          opacity: op,
          color: i % 2 === 0 ? "#93c5fd" : "#c084fc", // neon blue, purple
          fontFamily: "monospace",
          fontSize: isCode ? "14px" : "24px",
          textShadow: `0 0 10px ${i % 2 === 0 ? "#3b82f6" : "#a855f7"}`,
        }}
      >
        {isCode ? `0x${Math.floor(x).toString(16)}` : Math.floor(y)}
      </div>
    );
  });

  const textOpacity = interpolate(frame, [30, 90], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {dataPoints}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1 style={{
            color: "white",
            fontSize: "64px",
            fontFamily: "Inter, sans-serif",
            opacity: textOpacity,
            textShadow: "0 0 30px rgba(255,255,255,0.5)"
        }}>
          Data is everywhere...
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
