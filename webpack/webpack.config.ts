import {EnvParamType} from "./model";
import {buildConfig} from "./config";

export default (env: EnvParamType) => {
  return buildConfig(env);
}