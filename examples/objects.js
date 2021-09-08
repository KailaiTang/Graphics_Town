import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-THREE/examples/jsm/loaders/OBJLoader.js";
import { SphereBufferGeometry, DoubleSide } from "../libs/CS559-THREE/build/three.module.js";
//import { OBJLoader } from "../libs/THREE/examples/jsm/loaders/OBJLoader.js";
// import * as Loaders from "../libs/CS559-Framework/loaders.js";

export class Torus extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        let coneShape = new T.TorusKnotBufferGeometry(4);
        let material = new T.MeshStandardMaterial({ color: "green" });
        let cone = new T.Mesh(coneShape, material);
        group.add(cone);

        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);
        group.rotateX(Math.PI / 2);

        super("Cone", group);
    }
}

export class Hint extends GrObject {
    constructor(params = {}) {
        let group = new T.Group;
        let hintGeometry = new T.PlaneBufferGeometry(3, 3);
        let hintMaterial = new T.MeshStandardMaterial({ map: new T.TextureLoader().load("../images/maze.jpg"), side: DoubleSide })
        let hint = new T.Mesh(hintGeometry, hintMaterial);
        group.add(hint);
        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);
        super("Hint", group);
        this.tick = function (delta, timeOfDay) {
            this.objects[0].rotateY(0.005 * delta);
        };
    }
}

export class Tree extends GrObject {
    constructor(params = {}) {
        let group = new T.Group;
        // bark
        let barkShape = new T.CylinderBufferGeometry(0.2, 0.2, 1);
        let bark = new T.Mesh(barkShape, new T.MeshBasicMaterial({ color: "orange" }));
        bark.translateY(0.5);
        group.add(bark);
        // leaf
        let leafShape = new SphereBufferGeometry(0.5)
        let leaf = new T.Mesh(leafShape, new T.MeshBasicMaterial({ color: "#08530F" }));
        leaf.translateY(1.2);
        group.add(leaf);

        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);

        super("Tree", group);
    }
}

export class Tree2 extends GrObject {
    constructor(params = {}) {
        let group = new T.Group;
        // bark
        let barkShape = new T.CylinderBufferGeometry(0.2, 0.2, 1);
        let bark = new T.Mesh(barkShape, new T.MeshBasicMaterial({ color: "#3A1704" }));
        bark.translateY(0.5);
        group.add(bark);
        // leaf
        let leafShape = new SphereBufferGeometry(0.5)
        let leaf = new T.Mesh(leafShape, new T.MeshBasicMaterial({ color: "#14CB26" }));
        leaf.translateY(1.2);
        group.add(leaf);

        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);

        super("Tree", group);
    }
}


export class GrowingTree extends GrObject {
    constructor(params = {}) {
        let group = new T.Group;
        // bark
        let barkShape = new T.CylinderBufferGeometry(0.2, 0.2, 1);
        let bark = new T.Mesh(barkShape, new T.MeshBasicMaterial({ color: "orange" }));
        bark.translateY(0.5);
        group.add(bark);
        // leaf
        let leafShape = new SphereBufferGeometry(0.5)
        let leaf = new T.Mesh(leafShape, new T.MeshBasicMaterial({ color: "#08530F" }));
        leaf.translateY(1.2);
        group.add(leaf);

        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);

        super("GrowingTree", group);
    }
}


let speed = 10;
let simpleRoundaboutObCtr = 0;
// A simple merry-go-round.
/**
 * @typedef SimpleRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSimpleRoundabout extends GrObject {
    /**
     * @param {SimpleRoundaboutProperties} params
     */
    constructor(params = {}) {
        let simpleRoundabout = new T.Group();
        let platform_geom = new T.CylinderGeometry(params.size, 1.8, 0.3, 8, 4);
        let platform_mat = new T.MeshStandardMaterial({
            color: "blue",
            metalness: 0.3,
            roughness: 0.6
        });

        let platform_group = new T.Group();
        simpleRoundabout.add(platform_group);
        platform_group.translateY(0.25);
        let platform = new T.Mesh(platform_geom, platform_mat);
        platform_group.add(platform);

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        super(`SimpleRoundabout-${simpleRoundaboutObCtr++}`, simpleRoundabout);
        this.whole_ob = simpleRoundabout;
        this.platform = platform_group;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        simpleRoundabout.scale.set(scale, scale, scale);

        this.tick = function (delta, timeOfDay) {
            this.platform.rotateY(0.005 * delta);
        };
    }
}

