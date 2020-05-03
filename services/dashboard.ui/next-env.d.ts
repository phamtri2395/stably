/* eslint spaced-comment: ["error", "always", { "markers": ["/"] }] */

/// <reference types="next" />
/// <reference types="next/types/global" />

// This allow us to import svg files
declare module '*.svg' {
  const content: string;

  export default content;
}

// This allow us to import scss files
declare module '*.scss' {
  const classes: { [key: string]: string };

  export default classes;
}
