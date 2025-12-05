import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const WIDTH = 0.8*window.innerWidth;
const HEIGHT = 0.7*window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x111111, 1);
document.getElementById("three-canvas").appendChild(renderer.domElement);

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

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(0, 0, 1);
scene.add(light);

const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.enabled = true; 
controls.autoRotateSpeed = 3;

const loader = new FontLoader();
const font = await loader.loadAsync('https://unpkg.com/three@0.152.2/examples/fonts/helvetiker_regular.typeface.json');
const text = new TextGeometry('Nird', {
    font: font,
    size: 10,
    depth: 10,
    curveSegments: 12,
});
text.center();

const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const textMesh = new THREE.Mesh(text, textMaterial);
textMesh.position.set(0,17,0);
scene.add(textMesh);

const EcoLoader = new FontLoader();
const EcoFont = await EcoLoader.loadAsync('https://unpkg.com/three@0.152.2/examples/fonts/helvetiker_regular.typeface.json');
const EcoText = new TextGeometry('Ecologie', {
    font: EcoFont,
    size: 5,
    depth: 5,
    curveSegments: 12,
});
EcoText.center();

const EcoMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const EcoMesh = new THREE.Mesh(EcoText, EcoMaterial);
EcoMesh.position.set(-25,-14,-25);
scene.add(EcoMesh);

const Linloader = new FontLoader();
const Linfont = await Linloader.loadAsync('https://unpkg.com/three@0.152.2/examples/fonts/helvetiker_regular.typeface.json');
const Lintext = new TextGeometry('Linux = Goat', {
    font: Linfont,
    size: 5,
    depth: 5,
    curveSegments: 12,
});
Lintext.center();

const LinMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const LinMesh = new THREE.Mesh(Lintext, LinMaterial);
LinMesh.position.set(12, -9, 25);
scene.add(LinMesh);

const GAFloader = new FontLoader();
const GAFfont = await GAFloader.loadAsync('https://unpkg.com/three@0.152.2/examples/fonts/helvetiker_regular.typeface.json');
const GAFtext = new TextGeometry('GAFAM', {
    font: GAFfont,
    size: 5,
    depth: 5,
    curveSegments: 12,
});
GAFtext.center();

const GAFMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const GAFMesh = new THREE.Mesh(GAFtext, GAFMaterial);
GAFMesh.position.set(12, 36, -15);
scene.add(GAFMesh);

const obsloader = new FontLoader();
const obsfont = await obsloader.loadAsync('https://unpkg.com/three@0.152.2/examples/fonts/helvetiker_regular.typeface.json');
const obstext = new TextGeometry('Obsolescence', {
    font: obsfont,
    size: 5,
    depth: 5,
    curveSegments: 12,
});
obstext.center();

const obsMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const obsMesh = new THREE.Mesh(obstext, obsMaterial);
obsMesh.position.set(25, 23, 12);
scene.add(obsMesh);




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
    textMesh.lookAt(camera.position);
    EcoMesh.lookAt(camera.position);
    LinMesh.lookAt(camera.position);
    obsMesh.lookAt(camera.position);
    GAFMesh.lookAt(camera.position);       
    renderer.render(scene, camera);
}
    
render();