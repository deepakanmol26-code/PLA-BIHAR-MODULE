import { AbsoluteFill, Sequence } from "remotion";
import { Chaos } from "./scenes/sewing/Chaos";
import { Stitching } from "./scenes/sewing/Stitching";
import { StructuredPatterns } from "./scenes/sewing/StructuredPatterns";
import { BrainAndMessage } from "./scenes/sewing/BrainAndMessage";

export const SewingDataComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={150}>
        <Chaos />
      </Sequence>
      <Sequence from={150} durationInFrames={300}>
        <Stitching />
      </Sequence>
      <Sequence from={450} durationInFrames={300}>
        <StructuredPatterns />
      </Sequence>
      <Sequence from={750} durationInFrames={600}>
        <BrainAndMessage />
      </Sequence>
    </AbsoluteFill>
  );
};
