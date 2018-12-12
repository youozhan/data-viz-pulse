/* Reference code
 * https://www.openprocessing.org/sketch/525068
 * https://github.com/therewasaguy/p5-music-viz
 */


var soundFile;
var amplitude;
var font;
var img;

var volhistory = [];
var x = [];
x.length = 360;
var y = [];
y.length = 360;

var beatHoldFrames = 30;
var beatThreshold = 0.05;
var beatCutoff = 0;
var beatDecayRate = 0.98;
var framesSinceLastBeat = 0;

function preload() {
  // load the sound, but don't play it yet
  soundFile = loadSound('assets/Fly_me_to_the_moon.mp3');
  font = loadFont('assets/Lato-Regular.ttf');
  img = loadImage('assets/noun_Music_1988957.png');
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  soundFile.play();

  amplitude = new p5.Amplitude();
  amplitude.setInput(soundFile);
  amplitude.smooth(0.5); // <-- try this!

  textFont(font);

}

function draw() {
    background(5, 200);
    var dia = 120;
    strokeWeight (0.5);
    stroke (255, 12);
    angleMode(RADIANS);

    // draw the moon
    for (var i = 0; i < 4500; i++){

        strokeWeight (random (0.25, 0.7));
        var angle1 = random (TWO_PI), angle2 = random (TWO_PI);
        var p1 = new p5.Vector(width/2 + cos (angle1) * dia, height/2 + sin (angle1) * dia);
        var p2 = new p5.Vector(width/2 + cos (angle2) * dia, height/2 + sin (angle2) * dia);
    
        line (p1.x, p1.y, p2.x, p2.y);
  }

    var vol=amplitude.getLevel();

    // text('Amplitude: ' + vol, 20, 20);
    fill(255, 160);
    textSize(14);
    text('SOUND EXPERIMENT', 40, height - 54);
    fill(255, 200);
    textSize(12);
    text('An audio visualization based on the amplitude', 40, height - 34);
    fill(255, 160);
    textSize(12);
    text('Fly Me to the Moon (2:30)', width - 180, height - 52);
    fill(255, 160);
    text('Frank Sinatra', width - 180, height - 34);
    image(img, width - 226, height - 62);

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

