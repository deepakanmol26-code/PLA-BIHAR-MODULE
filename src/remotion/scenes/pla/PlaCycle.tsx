import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PlaCycle = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 12 } });
  const titleY = interpolate(titleProgress, [0, 1], [-50, 0]);

  const steps = [
    { num: "1", title: "Identify & Prioritise", desc: "Identify maternal & newborn health problems", sub: "Meetings 1–4", class: "saffron", theme: "#E8621A", bg: "#FDF0E8" },
    { num: "2", title: "Build Strategies", desc: "Discuss root causes, explore solutions", sub: "Meetings 5–6", class: "blue", theme: "#1A4A8A", bg: "#E8F0FB" },
    { num: "3", title: "Implement", desc: "Put agreed strategies into action", sub: "Meetings 7–8", class: "green", theme: "#2D6A4F", bg: "#E8F5EE" },
    { num: "4", title: "Evaluate", desc: "Assess what worked, restart cycle", sub: "Ongoing", class: "purple", theme: "#5B2D8A", bg: "#F3EEF9" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#FDFAF7", fontFamily: "'DM Sans', sans-serif", padding: "100px" }}>
      <div style={{
        transform: `translateY(${titleY}px)`,
        opacity: titleProgress,
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "80px"
      }}>
        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#2D6A4F" }} />
        <h2 style={{ fontSize: "60px", fontFamily: "'DM Serif Display', serif", margin: 0, color: "#1A1A1A" }}>The 4-Phase PLA Cycle</h2>
      </div>

      <div style={{ display: "flex", gap: "40px", flex: 1 }}>
        {steps.map((step, i) => {
          const delay = 20 + i * 15;
          const cardProgress = spring({ frame: frame - delay, fps, config: { damping: 14 } });
          const cardY = interpolate(cardProgress, [0, 1], [100, 0]);
          
          return (
            <div key={i} style={{
              flex: 1,
              background: step.bg,
              border: `2px solid ${step.theme}`,
              borderRadius: "30px",
              padding: "50px 40px",
              opacity: cardProgress,
              transform: `translateY(${cardY}px)`,
              display: "flex",
              flexDirection: "column",
              boxShadow: `0 20px 40px rgba(0,0,0,0.05)`,
              position: "relative",
            }}>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "100px",
                color: step.theme,
                lineHeight: 1,
                marginBottom: "20px"
              }}>{step.num}</span>
              <h3 style={{ fontSize: "36px", color: step.theme, margin: "0 0 20px 0" }}>{step.title}</h3>
              <p style={{ fontSize: "24px", color: "rgba(0,0,0,0.7)", flex: 1 }}>{step.desc}</p>
              <div style={{ 
                fontSize: "20px", 
                color: step.theme, 
                fontWeight: "bold",
                background: "white",
                padding: "10px 20px",
                borderRadius: "20px",
                alignSelf: "flex-start",
                border: `1px solid ${step.theme}`
              }}>
                {step.sub}
              </div>
              
              {i < steps.length - 1 && (
                <div style={{
                  position: "absolute",
                  right: "-40px",
                  top: "50%",
                  fontSize: "60px",
                  color: "rgba(0,0,0,0.2)",
                  transform: "translateY(-50%)"
                }}>→</div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
