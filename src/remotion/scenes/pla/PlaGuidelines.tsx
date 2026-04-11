import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

const dos = [
  "Seat everyone in a circle at equal level",
  "Keep attendance voluntary — no incentives",
  "Duration: 1–1.5 hours",
  "Keep all records in writing"
];

const donts = [
  "Never be lecture-style (उपदेशपूर्ण)",
  "Don't exclude any community member",
  "Don't let the story character be real",
  "Don't run meetings without preparation"
];

const groups = [
  "Minority/Scheduled Castes",
  "Female-headed Households",
  "Daily Wage Labourers",
  "Families with Disability",
];

export const PlaGuidelines: React.FC = () => {
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
          marginBottom: 30,
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "'DM Serif Display', serif", marginBottom: 12 }}>
            Rules & Target Groups
          </h2>
          <p style={{ fontSize: 24, color: "#777" }}>
            Essential guidelines for every Facilitator
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px", flex: 1 }}>
          
          {/* Rules Split */}
          <div style={{ display: "flex", gap: "30px" }}>
            {/* DOs */}
            <div style={{
              flex: 1,
              backgroundColor: "#E8F5EE",
              border: "3px solid #74C69D",
              borderRadius: 20,
              padding: 30,
              opacity: interpolate(frame, [20, 35], [0, 1]),
              transform: `scale(${interpolate(spring({ frame: frame - 20, fps }), [0, 1], [0.9, 1])})`
            }}>
              <h3 style={{ fontSize: 32, color: "#2D6A4F", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ backgroundColor: "#2D6A4F", color: "white", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>✓</span>
                Must Do
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {dos.map((item, i) => (
                  <li key={i} style={{ 
                    fontSize: 22, color: "#2D6A4F", marginBottom: 14, fontWeight: 500,
                    opacity: spring({ frame: frame - 30 - i * 5, fps })
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* DONTs */}
            <div style={{
              flex: 1,
              backgroundColor: "#FDECEA",
              border: "3px solid #F7C1C1",
              borderRadius: 20,
              padding: 30,
              opacity: interpolate(frame, [40, 55], [0, 1]),
              transform: `scale(${interpolate(spring({ frame: frame - 40, fps }), [0, 1], [0.9, 1])})`
            }}>
              <h3 style={{ fontSize: 32, color: "#C0392B", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ backgroundColor: "#C0392B", color: "white", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>✕</span>
                Must Not Do
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {donts.map((item, i) => (
                  <li key={i} style={{ 
                    fontSize: 22, color: "#C0392B", marginBottom: 14, fontWeight: 500,
                    opacity: spring({ frame: frame - 50 - i * 5, fps })
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Excluded Groups */}
          <div style={{
            backgroundColor: "#E8F0FB",
            border: "3px solid #B5CEF4",
            borderRadius: 20,
            padding: 30,
            opacity: interpolate(frame, [80, 95], [0, 1]),
            transform: `translateY(${interpolate(spring({ frame: frame - 80, fps }), [0, 1], [50, 0])}px)`
          }}>
            <h3 style={{ fontSize: 28, color: "#1A4A8A", marginBottom: 16, textAlign: "center" }}>
              Prioritise Excluded / Marginalised Families
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              {groups.map((group, i) => (
                <div key={i} style={{
                  backgroundColor: "white",
                  padding: "16px 24px",
                  borderRadius: 12,
                  color: "#1A4A8A",
                  fontSize: 20,
                  fontWeight: "bold",
                  border: "2px solid #1A4A8A",
                  transform: `scale(${interpolate(spring({ frame: frame - 100 - i * 5, fps, config: { damping: 12 } }), [0, 1], [0, 1])})`
                }}>
                  {group}
                </div>
              ))}
            </div>
          </div>

        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
