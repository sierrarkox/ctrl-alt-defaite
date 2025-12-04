import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x111111, 1);
document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.z = 100;
scene.add(camera);

const sg1 = new THREE.SphereGeometry(10, 64, 64);
const sm1 = new THREE.MeshLambertMaterial({ color: 0x074460});
const Nird = new THREE.Mesh(sg1, sm1);
scene.add(Nird);

const sg2 = new THREE.SphereGeometry(5, 64, 64);
const sm2 = new THREE.MeshLambertMaterial({ color: 0xff336600});
const Ecologie = new THREE.Mesh(sg2, sm2);
Ecologie.userData.link = "toto.html";//Changer par la bonne page
Ecologie.position.set(-25, -25, -25);
scene.add(Ecologie);

const sg3 = new THREE.SphereGeometry(5, 64, 64);
const sm3 = new THREE.MeshLambertMaterial({ color: 0xffff00});
const Gafam = new THREE.Mesh(sg3, sm3);
Gafam.userData.link = "toto.html";//Changer par la bonne page
Gafam.position.set(25, 12, 12);
scene.add(Gafam);

const sg4 = new THREE.SphereGeometry(5, 64, 64);
const sm4 = new THREE.MeshLambertMaterial({ color: 0xff6666});
const Linux = new THREE.Mesh(sg4, sm4);
Linux.userData.link = "toto.html";//Changer par la bonne page
Linux.position.set(12, -20, 25);
scene.add(Linux);

const sg5 = new THREE.SphereGeometry(5, 64, 64);
const sm5 = new THREE.MeshLambertMaterial({ color: 0xff3399});
const Obsolescence = new THREE.Mesh(sg5, sm5);
Obsolescence.userData.link = "toto.html";//Changer par la bonne page
Obsolescence.position.set(12, 25, -15);
scene.add(Obsolescence);

const c1 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),     // point de départ
    new THREE.Vector3(-30, 12, -10),    // point de contrôle
    new THREE.Vector3(12, 25, -15)     // point d’arrivée
);

const ps1 = c1.getPoints(100);
const g1 = new THREE.BufferGeometry().setFromPoints(ps1);
const m1 = new THREE.LineBasicMaterial({ color: 0xffffff });
const li1 = new THREE.Line(g1, m1);

scene.add(li1);

const c2 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),     // point de départ
    new THREE.Vector3(10, -5, -20),    // point de contrôle
    new THREE.Vector3(25, 12, 12)     // point d’arrivée
);

const ps2 = c2.getPoints(100);
const g2 = new THREE.BufferGeometry().setFromPoints(ps2);
const m2 = new THREE.LineBasicMaterial({ color: 0xffffff });
const li2 = new THREE.Line(g2, m2);

scene.add(li2);

const c3 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),     // point de départ
    new THREE.Vector3(0, -30, -10),    // point de contrôle
    new THREE.Vector3(-25, -25, -25)     // point d’arrivée
);

const ps3 = c3.getPoints(100);
const g3 = new THREE.BufferGeometry().setFromPoints(ps3);
const m3 = new THREE.LineBasicMaterial({ color: 0xffffff });
const li3 = new THREE.Line(g3, m3);

scene.add(li3);

const c4 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),     // point de départ
    new THREE.Vector3(-20, -20, 20),    // point de contrôle
    new THREE.Vector3(12, -20, 25)     // point d’arrivée
);

const ps4 = c4.getPoints(100);
const g4 = new THREE.BufferGeometry().setFromPoints(ps4);
const m4 = new THREE.LineBasicMaterial({ color: 0xffffff });
const li4 = new THREE.Line(g4, m4);

scene.add(li4);

const c5 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(25, 12, 12),     // point de départ
    new THREE.Vector3(40, 25, -10),    // point de contrôle
    new THREE.Vector3(12, 25, -15)     // point d’arrivée
);

const ps5 = c5.getPoints(100);
const g5 = new THREE.BufferGeometry().setFromPoints(ps5);
const m5 = new THREE.LineBasicMaterial({ color: 0xffffff });
const li5 = new THREE.Line(g5, m5);

scene.add(li5);

const c6 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(12, -20, 25),     // point de départ
    new THREE.Vector3(30, -12, 10),    // point de contrôle
    new THREE.Vector3(25, 12, 12)     // point d’arrivée
);

const ps6 = c6.getPoints(100);
const g6 = new THREE.BufferGeometry().setFromPoints(ps6);
const m6 = new THREE.LineBasicMaterial({ color: 0xffffff });
const li6 = new THREE.Line(g6, m6);

scene.add(li6);

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(0, 0, 1);
scene.add(light);

const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.enabled = true; 
controls.autoRotateSpeed = 3;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onClick, false);

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;

        console.log("Objet cliqué :", object);

        if (object.userData.link) {
            window.location.href = object.userData.link;
        }
    }
}


window.addEventListener("click", onClick);



function render() {
    requestAnimationFrame(render); 
    controls.update();       
    renderer.render(scene, camera);
}
    
render();