let roundaboutObCtr = 0;
// A colorful merry-go-round, with handles and differently-colored sections.
/**
 * @typedef ColoredRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrColoredRoundabout extends GrObject {
    /**
     * @param {ColoredRoundaboutProperties} params
     */
    constructor(params = {}) {
        let roundabout = new T.Group();

        let base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
        let base_mat = new T.MeshStandardMaterial({
            color: "#888888",
            metalness: 0.5,
            roughness: 0.8
        });
        let base = new T.Mesh(base_geom, base_mat);
        base.translateY(0.25);
        roundabout.add(base);

        let platform_group = new T.Group();
        base.add(platform_group);
        platform_group.translateY(0.25);

        let section_geom = new T.CylinderGeometry(
            2,
            1.8,
            0.3,
            8,
            4,
            false,
            0,
            Math.PI / 2
        );
        let section_mat;
        let section;

        let handle_geom = buildHandle();
        let handle_mat = new T.MeshStandardMaterial({
            color: "#999999",
            metalness: 0.8,
            roughness: 0.2
        });
        let handle;

        // in the loop below, we add four differently-colored sections, with handles,
        // all as part of the platform group.
        let section_colors = ["red", "blue", "yellow", "green"];
        for (let i = 0; i < section_colors.length; i++) {
            section_mat = new T.MeshStandardMaterial({
                color: section_colors[i],
                metalness: 0.3,
                roughness: 0.6
            });
            section = new T.Mesh(section_geom, section_mat);
            handle = new T.Mesh(handle_geom, handle_mat);
            section.add(handle);
            handle.rotation.set(0, Math.PI / 4, 0);
            handle.translateZ(1.5);
            platform_group.add(section);
            section.rotateY((i * Math.PI) / 2);
        }

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        super(`Roundabout-${roundaboutObCtr++}`, roundabout);
        this.whole_ob = roundabout;
        this.platform = platform_group;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        roundabout.scale.set(scale, scale, scale);

        this.tick = function (delta, timeOfDay) {
            this.platform.rotateY(0.005 * delta);
        };

        // This helper function defines a curve for the merry-go-round's handles,
        // then extrudes a tube along the curve to make the actual handle geometry.
        function buildHandle() {
            /**@type THREE.CurvePath */
            let handle_curve = new T.CurvePath();
            handle_curve.add(
                new T.LineCurve3(new T.Vector3(-0.5, 0, 0), new T.Vector3(-0.5, 0.8, 0))
            );
            handle_curve.add(
                new T.CubicBezierCurve3(
                    new T.Vector3(-0.5, 0.8, 0),
                    new T.Vector3(-0.5, 1, 0),
                    new T.Vector3(0.5, 1, 0),
                    new T.Vector3(0.5, 0.8, 0)
                )
            );
            handle_curve.add(
                new T.LineCurve3(new T.Vector3(0.5, 0.8, 0), new T.Vector3(0.5, 0, 0))
            );
            return new T.TubeGeometry(handle_curve, 64, 0.1, 8);
        }
    }
}

let simpleSwingObCtr = 0;

