/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Houses: Shiny Sculpture - the simplest possible dynamic environment map
 *
 * this works, but seems to generate a lot of WebGL warnings - not sure what to do
 * about that
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { DoubleSide } from "../libs/CS559-THREE/build/three.module.js";

export class ShinySculpture extends GrObject {
  /**
   *
   * @param {GrWorld} world
   */
  constructor(world, radius = 4) {
    let group = new T.Group();
    super("ShinySculpture", group);

    this.world = world;
    this.cubecam = new T.CubeCamera(radius * 1.05, 1000, 128);
    this.sculptureGeom = new T.SphereBufferGeometry(radius, 20, 10);
    this.sculptureMaterial = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.2,
      metalness: .7,
      // @ts-ignore   // envMap has the wrong type
      envMap: this.cubecam.renderTarget.texture,
    });
    this.sculpture = new T.Mesh(this.sculptureGeom, this.sculptureMaterial);
    group.add(this.cubecam);
    group.add(this.sculpture);

    group.translateY(radius * 5);
  }

  tick(delta, timeOfDay) {
    this.cubecam.update(this.world.renderer, this.world.scene);
  }
}


export class ShinyPlane extends GrObject {
  /**
   *
   * @param {GrWorld} world
   */
  constructor(world, size = 2, params = {}) {
    let group = new T.Group();
    super("ShinySculpture", group);

    this.world = world;

    this.cubecam = new T.CubeCamera(size * 1.05, 1000, 128);
    this.sculptureGeom = new T.PlaneBufferGeometry(size, size);
    this.sculptureMaterial = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.2,
      metalness: .7,
      // @ts-ignore   // envMap has the wrong type
      // envMap: this.cubecam.renderTarget.texture,
      side: DoubleSide
    });
    this.sculpture = new T.Mesh(this.sculptureGeom, this.sculptureMaterial);
    group.add(this.cubecam);
    group.add(this.sculpture);
    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);
    group.rotateY(params.rotateY || 0);


    group.translateY(size * 1.1);
  }

  tick(delta, timeOfDay) {
    this.cubecam.update(this.world.renderer, this.world.scene);
  }
}
