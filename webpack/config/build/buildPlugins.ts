import HtmlWebpackPlugin from "html-webpack-plugin";
import {IPaths} from "../../model";

export const buildPlugins = (Paths: IPaths) => {
  return [
    new HtmlWebpackPlugin({
      template: Paths.Template,
    }),
  ];
};