// A basic, one-seat swingset.
/**
 * @typedef SimpleSwingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSimpleSwing extends GrObject {
    /**
     * @param {SimpleSwingProperties} params
     */
    constructor(params = {}) {
        let simpleSwing = new T.Group();
        addPosts(simpleSwing);

        // Here, we create a "hanger" group, which the swing chains will hang from.
        // The "chains" for the simple swing are just a couple thin cylinders.
        let hanger = new T.Group();
        simpleSwing.add(hanger);
        hanger.translateY(1.8);
        let chain_geom = new T.CylinderGeometry(0.05, 0.05, 1.4);
        let chain_mat = new T.MeshStandardMaterial({
            color: "#777777",
            metalness: 0.8,
            roughness: 0.2
        });
        let l_chain = new T.Mesh(chain_geom, chain_mat);
        let r_chain = new T.Mesh(chain_geom, chain_mat);
        hanger.add(l_chain);
        hanger.add(r_chain);
        l_chain.translateY(-0.75);
        l_chain.translateZ(0.4);
        r_chain.translateY(-0.75);
        r_chain.translateZ(-0.4);

        let seat_group = new T.Group();
        let seat_geom = new T.CubeGeometry(0.4, 0.1, 1);
        let seat_mat = new T.MeshStandardMaterial({
            color: "#554433",
            metalness: 0.1,
            roughness: 0.6
        });
        let seat = new T.Mesh(seat_geom, seat_mat);
        seat_group.add(seat);
        seat_group.position.set(0, -1.45, 0);
        hanger.add(seat_group);

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        super(`SimpleSwing-${simpleSwingObCtr++}`, simpleSwing);
        this.whole_ob = simpleSwing;
        this.hanger = hanger;
        this.seat = seat_group;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        simpleSwing.scale.set(scale, scale, scale);

        this.swing_max_rotation = Math.PI / 4;
        this.swing_direction = 1;
        this.tick = function (delta, timeOfDay) {
            // if we swing too far forward or too far backward, switch directions.
            if (this.hanger.rotation.z >= this.swing_max_rotation)
                this.swing_direction = -1;
            else if (this.hanger.rotation.z <= -this.swing_max_rotation)
                this.swing_direction = 1;
            this.hanger.rotation.z += this.swing_direction * 0.003 * delta;
        };

        // This helper function creates the 5 posts for a swingset frame,
        // and positions them appropriately.
        function addPosts(group) {
            let post_material = new T.MeshStandardMaterial({
                color: "red",
                metalness: 0.6,
                roughness: 0.5
            });
            let post_geom = new T.CylinderGeometry(0.1, 0.1, 2, 16);
            let flPost = new T.Mesh(post_geom, post_material);
            group.add(flPost);
            flPost.position.set(0.4, 0.9, 0.9);
            flPost.rotateZ(Math.PI / 8);
            let blPost = new T.Mesh(post_geom, post_material);
            group.add(blPost);
            blPost.position.set(-0.4, 0.9, 0.9);
            blPost.rotateZ(-Math.PI / 8);
            let frPost = new T.Mesh(post_geom, post_material);
            group.add(frPost);
            frPost.position.set(0.4, 0.9, -0.9);
            frPost.rotateZ(Math.PI / 8);
            let brPost = new T.Mesh(post_geom, post_material);
            group.add(brPost);
            brPost.position.set(-0.4, 0.9, -0.9);
            brPost.rotateZ(-Math.PI / 8);
            let topPost = new T.Mesh(post_geom, post_material);
            group.add(topPost);
            topPost.position.set(0, 1.8, 0);
            topPost.rotateX(-Math.PI / 2);
        }
    }

}

let swingObCtr = 0;

