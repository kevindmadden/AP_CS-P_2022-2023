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
    let numm = Math.random();
    $("canvas").remove();

    let width = $(window).width();
    let height = $(window).height();
    let vmin = Math.min(width, height);

    engine.events = {};
    World.clear(engine.world);
    Engine.clear(engine);

    engine = Engine.create();

    let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            wireframes: showWireFrames,
            background: 'transparent',
            width: width,
            height: height
        }
    });

    addRectangle(200, 200, 20, 30)

    World.add(engine.world, [
        Bodies.rectangle(width / 2, height + 50, width, 100, {
            isStatic: true
        }),
        Bodies.rectangle(width / 2, -50, width, 100, {
            isStatic: true
        }),
        Bodies.rectangle(-50, height / 2, 100, height, {
            isStatic: true
        }),
        Bodies.rectangle(width + 50, height / 2, 100, height, {
            isStatic: true
        }),
        /*Bodies.fromVertices(400, 400, Vertices.fromPath('50 0 63 38 100 38'),{
          isStatic: true,
          render: {
          fillStyle: "yellow"
        }
        }),*/

    ].concat(generatedRectangles))


    Engine.run(engine);

    Render.run(render);
    let num = 0;

    function update() {

        engine.world.gravity.x = Math.sin(num / 100);
        engine.world.gravity.y = Math.cos(num / 100);
        idRAF = requestAnimationFrame(update.bind(this));

    }

    update();
}

init();

$(window).resize(function () {
    init();
})