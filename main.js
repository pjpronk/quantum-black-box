import * as THREE from 'three';

// Three js constanst
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / (window.innerHeight/1.7), 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

// Global variables
let rotate = true;
let targetY = 2
let oscilate = false
let moveSphere = false


// Initialise scene
renderer.setSize( window.innerWidth, window.innerHeight/1.7 );
document.getElementById("animation-window").appendChild( renderer.domElement );

// Initialize objects
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
const cube = new THREE.Mesh( geometry, material )
cube.rotation.x = 0.45;
cube.rotation.y = 0.75;

const sphereGeometry = new THREE.SphereGeometry( 0.1, 32,32 ); 
const sphere = new THREE.Mesh( sphereGeometry, material )

//Set random change atom generation

scene.add( cube );
scene.add(sphere)

camera.position.z = 5;



function getRandomPosition() {
    return new THREE.Vector3(
        Math.random() * 10 - 5, // X coordinate within a range (-5 to 5)
        Math.random() * 10 - 5, // Y coordinate within a range (-5 to 5)
        Math.random() * 10 - 5  // Z coordinate within a range (-5 to 5)
    );
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if(moveSphere) {
        // Calculate the difference between current and target position
        var deltaY = targetY - sphere.position.y;
        // Ease the movement (adjust the factor as needed for desired speed)
        sphere.position.y += deltaY * 0.005;
        if(Math.round(sphere.position.y) === targetY) {
            moveSphere = false
            oscilate = true
        }   
    }

    if(oscilate) {
        sphere.position.copy(getRandomPosition());
    }
}

document.getElementById("dot").addEventListener("click", freeElectron)

function freeElectron() {
    window.scrollTo(0,0);
    moveSphere = true;
}


//Random generator
if(Math.round(Math.random() * 10000) == 14){
    freeElectron()
}

animate();