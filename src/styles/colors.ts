/**
 * Literal-hex mirror of the accent tokens in src/styles/tokens.css.
 * Three.js materials (color/emissive props) can't read CSS custom properties,
 * so scene code imports these instead of hardcoding hex values inline.
 * Keep in sync with tokens.css --color-accent / --color-accent-secondary by hand.
 */
export const ACCENT_GOLD = '#ffb347'
export const ACCENT_EMBER = '#ff5f3d'
/** Mirrors tokens.css --color-text — used for neutral (non-accent) scene particles like dust. */
export const TEXT_PRIMARY = '#eef1f8'
/** Mirrors tokens.css --color-bg-bottom — the deep near-black tone the page background leans toward. */
export const BG_DEEP = '#05060a'
