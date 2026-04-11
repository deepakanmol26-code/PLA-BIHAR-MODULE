import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Closing = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Central glowing shape (India map silhouette abstract) using a simple circle for demo
  const scale = interpolate(frame, [0, 60, 120], [0, 1.2, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  // Text fade in
  const textOpacity = interpolate(frame, [80, 120], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, #ff9933, #138808)",
        opacity,
        transform: `scale(${scale})`,
        filter: "blur(20px)",
      }} />
      <h1 style={{
        color: "#ffffff",
        fontSize: "64px",
        fontFamily: "Inter, sans-serif",
        opacity: textOpacity,
        textShadow: "0 0 30px #ff9933",
      }}>Future‑ready India starts here</h1>
    </AbsoluteFill>
  );
};