// A more complicated, one-seat swingset.
// This one has actual chain links for its chains,
// and uses a nicer animation to give a more physically-plausible motion.
/**
 * @typedef AdvancedSwingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrAdvancedSwing extends GrObject {
    /**
     * @param {AdvancedSwingProperties} params
     */
    constructor(params = {}) {
        let swing = new T.Group();
        addPosts(swing);

        let hanger = new T.Group();
        swing.add(hanger);
        hanger.translateY(1.8);
        let l_chain = new T.Group();
        let r_chain = new T.Group();
        hanger.add(l_chain);
        hanger.add(r_chain);
        // after creating chain groups, call the function to add chain links.
        growChain(l_chain, 20);
        growChain(r_chain, 20);
        l_chain.translateZ(0.4);
        r_chain.translateZ(-0.4);

        let seat_group = new T.Group();
        let seat_geom = new T.CubeGeometry(0.4, 0.1, 1);
        let seat_mat = new T.MeshStandardMaterial({
            color: "#554433",
            metalness: 0.1,
            roughness: 0.6
        });
        let seat = new T.Mesh(seat_geom, seat_mat);
        seat_group.add(seat);
        seat_group.position.set(0, -1.45, 0);
        hanger.add(seat_group);

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        super(`Swing-${swingObCtr++}`, swing);
        this.whole_ob = swing;
        this.hanger = hanger;
        this.seat = seat_group;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        swing.scale.set(scale, scale, scale);

        this.swing_angle = 0;
        this.tick = function (delta, timeOfDay) {
            // in this animation, use the sine of the accumulated angle to set current rotation.
            // This means the swing moves faster as it reaches the bottom of a swing,
            // and faster at either end of the swing, like a pendulum should.
            this.swing_angle += 0.005 * delta;
            this.hanger.rotation.z = (Math.sin(this.swing_angle) * Math.PI) / 4;
            this.seat.rotation.z = (Math.sin(this.swing_angle) * Math.PI) / 16;
        };

        // This helper function creates the 5 posts for a swingset frame,
        // and positions them appropriately.
        function addPosts(group) {
            let post_material = new T.MeshStandardMaterial({
                color: "red",
                metalness: 0.6,
                roughness: 0.5
            });
            let post_geom = new T.CylinderGeometry(0.1, 0.1, 2, 16);
            let flPost = new T.Mesh(post_geom, post_material);
            group.add(flPost);
            flPost.position.set(0.4, 0.9, 0.9);
            flPost.rotateZ(Math.PI / 8);
            let blPost = new T.Mesh(post_geom, post_material);
            group.add(blPost);
            blPost.position.set(-0.4, 0.9, 0.9);
            blPost.rotateZ(-Math.PI / 8);
            let frPost = new T.Mesh(post_geom, post_material);
            group.add(frPost);
            frPost.position.set(0.4, 0.9, -0.9);
            frPost.rotateZ(Math.PI / 8);
            let brPost = new T.Mesh(post_geom, post_material);
            group.add(brPost);
            brPost.position.set(-0.4, 0.9, -0.9);
            brPost.rotateZ(-Math.PI / 8);
            let topPost = new T.Mesh(post_geom, post_material);
            group.add(topPost);
            topPost.position.set(0, 1.8, 0);
            topPost.rotateX(-Math.PI / 2);
        }

        // Helper function to add "length" number of links to a chain.
        function growChain(group, length) {
            let chain_geom = new T.TorusGeometry(0.05, 0.015);
            let chain_mat = new T.MeshStandardMaterial({
                color: "#777777",
                metalness: 0.8,
                roughness: 0.2
            });
            let link = new T.Mesh(chain_geom, chain_mat);
            group.add(link);
            for (let i = 0; i < length; i++) {
                let l_next = new T.Mesh(chain_geom, chain_mat);
                l_next.translateY(-0.07);
                link.add(l_next);
                l_next.rotation.set(0, Math.PI / 3, 0);
                link = l_next;
            }
        }
    }
}
let carouselObCtr = 0;

