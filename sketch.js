let theShader;
let velcanx=0;
let velcany=0;
let velcanz=0;
let speedtest=1.5;
let headingtest=50;
let PHI1=0;
let THETA1=180;
let cam;
let VelC;
let betax;
let betay;
let betaz;
let phi=0;
let theta=0;
let radius=200;
let beta;
let gamma;
let textureImg;
let motion = false;
let ff;
let ff2;
let ff3;
let ff4;

function preload() {
 theShader = loadShader('vert.vert', 'frag.frag');
  let constraints = {
  video: {
    facingMode: {
      exact: "environment"
    },
    width: { exact: 1280 },
    height: { exact: 720 }
  }
};
  cam = createCapture(constraints, (stream) => {
   
  });
  cam.hide();
}


function setup() {  
 
  createCanvas(windowWidth, windowHeight, WEBGL); 

VelCsli=createSlider(1,30,3,1); 
  VelCsli.position(10,50);
  ff = createP();
  ff.position(10,10);
  
  betaxsli=createSlider(-1,1,0,0.01); 
  betaxsli.position(85,70);
  ff2 = createP();
  ff2.position(10,50);
  
  betaysli=createSlider(-1,1,0,0.01); 
  betaysli.position(85,95);
  ff3 = createP();
  ff3.position(10,75);
  
  betazsli=createSlider(-1,1,0,0.01); 
  betazsli.position(85,120);
  ff4 = createP();
  ff4.position(10,100);
  
      
    camera(0, 0, 0, 0, 0, -1, 0, 1, 0);
    frustum(-windowWidth / 20, windowWidth / 20, windowHeight / 20, -windowHeight / 20, 0.001, 100)
    noStroke();
  //geolocation
 
  
 perspective(40*PI/180, width/height, 0.001,500);
  //device orientation
 
 
}

function draw() {
  background(200); 
 angleMode(DEGREES);
  VelC=VelCsli.value();
  betax=betaxsli.value();
  betay=betaysli.value();
  betaz=betazsli.value();

  angleMode(RADIANS);
  velcanx=betax*VelC;
  velcany=betay*VelC;
  velcanz=betaz*VelC;
  //transform to theta and phi
  let r=sqrt(velcanx*velcanx+velcany*velcany+velcanz*velcanz);
  if (r===0){
    THETA1=0
    PH1=0;
  }else{
    THETA1=asin(-velcany/r);
   PHI1=PI+atan2(-velcanx,-velcanz);
  }
    
  

  theta=THETA1; 
  phi=PHI1;     
  
  beta=sqrt(velcanx*velcanx+velcany*velcany+velcanz*velcanz)/VelC;
  gamma=1/Math.sqrt(1-beta*beta);
  
// distorted lookalike sphere
  rotateY(phi);
  rotateX(theta);
  scale(1/gamma, 1/gamma, 1);
  translate(0,0,radius*beta);
  rotateX(-theta);
  rotateY(-phi);
 theShader.setUniform('uTex', cam);
resetShader();
  shader(theShader);
  sphere(200,100);
console.log(theta,phi);
  ff.html(`c:${VelC}m/s`);
  ff2.html(`Vx/c:${betax}`);
  ff3.html(`Vy/c:${betay}`);
  ff4.html(`Vz/c:${betaz}`);
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
