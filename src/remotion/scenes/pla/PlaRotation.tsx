import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const PlaRotation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const titleY = spring({ frame, fps, config: { damping: 14 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const renderVillages = (isOdd: boolean, delay: number) => {
    return Array.from({ length: 10 }).map((_, i) => {
      const vNum = isOdd ? i * 2 + 1 : i * 2 + 2;
      const vDrop = spring({ frame: frame - delay - i * 2, fps, config: { damping: 12 } });
      const scale = interpolate(vDrop, [0, 1], [0, 1]);
      
      const bgColor = isOdd ? "#E6F1FB" : "#E1F5EE";
      const textColor = isOdd ? "#0C447C" : "#085041";
      const borderColor = isOdd ? "#185FA5" : "#0F6E56";

      return (
        <div
          key={vNum}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: bgColor,
            color: textColor,
            border: `3px solid ${borderColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: "bold",
            transform: `scale(${scale})`,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {vNum}
        </div>
      );
    });
  };

  const leftBoxScale = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const rightBoxScale = spring({ frame: frame - 40, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#FDFAF7", fontFamily: "'DM Sans', sans-serif" }}>
      <AbsoluteFill style={{ padding: "80px" }}>
        
        {/* Header */}
        <div style={{
          transform: `translateY(${interpolate(titleY, [0, 1], [-50, 0])}px)`,
          opacity: titleOpacity,
          marginBottom: 60,
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "'DM Serif Display', serif", marginBottom: 12 }}>
            Smart Village Rotation System
          </h2>
          <p style={{ fontSize: 24, color: "#777" }}>
            The Watch-and-Do Learning Model
          </p>
        </div>

        {/* content */}
        <div style={{ display: "flex", gap: "40px", flex: 1, height: "100%", justifyContent: "center" }}>
          
          {/* Odd Cycle (Facilitator) */}
          <div style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            border: "3px solid #185FA5",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            transform: `scale(${leftBoxScale})`,
            boxShadow: "0 20px 40px rgba(24,95,165,0.1)",
          }}>
            <h3 style={{ fontSize: 32, color: "#185FA5", marginBottom: 30, textAlign: "center" }}>
              Facilitator Leads (Odd)
            </h3>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center"
            }}>
              {renderVillages(true, 30)}
            </div>
            <p style={{ marginTop: "auto", fontSize: 20, color: "#185FA5", textAlign: "center", fontWeight: 500 }}>
              Facilitator runs session with local ASHA assisting.
            </p>
          </div>

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            opacity: interpolate(frame, [80, 100], [0, 1]),
            transform: `translateX(${interpolate(frame, [80, 100], [-30, 0])}px)`
          }}>
            <span style={{ fontSize: 60, color: "#E8621A" }}>→</span>
          </div>

          {/* Even Cycle (Watch) */}
          <div style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            border: "3px solid #0F6E56",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            transform: `scale(${rightBoxScale})`,
            boxShadow: "0 20px 40px rgba(15,110,86,0.1)",
          }}>
            <h3 style={{ fontSize: 32, color: "#0F6E56", marginBottom: 30, textAlign: "center" }}>
              Even ASHAs Watch
            </h3>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center"
            }}>
              {renderVillages(false, 60)}
            </div>
            <p style={{ marginTop: "auto", fontSize: 20, color: "#0F6E56", textAlign: "center", fontWeight: 500 }}>
              Even ASHAs observe, then conduct in their own village.
            </p>
          </div>

        </div>

        {/* Global Result pop */}
        <div style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translateX(-50%) translateY(${interpolate(spring({ frame: frame - 120, fps }), [0, 1], [100, 0])}px)`,
          opacity: spring({ frame: frame - 120, fps }),
          backgroundColor: "#FFF8F0",
          border: "2px solid #E8621A",
          padding: "20px 40px",
          borderRadius: 16,
          fontSize: 22,
          fontWeight: "bold",
          color: "#E8621A",
          boxShadow: "0 10px 30px rgba(232,98,26,0.15)"
        }}>
          After 2 meetings, ALL 20 villages are covered!
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
