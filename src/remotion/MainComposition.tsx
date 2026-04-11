import { AbsoluteFill, Sequence } from "remotion";
import { VisionaryLeader } from "./scenes/VisionaryLeader";
import { SystemicFlow } from "./scenes/SystemicFlow";
import { HumanImpact } from "./scenes/HumanImpact";

export const MainComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence from={0} durationInFrames={390}>
        <VisionaryLeader />
      </Sequence>
      <Sequence from={390} durationInFrames={390}>
        <SystemicFlow />
      </Sequence>
      <Sequence from={780} durationInFrames={420}>
        <HumanImpact />
      </Sequence>
    </AbsoluteFill>
  );
};
