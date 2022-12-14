

let app = new PIXI.Application({
    backgroundColor: 0xdddddd, resizeTo: window, antialias: true
})
document.body.appendChild(app.view)

let mesh = app.stage.addChild(PIXI3D.Mesh3D.createCube())

let light = new PIXI3D.Light()
light.position.set(-1, 0, 3)
PIXI3D.LightingEnvironment.main.lights.push(light)

let rotation = 0
app.ticker.add(() => {
    mesh.rotationQuaternion.setEulerAngles(0, rotation++, 0)
})