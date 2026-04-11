import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const DigitalLearning = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Device icons (simple rectangles) floating and connecting
  const devices = [
    { label: "📱", color: "#ff9933" },
    { label: "💻", color: "#138808" },
    { label: "🖥️", color: "#3b82f6" },
    { label: "🧑‍🏫", color: "#a855f7" },
  ];

  const deviceElements = devices.map((dev, i) => {
    const delay = i * 10;
    const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const y = interpolate(frame - delay, [0, 60], [height + 100, height / 2 - 100], { extrapolateRight: "clamp" });
    const x = width / 2 - 200 + i * 150;
    return (
      <div key={i} style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: "80px",
        opacity,
        textShadow: `0 0 20px ${dev.color}`,
      }}>{dev.label}</div>
    );
  });

  // Draw connecting lines between devices (simple SVG)
  const lineOpacity = interpolate(frame, [30, 80], [0, 1]);

  const lineCoords = devices.map((_, i) => {
    const startX = width / 2 - 200 + i * 150 + 30;
    const startY = height / 2 - 100;
    const endX = width / 2 - 200 + ((i + 1) % devices.length) * 150 + 30;
    const endY = height / 2 - 100;
    return { startX, startY, endX, endY };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {deviceElements}
      <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
        {lineCoords.map((c, i) => (
          <line key={i} x1={c.startX} y1={c.startY} x2={c.endX} y2={c.endY}
            stroke="rgba(255,153,51,0.7)"
            strokeWidth="4"
            opacity={lineOpacity}
          />
        ))}
      </svg>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: height * 0.75 }}>
        <h2 style={{
          color: "#ffffff",
          fontSize: "48px",
          fontFamily: "Inter, sans-serif",
          opacity: lineOpacity,
          textShadow: "0 0 20px rgba(255,255,255,0.5)"
        }}>Digital & Multidisciplinary Learning</h2>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
