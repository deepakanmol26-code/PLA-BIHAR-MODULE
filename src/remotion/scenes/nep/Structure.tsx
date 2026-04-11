import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Structure = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Define block groups for 5,3,3,4
  const groups = [5, 3, 3, 4];
  const blockWidth = 120;
  const blockHeight = 80;
  const gap = 30;

  const startX = width / 2 - ((Math.max(...groups) * (blockWidth + gap)) / 2);
  const startY = height / 2 - ((groups.length * (blockHeight + gap)) / 2);

  const blocks = groups.flatMap((count, gIdx) => {
    return Array.from({ length: count }).map((_, i) => {
      const delay = gIdx * 15 + i * 5;
      const appear = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const scale = interpolate(frame - delay, [0, 20], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const x = startX + i * (blockWidth + gap) + (gIdx * 20);
      const y = startY + gIdx * (blockHeight + gap);
      return (
        <div key={`${gIdx}-${i}`} style={{
          position: "absolute",
          left: x,
          top: y,
          width: blockWidth,
          height: blockHeight,
          background: "rgba(59,130,246,0.8)",
          borderRadius: "8px",
          opacity: appear,
          transform: `scale(${scale})`,
          boxShadow: "0 0 15px rgba(59,130,246,0.6)",
        }} />
      );
    });
  });

  const textOpacity = interpolate(frame, [120, 150], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {blocks}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h2 style={{
          color: "#ffffff",
          fontSize: "48px",
          fontFamily: "Inter, sans-serif",
          opacity: textOpacity,
          textShadow: "0 0 20px rgba(255,255,255,0.5)"
        }}>5+3+3+4 Structure</h2>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
