import *as THREE from "three"
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xdddddd, 1);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
    camera.position.z = 50;
    scene.add(camera);

    const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0095dd });
    const cube = new THREE.Mesh(boxGeometry, basicMaterial);
    cube.rotation.set(0.4, 0.2, 0);
    scene.add(cube);
    cube.position.x = -25;

    const dodecahedronGeometry = new THREE.DodecahedronGeometry(7);
    const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0xeaeff2 });
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);
    dodecahedron.position.x = 25;
    scene.add(dodecahedron);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('cat.png');

    let cat;

    const objLoader = new OBJLoader();    
    objLoader.load(
        'cat.obj',
        (obj) => {
        // Lorsque l'OBJ est chargé
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
        obj.scale.set(50, 50, 50);
        scene.add(obj);
        },
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% chargé'),
    (err) => console.error('Erreur OBJ :', err)
    );


    

    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(0, 0, 1);
    scene.add(light1);

    let t = 0;


    function render() {
        requestAnimationFrame(render);
        cube.rotation.y += 0.1;
        dodecahedron.position.y = -7 * Math.sin(t * 2);
        cat.rotation.y += 0.25;
        t += 0.01;

        

        renderer.render(scene, camera);
    }
    
    render();