import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const GERGrowth = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Bar graph data (mock values)
  const bars = [
    { label: "2000", value: 60 },
    { label: "2005", value: 65 },
    { label: "2010", value: 70 },
    { label: "2015", value: 75 },
    { label: "2020", value: 85 },
  ];

  const maxVal = 100;
  const barWidth = 80;
  const gap = 40;
  const startX = (width - (bars.length * barWidth + (bars.length - 1) * gap)) / 2;
  const baseY = height * 0.7;

  const barElements = bars.map((bar, i) => {
    const delay = i * 10;
    const progress = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const barHeight = progress * (bar.value / maxVal) * 300; // 300px max height
    const opacity = progress;
    return (
      <div key={i} style={{
        position: "absolute",
        left: startX + i * (barWidth + gap),
        bottom: baseY,
        width: barWidth,
        height: barHeight,
        background: "linear-gradient(180deg, #ff9933, #c47f00)",
        opacity,
        transformOrigin: "bottom",
        borderRadius: "4px",
        boxShadow: "0 0 10px #ff9933",
      }} />
    );
  });

  const labels = bars.map((bar, i) => (
    <div key={i} style={{
      position: "absolute",
      left: startX + i * (barWidth + gap) + barWidth / 2 - 10,
      top: baseY + 10,
      color: "#ffffff",
      fontSize: "20px",
      fontFamily: "Inter, sans-serif",
    }}>{bar.label}</div>
  ));

  const textOpacity = interpolate(frame, [80, 120], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {barElements}
      {labels}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: height * 0.2 }}>
        <h2 style={{
          color: "#ffffff",
          fontSize: "48px",
          fontFamily: "Inter, sans-serif",
          opacity: textOpacity,
          textShadow: "0 0 20px rgba(255,255,255,0.5)"
        }}>Gross Enrollment Ratio ↑</h2>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
