import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const NEPIntro = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Title "NEP 2020" appears with scaling and glow
  const titleScale = interpolate(frame, [0, 30, 60], [0, 1.2, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [0, 30], [0, 1]);

  // Floating icons for school, student, teacher
  const icons = [
    { color: "#ff9933", label: "🏫" },
    { color: "#138808", label: "👩‍🏫" },
    { color: "#3b82f6", label: "👨‍🎓" },
  ];

  const iconElements = icons.map((icon, i) => {
    const delay = i * 10;
    const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const y = interpolate(frame - delay, [0, 40], [height / 2 + 100, height / 2 - 50], { extrapolateRight: "clamp" });
    const x = width / 2 - 200 + i * 200;
    return (
      <div key={i} style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: "80px",
        opacity,
        textShadow: `0 0 20px ${icon.color}`,
      }}>{icon.label}</div>
    );
  });

  const subtextOpacity = interpolate(frame, [60, 90], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1 style={{
          color: "#ffffff",
          fontSize: "96px",
          fontFamily: "Inter, sans-serif",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow: "0 0 30px rgba(255,255,255,0.7)"
        }}>NEP 2020</h1>
      </AbsoluteFill>
      {iconElements}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: height * 0.75 }}>
        <h2 style={{
          color: "#ffffff",
          fontSize: "48px",
          fontFamily: "Inter, sans-serif",
          opacity: subtextOpacity,
          textShadow: "0 0 20px rgba(255,255,255,0.5)"
        }}>A new vision for learning</h2>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
