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

function addRectangle(xCenterOfMass, yCenterOfMass, width, height, color = "black", isStatic=true) {
    let rect = Bodies.rectangle(xCenterOfMass, yCenterOfMass, width, height, {
        isStatic: isStatic,
        render: {
            fillStyle: color,
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

    addRectangle(250, 490, 500, 20)
    addRectangle(250, 10, 20, 50, 'green', false)

    let rect = Bodies.rectangle(250, 250, 10, 10, {
        render: {
            fillStyle: 'blue'
        }
    })


    World.add(engine.world, generatedRectangles)


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