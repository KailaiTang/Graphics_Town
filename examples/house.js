/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Houses: adapted from the original C++ Graphics Town
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

function uvTri(u1, v1, u2, v2, u3, v3) {
  return [new T.Vector2(u1, v1), new T.Vector2(u2, v2), new T.Vector2(u3, v3)];
}

export class Cone extends GrObject {
  constructor(params = {}) {
    let group = new T.Group();
    let coneShape = new T.ConeBufferGeometry(3, 16, 100, 100);

    let shaderMat = shaderMaterial("../examples/shader.vs", "../examples/shader.fs", {
      side: T.DoubleSide,
    });

    let cone = new T.Mesh(coneShape, shaderMat);
    group.add(cone);

    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);

    super("Cone", group);
  }
}


/** Global (module) variables for simple Houses */
let simpleHouseCount = 0;
let simpleHouseGeometry; // one geometry for all
let simpleHouseTexture;
let simpleHouseMaterial;

export class SimpleHouse extends GrObject {
  constructor(params = {}) {
    if (!simpleHouseGeometry) {
      let w = 2;
      let h = 2;
      let d = 3;
      let r = 1;
      simpleHouseGeometry = new T.Geometry();
      // front vertices
      simpleHouseGeometry.vertices.push(new T.Vector3(0, 0, 0));
      simpleHouseGeometry.vertices.push(new T.Vector3(w, 0, 0));
      simpleHouseGeometry.vertices.push(new T.Vector3(w, h, 0));
      simpleHouseGeometry.vertices.push(new T.Vector3(0, h, 0));
      simpleHouseGeometry.vertices.push(new T.Vector3(w / 2, h + r, 0));
      // back vertices
      simpleHouseGeometry.vertices.push(new T.Vector3(0, 0, d));
      simpleHouseGeometry.vertices.push(new T.Vector3(w, 0, d));
      simpleHouseGeometry.vertices.push(new T.Vector3(w, h, d));
      simpleHouseGeometry.vertices.push(new T.Vector3(0, h, d));
      simpleHouseGeometry.vertices.push(new T.Vector3(w / 2, h + r, d));
      // front surface
      simpleHouseGeometry.faces.push(new T.Face3(0, 1, 2));
      simpleHouseGeometry.faces.push(new T.Face3(0, 2, 3));
      simpleHouseGeometry.faces.push(new T.Face3(3, 2, 4));
      // back surface
      simpleHouseGeometry.faces.push(new T.Face3(6, 5, 7));
      simpleHouseGeometry.faces.push(new T.Face3(5, 8, 7));
      simpleHouseGeometry.faces.push(new T.Face3(8, 9, 7));
      // right side
      simpleHouseGeometry.faces.push(new T.Face3(1, 6, 2));
      simpleHouseGeometry.faces.push(new T.Face3(6, 7, 2));
      // left side
      simpleHouseGeometry.faces.push(new T.Face3(5, 0, 3));
      simpleHouseGeometry.faces.push(new T.Face3(5, 3, 8));
      // roof
      simpleHouseGeometry.faces.push(new T.Face3(2, 7, 4));
      simpleHouseGeometry.faces.push(new T.Face3(7, 9, 4));
      simpleHouseGeometry.faces.push(new T.Face3(3, 4, 8));
      simpleHouseGeometry.faces.push(new T.Face3(8, 4, 9));
      // texture coords
      let tfaces = [];
      const q = 0.25;
      const f = 0.5;
      tfaces.push(uvTri(0, 0, q, 0, q, q)); // front
      tfaces.push(uvTri(0, 0, q, q, 0, q));
      tfaces.push(uvTri(0, q, q, q, 0, f));

      tfaces.push(uvTri(q, 0, 0, 0, q, q)); // back
      tfaces.push(uvTri(0, 0, 0, q, q, q));
      tfaces.push(uvTri(0, q, q, q, 0, f));

      tfaces.push(uvTri(q, 0, f, 0, q, q));
      tfaces.push(uvTri(f, 0, f, q, q, q));

      tfaces.push(uvTri(f, 0, q, 0, q, q));
      tfaces.push(uvTri(f, 0, q, q, f, q));

      tfaces.push(uvTri(0, f, 1, f, 0, 1));
      tfaces.push(uvTri(1, f, 1, 1, 0, 1));

      tfaces.push(uvTri(0, f, 0, 1, 1, f));
      tfaces.push(uvTri(1, f, 0, 1, 1, 1));
      // now make the normals
      simpleHouseGeometry.computeFaceNormals();
      simpleHouseGeometry.faceVertexUvs = [tfaces];
    }
    if (!simpleHouseTexture) {
      simpleHouseTexture = new T.TextureLoader().load("../examples/house.png");
    }
    if (!simpleHouseMaterial) {
      simpleHouseMaterial = new T.MeshStandardMaterial({
        color: "white",
        map: simpleHouseTexture,
        roughness: 1.0,
        side: T.DoubleSide,
      });
    }
    let mesh = new T.Mesh(simpleHouseGeometry, simpleHouseMaterial);
    mesh.translateX(params.x || 0);
    mesh.translateY(params.y || 0);
    mesh.translateZ(params.z || 0);
    super(`SimpleHouse-${++simpleHouseCount}`, mesh);
  }
}

