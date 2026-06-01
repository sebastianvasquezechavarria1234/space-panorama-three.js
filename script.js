import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// Cargamos una textura de 360 grados (equirrectangular)
const textureLoader = new THREE.TextureLoader();
// Lo ideal es usar una imagen panorámica de 360 grados (como un HDRI)
const backgroundTexture = textureLoader.load('./bg.jpg');

// Le decimos a Three.js que envuelva la escena con la imagen en 3D
backgroundTexture.mapping = THREE.EquirectangularReflectionMapping;
backgroundTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = backgroundTexture;

const fov = 70;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(
  fov,
  aspectRatio,
  near,
  far
);

camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Controls
const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;

// Animation
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();