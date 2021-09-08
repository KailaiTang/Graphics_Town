/*jshint esversion: 6 */
// @ts-check

//
// CS559 - Graphics Town - Workbook 12
// Example Code: 
// Example "Town"
//
// This sets up the town loading different objects. 
//
// It should be called from the onload function, after the world has been created

/** These imports are for the examples - feel free to remove them */
import { Cone, SimpleHouse, IceHouse, IceSphere, House, House2, Apartment, Apartment2 } from "./house.js";
import { CircularTrack, CircularTrackSky1, CircularTrackSky2, TrackCube, TrackCube2, TrackCar, TrackCar2, Train, Track, WoodTrain } from "./track.js";
import { Helicopter, Helipad } from "./helicopter.js";
import { ShinySculpture, ShinyPlane } from "./shinySculpture.js";
import { MorphTest, } from "./morph.js";
import { GrSimpleRoundabout, GrColoredRoundabout, GrSimpleSwing, GrAdvancedSwing, GrCarousel, Dice, IceShape, Snow, Snowman, Tree, Tree2, Hint, Torus } from "./objects.js";
import * as T from "../libs/CS559-THREE/build/three.module.js";
// import { OBJLoader } from "../libs/CS559-THREE/examples/jsm/loaders/OBJLoader.js";
import { OBJLoader } from "../libs/CS559-THREE/examples/jsm/loaders/OBJLoader.js";
import { Group } from "../libs/CS559-THREE/build/three.module.js";

