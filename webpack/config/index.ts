import {EnvParamType} from "../model";

import {buildEntry} from "./build/buildEntry";
import {buildOutput} from "./build/buildOutput";
import {buildResolve} from "./build/buildResolve";
import {buildRules} from "./build/buildRules";
import {buildPlugins} from "./build/buildPlugins";

import {Paths} from "../model";

export const buildConfig = (env: EnvParamType) => {
  return {
    mode: env.mode,
    target: 'node',
    entry: buildEntry(Paths),
    output: buildOutput(Paths),
    resolve: buildResolve(Paths),
    module: {
      rules: buildRules(),
    },
    plugins: buildPlugins(Paths),
  };
};