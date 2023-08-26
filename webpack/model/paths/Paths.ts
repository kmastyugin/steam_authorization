import path from "path";
import {IPaths} from "./IPaths";

const rootDir = path.resolve(__dirname, '..', '..', '..');
const srcDir = path.resolve(rootDir, 'src');

export const Paths: IPaths = {
  BuildDir: path.resolve(rootDir, 'build'),
  Entry: path.resolve(srcDir, 'index.ts'),
  Template: path.resolve(srcDir, 'static', 'index.html'),
  SrcDir: path.resolve(srcDir),
  EngineDir: path.resolve(srcDir, 'engine'),
  ModulesDir: path.resolve(srcDir, 'modules'),
  ControllersDir: path.resolve(srcDir, 'modules', 'http', 'express', 'controllers', 'index.ts'),
  ExceptionsDir: path.resolve(srcDir, 'exceptions', 'index.ts'),
  InterfacesDir: path.resolve(srcDir, 'interfaces'),
  MiddlewaresDir: path.resolve(srcDir, 'modules', 'http', 'express', 'middlewares', 'index.ts'),
  ModelsDir: path.resolve(srcDir, 'modules', 'mongodb', 'models', 'index.ts'),
  RoutesDir: path.resolve(srcDir, 'modules', 'http', 'express', 'routes', 'index.ts'),
  ServicesDir: path.resolve(srcDir, 'modules', 'http', 'express', 'services', 'index.ts'),
}
