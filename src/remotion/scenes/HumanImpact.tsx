import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const HumanImpact = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Floating blocks representing outdated obstacles
  const obstacles = [
    { label: "Outdated Curriculum", start: 30, x: width * 0.2 },
    { label: "Lack of Access", start: 60, x: width * 0.7 },
    { label: "Bureaucracy", start: 90, x: width * 0.4 },
    { label: "Inequity", start: 120, x: width * 0.8 },
  ];

  const blocks = obstacles.map((obs, i) => {
    const yTransform = interpolate(frame - obs.start, [0, 150], [height - 200, -200], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const rotate = interpolate(frame - obs.start, [0, 150], [0, i % 2 === 0 ? 45 : -45], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const opacity = interpolate(frame - obs.start, [100, 150], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
      <div key={i} style={{
        position: "absolute",
        left: obs.x,
        top: yTransform,
        transform: `rotate(${rotate}deg)`,
        opacity,
        width: 250,
        height: 100,
        backgroundColor: "#1f2937",
        color: "#9ca3af",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        fontFamily: "Inter, sans-serif",
        fontSize: "20px",
        border: "2px solid #374151",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}>
        {obs.label}
      </div>
    );
  });

  // Student rising
  const studentY = interpolate(frame, [0, 200], [height - 300, height / 2 - 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  // Sunset horizon glow
  const sunsetOpacity = interpolate(frame, [100, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Horizon setting sun */}
      <AbsoluteFill style={{
          background: "radial-gradient(ellipse at bottom, #f59e0b 0%, transparent 60%)",
          opacity: sunsetOpacity,
      }} />

      {blocks}

      {/* Abstract human representation */}
      <div style={{
          position: "absolute",
          left: width / 2 - 50,
          top: studentY,
          width: 100,
          height: 200,
          backgroundColor: "#f8fafc",
          borderRadius: "50px 50px 0 0",
          boxShadow: `0 0 50px rgba(248, 250, 252, ${sunsetOpacity})`,
      }} />

      {/* Sweeping Camera Effect via container scaling and slight rotation */}
      <AbsoluteFill style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.9)",
          pointerEvents: "none"
      }} />
    </AbsoluteFill>
  );
};
