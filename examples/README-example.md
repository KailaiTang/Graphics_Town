# README.md file for Workbook 12

**note:** in some cases, this doesn't acurately describe the example solution

Note: filling out this file is extremely important. If you don't describe your assignment here, we may not be able to give you points for things.

- ** Name: ** Examples
- ** GitHub ID: ** gleicher
- ** WiscID: ** mlgleicher

See README-example.md in the examples directory for ideas on what we are looking for.

## Artist Statement

Describe what you were trying to make:

This was just a simple example of places objects into the scene for testing, there was no attempt to make it anything like a town. It would not get any "artistic merit" points.

## Straightforward Checks

Please list how your assignment fills the requirements. In cases where you have more than the requirements (e.g., 2,3,5,6) just list the most interesting ones. A short description (a few words) is probably sufficient. Leave blank or say "N/A" for things you didn't do.

Note: the other checks we can see easily.

2. 2 different kinds of objects that you made (just list 2)
    1. The houses
    2. The helicopter

3.  5 different kinds of objects beyond #2. (just list 5)
    1. The reflective sphere
    2. Racing Cube (it's a simple cube with a behavior)
    3. The race car
    4. The helipads
    5. The race track

5. 3 different behaviors. (just list 3)
    1. Helicopter flies, lands at a helipad, takes off, chooses a destination and flies there.
    2. Cars and cubes drives around the track.
    3. The morphing blob

6. At least 3 objects must be "rideable"
    1. Helicopter (although, often it is looking into space)
    2. Cars and Cubes (the have the same behavior)
    3.

7. "train track" with a "train" (tell us how we know its a spline)
    1. (not in example) The roller coaster follows a curvy path that is too complicated to just be a circle.

8. One object from each category
    - buildings: the house
    - natural elements: (not in the example) A Tree
    - vehicles: the race car

9. There is at least one model loaded from a file. (e.g. loading a `.obj` or `.fbx` file)
    1. the race car

10. There is at least one shader that you wrote.
    - what object is it on: (not in the example) the airplane
    - describe: (not in the example) the shader combines two textures to put a decal on the plane
    - filename: plane.fs plane.vs

12. SkyBox or some other texture (list one - and say why you didn't have skybox if you don't have one)
    1. I wanted the example objects to be a table in an empty void, so no skybox. There are textures on the house and morphing blob.

## Complexity Points

Describe each thing that you did that you think is worth complexity points.

If possible, order them from most interesting to least interesting.

Describe what the thing is, where we can see it, and why it deserves complexity points.

Note: put "####" (4 hash marks) and number the complex things to make it easier for us to identify them.

#### Complex Thing 1:

Complex Behavior: flying helicopter. The Helicopter lifts off from a helipad, chooses a helipad (at random) to fly to, turns in that direction, flies to its destination, lands, and waits a bit. It is implemented with a state machine.

#### Complex Thing 2:

Morphing: The blob morphs between a sphere and a flat object with the same mesh connectivity. It's not supposed to be anything, it just shows off that I figured out how mesh morphing works in THREE.js.


## Screenshots

List the pictures that you made with a brief description

(not actually in example)

town.png - is a view that shows the overall town
town2.png - shows the nicer part of town in a closeup
airplane.png - is a picture of the airplane landing

## Other Notes to the Graders

## Attributions (including self-attributions)

Most of these objects were taken from the Framework Demo code and from previous workbooks.

The Helicopter is based on the Helicopter from the 2015 assignment.

The Race Car FBX come from open game art https://opengameart.org/content/lowpoly-racecar
It is provided with a CC0 license, so I can use it. 
I converted it to FBX format using Blender.

## Consent

The student consents to having their assignment shown in Galleries and Peer Review.

(if you do not provide consent, remove the line giving consent)

