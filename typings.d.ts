// https://webpack.js.org/guides/typescript/#importing-other-assets
// https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack
declare module '*.css' {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;

  export = classNames;
}

declare module '*.svg' {
  export = string;
}
