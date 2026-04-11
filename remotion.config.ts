import { Config } from "@remotion/cli/config";

Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules ?? []),
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
      ],
    },
  };
});