export class IceHouse extends GrObject {
  constructor(params = {}) {
    let roof = new T.Geometry();
    let wall = new T.Geometry();
    let front = new T.Geometry();
    // 5 vertices for roof: 0, 1, 2, 3, 4
    roof.vertices.push(new T.Vector3(1, 3, 1));
    roof.vertices.push(new T.Vector3(0, 2, 0));
    roof.vertices.push(new T.Vector3(0, 2, 2));
    roof.vertices.push(new T.Vector3(2, 2, 2));
    roof.vertices.push(new T.Vector3(2, 2, 0));
    // 8 vertices for wall: 1, 2, 3, 4, 5, 6, 7, 8
    wall.vertices.push(new T.Vector3(0, 2, 0));
    wall.vertices.push(new T.Vector3(0, 2, 2));
    wall.vertices.push(new T.Vector3(2, 2, 2));
    wall.vertices.push(new T.Vector3(2, 2, 0));
    wall.vertices.push(new T.Vector3(0, 0, 0));
    wall.vertices.push(new T.Vector3(0, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 0));
    // 4 vertices for front: 2, 3, 6, 7
    front.vertices.push(new T.Vector3(0, 2, 2));
    front.vertices.push(new T.Vector3(2, 2, 2));
    front.vertices.push(new T.Vector3(0, 0, 2));
    front.vertices.push(new T.Vector3(2, 0, 2));

    // 3 walls (6 wall faces)
    let f1 = new T.Face3(1, 0, 4);
    let f2 = new T.Face3(1, 4, 5);
    let f3 = new T.Face3(3, 2, 6);
    let f4 = new T.Face3(3, 6, 7);
    let f7 = new T.Face3(0, 3, 7);
    let f8 = new T.Face3(0, 7, 4);

    // 1 front (2 front faces)
    let f5 = new T.Face3(0, 2, 1);
    let f6 = new T.Face3(1, 2, 3);

    // 4 tops (4 top faces)
    let f9 = new T.Face3(0, 1, 2);
    let f10 = new T.Face3(0, 2, 3);
    let f11 = new T.Face3(0, 3, 4);
    let f12 = new T.Face3(0, 4, 1);

    wall.faces.push(f1);
    wall.faces.push(f2);
    wall.faces.push(f3);
    wall.faces.push(f4);
    front.faces.push(f5);
    front.faces.push(f6);
    wall.faces.push(f7);
    wall.faces.push(f8);
    roof.faces.push(f9);
    roof.faces.push(f10);
    roof.faces.push(f11);
    roof.faces.push(f12);

    roof.faceVertexUvs = [[]];
    // f9, f10, f11, f12
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);

    wall.faceVertexUvs = [[]];
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    front.faceVertexUvs = [[]];
    front.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 1),
    ]);
    front.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    let group = new T.Group();

    let roofL = new T.TextureLoader().load("../images/wall/wall1.jpg");
    let roofMaterial = new T.MeshBasicMaterial({ map: roofL });
    let mesh1 = new T.Mesh(roof, roofMaterial);
    group.add(mesh1);

    let wallL = new T.TextureLoader().load("../images/wall/wall1.jpg");
    let wallMaterial = new T.MeshBasicMaterial({ map: wallL });
    let mesh2 = new T.Mesh(wall, wallMaterial);
    group.add(mesh2);

    let frontL = new T.TextureLoader().load("../images/wall/wall_door1.jpg");
    let frontMaterial = new T.MeshBasicMaterial({ map: frontL });
    let mesh3 = new T.Mesh(front, frontMaterial);
    group.add(mesh3);

    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);
    group.rotateY(params.rotateY || 0);

    super("House", group);
  }

}

