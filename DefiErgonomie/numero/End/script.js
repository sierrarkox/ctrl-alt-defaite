import * as THREE from "three";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xdddddd, 0);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, 0.35*WIDTH / HEIGHT);

camera.position.z = 60;
camera.position.x = 30;
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('cat.png');

let cat;

const objLoader = new OBJLoader();
objLoader.load('cat.obj',
  (obj) => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texture
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
      cat = obj;
    });
    obj.scale.set(40, 40, 40);
    scene.add(obj);
  },
  (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% chargé'),
  (err) => console.error('Erreur OBJ :', err)
);

const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(0, 0, 1);
scene.add(light1);

function render() {
  requestAnimationFrame(render);
  cat.rotation.y += 0.025;
  renderer.render(scene, camera);
}

render();