/** 
 * Fork of the p5.js tutorial "Conditionals and Interactivity" 
 * by Greg Benedis-Grab, Layla Quiñones" 
 * Link: https://editor.p5js.org/gbenedis@gmail.com/sketches/9lz2aqfTO 
 */

/** Global constants */
const gravitationalAcceleration = 0.2;

/** Global variables */
let redVal, greenVal; // Variables for background color
let userLost, userWon; // Game state variables
let sun; // Sun object variable
initializeGameVariables()

/**
 * Sets or resets the game variables
 */
function initializeGameVariables() {
  redVal = 0;
  greenVal = 0;
  userLost = false;
  userWon = false;
  sun = initializeSun();
}

/** 
 * Create the sun object in its initial state 
 */
function initializeSun() {
    let sun = {
      x: 300, // x-component of center point
      y: 600, // y-compontent of center point
      d: 140, // Diameter
      v: -4, // Velocity
      isFalling: false, // State flag
      distToMouse: undefined,
    };
    return sun;
}

/**
 * p5.js built-in setup function
 * Is called once before @draw
 */
function setup() {
    createCanvas(600, 400);
    noStroke(); // Remove shape borders
    textAlign(CENTER) // Center all text at its initial point
}

/**
 * p5.js built-in draw function
 * Is called every frame
 */
function draw() {
  // Set background color
  background(redVal, greenVal, 0);

  // Draw Scene
  drawSun();
  drawMountains();
  
  // Determine game state
  checkSunHeight();
  if (mouseIsPressed === true) {
    handleMousePressed();
  }

  // Update variables
  updateSunMotion(); 
  updateBackgroundColor();
}


/**
 * Draws the mountains on the scene
 */
function drawMountains() {
  fill(110, 50, 18);
  triangle(200, 400, 520, 253, 800, 400);
  fill(110, 95, 20);
  triangle(200, 400, 520, 253, 350, 400);

  fill(150, 75, 0);
  triangle(-100, 400, 150, 200, 400, 400);
  fill(100, 50, 12);
  triangle(-100, 400, 150, 200, 0, 400);

  fill(150, 100, 0);
  triangle(200, 400, 450, 250, 800, 400);
  fill(120, 80, 50);
  triangle(200, 400, 450, 250, 300, 400);
}

/**
 * Draws the sun and its glow
 */
function drawSun() {
  fill(255, 135, 5, 60);
  circle(sun.x, sun.y, sun.d + 40);
  fill(255, 100, 0, 100);
  circle(sun.x, sun.y, sun.d);
}

/**
 * Determines game state
 * User loses if the sun is above the canvas
 * User wins if the sun is falling and it is below the canvas
 */
function checkSunHeight() {
  if (sun.y + sun.d / 2 < 0) {
    userLost = true;
    sun.v = 0;
    displayFinalText("black", "Game Over");
  } else if (sun.y + sun.d / 2 > 600 && sun.isFalling) {
    userWon = true;
    sun.v = 0;
    displayFinalText("white", "You won!");
  }
}

/**
 * Helper function to display the end-of-game message in the center of the canvas.
 * Called by @checkSunHeight when the game is won or lost.
 * @param {(string|number[])} textColor - Text color passed to fill().
 *   Can be a color name (e.g. "black") or an [r, g, b] array.
 * @param {string} displayString - The main message to display,
 *   e.g. "Game Over" or "You won!".
 */
function displayFinalText(textColor, displayString) {
    fill(textColor)
    textSize(40)
    text(displayString, width/2, height/2)
    textSize(20)
    text("Click to try again", width/2, height/2 + 40)
}

/**
 * Handles the mouseIsPressed event
 * If the end screen is displayed the game is reset
 */
function handleMousePressed() {
    if (userLost || userWon) {
      initializeGameVariables()
    } else if (!sun.isFalling) {
      // Calculate distance between the mouse and the sun
      sun.distToMouse = sqrt((mouseX - sun.x) ** 2 + (mouseY - sun.y) ** 2);
      if (sun.distToMouse < sun.d / 2) {
        sun.isFalling = true;
      }
    }
}

/**
 * Updates position of the sun and its velocity if it is falling
 */
function updateSunMotion() {
  // Accelerate the sun
  if (sun.isFalling) {
    sun.v += gravitationalAcceleration; // unit: [pixels / frame]
  }
  // Move the sun
  sun.y += sun.v; // y [pixels] = v [pixels/frame] * 1 [frame]
}

/**
 * Updates the color of the background according to the height of the sun
 */
function updateBackgroundColor() {
  if (sun.y >= 0 && sun.y <= 480) {
    /** Calculate amount of red
     * redVal(y) = a_r * y + b_r
     * redVal(480) = 0
     * redVal(0) = 255
     * a_r = (255 - 0) / (0 - 480)
     * b_r = 255
     */
    redVal = -255 / 480 * sun.y + 255;

    /** Calculate amount of green
     * a_g = a_r/4
     * greenVal(480) = 0
     * a_g = -255/480/4
     * b_g = 0 - a_g*480 = 255/4 * 480/480
     */
    greenVal = -255 / 480 / 4 * sun.y + 255 / 4;

    /** Previous color update: */ 
    // redVal += 4;
    // greenVal += 1;
  }
}

  
  
  


