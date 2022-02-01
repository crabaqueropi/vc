precision mediump float;

// img (image or video) is sent by the sketch
uniform sampler2D img;

// img (image or video) is sent by the sketch
uniform sampler2D img_rosas;

// img (image or video) is sent by the sketch
uniform sampler2D imagen1;
uniform sampler2D imagen2;
uniform sampler2D imagen3;
uniform sampler2D imagen4;
uniform sampler2D imagen5;
uniform sampler2D imagen6;
uniform sampler2D imagen7;
uniform sampler2D imagen8;
uniform sampler2D imagen9;
uniform sampler2D imagen10;

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

    //if(!om_on) { // temporal
    if(om_on) {
      vec4 fallback = vec4(0.0);
      vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

      vec4 omTexel = texture2D(imagen4, omCoord);
      //vec4 omTexel = texture2D(img_rosas, omCoord);

      vec4 threshold = vec4(0.2);

      /*if(imgTexel == vec4(0.0, 0.0, 0.0, 1.0)){
        gl_FragColor = omTexel;
      }else{
        gl_FragColor = imgTexel;
      }*/
      gl_FragColor = imgTexel == vec4(0.0, 0.0, 0.0, 1.0) ? omTexel : imgTexel;
      //gl_FragColor = all(lessThan(abs(omTexel - black), threshold)) ? omTexel : imgTexel;
      //gl_FragColor = all(lessThan(abs(omTexel - black), threshold)) ? imgTexel : fallback;
    }
    else {
      gl_FragColor = imgTexel;
    }
  }
}