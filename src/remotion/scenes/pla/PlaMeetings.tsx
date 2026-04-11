import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PlaMeetings = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 12 } });
  const titleY = interpolate(titleProgress, [0, 1], [-50, 0]);

  const meetings = [
    { num: "1", title: "PLA Introduction", color: "#E8621A", bg: "#FDF0E8" },
    { num: "2", title: "Social Inequality", color: "#5B2D8A", bg: "#F3EEF9" },
    { num: "3", title: "Maternal Health Problems", color: "#C0392B", bg: "#FDECEA" },
    { num: "4", title: "Newborn Health Problems", color: "#1A7A7A", bg: "#E8F6F6" },
    { num: "5", title: "Causes & Solutions", color: "#C9901A", bg: "#FEF9E7" },
    { num: "6", title: "Strategies & Responsibility", color: "#2D6A4F", bg: "#E8F5EE" },
    { num: "7", title: "Plan Community Meeting", color: "#1A4A8A", bg: "#E8F0FB" },
    { num: "8", title: "Community Meeting Sharing", color: "#E8621A", bg: "#FDF0E8" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#FDFAF7", fontFamily: "'DM Sans', sans-serif", padding: "100px" }}>
      <div style={{
        transform: `translateY(${titleY}px)`,
        opacity: titleProgress,
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "60px"
      }}>
        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#1A4A8A" }} />
        <h2 style={{ fontSize: "60px", fontFamily: "'DM Serif Display', serif", margin: 0, color: "#1A1A1A" }}>The 8 Meetings Overview</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        {meetings.map((meeting, i) => {
          const delay = 30 + i * 10;
          const cardConfig = spring({ frame: frame - delay, fps, config: { damping: 13 } });
          const cardX = interpolate(cardConfig, [0, 1], [i % 2 === 0 ? -50 : 50, 0]);

          return (
            <div key={i} style={{
              background: "white",
              border: "1px solid #E0D8D0",
              borderRadius: "20px",
              padding: "30px",
              display: "flex",
              alignItems: "center",
              gap: "30px",
              opacity: cardConfig,
              transform: `translateX(${cardX}px)`,
              boxShadow: "0 10px 20px rgba(0,0,0,0.02)"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: meeting.color,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                fontFamily: "'DM Serif Display', serif",
                flexShrink: 0
              }}>
                {meeting.num}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "32px", margin: "0 0 10px 0", color: "#1A1A1A" }}>{meeting.title}</h3>
                <div style={{
                  display: "inline-block",
                  padding: "6px 16px",
                  background: meeting.bg,
                  color: meeting.color,
                  borderRadius: "20px",
                  fontSize: "18px",
                  fontWeight: "bold"
                }}>
                  {i === 7 ? "3-4 hours" : "90 min"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
