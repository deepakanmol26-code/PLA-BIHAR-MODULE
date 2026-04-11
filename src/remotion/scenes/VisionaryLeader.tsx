import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, interpolateColors } from "remotion";

export const VisionaryLeader = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const progress = spring({
    fps,
    frame,
    config: { damping: 100, stiffness: 20 },
  });

  const colorProgress = interpolate(frame, [0, 150, 300], [0, 0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const backgroundColor = interpolateColors(colorProgress, [0, 1], ["#b45309", "#0f766e"]);

  const desks = Array.from({ length: 8 }).map((_, i) => {
    const yFloat = interpolate(frame, [0, 300], [height - 200, -200], {
      extrapolateRight: "clamp"
    });
    const xBase = (width / 8) * i + 100;
    const xWobble = Math.sin(frame / 30 + i) * 50;
    
    // Transform from heavy desk to geometric node
    const isNode = frame > 100 + i * 20;
    const nodeOpacity = interpolate(frame, [100 + i * 20, 150 + i * 20], [0, 1], {
      extrapolateRight: "clamp"
    });

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: xBase + xWobble,
          top: yFloat + (i % 2 === 0 ? 50 : 0) - frame * (i % 3 + 1),
          width: isNode ? 80 : 120,
          height: isNode ? 80 : 80,
          backgroundColor: isNode ? "rgba(255, 255, 255, 0.9)" : "#451a03",
          borderRadius: isNode ? "50%" : "8px",
          transition: "all 0.5s ease",
          boxShadow: isNode ? "0 0 40px rgba(45, 212, 191, 0.8)" : "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: "bold",
          color: isNode ? "#0f766e" : "transparent",
        }}
      >
        {isNode && i % 2 === 0 ? "Digital" : ""}
        {isNode && i % 2 !== 0 ? "Equity" : ""}
      </div>
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {desks}
      </AbsoluteFill>
      <AbsoluteFill style={{ 
        background: "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.6) 100%)",
        pointerEvents: "none"
       }} />
    </AbsoluteFill>
  );
};
