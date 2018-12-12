/*
 * https://www.openprocessing.org/sketch/525068
 * https://github.com/therewasaguy/p5-music-viz
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
//   angleMode(DEGREES);

  soundFile.play();

  amplitude = new p5.Amplitude();
  amplitude.setInput(soundFile);
  amplitude.smooth(0.5); // <-- try this!

}

function draw() {
    background(5);
    var dia = 120;
    strokeWeight (0.5);
    stroke (255, 12);
    angleMode(RADIANS);
    for (var i = 0; i < 9000; i++){

        strokeWeight (random (0.25, 0.7));
        var angle1 = random (TWO_PI), angle2 = random (TWO_PI);
        var p1 = new p5.Vector(width/2 + cos (angle1) * dia, height/2 + sin (angle1) * dia);
        var p2 = new p5.Vector(width/2 + cos (angle2) * dia, height/2 + sin (angle2) * dia);
    
        line (p1.x, p1.y, p2.x, p2.y);
  }
    var vol=amplitude.getLevel();
    fill(255);
    text('Amplitude: ' + vol, 20, 20);
    detectBeat(vol);

    volhistory.push(vol);

    strokeWeight(1.25);
    stroke(255); 
    noFill();

    translate(width/2, height/2);
    beginShape();
    angleMode(DEGREES);
    for (var i = 0; i<volhistory.length; i++){
        var r = map(volhistory[i], 0, 0.5, 300, 600);
        var x = r * cos(i);
        var y = r * sin(i);  
        curveVertex(x,y);
    }
    endShape();

    if(volhistory.length > 360){
        volhistory.splice(0,1);

    } 

}

function detectBeat(level){
    if(level > beatCutoff && level > beatThreshold){
        // onBeat();
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
    // ellipse(width/2, height/2, random(20,50));
}

