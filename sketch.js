let theShader;
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
let rvx;
let rvy;
let rvz;
let ff;
let ff2;
let ff3;
let ff4;
let errorText;

function preload() {
 theShader = loadShader('vert.vert', 'frag.frag');
  let constraints = {
  video: {
    facingMode: {
      exact: "environment"
    },
    width: { exact: 1280 },
    height: { exact: 720 }
    // height: { exact: 1280 },
    // width: { exact: 720 }
  }
};
  cam = createCapture(constraints, (stream) => {
   
  });
  cam.hide();
}


function setup() {  
 
  createCanvas(windowWidth, windowHeight, WEBGL); 

  ff = createP();
  ff.position(0,0);
  ff.html(`V1.28`);

  rvx = createInput(0.0,'double');
  rvx.position(50, 67);
  ff2 = createP();
  ff2.position(10,50);
  ff2.html(`Vx/c:`);
 
  rvy = createInput(0.0,'double');
  rvy.position(50, 90);
  ff3 = createP();
  ff3.position(10,75);
  ff3.html(`Vy/c:`);
 
  rvz = createInput(0.0,'double');
  rvz.position(50, 116);
  ff4 = createP();
  ff4.position(10,100);
  ff4.html(`Vz/c:`);

  errorText = createP();
  errorText.position(400,30);


  
      
    camera(0, 0, 0, 0, 0, -1, 0, 1, 0);
    noStroke();
  //geolocation
 
  
 //perspective(9*PI/180, width/height, 0.0001,50000);
 perspective(40*PI/180, width/height, 0.001,500);
  //device orientation
 
 
}