// A Carousel.
/**
 * @typedef CarouselProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCarousel extends GrObject {
    /**
     * @param {CarouselProperties} params
     */
    constructor(params = {}) {
        let width = 3;
        let carousel = new T.Group();

        let base_geom = new T.CylinderGeometry(width, width, 1, 32);
        let base_mat = new T.MeshStandardMaterial({
            color: "lightblue",
            metalness: 0.3,
            roughness: 0.8
        });
        let base = new T.Mesh(base_geom, base_mat);
        base.translateY(0.5);
        carousel.add(base);

        let platform_group = new T.Group();
        base.add(platform_group);
        platform_group.translateY(0.5);

        let platform_geom = new T.CylinderGeometry(
            0.95 * width,
            0.95 * width,
            0.2,
            32
        );
        let platform_mat = new T.MeshStandardMaterial({
            color: "gold",
            metalness: 0.3,
            roughness: 0.8
        });
        let platform = new T.Mesh(platform_geom, platform_mat);
        platform_group.add(platform);

        let cpole_geom = new T.CylinderGeometry(0.3 * width, 0.3 * width, 3, 16);
        let cpole_mat = new T.MeshStandardMaterial({
            color: "gold",
            metalness: 0.8,
            roughness: 0.5
        });
        let cpole = new T.Mesh(cpole_geom, cpole_mat);
        platform_group.add(cpole);
        cpole.translateY(1.5);

        let top_trim = new T.Mesh(platform_geom, platform_mat);
        platform_group.add(top_trim);
        top_trim.translateY(3);

        let opole_geom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 3, 16);
        let opole_mat = new T.MeshStandardMaterial({
            color: "#aaaaaa",
            metalness: 0.8,
            roughness: 0.5
        });

        let opole;
        let boxShape = new T.BoxGeometry(0.5, 0.5, 0.5);
        let sphereShape = new T.SphereGeometry(0.75);
        let horse;
        let horses = [];
        let num_poles = 10;
        let poles = [];

        let roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
        let roof = new T.Mesh(roof_geom, base_mat);
        carousel.add(roof);
        roof.translateY(4.8);

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        super(`Carousel-${carouselObCtr++}`, carousel);
        this.whole_ob = carousel;
        this.platform = platform;
        this.poles = poles;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        carousel.scale.set(scale, scale, scale);

        // create a advance function
        this.tick = function (delta, timeOfDay) {
            carousel.rotateY(0.002 * delta);
            for (let i = 0; i < horses.length; i++) {
                // if too up, make the direction down
                if (horses[i][0].position.y > 0.8 && horses[i][1] == 1) {
                    horses[i][1] = -1;
                }
                // if too down, make the direction up
                if (horses[i][0].position.y < -0.8 && horses[i][1] == -1) {
                    horses[i][1] = 1;
                }
                horses[i][0].position.y += horses[i][1] * delta * 0.005;
            }
        };

        for (let i = 0; i < num_poles; i++) {
            opole = new T.Mesh(opole_geom, opole_mat);
            if (i == 2 || i == 6) {
                horse = new T.Mesh(boxShape, new T.MeshStandardMaterial({ color: "red" }));
            } else if (i == 4 || i == 8) {
                horse = new T.Mesh(boxShape, new T.MeshStandardMaterial({ color: "blue" }));
            } else if (i == 5 || i == 0) {
                horse = new T.Mesh(sphereShape, new T.MeshStandardMaterial({ color: "orange" }));
            } else {
                horse = new T.Mesh(boxShape, new T.MeshStandardMaterial({ color: "green" }));
            }
            platform_group.add(opole);
            opole.translateY(1.5);
            opole.rotateY((2 * i * Math.PI) / num_poles);
            opole.translateX(0.8 * width);
            horse.position.y = Math.random() * 1.6 - 0.8;
            let direction = horse.position.y > 0 ? -1 : 1;

            horses.push([horse, direction]);
            opole.add(horse);

            poles.push(opole);
        }

    }
}

export class IceShape extends GrObject {
    constructor(params = {}) {
        let sphereShape = new T.SphereGeometry(0.7, 4, 4);
        let wallL = new T.TextureLoader().load("../images/wall/wall1.jpg");
        let wallMaterial = new T.MeshStandardMaterial({ color: "white", map: wallL, metalness: 0, roughness: 0, emissive: 1000000 });
        let mesh = new T.Mesh(sphereShape, wallMaterial)

        mesh.translateX(params.x || 0);
        mesh.translateY(params.y || 0);
        mesh.translateZ(params.z || 0);
        mesh.rotateY(params.rotateY || 0);
        mesh.rotateX(params.rotateX || 0);
        super("IceShape", mesh);

        this.tick = function (delta, timeOfDay) {
            this.objects[0].rotateY(0.005 * delta);
        };
    }

}

