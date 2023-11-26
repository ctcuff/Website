// Tells TypeScript that any SVGs are imported as a string
// (in the form of a URL because of webpack config)
declare module '*.svg?inline' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}
