precision mediump float;

// img (image or video) is sent by the sketch
uniform sampler2D source;

// img (image or video) is sent by the sketch
uniform sampler2D palette;

// img (image or video) is sent by the sketch
uniform float cols;

// img (image or video) is sent by the sketch
uniform bool debug;

uniform bool color_on;

uniform vec4 background;
uniform vec4 foreground;

uniform float resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

float luma (vec3 color){
  return 0.299*color.r + 0.587*color.g + 0.114*color.b;
}

void main() {
  
  vec2 fontCoord = vTexCoord * resolution;
  // remap imgCoord to [0.0, resolution] ∈ Z
  vec2 srcCoord = floor(fontCoord);
  // remap omCoord to [0.0, 1.0] ∈ R
  fontCoord = fontCoord - srcCoord;
  // remap imgCoord to [0.0, 1.0] ∈ R
  srcCoord = srcCoord / vec2(resolution);
  // get vec4 image texel (may be used as color hash key by some apps, e.g., photomosaic)
  vec4 key = texture2D(source, srcCoord);

  if(debug) {
    gl_FragColor = key;
  }
  else {
    vec2 tile = vec2((floor(luma(key.rgb)*cols)+fontCoord.s) / cols, fontCoord.t);
    vec4 paletteTexel = texture2D(palette,tile);
    gl_FragColor = color_on ? all(equal(paletteTexel, foreground)) ? key : background : paletteTexel;
  }
}