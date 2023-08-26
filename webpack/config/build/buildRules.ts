export const buildRules = () => {
  return [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    },
    {
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ];
};