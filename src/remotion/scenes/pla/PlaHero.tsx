import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PlaHero = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const statsProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14 },
  });
  
  const statsOpacity = interpolate(statsProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 40%, #0F3460 100%)",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'DM Serif Display', serif",
        overflow: "hidden",
      }}
    >
      {/* Decorative Orbs */}
      <div style={{
        position: "absolute",
        top: -200,
        right: -200,
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,98,26,0.3) 0%, transparent 70%)",
        transform: `scale(${interpolate(frame, [0, 150], [0.8, 1.2])})`,
      }} />
      <div style={{
        position: "absolute",
        bottom: -150,
        left: "-10%",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(116,198,157,0.2) 0%, transparent 70%)",
        transform: `scale(${interpolate(frame, [0, 150], [1.2, 0.8])})`,
      }} />

      <div style={{
        transform: `translateY(${titleY}px)`,
        opacity: titleOpacity,
        textAlign: "center",
        zIndex: 10
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(232,98,26,0.3)",
          border: "1px solid rgba(232,98,26,0.5)",
          color: "#F4A46A",
          fontSize: "24px",
          fontWeight: 600,
          letterSpacing: "4px",
          textTransform: "uppercase",
          padding: "10px 28px",
          borderRadius: "40px",
          marginBottom: "40px",
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Bihar Government · National Health Mission
        </div>
        <h1 style={{ fontSize: "80px", margin: "0 0 20px 0", lineHeight: 1.2 }}>
          Participatory Learning &<br />Action (PLA)
        </h1>
        <p style={{ fontSize: "36px", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
          सहभागी सीख एवं क्रियान्वयन — Complete Module Guide
        </p>
      </div>

      <div style={{
        opacity: statsOpacity,
        display: "flex",
        gap: "80px",
        marginTop: "80px",
        zIndex: 10,
      }}>
        {[
          { num: "8", label: "Meetings", color: "#E8621A" },
          { num: "9", label: "Districts", color: "#F4A46A" },
          { num: "20", label: "Villages/Facilitator", color: "#74C69D" }
        ].map((stat, i) => {
          const itemProgress = spring({ frame: frame - 45 - i * 10, fps });
          const itemY = interpolate(itemProgress, [0, 1], [30, 0]);
          return (
            <div key={i} style={{ 
              textAlign: "center", 
              transform: `translateY(${itemY}px)`,
              opacity: itemProgress
            }}>
              <span style={{ display: "block", fontSize: "70px", color: stat.color }}>{stat.num}</span>
              <span style={{ fontSize: "24px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "2px", fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
