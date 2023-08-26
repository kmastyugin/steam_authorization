import {EnvModeType} from "./EnvMode.type";

export interface EnvParamType {
  WEBPACK_BUNDLE?: boolean;
  WEBPACK_BUILD?: boolean;
  mode: EnvModeType;
}