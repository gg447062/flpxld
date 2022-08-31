const container = document.getElementById('models');
const clock = new THREE.Clock();
let scene, camera, renderer, bassface, devil, mixer;
let mode = 'increasing';
let t = 0;

const baseURL = 'https://dg3mov3znt8u.cloudfront.net/models';

function init() {
  const loader = new THREE.GLTFLoader();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
  );

  camera.position.z = 15;

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, -10, 10);
  scene.add(directionalLight);

  // add helper
  // scene.add(new THREE.DirectionalLightHelper(directionalLight, 5));

  const light = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  loader.load(`${baseURL}/BassfaceLD.glb`, (gltf) => {
    bassface = gltf.scene;
    bassface.position.set(0, -6, 0);
    bassface.scale.set(1.5, 1.5, 1.5);
    bassface.rotation.y = 0.2;

    mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[1]);
    action.play();

    scene.add(bassface);
  });

  loader.load(`${baseURL}/devil-head.glb`, (gltf) => {
    devil = gltf.scene;
    // devil.position.set(6, -0.5, 1);
    devil.position.set(10, -0.5, 1);
    devil.scale.set(0.45, 0.45, 0.45);
    const newMaterial = new THREE.MeshPhongMaterial({ color: 0x0328fc });
    devil.traverse((child) => {
      if (child.isMesh) {
        child.material = newMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(devil);
  });
}

function onWindowResize() {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function rotateDevil(speed) {
  if (devil.rotation.y <= 0.4 && mode == 'increasing') {
    devil.rotation.y += speed;
  } else if (devil.rotation.y >= 0.4 && mode == 'increasing') {
    mode = 'decreasing';
    devil.rotation.y -= speed;
  } else if (devil.rotation.y >= -0.8 && mode == 'decreasing') {
    devil.rotation.y -= speed;
  } else if (devil.rotation.y <= -0.8 && mode == 'decreasing') {
    mode = 'increasing';
    devil.rotation.y += speed;
  }
}

function moveDevil() {
  devil.rotation.y += 0.05;
  t += 0.01;
  devil.position.z = 20 * Math.cos(t) + 0;
  devil.position.x = 30 * Math.sin(t) + 0;
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const speed = 0.005;
  if (mixer) {
    mixer.update(delta);
  }

  if (devil) {
    // rotateDevil(speed);
    moveDevil();
  }

  renderer.render(scene, camera);
}

init();
animate();