/********************************************************************** */
/** EXAMPLES - student should not use this! It is just for reference    */
/** you may use the sample objects, but not the sample layout           */
/***/
export function main(world) {
  // 1st town: snow town
  world.add(new IceSphere({ x: 16, y: 1, z: 16 }));
  let largeIceShape = new IceShape({ x: 16, y: 7, z: 16, rotateX: Math.PI / 8, rotateY: 0 });
  largeIceShape.setScale(2);
  world.add(largeIceShape);
  for (let i = 0; i < 6; i++) {
    let xpos = 7 + 2.5 * i;
    let zpos = 31 - 2.5 * (5 + i)
    world.add(new IceHouse({ x: xpos, z: zpos, rotateY: Math.PI * 5 / 4 }));
    world.add(new IceShape({ x: xpos - 1, y: 4, z: zpos + 0.5, rotateX: Math.PI / 8, rotateY: 0 }))
  }
  world.add(new Snow({ x: 8, z: 8 }));
  //world.add(new IceMorph({ x: 15, y: 7, z: 15, r: 2 }));
  world.add(new Snowman({ x: 8, z: 8, rotateY: 1.1 * Math.PI }));

  // 2nd town: life town
  // house and apartment
  world.add(new House2({ x: 16, z: -18 }));
  world.add(new House({ x: 13, z: -18 }));
  world.add(new House({ x: 16, z: -15 }));
  world.add(new Apartment({ x: 13, z: -15 }));
  world.add(new Apartment({ x: 10, z: -18 }));
  world.add(new Apartment({ x: 16, z: -12 }));
  world.add(new Apartment2({ x: 13, z: -12 }));
  world.add(new Apartment2({ x: 10, z: -15 }));
  world.add(new Apartment2({ x: 16, z: -9 }));
  world.add(new Apartment2({ x: 7, z: -18 }));
  // leisure
  world.add(new GrSimpleSwing({ x: 5, z: -17 }))
  world.add(new GrSimpleSwing({ x: 17, z: -5 }));
  world.add(new GrCarousel({ x: 8, z: -7 }));
  world.add(new GrColoredRoundabout({ x: 4, z: -11 }))
  //world.add(new GrColoredRoundabout({ x: 11.3, z: -2.5 }))
  world.add(new MorphTest({ x: 15, y: 7, z: -15, r: 2 }));

  // 3rd town: technology town
  let round1 = new GrSimpleRoundabout({ x: -15, y: 5, z: -15, size: 2 });
  let round2 = new GrSimpleRoundabout({ x: -10, y: 2, z: -15, size: 1.5 });
  let round3 = new GrSimpleRoundabout({ x: -15, y: 2, z: -10, size: 1.5 });
  let round4 = new GrSimpleRoundabout({ x: -10, y: 3.5, z: -25, size: 1 });
  let round5 = new GrSimpleRoundabout({ x: -25, y: 3.5, z: -10, size: 1 });
  world.add(round1);
  world.add(round2);
  world.add(round3);
  world.add(round4);
  world.add(round5);
  // object
  //world.add(new Astronaut());
  // ground tracks
  let smallTrack1 = new CircularTrack({ x: -15, z: -15, radius: 0.7, width: 0.15 });
  world.add(smallTrack1);
  let smallTrack2 = new CircularTrack({ x: -15, z: -15, radius: 1.4, width: 0.15 });
  world.add(smallTrack2);
  let smallTrack3 = new CircularTrack({ x: -15, z: -15, radius: 2.1, width: 0.15 });
  world.add(smallTrack3);
  let smallTrack4 = new CircularTrack({ x: -15, z: -15, radius: 2.8, width: 0.15 });
  world.add(smallTrack4);
  let smallTrack5 = new CircularTrack({ x: -15, z: -15, radius: 3.5, width: 0.15 });
  world.add(smallTrack5);
  let smallTrack6 = new CircularTrack({ x: -15, z: -15, radius: 4.2, width: 0.15 });
  world.add(smallTrack6);
  // ground cars
  let tc1 = new TrackCube(smallTrack1);
  let tc2 = new TrackCube2(smallTrack2);
  let tc3 = new TrackCar2(smallTrack3);
  let tc4 = new TrackCube(smallTrack4);
  let tc5 = new TrackCube2(smallTrack5);
  let tc6 = new TrackCar(smallTrack6);
  tc1.setScale(0.5);
  tc2.setScale(0.5);
  tc3.setScale(0.5);
  tc4.setScale(0.5);
  tc5.setScale(0.5);
  tc6.setScale(0.5);
  world.add(tc1);
  world.add(tc2);
  world.add(tc3);
  world.add(tc4);
  world.add(tc5);
  world.add(tc6);
  // light
  let spotlight_1 = new T.SpotLight("red", 1);
  let spotlight_2 = new T.SpotLight("#00FFFF", 1);
  let spotlight_3 = new T.SpotLight("yellow", 1);
  let spotlight_4 = new T.SpotLight("yellow", 1);
  // astronaut
  let loader = new OBJLoader();
  loader.load("objects/astronaut.obj", function (astronaut) {
    world.scene.add(astronaut);
    astronaut.position.set(-15, 10, -15);
    astronaut.rotateY(Math.PI / 4);
    // light and shadow
    astronaut.castShadow = true;
    //spotlight_1.angle = Math.PI / 16;
    spotlight_1.position.set(-15, 16, -15);
    spotlight_1.target = astronaut;
    world.scene.add(spotlight_1);
  })
  // teapot
  loader.load("objects/teapot.obj", function (teapot) {
    teapot.position.set(-10, 3, -15);
    teapot.scale.set(0.08, 0.08, 0.08);
    world.scene.add(teapot);
    // light and shadow
    teapot.castShadow = true;
    spotlight_2.angle = Math.PI / 16;
    spotlight_2.castShadow = true;
    spotlight_2.position.set(-10, 5, -15);
    world.scene.add(spotlight_2);
  })
  loader.load("objects/teapot.obj", function (teapot) {
    teapot.position.set(-15, 3, -10);
    teapot.scale.set(0.08, 0.08, 0.08);
    world.scene.add(teapot);

  })
  // suzanne
  loader.load("objects/suzanne.obj", function (teapot) {
    teapot.position.set(-10, 4.5, -25);
    teapot.scale.set(0.08, 0.08, 0.08);
    world.scene.add(teapot);
    spotlight_3.target = teapot;
    teapot.castShadow = true;
  })
  loader.load("objects/suzanne.obj", function (teapot) {
    teapot.position.set(-25, 4.5, -10);
    teapot.scale.set(0.08, 0.08, 0.08);
    world.scene.add(teapot);
    spotlight_4.target = teapot;
    teapot.castShadow = true;
  })
  // set the light
  spotlight_3.angle = Math.PI / 16;
  spotlight_3.position.set(-10, 5, -25);
  spotlight_3.castShadow = true;
  world.scene.add(spotlight_3);

  spotlight_4.angle = Math.PI / 16;
  spotlight_4.position.set(-25, 5, -10);
  spotlight_4.castShadow = true;
  world.scene.add(spotlight_4);
  // dice
  let dice1 = new Dice({ x: -6, y: 1, z: -9 });
  let dice2 = new Dice({ x: -9, y: 1, z: -6 });
  dice1.setScale(2);
  dice2.setScale(2);
  operate(dice1, false);
  world.add(dice1);
  world.add(dice2);
  // dice functions
  let angle = 0.05;
  let isRotate = 0; // corresponding to (u / 3000) % 2 == 0 (not rotate)
  function operate(object, isRotate) {
    let u = performance.now() / 1000;
    if (isRotate == 1 && (u / 3000) % 2 == 0) { // change from rotate to stationary status
      isRotate = 0;
      // TODO
    }
    if (isRotate == 0 && (u / 3000) % 2 == 1) { // change from stationary to rotate status
      isRotate = 1;
      object.rotateX(Math.PI / 4);
      object.rotateZ(Math.PI / 4);
    }
    if (isRotate == 1 && (u / 3000) % 2 == 1) { // continue to rotate
      object.rotateY(angle);
    }
    window.requestAnimationFrame(operate);
  }

  // town 4: forest and maze
  // create a maze
  let initPos = { x: -18, z: 12 };
  let distribution = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 10],
    [0, 4, 8, 10],
    [0, 2, 4, 5, 6, 8, 10],
    [0, 2, 8, 10],
    [0, 2, 3, 4, 6, 7, 8, 10],
    [0, 4, 10],
    [0, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [0, 10],
    [0, 1, 2, 3, 4, 5, 6, 8, 10],
    [0, 8, 10],
    [0, 1, 2, 4, 5, 6, 7, 8, 9, 10],
  ]
  let scaleFactor = 0.7;
  for (let row = 0; row < distribution.length; row++) {
    for (let j = 0; j < distribution[row].length; j++) {
      let col = distribution[row][j];
      if ((row + col) % 2 == 0) {
        let tree = new Tree({ x: initPos.x + row * scaleFactor, z: initPos.z + col * scaleFactor })
        tree.setScale(scaleFactor);
        world.add(tree);
      } else {
        let tree = new Tree2({ x: initPos.x + row * scaleFactor, z: initPos.z + col * scaleFactor })
        tree.setScale(scaleFactor);
        world.add(tree);
      }
    }
  }
  // add some random trees
  function rightTree() {
    let tree1 = new Tree({ x: -9, z: 18 });
    tree1.setScale(3);
    world.add(tree1);
    let tree2 = new Tree2({ x: -6, z: 18 });
    tree2.setScale(3);
    world.add(tree2);
    let tree3 = new Tree({ x: -3, z: 18 });
    tree3.setScale(3);
    world.add(tree3);
    let tree4 = new Tree2({ x: -9, z: 15 });
    tree4.setScale(3);
    world.add(tree4);
  }
  rightTree();
  function leftTree() {
    let tree1 = new Tree({ x: -18, z: 10 });
    tree1.setScale(3);
    world.add(tree1);
    let tree2 = new Tree2({ x: -18, z: 7 });
    tree2.setScale(3);
    world.add(tree2);
    let tree3 = new Tree({ x: -18, z: 4 });
    tree3.setScale(3);
    world.add(tree3);
    let tree4 = new Tree2({ x: -15, z: 10 });
    tree4.setScale(3);
    world.add(tree4);
  }
  leftTree();
  let hint = new Hint({ x: -14, y: 7, z: 15 });
  world.add(hint);
  // a torus
  let trackGreen = new Track();
  //let trackGreen = new Track({ x: -7, z: 7 });
  let woodTrain = new WoodTrain(trackGreen);
  //trackGreen.setScale(0.7);
  woodTrain.setScale(0.8);
  world.add(woodTrain);
  world.add(trackGreen);

  // Other accessories:
  /** Race Track - with three things racing around */
  let track1 = new CircularTrack();
  let track2 = new CircularTrackSky1();
  let track3 = new CircularTrackSky2();
  world.add(new Train({ x: 5, z: 12 }, track1));
  world.add(track1);
  world.add(track2);
  world.add(track3);
  // place things are different points on the track
  //tc2.u = 0.25;
  tc3.u = 0.125;
  // and make sure they are in the world

  /** Helicopter - first make places for it to land*/
  world.add(new Helipad(-12, 0, 0));
  world.add(new Helipad(12, 0, 0));
  world.add(new Helipad(0, 0, -12));
  world.add(new Helipad(0, 0, 12));
  let copter = new Helicopter();
  world.add(copter);
  copter.getPads(world.objects);

  // Cone, text, and shiny ball:
  world.add(new Cone({ y: 8 }));
  world.add(new ShinySculpture(world));
}
