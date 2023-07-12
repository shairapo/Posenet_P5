// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let eyes=[];


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    
    //if the two legs are identified with confidence, show them+average/just average
    if(pose.keypoints[15].score>0.2 && pose.keypoints[16].score>0.2){
        // fill(255, 0, 0);
        // noStroke();
        // ellipse(pose.keypoints[15].position.x, pose.keypoints[15].position.y, 10, 10);
        // ellipse(pose.keypoints[16].position.x, pose.keypoints[16].position.y, 10, 10);
        let averagePoint = createVector((pose.keypoints[15].position.x + pose.keypoints[16].position.x) / 2, (pose.keypoints[15].position.y + pose.keypoints[16].position.y) / 2);
        fill(0, 255, 0);
        noStroke();
        ellipse(averagePoint.x, averagePoint.y, 30, 30);
    }
      
    }
    
  
}

// // A function to draw the skeletons
// function drawSkeleton() {
//   // Loop through all the skeletons detected
//   for (let i = 0; i < poses.length; i++) {
//     let skeleton = poses[i].skeleton;
//     // For every skeleton, loop through all body connections
//     for (let j = 0; j < skeleton.length; j++) {
//       let partA = skeleton[j][0];
//       let partB = skeleton[j][1];
//       stroke(255, 0, 0);
//       line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
//     }
//   }
// }