export class IceSphere extends GrObject {
  constructor(params = {}) {
    let sphereShape = new T.SphereGeometry(4);
    let wallL = new T.TextureLoader().load("../images/wall/wall1.jpg");
    let wallMaterial = new T.MeshStandardMaterial({ map: wallL, metalness: 0, roughness: 0, emissive: 100000 });
    let mesh = new T.Mesh(sphereShape, wallMaterial)

    mesh.translateX(params.x || 0);
    mesh.translateY(params.y || 0);
    mesh.translateZ(params.z || 0);
    super("IceSphere", mesh);
  }
}


export class House extends GrObject {
  constructor(params = {}) {
    let roof = new T.Geometry();
    let wall = new T.Geometry();
    let front = new T.Geometry();
    // 5 vertices for roof: 0, 1, 2, 3, 4
    roof.vertices.push(new T.Vector3(1, 3, 1));
    roof.vertices.push(new T.Vector3(0, 2, 0));
    roof.vertices.push(new T.Vector3(0, 2, 2));
    roof.vertices.push(new T.Vector3(2, 2, 2));
    roof.vertices.push(new T.Vector3(2, 2, 0));
    // 8 vertices for wall: 1, 2, 3, 4, 5, 6, 7, 8
    wall.vertices.push(new T.Vector3(0, 2, 0));
    wall.vertices.push(new T.Vector3(0, 2, 2));
    wall.vertices.push(new T.Vector3(2, 2, 2));
    wall.vertices.push(new T.Vector3(2, 2, 0));
    wall.vertices.push(new T.Vector3(0, 0, 0));
    wall.vertices.push(new T.Vector3(0, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 0));
    // 4 vertices for front: 2, 3, 6, 7
    front.vertices.push(new T.Vector3(0, 2, 2));
    front.vertices.push(new T.Vector3(2, 2, 2));
    front.vertices.push(new T.Vector3(0, 0, 2));
    front.vertices.push(new T.Vector3(2, 0, 2));

    // 3 walls (6 wall faces)
    let f1 = new T.Face3(1, 0, 4);
    let f2 = new T.Face3(1, 4, 5);
    let f3 = new T.Face3(3, 2, 6);
    let f4 = new T.Face3(3, 6, 7);
    let f7 = new T.Face3(0, 3, 7);
    let f8 = new T.Face3(0, 7, 4);

    // 1 front (2 front faces)
    let f5 = new T.Face3(0, 2, 1);
    let f6 = new T.Face3(1, 2, 3);

    // 4 tops (4 top faces)
    let f9 = new T.Face3(0, 1, 2);
    let f10 = new T.Face3(0, 2, 3);
    let f11 = new T.Face3(0, 3, 4);
    let f12 = new T.Face3(0, 4, 1);

    wall.faces.push(f1);
    wall.faces.push(f2);
    wall.faces.push(f3);
    wall.faces.push(f4);
    front.faces.push(f5);
    front.faces.push(f6);
    wall.faces.push(f7);
    wall.faces.push(f8);
    roof.faces.push(f9);
    roof.faces.push(f10);
    roof.faces.push(f11);
    roof.faces.push(f12);

    roof.faceVertexUvs = [[]];
    // f9, f10, f11, f12
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);

    wall.faceVertexUvs = [[]];
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    front.faceVertexUvs = [[]];
    front.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 1),
    ]);
    front.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    let group = new T.Group();

    let roofL = new T.TextureLoader().load("../images/roof/roof1copy.jpg");
    let roofMaterial = new T.MeshBasicMaterial({ map: roofL });
    let mesh1 = new T.Mesh(roof, roofMaterial);
    group.add(mesh1);

    let wallL = new T.TextureLoader().load("../images/wall/wall_window1copy.jpg");
    let wallMaterial = new T.MeshBasicMaterial({ map: wallL });
    let mesh2 = new T.Mesh(wall, wallMaterial);
    group.add(mesh2);

    let frontL = new T.TextureLoader().load("../images/wall/wall_door_window1copy.jpg");
    let frontMaterial = new T.MeshBasicMaterial({ map: frontL });
    let mesh3 = new T.Mesh(front, frontMaterial);
    group.add(mesh3);

    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);

    super("House", group);
  }

}


