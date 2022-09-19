/*
  Properties you can change 
*/
let showWireFrames = false //options: true, false
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vertices = Matter.Vertices;

let engine = Engine.create();

let generatedRectangles = []

function addRectangle(xCenterOfMass, yCenterOfMass, width, height, color = "green") {
    let rect = Bodies.rectangle(xCenterOfMass, yCenterOfMass, width, height, {
        render: {
            fillStyle: color
        }
    })
    generatedRectangles.push(rect)
}

function init() {
    let width = 500;
    let height = 500;

    let render = Render.create({
        element: document.getElementById('canvasBoard'),
        engine: engine,
        options: {
            wireframes: showWireFrames,
            background: 'transparent',
            width: width,
            height: height
        }
    });

    addRectangle(200, 200, 20, 30)
    addRectangle()

    let rect = Bodies.rectangle(250, 250, 10, 10, {
        render: {
            fillStyle: 'blue'
        }
    })


    World.add(engine.world, rect)


    //Engine.run(engine);
    Matter.Runner.run(engine)

    Render.run(render);



    update();
}

function update() {
    requestAnimationFrame(update.bind(this));
}

init();

$(window).resize(function () {
    init();
})