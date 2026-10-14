import { describe, it, expect } from 'vitest'
import { stringToHash, hashToColor, generateCoverGradient, generateCoverSvg, getCoverUrl } from './coverGradient.js'

describe('stringToHash', () => {
  it('should generate consistent hash for same string', () => {
    const hash1 = stringToHash('test')
    const hash2 = stringToHash('test')
    expect(hash1).toBe(hash2)
  })

  it('should generate different hashes for different strings', () => {
    const hash1 = stringToHash('test')
    const hash2 = stringToHash('different')
    expect(hash1).not.toBe(hash2)
  })

  it('should generate positive integer', () => {
    const hash = stringToHash('test')
    expect(hash).toBeGreaterThan(0)
    expect(Number.isInteger(hash)).toBe(true)
  })
})

describe('hashToColor', () => {
  it('should generate valid HSL color', () => {
    const color = hashToColor(12345)
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/)
  })

  it('should generate different colors for different indices', () => {
    const color1 = hashToColor(12345, 0)
    const color2 = hashToColor(12345, 1)
    expect(color1).not.toBe(color2)
  })
})

describe('generateCoverGradient', () => {
  it('should generate gradient object', () => {
    const gradient = generateCoverGradient('Test Book', 'Test Author')
    expect(gradient).toHaveProperty('background')
    expect(gradient.background).toMatch(/^linear-gradient/)
  })

  it('should generate consistent gradient for same title', () => {
    const gradient1 = generateCoverGradient('Test Book', 'Test Author')
    const gradient2 = generateCoverGradient('Test Book', 'Test Author')
    expect(gradient1.background).toBe(gradient2.background)
  })
})

describe('generateCoverSvg', () => {
  it('should generate SVG data URL', () => {
    const svg = generateCoverSvg('Test Book', 'Test Author')
    expect(svg).toMatch(/^data:image\/svg\+xml;base64,/)
  })

  it('should include title in SVG', () => {
    const svg = generateCoverSvg('Test Book', 'Test Author')
    const decoded = atob(svg.split(',')[1])
    expect(decoded).toContain('Test Book')
  })

  it('should include author in SVG', () => {
    const svg = generateCoverSvg('Test Book', 'Test Author')
    const decoded = atob(svg.split(',')[1])
    expect(decoded).toContain('Test Author')
  })
})

describe('getCoverUrl', () => {
  it('should return provided coverUrl if exists', () => {
    const book = { title: 'Test', author: 'Test', coverUrl: 'https://example.com/cover.jpg' }
    const url = getCoverUrl(book)
    expect(url).toBe('https://example.com/cover.jpg')
  })

  it('should generate SVG if no coverUrl', () => {
    const book = { title: 'Test Book', author: 'Test Author', coverUrl: '' }
    const url = getCoverUrl(book)
    expect(url).toMatch(/^data:image\/svg\+xml;base64,/)
  })

  it('should generate SVG if coverUrl is null', () => {
    const book = { title: 'Test Book', author: 'Test Author', coverUrl: null }
    const url = getCoverUrl(book)
    expect(url).toMatch(/^data:image\/svg\+xml;base64,/)
  })
})
