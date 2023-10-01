import * as THREE from "three";
import images from "./images";

const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10); 
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".three_bg").appendChild(renderer.domElement);


// responsive

window.addEventListener("resize", () => { 
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});




const geometry = new THREE.PlaneGeometry(18 , 10 , 15, 9);
const material = new THREE.MeshBasicMaterial({
  // color: 0x00ff00,
  map: loader.load(images.bg1),
  //wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
camera.position.z = 5;

const count = geometry.attributes.position.count;


function animate() {
  const timea = Date.now() * 0.001;
  for (let i = 0; i < count; i++) { 
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);
    geometry.attributes.position.setZ(i, Math.sin(x + Date.now() * 0.0003) * 0.5 + Math.sin(y + Date.now() * 0.0003) * 0.5);
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();



renderer.render.apply(scene, camera);
