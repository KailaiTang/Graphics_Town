/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Simple Circular Track - and an object that goes around on it
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { MeshStandardMaterial } from "../libs/CS559-THREE/build/three.module.js";

/**
 * This is a really simple track - just a circle
 * But in addition to having geometry, objects on the track can ask for their
 * position (given their U value).
 * They can also ask for the direction vector.
 */
export class CircularTrack extends GrObject {
  constructor(params = {}) {
    let radius = params.radius || 15;
    let width = params.width || 0.3;
    let ring = new T.RingGeometry(radius - width, radius + width, 20, 3);
    let material = new T.MeshStandardMaterial({
      side: T.DoubleSide,
      color: "white",
      roughness: 1.0,
    });
    let mesh = new T.Mesh(ring, material);
    mesh.rotateX(Math.PI / 2);
    let group = new T.Group();
    group.add(mesh);
    group.translateX(params.x || 0);
    group.translateY(params.y + params.bias || 0.1); // raise track above ground to avoid z-fight
    group.translateZ(params.z || 0);
    super(`CircularTrack`, group);

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.z = params.z || 0;
    this.y = params.bias || 0.1;
    this.r = radius;
  }
  eval(u) {
    let p = u * 2 * Math.PI;
    return [
      this.x + this.r * Math.cos(p),
      this.y,
      this.z + this.r * Math.sin(p),
    ];
  }
  tangent(u) {
    let p = u * 2 * Math.PI;
    // unit tangent vector - not the real derivative
    return [Math.sin(p), 0, -Math.cos(p)];
  }
}

export class CircularTrackSky1 extends GrObject {
  constructor(params = {}) {
    let radius = params.radius || 18;
    let width = params.width || 0.3;
    let ring = new T.RingGeometry(radius - width, radius + width, 20, 3);
    let material = new T.MeshStandardMaterial({
      side: T.DoubleSide,
      color: "yellow",
      roughness: 1.0,
    });
    let mesh = new T.Mesh(ring, material);
    //mesh.rotateY(Math.PI / 12);
    let group = new T.Group();
    group.add(mesh);
    group.translateX(params.x || 0);
    group.translateY(params.y + params.bias || 0.1); // raise track above ground to avoid z-fight
    group.translateZ(params.z || 0);
    super(`CircularTrack`, group);

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.z = params.z || 0;
    this.y = params.bias || 0.1;
    this.r = radius;
  }
  eval(u) {
    let p = u * 2 * Math.PI;
    return [
      this.x + this.r * Math.cos(p),
      this.y,
      this.z + this.r * Math.sin(p),
    ];
  }
  tangent(u) {
    let p = u * 2 * Math.PI;
    // unit tangent vector - not the real derivative
    return [Math.sin(p), 0, -Math.cos(p)];
  }
}

export class CircularTrackSky2 extends GrObject {
  constructor(params = {}) {
    let radius = params.radius || 18;
    let width = params.width || 0.3;
    let ring = new T.RingGeometry(radius - width, radius + width, 20, 3);
    let material = new T.MeshStandardMaterial({
      side: T.DoubleSide,
      color: "yellow",
      roughness: 1.0,
    });
    let mesh = new T.Mesh(ring, material);
    mesh.rotateY(Math.PI / 2);
    //mesh.rotateY(Math.PI / 12);
    let group = new T.Group();
    group.add(mesh);
    group.translateX(params.x || 0);
    group.translateY(params.y + params.bias || 0.1); // raise track above ground to avoid z-fight
    group.translateZ(params.z || 0);
    super(`CircularTrack`, group);

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.z = params.z || 0;
    this.y = params.bias || 0.1;
    this.r = radius;
  }
  eval(u) {
    let p = u * 2 * Math.PI;
    return [
      this.x + this.r * Math.cos(p),
      this.y,
      this.z + this.r * Math.sin(p),
    ];
  }
  tangent(u) {
    let p = u * 2 * Math.PI;
    // unit tangent vector - not the real derivative
    return [Math.sin(p), 0, -Math.cos(p)];
  }
}

/**
 * A simple object to go around a track - key thing, it knows the track so it can ask the track
 * where it should be
 */
