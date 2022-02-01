precision mediump float;

// img (image or video) is sent by the sketch
uniform sampler2D img;
// om is sent by the sketch
uniform sampler2D om;
// displays original
uniform bool original;
// toggles om display
uniform bool om_on;
// target horizontal & vertical resolution
uniform float resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

void main() {
  if (original) {
    gl_FragColor = texture2D(img, vTexCoord);
  }
  else {
    // remap omCoord to [0.0, resolution] ∈ R
    vec2 omCoord = vTexCoord * resolution;
    // remap imgCoord to [0.0, resolution] ∈ Z
    vec2 imgCoord = floor(omCoord);
    // remap omCoord to [0.0, 1.0] ∈ R
    omCoord = omCoord - imgCoord;
    // remap imgCoord to [0.0, 1.0] ∈ R
    imgCoord = imgCoord / vec2(resolution);
    // get vec4 image texel (may be used as color hash key by some apps, e.g., photomosaic)
    vec4 imgTexel = texture2D(img, imgCoord);
    if(om_on) {
      vec4 fallback = vec4(0.0);
      vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
      vec4 omTexel = texture2D(om, omCoord);
      vec4 threshold = vec4(0.1);
      gl_FragColor = all(lessThan(abs(omTexel - black), threshold)) ? imgTexel : fallback;
    }
    else {
      gl_FragColor = imgTexel;
    }
  }
}