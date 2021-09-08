This project was created for the Computer Graphics class at the University of Wisconsin in Spring of 2021 and uses the class software framework. 

This code should not be copied for other student assignments

Pictures of the completed graphics town: 

![GT1](https://user-images.githubusercontent.com/56147372/132595788-e4329f63-8131-432d-81bf-cbb034453d38.jpg)
![GT2](https://user-images.githubusercontent.com/56147372/132595796-e4985d6e-ca76-4a60-8d48-a0042e9135b8.jpg)
![GT3](https://user-images.githubusercontent.com/56147372/132595804-e04e4e7f-2f65-45a0-910c-8e7cb6cf32c5.jpg)


# README.md file for Workbook 12

Note: filling out this file is extremely important. If you don't describe your assignment here, we may not be able to give you points for things.

- ** Name: Kailai Tang
- ** GitHub ID: KailaiTang
- ** WiscID: ktang38

See README-example.md in the examples directory for ideas on what we are looking for.

## Artist Statement

Describe what you were trying to make:

I made a graphics town with four different themes.
    1st: an "ice and snow" town
    2nd: a forest
    3rd: a technology museum
    4th: a normal town for people to live.
Each small part of town has different components including objects on the floor, on the sky and inside the circular track. 
I created other important features that make the town more interactive, including the circular path, helicopter, train, vertical circular rings and the center of reflective sphere.
I tried to make my town as colorful and interesting as possible. I also use the rainbow as the background skybox, in order to establish a relaxing atmosphere.

## Straightforward Checks

Please list how your assignment fills the requirements. In cases where you have more than the requirements (e.g., 2,3,5,6) just list the most interesting ones. A short description (a few words) is probably sufficient. Leave blank or say "N/A" for things you didn't do.

Note: the other checks we can see easily.

2. 2 different kinds of objects that you made (just list 2)
    1. houses
    2. trees

3.  5 different kinds of objects beyond #2. (just list 5)
    1. snowman
    2. dice
    3. train
    4. snow
    5. three circular paths / rings

5. 3 different behaviors. (just list 3)
    1. train drives in a circle (inside a circular path)
    2. "horses" in carousel moving up and down
    3. dice rotates, stops, rotates, stops, ...

6. At least 3 objects must be "rideable"
    1. cars (with both forth-driving and back-driving)
    2. cubes (with different speed)
    3. helicopter
    4. roller coaster
    5. train

7. "train track" with a "train" (tell us how we know its a spline)
    1. the green track (with the orange train) is a spline because the track is really complicated, and it has to be accomplished by curve splining. 

8. One object from each category
    - buildings: the snow house
    - natural elements: tree
    - vehicles: train

9. There is at least one model loaded from a file. (e.g. loading a `.obj` or `.fbx` file)
    1. the astronaut, teapot, suzzane

10. There is at least one shader that you wrote.
    - what object is it on: it is on the cone at the center
    - describe: I create the shader in order to change the color of the cone
    - filename: shader.fs, shader.vs

12. SkyBox or some other texture (list one - and say why you didn't have skybox if you don't have one)
    1. SkyBox (with rainbow on it, please look at the rainbow, so beautiful)

## Complexity Points

Describe each thing that you did that you think is worth complexity points.

If possible, order them from most interesting to least interesting.

Describe what the thing is, where we can see it, and why it deserves complexity points.

Note: put "####" (4 hash marks) and number the complex things to make it easier for us to identify them, but put the description on a separate line. We've given you the first 2 headers

#### Complex Thing 1: The forest maze (complex object)
The forest maze is really complex to make, because I need to design the pattern of the distribution of all trees to make a maze looks true. After I design the distribution of trees in a 2D array, I need to calculate their corresponding location which is hard to calculate. Then I put a plane at the top of the maze with maze texture to provide hints to visitors who want to visit the maze.

#### Complex Thing 2: Two dices (complex motion)
The motion of two dices is really complex. Two dices are switching back and forth from "rotating" status to "stationary" status, for each small time interval. The most hard thing to figure out is to guarantee that both dices have "6" all the time, because they are designed to be "weighted" dices that are used for cheating during gambling.

#### Complex Thing 3: The train (complex object)
The train is a vehicle that is really hard to draw. I need to draw its head and body first, then draw the wheels and chimney. I need to calculate their position relationship carefully.

#### Complex Thing 4: The snow (particle system)
The snow is a part of the particle system. I use three for loops in order to mock the scenario of snow. However, the size of snow, the gaps between each snow particle and the range of the snow need to be calculated and adjusted again and again in order to make the snow looks perfect. 

#### Complex Thing 5: The morph (morph)
I create a morph with a "Kite" texture in order to mock the situation that people are flying kites on the sky.

#### Complex Thing 6: The snowman (complex object)
The snowman has 3 main components (head, body, base), and it has rotating hat and arms. The most complex thing is that it has a button nose because the position of each button needs to be adjusted carefully.

#### Complex Thing 7: The helicopter (complex object & complex motion)
The helicopter has both complex object (itself) and complex motion. It moves among four different helicopter pads, and will change direction as it flies, and will fly up and down.

#### Complex Thing 8: The carousel (complex object & complex motion)
The carousel is complex not for itself (since it is loaded), but is for the "horses" inside. Each horse has an "up and down" motion with different and random initial position. The distance between each horse and their locations are hard to determine and need to be adjusted over and over again.

## Screenshots

List the pictures that you made with a brief description
1. world1.jpg and world2.jpg are two pictures of the whole graphics town
2. ice_town.jpg, maze.jpg, and tech_museum.jpg are three pictures of specific components of graphics town to show cool details

## Other Notes to the Graders

## Attributions (including self-attributions)
1. skybox
https://opengameart.org/content/elyvisions-skyboxes
2. car, cube, helicopter, circular track, helicopter pads and morph are made according to the example provided
3. snowman, teapot, astronaut, suzzane, carousel, rotating planes, swings, trains, houses, dices are from previous workbook.
4. textures:
- https://www.google.com/search?q=wall+texture&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjymqPa2IrpAhUIH80KHaMHDXkQ_AUoAXoECBAQAw&biw=1440&bih=701
- https://www.google.com/search?q=roof+texture&tbm=isch&ved=2ahUKEwi2853c2IrpAhXEbqwKHZ1qD9wQ2-cCegQIABAA&oq=roof+texture&gs_lcp=CgNpbWcQAzIECAAQQzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADoGCAAQBxAeUO-dAliMoQJghKICaABwAHgAgAFIiAH0AZIBATSYAQCgAQGqAQtnd3Mtd2l6LWltZw&sclient=img&ei=--enXvaJJ8TdsQWd1b3gDQ&bih=701&biw=1440
- https://www.google.com/search?q=snow+roof+texture&tbm=isch&ved=2ahUKEwjvyL7u2IrpAhVEVawKHVrGBlwQ2-cCegQIABAA&oq=snow+roof+texture&gs_lcp=CgNpbWcQAzoGCAAQBxAeUKU8WPlAYPpCaABwAHgAgAE7iAGWApIBATWYAQCgAQGqAQtnd3Mtd2l6LWltZw&sclient=img&ei=IeinXq-0OMSqsQXajJvgBQ&bih=701&biw=1440



## Consent

The student consents to having their assignment shown in Galleries and Peer Review.

(if you do not provide consent, remove the line giving consent)