export class House2 extends GrObject {
  constructor(params = {}) {
    let roof = new T.Geometry();
    let wall = new T.Geometry();
    let front = new T.Geometry();
    // 5 vertices for roof: 0, 1, 2, 3, 4
    roof.vertices.push(new T.Vector3(1, 5, 1));
    roof.vertices.push(new T.Vector3(0, 2, 0));
    roof.vertices.push(new T.Vector3(0, 2, 2));
    roof.vertices.push(new T.Vector3(2, 2, 2));
    roof.vertices.push(new T.Vector3(2, 2, 0));
    // 8 vertices for wall: 1, 2, 3, 4, 5, 6, 7, 8
    wall.vertices.push(new T.Vector3(0, 2, 0));
    wall.vertices.push(new T.Vector3(0, 2, 2));
    wall.vertices.push(new T.Vector3(2, 2, 2));
    wall.vertices.push(new T.Vector3(2, 2, 0));
    wall.vertices.push(new T.Vector3(0, 0, 0));
    wall.vertices.push(new T.Vector3(0, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 0));
    // 4 vertices for front: 2, 3, 6, 7
    front.vertices.push(new T.Vector3(0, 2, 2));
    front.vertices.push(new T.Vector3(2, 2, 2));
    front.vertices.push(new T.Vector3(0, 0, 2));
    front.vertices.push(new T.Vector3(2, 0, 2));

    // 3 walls (6 wall faces)
    let f1 = new T.Face3(1, 0, 4);
    let f2 = new T.Face3(1, 4, 5);
    let f3 = new T.Face3(3, 2, 6);
    let f4 = new T.Face3(3, 6, 7);
    let f7 = new T.Face3(0, 3, 7);
    let f8 = new T.Face3(0, 7, 4);

    // 1 front (2 front faces)
    let f5 = new T.Face3(0, 2, 1);
    let f6 = new T.Face3(1, 2, 3);

    // 4 tops (4 top faces)
    let f9 = new T.Face3(0, 1, 2);
    let f10 = new T.Face3(0, 2, 3);
    let f11 = new T.Face3(0, 3, 4);
    let f12 = new T.Face3(0, 4, 1);

    wall.faces.push(f1);
    wall.faces.push(f2);
    wall.faces.push(f3);
    wall.faces.push(f4);
    front.faces.push(f5);
    front.faces.push(f6);
    wall.faces.push(f7);
    wall.faces.push(f8);
    roof.faces.push(f9);
    roof.faces.push(f10);
    roof.faces.push(f11);
    roof.faces.push(f12);

    roof.faceVertexUvs = [[]];
    // f9, f10, f11, f12
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1),
    ]);

    wall.faceVertexUvs = [[]];
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    front.faceVertexUvs = [[]];
    front.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 1),
    ]);
    front.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    let group = new T.Group();

    let roofL = new T.TextureLoader().load("../images/roof/roof4copy.jpg");
    let roofMaterial = new T.MeshBasicMaterial({ map: roofL });
    let mesh1 = new T.Mesh(roof, roofMaterial);
    group.add(mesh1);

    let wallL = new T.TextureLoader().load("../images/wall/wall3copy.jpg");
    let wallMaterial = new T.MeshBasicMaterial({ map: wallL });
    let mesh2 = new T.Mesh(wall, wallMaterial);
    group.add(mesh2);

    let frontL = new T.TextureLoader().load("../images/wall/wall3copy.jpg");
    let frontMaterial = new T.MeshBasicMaterial({ map: frontL });
    let mesh3 = new T.Mesh(front, frontMaterial);
    group.add(mesh3);

    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);

    super("House2", group);
  }

}


export class Apartment extends GrObject {
  constructor(params = {}) {
    let roof = new T.Geometry();
    let wall = new T.Geometry();

    // vertices
    roof.vertices.push(new T.Vector3(0, 1, 2));
    roof.vertices.push(new T.Vector3(2, 1, 2));
    roof.vertices.push(new T.Vector3(2, 1, 0));
    roof.vertices.push(new T.Vector3(0, 1, 0));
    roof.vertices.push(new T.Vector3(0, 2, 1));
    roof.vertices.push(new T.Vector3(2, 2, 1));

    wall.vertices.push(new T.Vector3(0, 1, 2));
    wall.vertices.push(new T.Vector3(2, 1, 2));
    wall.vertices.push(new T.Vector3(2, 1, 0));
    wall.vertices.push(new T.Vector3(0, 1, 0));
    wall.vertices.push(new T.Vector3(0, 2, 1));
    wall.vertices.push(new T.Vector3(2, 2, 1));

    wall.vertices.push(new T.Vector3(0, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 0));
    wall.vertices.push(new T.Vector3(0, 0, 0));

    // faces
    // roof face
    let f1 = new T.Face3(4, 0, 1);
    let f2 = new T.Face3(4, 1, 5);
    let f3 = new T.Face3(3, 4, 5);
    let f4 = new T.Face3(3, 5, 2);
    roof.faces.push(f1);
    roof.faces.push(f2);
    roof.faces.push(f3);
    roof.faces.push(f4);

    let f5 = new T.Face3(4, 3, 0);
    let f6 = new T.Face3(0, 3, 9);
    let f7 = new T.Face3(0, 9, 6);

    let f8 = new T.Face3(5, 1, 2);
    let f9 = new T.Face3(1, 7, 8);
    let f10 = new T.Face3(1, 8, 2);

    let f11 = new T.Face3(0, 6, 7);
    let f12 = new T.Face3(0, 7, 1);
    let f13 = new T.Face3(2, 8, 9);
    let f14 = new T.Face3(2, 9, 3);
    wall.faces.push(f5);
    wall.faces.push(f6);
    wall.faces.push(f7);
    wall.faces.push(f8);
    wall.faces.push(f9);
    wall.faces.push(f10);
    wall.faces.push(f11);
    wall.faces.push(f12);
    wall.faces.push(f13);
    wall.faces.push(f14);

    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);



