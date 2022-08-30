const container = document.getElementById('models');
const clock = new THREE.Clock();
let scene, camera, renderer, bassface, devil, mixer;
let mode = 'increasing';

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

  loader.load('/assets/models/BassfaceLD.glb', (gltf) => {
    bassface = gltf.scene;
    bassface.position.set(-16, -6, 0);
    bassface.scale.set(1.5, 1.5, 1.5);
    bassface.rotation.y = 0.5;

    mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[1]);
    action.play();

    scene.add(bassface);
  });

  loader.load('/assets/models/devil-head.glb', (gltf) => {
    devil = gltf.scene;
    devil.position.set(6, -0.5, 1);
    devil.scale.set(0.45, 0.45, 0.45);
    const newMaterial = new THREE.MeshPhongMaterial({ color: 0x0328fc });
    devil.traverse((child) => {
      if (child.isMesh) {
        child.material = newMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    console.log(devil.rotation.y);
    scene.add(devil);
  });
}

function onWindowResize() {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const speed = 0.005;
  if (mixer) {
    mixer.update(delta);
  }

  if (devil) {
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

  renderer.render(scene, camera);
}

init();
animate();

// function loadModels(urls) {
//   urls.forEach((url) => {
//     loader.load(
//       url,
//       function (gltf) {
//         console.log(gltf);
//         scene.add(gltf.scene);
//         gltf.animations; // Array<THREE.AnimationClip>
//         gltf.scene; // THREE.Group
//         gltf.scenes; // Array<THREE.Group>
//         gltf.cameras; // Array<THREE.Camera>
//         gltf.asset; // Object
//       },
//       // called while loading is progressing
//       function (xhr) {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
//       },
//       // called when loading has errors
//       function (error) {
//         console.log('An error happened');
//       }
//     );
//   });
// }