export class Snow extends GrObject {
    constructor(params = {}) {
        // let sphereShape = new T.SphereGeometry(0.7, 4, 4);
        // let wallL = new T.TextureLoader().load("../images/wall/wall1.jpg");
        // let wallMaterial = new T.MeshStandardMaterial({ color: "white", map: wallL, metalness: 0, roughness: 0, emissive: 1000000 });
        // let mesh = new T.Mesh(sphereShape, wallMaterial)
        let group = new T.Group();
        // snow
        let step = 1.25;
        let snowSphere = new T.SphereBufferGeometry(0.08, 20, 20);
        // for (let i = -10; i < 10; i += step) {
        //     for (let j = -10; j < 15; j += step) {
        //         for (let k = -30; k < 12; k += 2 * step) {
        for (let i = 0; i < 12; i += step) {
            for (let j = 0; j < 8; j += step) {
                for (let k = 0; k < 12; k += step) {
                    let snow = new T.Mesh(snowSphere, new T.MeshStandardMaterial({ color: "#CCFFFF" }));
                    snow.position.x = i + Math.random() * 1.5 - 0.75;
                    snow.position.y = j + Math.random() * 1.5 - 0.75;
                    snow.position.z = k + Math.random() * 1.5 - 0.75;
                    group.add(snow);
                }
            }
        }
        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);
        super("Snow", group);
    }

}


