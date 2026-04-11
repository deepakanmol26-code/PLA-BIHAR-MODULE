import { Composition } from "remotion";
import { MainComposition } from "./MainComposition";
import { SewingDataComposition } from "./SewingDataComposition";
import { NEP2020Composition } from "./NEP2020Composition";
import { PLABiharComposition } from "./PLABiharComposition";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AntigravityVideo"
        component={MainComposition}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SewingDataVideo"
        component={SewingDataComposition}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="NEP2020Video"
        component={NEP2020Composition}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PLABiharVideo"
        component={PLABiharComposition}
        durationInFrames={1500}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
