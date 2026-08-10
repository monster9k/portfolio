import { Color, ShaderMaterial } from 'three'

/**
 * View-dependent (Fresnel/rim) gradient material for the sun: a deep
 * red-orange core cross-fades through a vivid orange band to a warm gold
 * rim at grazing view angles, modeled on a reference "glowing sun"
 * illustration. Deliberately unlit (ignores scene directional/ambient
 * lights entirely, computed only from view direction vs. surface normal)
 * so it can't reproduce the earlier lit-material bugs (metallic specular
 * highlight, UV-wrapped-texture seam) — those only existed because the
 * old approach relied on scene lighting and a wrapped 2D canvas texture.
 */

const CORE_COLOR = '#6e1404'
const MID_COLOR = '#c94a10'
const RIM_COLOR = '#ffcf7a'
const RIM_POWER = 2.6

// Both varyings are kept in view space (camera at the origin, looking down
// -Z) so the fragment shader never mixes coordinate spaces — mixing a
// view-space normal against a world-space view direction was the bug that
// produced a hemisphere-style split instead of a true radial rim glow.
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uCoreColor;
  uniform vec3 uMidColor;
  uniform vec3 uRimColor;
  uniform float uRimPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float rim = pow(1.0 - clamp(dot(vViewDir, normalize(vNormal)), 0.0, 1.0), uRimPower);
    vec3 color = mix(uCoreColor, uMidColor, smoothstep(0.0, 0.6, rim));
    color = mix(color, uRimColor, smoothstep(0.6, 1.0, rim));
    gl_FragColor = vec4(color * uIntensity, 1.0);
  }
`

export function createSunMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    uniforms: {
      uCoreColor: { value: new Color(CORE_COLOR) },
      uMidColor: { value: new Color(MID_COLOR) },
      uRimColor: { value: new Color(RIM_COLOR) },
      uRimPower: { value: RIM_POWER },
      uIntensity: { value: 1 },
    },
    vertexShader,
    fragmentShader,
  })
}
