import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

const rootCauses = [
  "Child marriage (age 16)",
  "Early pregnancy",
  "Late registration (5th month)",
  "Inadequate nutrition",
  "Superstitions about food",
  "Giving cow's milk"
];

const solutions = [
  "Marry at right age",
  "Conceive at right age",
  "Register early (first trimester)",
  "Eat full nutritious meals",
  "Regular check-ups & tablets",
  "Give colostrum immediately"
];

export const PlaStory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, config: { damping: 14 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1]);

  const storyBoxY = spring({ frame: frame - 15, fps, config: { damping: 14 } });

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
            The Story Method
          </h2>
          <p style={{ fontSize: 24, color: "#777" }}>
            Exploring root causes of maternal & newborn death through narrative
          </p>
        </div>

        {/* Story Box */}
        <div style={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #E0D8D0",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 40,
          transform: `translateY(${interpolate(storyBoxY, [0, 1], [50, 0])}px)`,
          opacity: storyBoxY,
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}>
          <div style={{ backgroundColor: "#C9901A", padding: "20px 30px" }}>
            <h4 style={{ color: "white", fontSize: 28, margin: 0 }}>Soni's Story (सोनी की कहानी)</h4>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, marginTop: 8 }}>
              Illustrates: Anaemia, Low birth weight, Giving cow milk early
            </p>
          </div>
          <div style={{ padding: "30px", fontSize: 20, color: "#444", lineHeight: 1.6 }}>
            Soni, 16, is married early and becomes pregnant. Family delays registration. She doesn't take iron tablets 
            due to bad taste. Family restricts food, believing excess food harms the baby. She delivers a weak baby. 
            Family discards colostrum (first yellow milk) and gives cow's milk. The baby dies within a week.
          </div>
        </div>

        {/* Split Screen Cause / Solution */}
        <div style={{ display: "flex", gap: "40px", flex: 1 }}>
          
          {/* Causes */}
          <div style={{
            flex: 1,
            backgroundColor: "#FDECEA",
            border: "3px solid #F7C1C1",
            borderRadius: 20,
            padding: 30,
            opacity: interpolate(frame, [30, 45], [0, 1]),
            transform: `translateX(${interpolate(frame, [30, 45], [-50, 0])}px)`
          }}>
            <h3 style={{ fontSize: 32, color: "#C0392B", marginBottom: 20 }}>
              Root Causes (But Why?)
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {rootCauses.map((cause, i) => {
                const itemProgress = spring({ frame: frame - 40 - i * 5, fps });
                return (
                  <li key={i} style={{ 
                    fontSize: 22, 
                    color: "#C0392B", 
                    marginBottom: 16,
                    paddingLeft: 30,
                    position: "relative",
                    opacity: itemProgress,
                    transform: `translateX(${interpolate(itemProgress, [0, 1], [-20, 0])}px)`
                  }}>
                    <span style={{ position: "absolute", left: 0, fontWeight: "bold" }}>▸</span>
                    {cause}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Solutions */}
          <div style={{
            flex: 1,
            backgroundColor: "#E8F5EE",
            border: "3px solid #74C69D",
            borderRadius: 20,
            padding: 30,
            opacity: interpolate(frame, [80, 95], [0, 1]),
            transform: `translateX(${interpolate(frame, [80, 95], [50, 0])}px)`
          }}>
            <h3 style={{ fontSize: 32, color: "#2D6A4F", marginBottom: 20 }}>
              Solutions (But What?)
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {solutions.map((sol, i) => {
                const itemProgress = spring({ frame: frame - 90 - i * 5, fps });
                return (
                  <li key={i} style={{ 
                    fontSize: 22, 
                    color: "#2D6A4F", 
                    marginBottom: 16,
                    paddingLeft: 30,
                    position: "relative",
                    opacity: itemProgress,
                    transform: `translateX(${interpolate(itemProgress, [0, 1], [20, 0])}px)`
                  }}>
                    <span style={{ position: "absolute", left: 0, fontWeight: "bold" }}>▸</span>
                    {sol}
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
