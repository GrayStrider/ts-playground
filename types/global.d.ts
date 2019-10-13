/** Global definitions for development **/

// declare module '*'; //TODO temporary solution for js import errors

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// for style loader
declare module '*.css' {
  const styles: any
  export = styles;
}

declare module 'xmlhttprequest'
