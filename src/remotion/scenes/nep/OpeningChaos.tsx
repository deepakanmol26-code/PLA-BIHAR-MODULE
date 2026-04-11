import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const OpeningChaos = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Generate floating book-like rectangles and icon-like circles
  const elements = Array.from({ length: 30 }).map((_, i) => {
    const seed = i * 1234.56;
    const baseX = (Math.sin(seed) * 0.5 + 0.5) * width;
    const baseY = (Math.cos(seed) * 0.5 + 0.5) * height;
    const floatY = interpolate(frame, [0, 120], [0, -200]);
    const opacity = interpolate(frame, [0, 30], [0, 1]);
    const isBook = i % 3 === 0;
    const size = isBook ? 120 : 80;
    const bg = isBook ? "#ff9933" : "#138808"; // saffron for books, green for icons
    const border = isBook ? "#c47f00" : "#0a7e0a";
    const rotate = interpolate(frame, [0, 120], [0, 360]);
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: baseX,
          top: baseY + floatY,
          width: size,
          height: size * (isBook ? 1.4 : 1),
          background: bg,
          border: `4px solid ${border}`,
          borderRadius: isBook ? "8px" : "50%",
          opacity,
          transform: `rotate(${rotate}deg)`,
          boxShadow: `0 0 15px ${bg}`,
        }}
      />
    );
  });

  const textOpacity = interpolate(frame, [30, 90], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {elements}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1 style={{
          color: "#ffffff",
          fontSize: "64px",
          fontFamily: "Inter, sans-serif",
          opacity: textOpacity,
          textShadow: "0 0 30px rgba(255,255,255,0.6)"
        }}>
          Education in India is transforming…
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
