import { AbsoluteFill, Sequence } from "remotion";
import { OpeningChaos } from "./scenes/nep/OpeningChaos";
import { NEPIntro } from "./scenes/nep/NEPIntro";
import { Structure } from "./scenes/nep/Structure";
import { SkillBased } from "./scenes/nep/SkillBased";
import { GERGrowth } from "./scenes/nep/GERGrowth";
import { DigitalLearning } from "./scenes/nep/DigitalLearning";
import { Closing } from "./scenes/nep/Closing";

export const NEP2020Composition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <Sequence from={0} durationInFrames={180}>
        <OpeningChaos />
      </Sequence>
      <Sequence from={180} durationInFrames={270}>
        <NEPIntro />
      </Sequence>
      <Sequence from={450} durationInFrames={200}>
        <Structure />
      </Sequence>
      <Sequence from={650} durationInFrames={200}>
        <SkillBased />
      </Sequence>
      <Sequence from={850} durationInFrames={200}>
        <GERGrowth />
      </Sequence>
      <Sequence from={1050} durationInFrames={200}>
        <DigitalLearning />
      </Sequence>
      <Sequence from={1250} durationInFrames={550}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
