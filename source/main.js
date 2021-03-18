const texloader = new THREE.TextureLoader();
const Phone3d = document.getElementById("Phone3d_wrraper");
const gltfLoader = new THREE.GLTFLoader();
const loader = new THREE.ObjectLoader();
const scene = new THREE.Scene();

//camera init 
const cameraPhone = new THREE.PerspectiveCamera(
  75,
  Phone3d.offsetWidth / Phone3d.offsetHeight,
  0.1,
  1600
);
const camera = new THREE.PerspectiveCamera(
  75,
  Phone3d.offsetWidth / Phone3d.offsetHeight,
  0.1,
  1600
);

//init scene and render 
	scene.background = new THREE.Color(0xfffffff);
	let renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(Phone3d.offsetWidth, Phone3d.offsetHeight);
	Phone3d.appendChild(renderer.domElement);
	let cameraPhoneMouseOver = false;
//render shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// add camera and position camera
scene.add(cameraPhone);
camera.position.z = 124;
camera.position.y = 16;


//create light 

const lightBackPhone = new THREE.DirectionalLight(0x5e6565, 1, 100);
lightBackPhone.position.set(0, 1, -90); 
scene.add(lightBackPhone);


const lightFrontPhone = new THREE.AmbientLight(0xffffff, 4, 1);
lightFrontPhone.position.set(0, 10, 90); 
scene.add(lightFrontPhone);

const lightRightPhone = new THREE.PointLight(0x5e6565, 2, 1020);
lightRightPhone.position.set(100, 50, 10);
lightRightPhone.position.x = 100;
scene.add(lightRightPhone);


const lightLeftPhone = new THREE.PointLight(0x5e6565, 2, 1020);
lightLeftPhone.position.set(-100, 50, 10); 
lightLeftPhone.position.x = -100;
scene.add(lightLeftPhone);

const lightTopPhone = new THREE.PointLight(0xffffff, 2, 620);
lightTopPhone.position.set(0, 100, 0);
lightTopPhone.position.x = 80;
scene.add(lightTopPhone);



//loading model iphone 
gltfLoader.load("scene.gltf", function(gltf) {
  scene.add(gltf.scene);
  cameraPhone.add(gltf.scene);
  cameraPhone.position.set(0, 0, 0);

  //object  camera 
  gltf.scene.rotation.x = 1.4;
  gltf.scene.castShadow = true; 
  gltf.scene.receiveShadow = false; 

 
});

 renderer.outputEncoding = THREE.sRGBEncoding;





camera.translateZ(30);
camera.translateY(-16);
//mouse 
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//limitation distance
controls.maxDistance = 200;
controls.minDistance = 70;

controls.enabled = false;

let mouseOver = () => {
  controls.enabled = true;
  cameraPhoneMouseOver = true;
  controls.enablePan = false;
  controls.dampingFactor = 0.05;
  console.log(cameraPhoneMouseOver);
  controls.update();
};

Phone3d.addEventListener("mouseover", mouseOver, false);
Phone3d.addEventListener(
  "mouseout",
  () => {
    cameraPhoneMouseOver = false;
  },
  false
);

function animate(e) {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  if (cameraPhoneMouseOver == false) {
    cameraPhone.rotation.y += 0.01;
  }


}

animate();
