/**
 * Literal-hex mirror of the accent tokens in src/styles/tokens.css.
 * Three.js materials (color/emissive props) can't read CSS custom properties,
 * so scene code imports these instead of hardcoding hex values inline.
 * Keep in sync with tokens.css --color-accent / --color-accent-secondary by hand.
 */
export const ACCENT_CYAN = '#5fe3ff'
export const ACCENT_CYAN_DIM = '#0f5866'
export const ACCENT_MAGENTA = '#c65fff'
export const ACCENT_MAGENTA_DIM = '#4a1f66'
/** Mirrors tokens.css --color-text — used for neutral (non-accent) scene particles like dust. */
export const TEXT_PRIMARY = '#eef1f8'
