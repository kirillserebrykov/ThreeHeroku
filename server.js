var path = require('path');
var express  = require('express');
const app = express();
const port = process.env.PORT || 6080
const fs = require('fs')

let getFail = (name ,path) =>{
    app.get('/'+ name , function(req, res) {
        res.sendFile(__dirname + "/" + path);
    })
}
getFail('','index.html')
getFail('main.css','/source/main.css')
getFail('main.js',"/source/main.js")
getFail('scene.gltf',"/models/scene.gltf")
getFail('scene.bin',"/models/scene.bin")
getFail('gryl_baseColor.jpeg',"/models/textures/gryl_baseColor.jpeg")
getFail('lense_baseColor.jpeg',"/models/textures/lense_baseColor.jpeg")
getFail('material_10_baseColor.jpeg',"/models/textures/material_10_baseColor.jpeg")
getFail('OrbitControls.js',"/node_modules/three/examples/js/controls/OrbitControls.js")

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
