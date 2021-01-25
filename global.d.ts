import { Theme as AppTheme } from "./components/theme";

declare module "remark-html" {
  const html: any;
  export default html;
}

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}

declare module "system-props" {
  export interface Theme extends AppTheme {}
}
