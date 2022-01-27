const shimmer = (w: number, h: number, theme?: string) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect id="r" width="${w}" height="${h}" fill="${theme === "dark" ? "#171717" : "#e2e8f0"}" />
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </svg>`

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)

const base64Shimmer = (w: number, h: number, theme?: string) => toBase64(shimmer(w, h, theme))

export default base64Shimmer
