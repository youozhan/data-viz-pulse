/*
 * getLevel() from the p5.Amplitude object
 * and map it to the ellipse position.
 */

var soundFile;
var amplitude;

var volhistory = [];

var beatHoldFrames = 30;
var beatThreshold = 0.05;
var beatCutoff = 0;
var beatDecayRate = 0.98;
var framesSinceLastBeat = 0;

function preload() {
  // load the sound, but don't play it yet
  soundFile = loadSound('Fly_me_to_the_moon.mp3')
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  soundFile.play();

  amplitude = new p5.Amplitude();
  amplitude.setInput(soundFile);
  amplitude.smooth(0.5); // <-- try this!

}

function draw() {
    background(0);
    var vol=amplitude.getLevel();
    detectBeat(vol);

    volhistory.push(vol);
    stroke(255); 
    strokeWeight(1.25);
    noFill();

    translate(width/2, height/2);
    beginShape();
    for (var i = 0; i<360; i++){
        var r = map(volhistory[i], 0, 0.5, 40, 800);
        var x = r * cos(i);
        var y = r * sin(i);  
        vertex(x,y);
    }
    endShape();

    if(volhistory.length > 360){
        volhistory.splice(0,1);
    } 

}

function detectBeat(level){
    if(level > beatCutoff && level > beatThreshold){
        onBeat();
        beatCutoff = level *1.2;
        framesSinceLastBeat = 0;
    } else{
        if (framesSinceLastBeat <= beatHoldFrames){
            framesSinceLastBeat ++;
          }
        else{
            beatCutoff *= beatDecayRate;
            beatCutoff = Math.max(beatCutoff, beatThreshold);
        }
    } 
}

function onBeat(){
    // Fill(255);
    ellipse(width/2, height/2, random(20,50));
    // noFill();
}

//   var level = amplitude.getLevel();
//   text('Amplitude: ' + level, 20, 20);
//   text('mapMax: ' + mapMax, 20, 40);

  // map ellipse height
//   var ellipseHeight = map(level, 0, mapMax, height, 0);
//   ellipse(100, ellipseHeight-100, frameCount%120/4);
//   ellipse(200, ellipseHeight-100, sin(frameCount%60));
//   ellipse(300, ellipseHeight-100, frameCount%60);
//   ellipse(400, ellipseHeight-100, sin(frameCount%60)*sin(frameCount%60*1));
//   ellipse(500, ellipseHeight-100, frameCount%60);
//   ellipse(600, ellipseHeight-100, sin(frameCount%60));
//   ellipse(700, ellipseHeight-100, frameCount%60);
//   ellipse(800, ellipseHeight-100, sin(frameCount%60));
//   ellipse(900, ellipseHeight-100, frameCount%60);
//   ellipse(1000, ellipseHeight-100, sin(frameCount%60));
//   ellipse(1100, ellipseHeight-100, frameCount%60);
//   ellipse(1200, ellipseHeight-100, sin(frameCount%60));
//   ellipse(1300, ellipseHeight-100, frameCount%60);

// }

// function setup() {
//     createCanvas(1024, 768);
//     background(255);
//     noFill();
//     frameRate(6);
//   }
  
//   function draw() {
//     background(255);
//     noStroke();
//     fill(200, 200);

//     ellipse(100, 100, frameCount%6*10);
//     ellipse(200, 100, sin(frameCount)*60);
//     ellipse(300, 100, cos(frameCount)*60);
//     ellipse(400, 100, sin(frameCount)*cos(frameCount)*60);
    
//   }

