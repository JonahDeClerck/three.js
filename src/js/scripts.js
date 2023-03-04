import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

//renerer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//scene init

const scene = new THREE.Scene();

//camera

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 5)
camera.position.z = 5;
camera.position.y = 2;

//orbitcontrol

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

//axeshelper

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//cube

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 2;
scene.add(box);

//plane

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

//sphere

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 20, 0);
scene.add(sphere);

//gridhelper

const gridHelper = new THREE.GridHelper(30, 10);
scene.add(gridHelper);

//dat gui

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
}

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

//sphere bounce

let step = 0;

//rotation

function animate(){
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step)); 

    renderer.render(scene, camera);
}

//render scene

//renderer.render(scene, camera);
renderer.setAnimationLoop(animate);