export class TrackCube extends GrCube {
  constructor(track, params = {}) {
    super({});
    this.track = track;
    this.u = 0;
    this.rideable = this.objects[0];
  }
  tick(delta, timeOfDay) {
    this.u += delta / 2000;
    let pos = this.track.eval(this.u);
    // remember, the center of the cube needs to be above ground!
    this.objects[0].position.set(pos[0], 0.5 + pos[1], pos[2]);
    let dir = this.track.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = -zAngle - Math.PI / 2;
  }
}

export class TrackCube2 extends GrCube {
  constructor(track, params = {}) {
    super({});
    this.track = track;
    this.u = 0;
    this.rideable = this.objects[0];
  }
  tick(delta, timeOfDay) {
    this.u += delta / 500;
    let pos = this.track.eval(this.u);
    // remember, the center of the cube needs to be above ground!
    this.objects[0].position.set(pos[0], 0.5 + pos[1], pos[2]);
    let dir = this.track.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = -zAngle - Math.PI / 2;
  }
}

/**
 * A Less Simple Object to go around the track
 */
export class TrackCar extends Loaders.FbxGrObject {
  constructor(track) {
    super({
      fbx: "../examples/assets/teeny_racecar.fbx",
      norm: 2.0,
      name: "Track Car 1",
    });
    this.track = track;
    this.u = 0;
    // the fbx loader puts the car on the ground - we need a ride point above the ground
    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(0.5);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;
  }
  tick(delta, timeOfDay) {
    this.u += delta / 2000;
    let pos = this.track.eval(this.u);
    this.objects[0].position.set(pos[0], pos[1], pos[2]);
    let dir = this.track.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = -zAngle - Math.PI / 2;
  }
}

/**
 * A Less Simple Object to go around the track
 */
export class TrackCar2 extends Loaders.FbxGrObject {
  constructor(track) {
    super({
      fbx: "../examples/assets/teeny_racecar.fbx",
      norm: 2.0,
      name: "Track Car 2 (back-driving)",
    });
    this.track = track;
    this.u = 0;
    // the fbx loader puts the car on the ground - we need a ride point above the ground
    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(0.5);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;
  }
  tick(delta, timeOfDay) {
    this.u -= delta / 2000;
    let pos = this.track.eval(this.u);
    this.objects[0].position.set(pos[0], pos[1], pos[2]);
    let dir = this.track.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = -zAngle - Math.PI / 2;
  }
}



