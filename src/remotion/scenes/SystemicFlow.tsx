import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const SystemicFlow = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const gridLines = Array.from({ length: 20 }).map((_, i) => {
    const spacing = width / 20;
    const lift = interpolate(frame - i * 5, [0, 100], [0, i % 2 === 0 ? 100 : 200], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: i * spacing,
          top: 0,
          width: 2,
          height: "100%",
          backgroundColor: "#1e3a8a",
          transform: `translateZ(${lift}px)`,
          opacity: 0.5,
        }}
      />
    );
  });

  const hLines = Array.from({ length: 10 }).map((_, i) => {
    const spacing = height / 10;
    const lift = interpolate(frame - i * 10, [0, 100], [0, i % 2 === 0 ? 150 : 50], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    
    return (
      <div
        key={`h${i}`}
        style={{
          position: "absolute",
          top: i * spacing,
          left: 0,
          height: 2,
          width: "100%",
          backgroundColor: "#1e3a8a",
          transform: `translateZ(${lift}px)`,
          opacity: 0.5,
        }}
      />
    );
  });

  const glowingText = (text: string, delay: number, x: number, y: number) => {
    const opacity = interpolate(frame - delay, [0, 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const zLift = interpolate(frame - delay, [0, 60], [0, 300], {
       extrapolateLeft: "clamp",
       extrapolateRight: "clamp",
    });

    return (
      <div style={{
        position: "absolute",
        left: x,
        top: y,
        color: "#fbbf24",
        fontSize: "64px",
        fontWeight: "900",
        fontFamily: "Inter, sans-serif",
        opacity,
        transform: `translateZ(${zLift}px)`,
        textShadow: "0 0 20px #f59e0b",
      }}>
        {text}
      </div>
    );
  }

  // Camera Tilt using 3D perspective
  const rotateX = interpolate(frame, [0, 150], [60, 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#e0f2fe", perspective: "1000px" }}>
      <div style={{
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotateX}deg) scale(1.5)`,
      }}>
        {gridLines}
        {hLines}
        {glowingText("INCLUSION", 60, width / 4, height / 3)}
        {glowingText("SCALABILITY", 120, width / 2, height / 2)}
      </div>
      <AbsoluteFill style={{ 
        boxShadow: "inset 0 0 100px rgba(255,255,255,0.5)",
        pointerEvents: "none"
       }} />
    </AbsoluteFill>
  );
};
