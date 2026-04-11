import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

const methods = [
  { icon: "🐎", title: "Horse Game", desc: "Shows 3 types of community-government relationships.", color: "#E8621A", bg: "#FDF0E8" },
  { icon: "🪵", title: "Stick Game", desc: "Demonstrates power of collective action.", color: "#C9901A", bg: "#FEF9E7" },
  { icon: "👣", title: "Step Game", desc: "Visually reveals who gets left behind.", color: "#5B2D8A", bg: "#F3EEF9" },
  { icon: "🖼️", title: "Picture Cards", desc: "Illustrated cards to identify health problems.", color: "#C0392B", bg: "#FDECEA" },
  { icon: "🪨", title: "Prioritization Game", desc: "Distribute pebbles to determine top problems.", color: "#1A7A7A", bg: "#E8F6F6" },
  { icon: "❓", title: "What Is This?", desc: "Guess the health problem on your back.", color: "#1A4A8A", bg: "#E8F0FB" },
  { icon: "📖", title: "Story with Pictures", desc: "Find root causes of Soni's story.", color: "#2D6A4F", bg: "#E8F5EE" },
  { icon: "🌉", title: "Bridge Game", desc: "Visualise barriers and community strengths.", color: "#E8621A", bg: "#FDF0E8" },
  { icon: "🎭", title: "Nukkad Natak", desc: "Street play to share key messages.", color: "#C9901A", bg: "#FEF9E7" },
];

export const PlaMethods: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, config: { damping: 14 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FDFAF7", fontFamily: "'DM Sans', sans-serif" }}>
      <AbsoluteFill style={{ padding: "60px 80px" }}>
        
        {/* Header */}
        <div style={{
          transform: `translateY(${interpolate(titleY, [0, 1], [-50, 0])}px)`,
          opacity: titleOpacity,
          marginBottom: 40,
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "'DM Serif Display', serif", marginBottom: 12 }}>
            Key Activity Methods
          </h2>
          <p style={{ fontSize: 24, color: "#777" }}>
            Making participation fun, visual, and community-owned
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          height: "100%",
        }}>
          {methods.map((m, i) => {
            const cardSpring = spring({ frame: frame - 15 - i * 5, fps, config: { damping: 12 } });
            const scale = interpolate(cardSpring, [0, 1], [0.8, 1]);
            const opacity = cardSpring;

            return (
              <div
                key={m.title}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `3px solid ${m.bg}`,
                  borderTop: `8px solid ${m.color}`,
                  borderRadius: 24,
                  padding: "30px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transform: `scale(${scale})`,
                  opacity,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{
                  fontSize: 70,
                  marginBottom: 20,
                  transform: `scale(${spring({ frame: frame - 30 - i * 5, fps, config: { mass: 2, damping: 10 } })})`
                }}>
                  {m.icon}
                </div>
                <h4 style={{ fontSize: 24, color: m.color, fontWeight: "bold", marginBottom: 16 }}>
                  {m.title}
                </h4>
                <p style={{ fontSize: 18, color: "#555", lineHeight: 1.4 }}>
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
