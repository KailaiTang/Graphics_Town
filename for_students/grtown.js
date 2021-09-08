/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */
import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";

import {main} from "../examples/main.js";

// let up = "dark_up.png";
// let down = "dark_dn.png";
// let left = "dark_lf.png";
// let right = "dark_rt.png";
// let front = "dark_ft.png";
// let back = "dark_bk.png";
let up = "rainbow_up.png";
let down = "rainbow_dn.png";
let left = "rainbow_lf.png";
let right = "rainbow_rt.png";
let front = "rainbow_ft.png";
let back = "rainbow_bk.png";
let cubeTexture = new T.CubeTextureLoader().setPath("../images/sky/").load([
  //up, down, left, front, right, back
  // A correct version: up, down, left, right, back, front
  // up, down, left, right, back, front
  back, front, up, down, left, right
]);


/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */
function grtown() {
  // make the world
  let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 20,
    // make the ground plane big enough for a world of stuff
    groundplanecolor: "black"
  });

  // put stuff into the world
  // this calls the example code (that puts a lot of objects into the world)
  // you can look at it for reference, but do not use it in your assignment
  main(world);

  // build and run the UI

  // skybox
  world.scene.background = cubeTexture;

  // let mat = new T.MeshStandardMaterial({ envMap: cubeTexture, metalness: .8, roughness: 0.1, side: BackSide });

  // // make an environment map camera to take a picture at the center of the world
  //let cubecam = new T.CubeCamera(1, 1000, 128);
  // cubecam.position.y = 2;
  // mat.envMap = cubecam.renderTarget.texture;

  // only after all the objects exist can we build the UI
  // @ts-ignore       // we're sticking a new thing into the world
  world.ui = new WorldUI(world);
  // now make it go!
  world.go();
}
Helpers.onWindowOnload(grtown);
