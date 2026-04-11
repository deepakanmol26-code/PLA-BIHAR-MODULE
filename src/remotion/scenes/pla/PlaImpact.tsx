import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PlaImpact = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgConfig = spring({ frame, fps, config: { damping: 15 } });
  const bgScale = interpolate(bgConfig, [0, 1], [1.1, 1]);

  const cards = [
    { stat: "33%↓", text: "Reduction in Newborn Death Rate", color: "#2D6A4F", bg: "#E8F5EE", border: "#74C69D" },
    { stat: "55%↓", text: "Reduction in Maternal Death Rate", color: "#C0392B", bg: "#FDECEA", border: "#F7C1C1" },
    { stat: "↑", text: "Improvement in Nutritional Status", color: "#1A4A8A", bg: "#E8F0FB", border: "#B5CEF4" },
  ];

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#1A1A2E", 
      color: "white",
      fontFamily: "'DM Sans', sans-serif",
      justifyContent: "center",
      alignItems: "center",
      transform: `scale(${bgScale})`,
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle, rgba(116,198,157,0.1) 0%, transparent 80%)"
      }} />

      <h2 style={{ 
        fontSize: "70px", 
        fontFamily: "'DM Serif Display', serif", 
        marginBottom: "80px",
        zIndex: 10
      }}>Proven Impact & Evidence</h2>

      <div style={{ display: "flex", gap: "40px", zIndex: 10 }}>
        {cards.map((card, i) => {
          const delay = 40 + i * 15;
          const cardProgress = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          const cardY = interpolate(cardProgress, [0, 1], [80, 0]);

          return (
            <div key={i} style={{
              background: card.bg,
              border: `2px solid ${card.border}`,
              borderRadius: "30px",
              padding: "60px 40px",
              width: "400px",
              textAlign: "center",
              opacity: cardProgress,
              transform: `translateY(${cardY}px)`,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}>
              <span style={{ 
                fontFamily: "'DM Serif Display', serif", 
                fontSize: "120px", 
                color: card.color,
                display: "block",
                lineHeight: 1,
                marginBottom: "20px"
              }}>{card.stat}</span>
              <p style={{ 
                fontSize: "28px", 
                color: "#1A1A1A", 
                margin: 0,
                fontWeight: "500"
              }}>{card.text}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