// define a class of Dice here - it should be a subclass of GrObject
export class Dice extends GrObject {
    constructor(params = {}) {
        let geometry = new T.Geometry();
        // 8 vertices
        geometry.vertices.push(new T.Vector3(0, 0, 0));
        geometry.vertices.push(new T.Vector3(1, 0, 0));
        geometry.vertices.push(new T.Vector3(1, 1, 0));
        geometry.vertices.push(new T.Vector3(0, 1, 0));
        geometry.vertices.push(new T.Vector3(0, 0, 1));
        geometry.vertices.push(new T.Vector3(1, 0, 1));
        geometry.vertices.push(new T.Vector3(1, 1, 1));
        geometry.vertices.push(new T.Vector3(0, 1, 1));

        // 12 faces
        let f1 = new T.Face3(0, 2, 1);
        let f2 = new T.Face3(0, 3, 2);
        let f3 = new T.Face3(0, 7, 3);
        let f4 = new T.Face3(0, 4, 7);
        let f5 = new T.Face3(0, 1, 5);
        let f6 = new T.Face3(0, 5, 4);
        let f7 = new T.Face3(6, 2, 3);
        let f8 = new T.Face3(6, 3, 7);
        let f9 = new T.Face3(6, 1, 2);
        let f10 = new T.Face3(6, 5, 1);
        let f11 = new T.Face3(6, 4, 5);
        let f12 = new T.Face3(6, 7, 4);

        geometry.faces.push(f1);
        geometry.faces.push(f2);
        geometry.faces.push(f3);
        geometry.faces.push(f4);
        geometry.faces.push(f5);
        geometry.faces.push(f6);
        geometry.faces.push(f7);
        geometry.faces.push(f8);
        geometry.faces.push(f9);
        geometry.faces.push(f10);
        geometry.faces.push(f11);
        geometry.faces.push(f12);

        geometry.faceVertexUvs = [[]];
        // 1
        geometry.faceVertexUvs[0].push([ // face 1: 0, 2, 1
            new T.Vector2(1 / 3, 2 / 3), // F
            new T.Vector2(2 / 3, 1 / 3), // K
            new T.Vector2(1 / 3, 1 / 3), // J
        ]);
        geometry.faceVertexUvs[0].push([ // face 2: 0, 3, 2
            new T.Vector2(1 / 3, 2 / 3), // F
            new T.Vector2(2 / 3, 2 / 3), // G
            new T.Vector2(2 / 3, 1 / 3), // K
            // new T.Vector2(2 / 3, 1 / 3), // K
            // new T.Vector2(2 / 3, 2 / 3), // G
            // new T.Vector2(1 / 3, 2 / 3), // F
        ]);
        // 2
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0, 2 / 3),
            new T.Vector2(1 / 3, 1 / 3),
            new T.Vector2(0, 1 / 3)
        ]);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0, 2 / 3),
            new T.Vector2(1 / 3, 2 / 3),
            new T.Vector2(1 / 3, 1 / 3)
        ]);
        // 5
        geometry.faceVertexUvs[0].push([
            new T.Vector2(1, 1 / 3), // 3 
            new T.Vector2(2 / 3, 1 / 3), // 1
            new T.Vector2(2 / 3, 2 / 3), // 2

        ]);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(1, 1 / 3),
            new T.Vector2(2 / 3, 2 / 3),
            new T.Vector2(1, 2 / 3),
        ]);
        // 6
        geometry.faceVertexUvs[0].push([
            new T.Vector2(1, 0),
            new T.Vector2(2 / 3, 0),
            new T.Vector2(2 / 3, 1 / 3),
        ]);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(1, 0),
            new T.Vector2(2 / 3, 1 / 3),
            new T.Vector2(1, 1 / 3),
        ]);
        // 3
        geometry.faceVertexUvs[0].push([
            new T.Vector2(1 / 3, 1 / 3),
            new T.Vector2(2 / 3, 0),
            new T.Vector2(1 / 3, 0),
        ]);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(1 / 3, 1 / 3),
            new T.Vector2(2 / 3, 1 / 3),
            new T.Vector2(2 / 3, 0),
        ]);
        // 4
        geometry.faceVertexUvs[0].push([
            new T.Vector2(1 / 3, 1),
            new T.Vector2(2 / 3, 2 / 3),
            new T.Vector2(1 / 3, 2 / 3)
        ]);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(1 / 3, 1),
            new T.Vector2(2 / 3, 1),
            new T.Vector2(2 / 3, 2 / 3)
        ]);

        let tl = new T.TextureLoader().load("../images/dice_texture.png");
        let material = new T.MeshBasicMaterial({ map: tl });
        let mesh = new T.Mesh(geometry, material);
        let group = new T.Group();
        group.add(mesh);

        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);

        let rotateStatus = false;
        function operate() {
            let u = performance.now();
            if (rotateStatus && (u / 3000) % 2 < 1) { // previously rotate, change to stationary
                rotateStatus = false;
                group.rotateZ(-Math.PI / 4);
                group.rotateX(Math.PI / 4);
            } else if (!rotateStatus && (u / 3000) % 2 > 1) { // previously stationary, change to rotate
                rotateStatus = true;
                group.rotateX(- Math.PI / 4);
                group.rotateZ(Math.PI / 4);
            } else if (rotateStatus && (u / 3000) % 2 > 1) {
                group.rotateOnAxis(new T.Vector3(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3, 0), 1);
            }
            window.requestAnimationFrame(operate);
        }
        operate();

        // this.tick = function (delta, timeOfDay) {
        //     console.log(delta);
        //     operate();
        // }
        // let rotateStatus = false;
        // function operate(u) {
        //     //console.log(u);
        //     if (rotateStatus && (u / 50) % 2 < 1) { // previously rotate, change to stationary
        //         rotateStatus = false;
        //         group.rotateZ(-Math.PI / 4);
        //         group.rotateX(Math.PI / 4);
        //     } else if (!rotateStatus && (u / 50) % 2 > 1) { // previously stationary, change to rotate
        //         rotateStatus = true;
        //         group.rotateX(- Math.PI / 4);
        //         group.rotateZ(Math.PI / 4);
        //     } else if (rotateStatus && (u / 50) % 2 > 1) {
        //         group.rotateOnAxis(new T.Vector3(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3, 0), 1);
        //     }
        // }
        super("Dice", group);
        // this.tick = function (delta, timeOfDay) {
        //     console.log(delta);
        //     operate(delta);
        // }
    }

}


// export class Astronaut {
//     // objects
//     constructor(params = {}) {

//         // object 2:
//         let group = new T.Group();
//         let loader = new T.OBJLoader();
//         loader.load("objects/astronaut.obj", function (astronaut) {
//             group.add(astronaut);
//             group.position.set(params.x || 0, params.y || 0, params.z || 0);
//             group.scale.set(0.2, 0.2, 0.2);
//             scene.add(group);
//         });

//         group.castShadow = true;
//     }
// }