let simpleRoundaboutObCtr = 0;
// A simple merry-go-round.
/**
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class Train extends GrObject {
  constructor(params = {}, track = new CircularTrack()) {
    let group = new T.Group();

    let head_shape = new T.CylinderGeometry(0.6, 0.6, 2, 16);
    let head_material = new T.MeshStandardMaterial({
      color: "red",
    });
    let head = new T.Mesh(head_shape, head_material);
    head.translateY(0.6);
    head.rotateX(Math.PI / 2);
    group.add(head);

    let body_shape = new T.BoxBufferGeometry(1.5, 1.5, 1.5);
    let body = new T.Mesh(body_shape, head_material);
    body.translateZ(1.75);
    body.translateY(0.8);
    group.add(body);

    let wheel_shape = new T.CylinderGeometry(0.3, 0.3, 1.2, 16);
    let wheel_shape_large = new T.CylinderGeometry(0.5, 0.5, 1.6, 16);
    let wheel_material = new T.MeshStandardMaterial({
      color: "white",
    });
    let wheel1 = new T.Mesh(wheel_shape, wheel_material);
    let wheel2 = new T.Mesh(wheel_shape, wheel_material);
    let wheel3 = new T.Mesh(wheel_shape, wheel_material);
    let wheel4 = new T.Mesh(wheel_shape_large, wheel_material);
    let smoke = new T.Mesh(wheel_shape, wheel_material);

    wheel1.translateZ(0.35);
    wheel1.rotateZ(Math.PI / 2);
    head.add(wheel1);

    wheel2.translateZ(0.35);
    wheel2.translateY(0.7);
    wheel2.rotateZ(Math.PI / 2);
    head.add(wheel2);

    wheel3.translateZ(0.35);
    wheel3.translateY(-0.7);
    wheel3.rotateZ(Math.PI / 2);
    head.add(wheel3);

    wheel4.rotateZ(Math.PI / 2);
    wheel4.translateX(-0.3);
    body.add(wheel4);

    smoke.rotateX(Math.PI / 2);
    smoke.translateZ(0.6);
    head.add(smoke);

    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);
    group.rotateY(90);

    super("Red Train", group);
    this.track = track;
    this.u = 0;
    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(0.5);
    this.ridePoint.rotateY(Math.PI);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;
  }
  tick(delta, timeOfDay) {
    this.u -= delta / 2000;
    let pos = this.track.eval(this.u);
    this.objects[0].position.set(pos[0], pos[1], pos[2]);
    let dir = this.track.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = zAngle - Math.PI / 2;
  }
}

export class Track extends GrObject {
  constructor(params = {}) {
    let group = new T.Group();
    let points = [                               // example curve with 4 points (need to use Vector3 for each)
      new T.Vector3(-4, 3, 7),
      new T.Vector3(-2, 10, 4),
      new T.Vector3(-5, 2, 10),
      new T.Vector3(-10, 8, 3),
      new T.Vector3(-5, 1, 3),
      new T.Vector3(-5, 7, 6),
    ];
    // let allPoints = [
    //   [-4, 3, 7], [-2, 10, 4], [-5, 2, -10], [-14, 8, 3], [-5, 1, 3], [-5, 7, 6]
    // ];
    let curve = new T.CatmullRomCurve3(points, true, "catmullrom", 2);      // true refers to if the path is closed, 0.5 is tension (change as desired)
    let curve_length = Math.round(curve.getLength());                         // need this for geometry
    let curve_geometry = new T.TubeBufferGeometry(curve, curve_length, 0.2);  // make tube from curve, 0.1 is radius (change as desired)
    let track = new T.Mesh(curve_geometry, new MeshStandardMaterial({ color: "green" }));
    group.add(track);
    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);

    super("Track", group);

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.z = params.z || 0;
    this.curve = curve;
    // this.allPoints = allPoints;

    // set up all points derivative
    // let tension = 2;
    // for (let i = 0; i < this.allPoints.length; i++) {
    //   let p0 = this.allPoints[i];
    //   let pprev = this.allPoints[i > 0 ? (i - 1) % this.allPoints.length : (this.allPoints.length - 1)];
    //   let p1 = this.allPoints[(i + 1) % this.allPoints.length];
    //   let p0prime = [(p1[0] - pprev[0]) / tension, (p1[1] - pprev[1]) / tension, (p1[2] - pprev[2]) / tension];
    //   this.allPoints[i].push(p0prime[0], p0prime[1], p0prime[2]);
    // }
  }
  eval(u) {
    let p = this.curve.getPointAt(u % 1);
    //let p = this.curve.getPoint(u % 1);
    return [p.x, p.y, p.z];
  }
  tangent(u) {
    //let p = this.curve.getTangent(u % 1);
    let p = this.curve.getTangentAt(u % 1);
    return [p.x, p.y, p.z];
  }
  // eval(param) {
  //   let intPart = Math.floor(param);
  //   let u = param - intPart;
  //   let p0 = this.allPoints[intPart % this.allPoints.length];
  //   let p1 = this.allPoints[(intPart + 1) % this.allPoints.length];
  //   let posx = (1 - 3 * u * u + 2 * u * u * u) * p0[0] + (u - 2 * u * u + u * u * u) * p0[3] + (3 * u * u - 2 * u * u * u) * p1[0] + ((-1) * u * u + u * u * u) * p1[3];
  //   let posy = (1 - 3 * u * u + 2 * u * u * u) * p0[1] + (u - 2 * u * u + u * u * u) * p0[4] + (3 * u * u - 2 * u * u * u) * p1[1] + ((-1) * u * u + u * u * u) * p1[4];
  //   let posz = (1 - 3 * u * u + 2 * u * u * u) * p0[2] + (u - 2 * u * u + u * u * u) * p0[5] + (3 * u * u - 2 * u * u * u) * p1[2] + ((-1) * u * u + u * u * u) * p1[5];
  //   // console.log(posx);
  //   // console.log(posy);
  //   // console.log(posz);
  //   return [posx, posy, posz];
  // }
  // tangent(param) {
  //   let intPart = Math.floor(param);
  //   let u = param - intPart;
  //   let p0 = this.allPoints[intPart % this.allPoints.length];
  //   let p1 = this.allPoints[(intPart + 1) % this.allPoints.length];
  //   let vx = (-6 * u + 6 * u * u) * p0[0] + (1 - 4 * u + 3 * u * u) * p0[3] + (6 * u - 6 * u * u) * p1[0] + (-2 * u + 3 * u * u) * p1[3];
  //   let vy = (-6 * u + 6 * u * u) * p0[1] + (1 - 4 * u + 3 * u * u) * p0[4] + (6 * u - 6 * u * u) * p1[1] + (-2 * u + 3 * u * u) * p1[4];
  //   let vz = (-6 * u + 6 * u * u) * p0[2] + (1 - 4 * u + 3 * u * u) * p0[5] + (6 * u - 6 * u * u) * p1[2] + (-2 * u + 3 * u * u) * p1[5];
  //   return [vx, vy, vz];
  // }
}


// A simple merry-go-round.
/**
 * @typedef SimpleRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class WoodTrain extends GrObject {
  constructor(params = {}, track = new Track()) {
    let group = new T.Group();

    let head_shape = new T.CylinderGeometry(0.6, 0.6, 2, 16);
    let head_material = new T.MeshStandardMaterial({
      color: "#6B3313",
    });
    let head = new T.Mesh(head_shape, head_material);
    head.translateY(0.6);
    head.rotateX(Math.PI / 2);
    group.add(head);

    let body_shape = new T.BoxBufferGeometry(1.5, 1.5, 1.5);
    let body = new T.Mesh(body_shape, head_material);
    body.translateZ(1.75);
    body.translateY(0.8);
    group.add(body);

    let wheel_shape = new T.CylinderGeometry(0.3, 0.3, 1.2, 16);
    let wheel_shape_large = new T.CylinderGeometry(0.5, 0.5, 1.6, 16);
    let wheel_material = new T.MeshStandardMaterial({
      color: "#FEA400",
    });
    let wheel1 = new T.Mesh(wheel_shape, wheel_material);
    let wheel2 = new T.Mesh(wheel_shape, wheel_material);
    let wheel3 = new T.Mesh(wheel_shape, wheel_material);
    let wheel4 = new T.Mesh(wheel_shape_large, wheel_material);
    let smoke = new T.Mesh(wheel_shape, wheel_material);

    wheel1.translateZ(0.35);
    wheel1.rotateZ(Math.PI / 2);
    head.add(wheel1);

    wheel2.translateZ(0.35);
    wheel2.translateY(0.7);
    wheel2.rotateZ(Math.PI / 2);
    head.add(wheel2);

    wheel3.translateZ(0.35);
    wheel3.translateY(-0.7);
    wheel3.rotateZ(Math.PI / 2);
    head.add(wheel3);

    wheel4.rotateZ(Math.PI / 2);
    wheel4.translateX(-0.3);
    body.add(wheel4);

    smoke.rotateX(Math.PI / 2);
    smoke.translateZ(0.6);
    head.add(smoke);

    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);
    group.rotateY(90);

    super("Roller Coaster", group);
    this.track = track;
    this.u = 0;
    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(0.5);
    this.ridePoint.rotateY(Math.PI);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;
  }
  tick(delta, timeOfDay) {
    // position
    this.u += delta / 2000;
    let pos = this.track.eval(this.u);
    this.objects[0].position.set(pos[0], pos[1], pos[2]);
    // direction
    let dir = this.track.tangent(this.u);
    // let zAngle = Math.atan2(dir[2], dir[0]);
    // this.objects[0].rotation.y = zAngle - Math.PI / 2;
    this.objects[0].lookAt(pos[0] - dir[0], pos[1] - dir[1], pos[2] - dir[2]);
  }
}
