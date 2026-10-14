/**
 * Generate a consistent gradient based on a string hash
 * Used for generating book cover colors
 */
export const stringToHash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Generate HSL color from hash
 */
export const hashToColor = (hash, index = 0) => {
  const hue = (hash + index * 40) % 360
  const saturation = 60 + (hash % 20) // 60-80%
  const lightness = 45 + (hash % 15) // 45-60%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

/**
 * Generate gradient CSS for book cover
 */
export const generateCoverGradient = (title, author = '') => {
  const hash = stringToHash(title + author)
  const color1 = hashToColor(hash, 0)
  const color2 = hashToColor(hash, 1)
  const angle = (hash % 360)
  
  return {
    background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
  }
}

/**
 * Generate SVG data URL for book cover
 */
export const generateCoverSvg = (title, author = '') => {
  const gradient = generateCoverGradient(title, author)
  const colors = gradient.background.match(/hsl\([^)]+\)/g) || ['#B8812E', '#F3E6CC']
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="450" fill="url(#grad)" />
      <text x="20" y="200" font-family="serif" font-size="24" font-weight="bold" fill="white" max-width="260">
        ${escapeXml(title.substring(0, 50))}
      </text>
      <text x="20" y="240" font-family="sans-serif" font-size="16" fill="white" opacity="0.9">
        ${escapeXml(author.substring(0, 40))}
      </text>
    </svg>
  `.trim()
  
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Escape XML characters for SVG
 */
const escapeXml = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Get cover URL - either provided URL or generated SVG
 */
export const getCoverUrl = (book) => {
  if (book.coverUrl) {
    return book.coverUrl
  }
  return generateCoverSvg(book.title, book.author)
}
