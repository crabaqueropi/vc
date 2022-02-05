precision mediump float;
uniform sampler2D source;
uniform sampler2D palette;
uniform float cols;
uniform float metr;
uniform bool debug;
uniform bool color_on;
uniform vec4 background;
uniform vec4 foreground;
uniform float resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

float metrica (vec3 color, float metri){
  float aux = 0.0;
  if(metri==1.0){
    aux =  0.333*color.r + 0.333*color.g + 0.333*color.b;
  }else{
    if(metri==2.0){
      aux = 0.299*color.r + 0.587*color.g + 0.114*color.b;
    }else{
      aux = 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;
    } 
  } 
  return aux;
}

float distancia (vec3 color, vec3 img){
  return sqrt((pow(color.r-img.r,2.0)+pow(color.g-img.g,2.0)+pow(color.b-img.b,2.0)));
}

vec2 chooseImage(vec2 fontCoord, float cols, sampler2D palette, vec4 originalColor){
  vec2 tile;
  vec4 paletteTexel;
  vec2 bestImage;
  float dist;
  float min = 50000.0;

  for(float i=0.0;i<20.0;i++){
    tile = vec2((fontCoord.s + i)/cols, fontCoord.t);
    paletteTexel = texture2D(palette,tile);
    dist = distancia(originalColor.rgb, paletteTexel.rgb);
    if(dist<min){
      min = dist;
      bestImage=tile;
    }
  }
  return bestImage;
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
  vec4 originalColor = texture2D(source, srcCoord);

  if(debug) {
    gl_FragColor = originalColor;
  }
  else {
    vec2 tile;
    if(metr != 4.0){
      tile = vec2((floor(metrica(originalColor.rgb, metr)*cols)+fontCoord.s) / cols, fontCoord.t);
    }else{
      float index=-1.0;
      float min = 50000.0;

      for(float i=0.0; i<20.0; i++){
        vec2 tile = vec2((fontCoord.s + i)/cols, fontCoord.t);
        vec4 paletteTexel = texture2D(palette,tile);
        float dist = distancia(originalColor.rgb, paletteTexel.rgb);
        if(dist<min){
          min = dist;
          index = i;
        }
      }
      tile = vec2((fontCoord.s + index)/cols, fontCoord.t);
    }
    vec4 paletteTexel = texture2D(palette,tile);
    gl_FragColor = paletteTexel; 
  }
}