    let group = new T.Group();
    let roofL = new T.TextureLoader().load("../images/roof/roof3copy.jpg");
    let roofMaterial = new T.MeshBasicMaterial({ map: roofL });
    let mesh1 = new T.Mesh(roof, roofMaterial);
    group.add(mesh1);

    let wallL = new T.TextureLoader().load("../images/wall/wall2copy.jpg");
    let wallMaterial = new T.MeshBasicMaterial({ map: wallL });
    let mesh2 = new T.Mesh(wall, wallMaterial);
    group.add(mesh2);

    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);

    super("Apartment", group);
  }

}




export class Apartment2 extends GrObject {
  constructor(params = {}) {
    let roof = new T.Geometry();
    let wall = new T.Geometry();

    // vertices
    roof.vertices.push(new T.Vector3(0, 1, 2));
    roof.vertices.push(new T.Vector3(2, 1, 2));
    roof.vertices.push(new T.Vector3(2, 1, 0));
    roof.vertices.push(new T.Vector3(0, 1, 0));
    roof.vertices.push(new T.Vector3(0, 1.5, 1));
    roof.vertices.push(new T.Vector3(2, 1.5, 1));

    wall.vertices.push(new T.Vector3(0, 1, 2));
    wall.vertices.push(new T.Vector3(2, 1, 2));
    wall.vertices.push(new T.Vector3(2, 1, 0));
    wall.vertices.push(new T.Vector3(0, 1, 0));
    wall.vertices.push(new T.Vector3(0, 1.5, 1));
    wall.vertices.push(new T.Vector3(2, 1.5, 1));

    wall.vertices.push(new T.Vector3(0, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 2));
    wall.vertices.push(new T.Vector3(2, 0, 0));
    wall.vertices.push(new T.Vector3(0, 0, 0));

    // faces
    // roof face
    let f1 = new T.Face3(4, 0, 1);
    let f2 = new T.Face3(4, 1, 5);
    let f3 = new T.Face3(3, 4, 5);
    let f4 = new T.Face3(3, 5, 2);
    roof.faces.push(f1);
    roof.faces.push(f2);
    roof.faces.push(f3);
    roof.faces.push(f4);

    let f5 = new T.Face3(4, 3, 0);
    let f6 = new T.Face3(0, 3, 9);
    let f7 = new T.Face3(0, 9, 6);

    let f8 = new T.Face3(5, 1, 2);
    let f9 = new T.Face3(1, 7, 8);
    let f10 = new T.Face3(1, 8, 2);

    let f11 = new T.Face3(0, 6, 7);
    let f12 = new T.Face3(0, 7, 1);
    let f13 = new T.Face3(2, 8, 9);
    let f14 = new T.Face3(2, 9, 3);
    wall.faces.push(f5);
    wall.faces.push(f6);
    wall.faces.push(f7);
    wall.faces.push(f8);
    wall.faces.push(f9);
    wall.faces.push(f10);
    wall.faces.push(f11);
    wall.faces.push(f12);
    wall.faces.push(f13);
    wall.faces.push(f14);

    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    roof.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(1, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    wall.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);



    let group = new T.Group();
    let roofL = new T.TextureLoader().load("../images/roof/roof2copy.jpg");
    let roofMaterial = new T.MeshBasicMaterial({ map: roofL });
    let mesh1 = new T.Mesh(roof, roofMaterial);
    group.add(mesh1);

    let wallL = new T.TextureLoader().load("../images/wall/wall1copy.jpg");
    let wallMaterial = new T.MeshBasicMaterial({ map: wallL });
    let mesh2 = new T.Mesh(wall, wallMaterial);
    group.add(mesh2);

    group.translateX(params.x || 0);
    group.translateY(params.y || 0);
    group.translateZ(params.z || 0);

    super("Apartment2", group);
  }

}

