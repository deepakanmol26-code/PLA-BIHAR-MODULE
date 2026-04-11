import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const SkillBased = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Central student node
  const studentY = interpolate(frame, [0, 30], [height / 2 + 100, height / 2]);
  const studentX = width / 2;

  // Skill icons orbiting
  const skills = [
    { label: "💻", color: "#ff9933" }, // coding
    { label: "⚽", color: "#138808" }, // sports
    { label: "🎨", color: "#3b82f6" }, // arts
    { label: "🧠", color: "#a855f7" }, // critical thinking
  ];

  const orbitRadius = 200;
  const orbitDuration = 120; // frames for full rotation

  const skillElements = skills.map((skill, i) => {
    const angle = ((frame + i * 30) % orbitDuration) / orbitDuration * Math.PI * 2;
    const x = studentX + Math.cos(angle) * orbitRadius - 30;
    const y = studentY + Math.sin(angle) * orbitRadius - 30;
    const opacity = interpolate(frame, [0, 20], [0, 1]);
    return (
      <div key={i} style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: "60px",
        opacity,
        textShadow: `0 0 15px ${skill.color}`,
      }}>{skill.label}</div>
    );
  });

  const textOpacity = interpolate(frame, [80, 120], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Central student silhouette */}
      <div style={{
        position: "absolute",
        left: studentX - 40,
        top: studentY - 80,
        width: 80,
        height: 160,
        background: "#ffffff",
        borderRadius: "40px 40px 0 0",
        boxShadow: "0 0 20px rgba(255,255,255,0.7)"
      }} />
      {skillElements}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: height * 0.75 }}>
        <h2 style={{
          color: "#ffffff",
          fontSize: "48px",
          fontFamily: "Inter, sans-serif",
          opacity: textOpacity,
          textShadow: "0 0 20px rgba(255,255,255,0.5)"
        }}>Skill‑Based Learning</h2>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
