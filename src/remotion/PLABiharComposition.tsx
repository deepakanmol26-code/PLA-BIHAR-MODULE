import { AbsoluteFill, Sequence, staticFile, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { PlaHero } from "./scenes/pla/PlaHero";
import { PlaCycle } from "./scenes/pla/PlaCycle";
import { PlaRotation } from "./scenes/pla/PlaRotation";
import { PlaMethods } from "./scenes/pla/PlaMethods";
import { PlaStory } from "./scenes/pla/PlaStory";
import { PlaMeetings } from "./scenes/pla/PlaMeetings";
import { PlaGuidelines } from "./scenes/pla/PlaGuidelines";
import { PlaImpact } from "./scenes/pla/PlaImpact";

export const PLABiharComposition = () => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FDFAF7", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Background Music — soft ambient, looped, with fade-in and fade-out */}
      <Audio
        src={staticFile("bg-music.mp3")}
        loop
        volume={(f) =>
          interpolate(
            f,
            [0, 2 * fps, durationInFrames - 3 * fps, durationInFrames],
            [0, 0.35, 0.35, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />
      <Sequence from={0} durationInFrames={150}>
        <PlaHero />
      </Sequence>
      <Sequence from={150} durationInFrames={200}>
        <PlaCycle />
      </Sequence>
      <Sequence from={350} durationInFrames={200}>
        <PlaRotation />
      </Sequence>
      <Sequence from={550} durationInFrames={150}>
        <PlaMethods />
      </Sequence>
      <Sequence from={700} durationInFrames={200}>
        <PlaStory />
      </Sequence>
      <Sequence from={900} durationInFrames={250}>
        <PlaMeetings />
      </Sequence>
      <Sequence from={1150} durationInFrames={200}>
        <PlaGuidelines />
      </Sequence>
      <Sequence from={1350} durationInFrames={150}>
        <PlaImpact />
      </Sequence>
    </AbsoluteFill>
  );
};