export class Snowman extends GrObject {
    constructor(params = {}) {

        // let scene = new T.Scene();
        let group = new T.Group();

        // sphere:
        let baseSphere = new T.SphereBufferGeometry(2, 20, 20);
        let bodySphere = new T.SphereBufferGeometry(1.2, 20, 20);
        let headSphere = new T.SphereBufferGeometry(0.8, 20, 20);
        let eyeSphere = new T.SphereBufferGeometry(0.15, 20, 20);
        let noseSphere = new T.SphereBufferGeometry(0.3, 20, 20);
        let snowSphere = new T.SphereBufferGeometry(0.08, 20, 20);
        let buttonSphere = new T.SphereBufferGeometry(0.05, 20, 20);

        let mouseBox = new T.BoxGeometry(0.5, 0.05, 0.3);
        let hatBox = new T.BoxGeometry(1.5, 0.3, 0.5);
        let armBox = new T.BoxGeometry(2, 0.3, 0.3);
        let handBox = new T.BoxGeometry(0.3, 1.2, 0.2);

        // base:
        let base = new T.Mesh(baseSphere, new T.MeshStandardMaterial({ color: "white" }));
        base.position.x = 0.3;
        base.position.y = 0.6;
        group.add(base);

        // body
        let body = new T.Mesh(bodySphere, new T.MeshStandardMaterial({ color: "lightgrey" }));
        body.position.x = 0.3;
        body.position.y = 3.2;
        group.add(body);

        // head
        let head = new T.Mesh(headSphere, new T.MeshStandardMaterial({ color: "white" }));
        head.position.x = 0.3;
        head.position.y = 4.8;
        group.add(head);

        // eyes
        let eyeLeft = new T.Mesh(eyeSphere, new T.MeshStandardMaterial({ color: "purple" }));
        eyeLeft.position.x = 0.20;
        eyeLeft.position.y = 5.2;
        eyeLeft.position.z = 0.7;
        group.add(eyeLeft);
        let eyeRight = new T.Mesh(eyeSphere, new T.MeshStandardMaterial({ color: "purple" }));
        eyeRight.position.x = 0.9;
        eyeRight.position.y = 5.2;
        eyeRight.position.z = 0.6;
        group.add(eyeRight);

        // nose
        let nose = new T.Mesh(noseSphere, new T.MeshStandardMaterial({ color: "red" }));
        nose.position.x = 0.6;
        nose.position.y = 4.8;
        nose.position.z = 0.7;
        group.add(nose);

        // button
        for (let i = 0; i <= 3; i++) {
            let button = new T.Mesh(buttonSphere, new T.MeshStandardMaterial({ color: "blue" }));
            button.position.z = 1.0;
            button.position.x = i % 2 == 0 ? 0.52 : 0.68;
            button.position.y = i < 2 ? 4.72 : 4.88;
            group.add(button);
        }

        // mouse
        let mouse = new T.Mesh(mouseBox, new T.MeshStandardMaterial({ color: "blue" }));
        mouse.position.x = 0.6;
        mouse.position.y = 4.4;
        mouse.position.z = 0.7;
        group.add(mouse);

        // hat
        let hat = new T.Mesh(hatBox, new T.MeshStandardMaterial({ color: "orange" }));
        hat.position.x = 0.3;
        hat.position.y = 5.65;
        hat.position.z = 0;
        group.add(hat);

        // arm
        let arm = new T.Mesh(armBox, new T.MeshStandardMaterial({ color: "brown" }));
        arm.position.x = 1.4;
        arm.position.y = 3.7;
        group.add(arm);

        // hand
        let hand = new T.Mesh(handBox, new T.MeshStandardMaterial({ color: "red" }));
        hand.position.x = 1;
        hand.position.y = 0.6;
        arm.add(hand);

        // function draw() {
        //     hat.rotateY(0.03);
        //     hand.translateY(-0.6);
        //     hand.rotateX(0.7);
        //     hand.translateY(0.6);
        //     window.requestAnimationFrame(draw);
        // }
        // draw();

        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);
        group.rotateY(params.rotateY || 0);

        super("Snowman", group);

        this.hat = hat;
        this.hand = hand;

        this.tick = function (delta, timeOfDay) {
            this.hat.rotateY(0.005 * delta);
            this.hand.translateY(-0.6);
            this.hand.rotateX(0.005 * delta);
            this.hand.translateY(0.6);
        };
    }

};



