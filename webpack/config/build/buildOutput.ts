import {IPaths} from "../../model";

export const buildOutput = (Paths: IPaths) => {
  return {
    filename: 'application.js',
    path: Paths.BuildDir,
    clean: true,
  };
};