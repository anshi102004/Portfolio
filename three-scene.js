/* ==========================================================================
   Synthwave 3D Cyber Horizon & Quantum Crystal Engine
   Three.js WebGL rendering of glowing neon perspective floor, rotating crystal, and particles
   ========================================================================== */

(function () {
  const container = document.getElementById('webgl-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030308, 0.0025);

  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 30);

  const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Specular Neon Lighting ---
  const ambientLight = new THREE.AmbientLight(0xff007f, 0.5);
  scene.add(ambientLight);

  const mainLight = new THREE.PointLight(0xff007f, 2.5, 70);
  mainLight.position.set(0, 10, 10);
  scene.add(mainLight);

  const cyanLight = new THREE.PointLight(0x00f3ff, 2, 60);
  cyanLight.position.set(-15, -5, 5);
  scene.add(cyanLight);

  // --- 3D Synthwave Horizon Grid Floor ---
  const gridHelper = new THREE.GridHelper(300, 80, 0xff007f, 0x33001a);
  gridHelper.position.y = -12;
  scene.add(gridHelper);

  // --- 3D Morphing Quantum Polyhedron Crystal ---
  const crystalGroup = new THREE.Group();

  const crystalGeo = new THREE.OctahedronGeometry(6, 0);
  const crystalMat = new THREE.MeshPhongMaterial({
    color: 0xff007f,
    emissive: 0x440022,
    wireframe: true,
    shininess: 100
  });
  const crystal = new THREE.Mesh(crystalGeo, crystalMat);
  crystalGroup.add(crystal);

  // Inner Glowing Core
  const innerGeo = new THREE.SphereGeometry(3, 16, 16);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const innerCore = new THREE.Mesh(innerGeo, innerMat);
  crystalGroup.add(innerCore);

  // Rotating Cyber Rings
  const ringGeo = new THREE.TorusGeometry(10, 0.15, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xff007f, wireframe: true });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI / 3;
  crystalGroup.add(ring1);

  const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true }));
  ring2.rotation.y = Math.PI / 4;
  crystalGroup.add(ring2);

  crystalGroup.position.set(12, 4, -5);
  scene.add(crystalGroup);

  // --- Upward Floating Matrix Particles ---
  const particleCount = 800;
  const particleGeo = new THREE.BufferGeometry();
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 120;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 120;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.6,
    color: 0xff007f,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // --- Mouse & Scroll Tracking ---
  let mouseX = 0, mouseY = 0;
  let scrollY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- Render Loop ---
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Synthwave Floor Infinite Horizon Motion
    gridHelper.position.z = (time * 8) % 3.75;

    // Crystal Rotations
    crystal.rotation.x = time * 0.4;
    crystal.rotation.y = time * 0.6;
    innerCore.rotation.y = -time * 0.8;
    ring1.rotation.z = time * 0.5;
    ring2.rotation.x = time * 0.4;

    // Mouse & Scroll Camera Transitions
    camera.position.x += (mouseX * 15 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 15 + 5 - camera.position.y) * 0.05;
    camera.position.z = 30 + scrollY * 0.006;

    renderer.render(scene, camera);
  }

  animate();
})();
