precision highp float;

#define PI 3.14159265358979323846
float nine = 9;
varying vec2 vTexCoord;
uniform sampler2D uTex;

void main() {
  float longitude = mix(-PI, PI, vTexCoord.x);
  float latitude = mix(-PI/2.0, PI/2.0, vTexCoord.y);
  float Yboard=atan(tan(PI/nine)*cos(longitude));
  
  
if ((longitude >= -16.0*PI/(nine*nine)) && (longitude <= 16.0*PI/(nine*nine))&& (latitude <= Yboard)&& (latitude >= -Yboard)) {

  float transfactlong=(longitude+(16.0*PI/(nine*nine)))/(32.0*PI/(nine*nine));
  float transfactlat=(latitude+Yboard)/(2.0*Yboard);
  float aflong=mix(0.0,1.0,transfactlong);
  float aflat=mix(0.0,1.0,transfactlat);
  vec2 transjingwei=vec2(1.0-aflong,aflat);
  gl_FragColor = texture2D(uTex, transjingwei);
} else{
  gl_FragColor = vec4(1.0);
}
 
}