function draw() {
  //background(200); 
 angleMode(DEGREES);
  betax=rvx.value();
  betay=rvy.value();
  betaz=rvz.value();

  angleMode(RADIANS);
  //transform to theta and phi
  let r=sqrt(betax*betax+betay*betay+betaz*betaz);
  if (r==0){
    THETA1=0
    PH1=0;
  }else{
    THETA1=asin(-betay/r);
   PHI1=PI+atan2(-betax,-betaz);
  }
    
  

  theta=THETA1; 
  phi=PHI1;     
  
 let beta2 = rvx.value()*rvx.value()+rvy.value()*rvy.value()+rvz.value()*rvz.value();
 
 if (beta2 >=1 ){
  const contentString = "Beta is >= 1! normalising it to 0.99";
  errorText.html(contentString.fontcolor("red")); 
  
  beta = 0.99; 
 } else{
  beta=sqrt(beta2);
 }
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
  sphere(radius,200);
console.log(theta,phi);
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// //Testing older versions...
// let cam;
// let videoTexture;
// let radius=200; 
// let detail=20; 
// let velC=1;
// let baseAccX=0, baseAccY=0, baseAccZ=0;
// let frameCounter = 0;
// let velocityX = 0;
// let velocityY = 0;
// let velocityZ = 0;
// let neutralaccX=0;
// let neutralaccY=0;
// let neutralaccZ=0;
// let betaHatX=0;
// let betaHatY=0;
// let betaHatZ=0;
// let beta;
// let betaSlider;
// let textureImg;
// let motion = false;
 
 
// // if (typeof DeviceMotionEvent.requestPermission === 'function') {
// //   document.body.addEventListener('click', function() {
// //     DeviceMotionEvent.requestPermission()
// //       .then(function() {
// //         console.log('DeviceMotionEvent enabled');
 
// //         motion = true;
// //       })
// //       .catch(function(error) {
// //         console.warn('DeviceMotionEvent not enabled', error);
// //       })
// //   })
// // } else {
// //   // motion = true;
// // }
 
// //function preload() {
// // textureImg = loadImage('preview.jpg');  
// //}
 
// function setup() {
//     createCanvas(600,600,WEBGL);
//   baseAccX = 0;
//   baseAccY = 0;
//   baseAccZ = 0;
//   let constraints = {
//   video: {
//     facingMode: {
//       exact: "environment"
//     },
//     width: { exact: 1280 },
//     height: { exact: 720 }
//     // height: { exact: 1280 },
//     // width: { exact: 720 }
//   }
// };
 
//    cam = createCapture(constraints);
 
//       cam.size(1750/9, 875/8);
//       cam.hide(); 
//       videoTexture = createGraphics(1000, 500);
 
//     noStroke();
 

//   // set the frustrum
//   //perspective(PI/3., width/height, 0.0001,500);
 
// }
 
// function draw() {
//     background(200);
//    frameCounter++;
//   if (frameCounter == 4) {
//     // neutralaccX=accelerationX-baseAccX;
//     // neutralaccY=accelerationY-baseAccY;
//     // neutralaccZ=accelerationZ-baseAccZ;
//     // velocityX += neutralaccX * (deltaTime / 1000);  
//     // velocityY += neutralaccY * (deltaTime / 1000);
//     // velocityZ += neutralaccZ * (deltaTime / 1000);
 
//     frameCounter = 0;
//   }
//   // betaHatX=-velocityZ/velC;
//   // betaHatY=-velocityY/velC;
//   // betaHatZ=-velocityX/velC;
//   betaHatX=0;
//   betaHatY=0;
//   betaHatZ=0;
//   beta=Math.sqrt(betaHatX*betaHatX+betaHatY*betaHatY+betaHatZ*betaHatZ);
//   gamma=1/Math.sqrt(1-beta*beta);
//   camera(0, 0, 0, -1, 0, 0, 0, 0, -1);
 
//     //rotateX(-PI/2);
//     //rotateY(PI/2);
//     //rotateZ(-PI/2);
// videoTexture.push();
//   videoTexture.background(255);
//  videoTexture.image(cam, 3625/9, 3125/16);
 
//   videoTexture.pop();
 
//   texture(videoTexture);
//   textureMode(NORMAL);
//   //texture(textureImg);
//   //textureMode(NORMAL);
//   distortedLookalikeSphere2(radius, betaHatX, betaHatY, betaHatZ, gamma, detail, detail)
// }
 
// function distortedLookalikeSphere2(radius, betaHatX, betaHatY, betaHatZ, gamma, wSeg, hSeg) {
//     for(let i=0; i<hSeg; i++) {
//         let h1=map(i, 0, hSeg, 0, PI);
//         let h2=map(i+1, 0, hSeg, 0, PI);
//         beginShape(TRIANGLE_STRIP);
//        // texture(textureImg);
//         //textureMode(NORMAL);
//         for(let j=0; j<=wSeg; j++) {
//             let w1=map(j,0,wSeg,0,2*PI);
//           // calculate the position on the undistorted lookalike sphere
//             let xP1=radius*sin(h1)*cos(w1);
//             let yP1=radius*sin(h1)*sin(w1);
//             let zP1=radius*cos(h1);
//           // calculate the component parallel to beta
//           // first calculate betaHat.P1
//           let betaHatDotP1=xP1*betaHatX+yP1*betaHatY+zP1*betaHatZ;
//           let xP1Parallel=betaHatDotP1*betaHatX;
//           let yP1Parallel=betaHatDotP1*betaHatY;
//           let zP1Parallel=betaHatDotP1*betaHatZ;
//           // calculate the component perpendicular to beta
//           let xP1Perp=xP1-xP1Parallel;
//           let yP1Perp=yP1-yP1Parallel;
//           let zP1Perp=zP1-zP1Parallel;
//           // now calculate P1"
//           let xP1PP=xP1Perp/gamma+xP1Parallel+betaHatX*radius*beta;
//           let yP1PP=yP1Perp/gamma+yP1Parallel+betaHatY*radius*beta;
//           let zP1PP=zP1Perp/gamma+zP1Parallel+betaHatZ*radius*beta;
 
//             vertex(xP1PP,yP1PP,zP1PP,j/wSeg,i/hSeg);
//            let xP2=radius*sin(h2)*cos(w1);
//             let yP2=radius*sin(h2)*sin(w1);
//             let zP2=radius*cos(h2);
//           let betaHatDotP2=xP2*betaHatX+yP2*betaHatY+zP2*betaHatZ;
//           let xP2Parallel=betaHatDotP2*betaHatX;
//           let yP2Parallel=betaHatDotP2*betaHatY;
//           let zP2Parallel=betaHatDotP2*betaHatZ;
//           let xP2Perp=xP2-xP2Parallel;
//           let yP2Perp=yP2-yP2Parallel;
//           let zP2Perp=zP2-zP2Parallel;
//           let xP2PP=xP2Perp/gamma+xP2Parallel+betaHatX*radius*beta;
//           let yP2PP=yP2Perp/gamma+yP2Parallel+betaHatY*radius*beta;
//           let zP2PP=zP2Perp/gamma+zP2Parallel+betaHatZ*radius*beta;
//             vertex(xP2PP,yP2PP,zP2PP,j/wSeg,(i+1)/hSeg);
//         }
//         endShape();
//     }
// }
