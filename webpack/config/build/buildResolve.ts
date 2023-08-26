import {IPaths} from "../../model";

export const buildResolve = (Paths: IPaths) => {
  return {
    extensions: ['.ts', '.js'],
    alias: {
      '@': Paths.SrcDir,
      '@engine': Paths.EngineDir,
      '@modules': Paths.ModulesDir,
      '@controllers': Paths.ControllersDir,
      '@exceptions': Paths.ExceptionsDir,
      '@interfaces': Paths.InterfacesDir,
      '@middlewares': Paths.MiddlewaresDir,
      '@models': Paths.ModelsDir,
      '@routes': Paths.RoutesDir,
      '@services': Paths.ServicesDir,
    },
  }
};