import './style.css';
import * as THREE from 'three';
import moonJPG from './assets/moon.jpg';
import normalJPG from './assets/normal.jpg';
import spaceJPG from './assets/space.jpg';
import gerJPG from './assets/ger.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log(moonJPG)
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(20, 1, 10, 50);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347 });

const torus = new THREE.Mesh(geometry, material);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);


const moonTexture = new THREE.TextureLoader().load(moonJPG);
const normalTexture = new THREE.TextureLoader().load(normalJPG);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
)

scene.add(torus)
scene.add(pointLight, ambientLight);

torus.position.setY(0)
torus.position.setZ(0)
torus.position.setX(0)

scene.add(moon)

const spaceTexture = new THREE.TextureLoader().load(spaceJPG);
scene.background = spaceTexture;


function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const controls = new OrbitControls(camera, renderer.domElement)

const gerTexture = new THREE.TextureLoader().load(gerJPG);
const ger = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: gerTexture }));
scene.add(ger);
ger.position.set(10,10,10)

function animate() {
  requestAnimationFrame(animate);

 
  moon.rotation.y += 0.0005;
  torus.rotation.x -= 0.005;
  controls.update();

  renderer.render(scene, camera);
}

animate();