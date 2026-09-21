import * as THREE from "three";

interface ArcState {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  material: THREE.LineBasicMaterial;
  totalPoints: number;
  currentProgress: number; // 0 to 1
  holdTimer: number;
  maxHold: number;
  fadeTimer: number;
  maxFade: number;
  state: "drawing" | "holding" | "fading" | "dead";
}

export function initGlobe(canvas: HTMLCanvasElement): () => void {
  if (!canvas) return () => {};

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const R = 2.5;
  const NODE_COUNT = 900;
  const DUST_COUNT = 700;
  const ARC_COUNT = 14;

  const width = canvas.parentElement?.clientWidth || window.innerWidth;
  const height = canvas.parentElement?.clientHeight || window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0, 8.2);

  const scene = new THREE.Scene();
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const updateGroupPosition = (w: number, h: number) => {
    const aspect = w / h;
    const vFovRad = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z;
    const visibleWidth = visibleHeight * aspect;

    if (w >= 1024) {
      // Desktop / Ultrawide / 4K / 75-inch screens
      const targetX = (visibleWidth / 2) * 0.50;
      globeGroup.position.x = Math.max(1.8, Math.min(targetX, visibleWidth / 2 - 1.6));
      globeGroup.position.y = visibleHeight * 0.04;
      
      // Keep globe proportional to viewport height (around 58% of visible height)
      const targetScale = (visibleHeight * 0.60) / (R * 2);
      globeGroup.scale.setScalar(Math.min(1.05, Math.max(0.75, targetScale)));
    } else if (w >= 768) {
      // Tablets
      globeGroup.position.x = (visibleWidth / 2) * 0.35;
      globeGroup.position.y = 0;
      globeGroup.scale.setScalar(0.75);
    } else {
      // Mobile
      globeGroup.position.x = 0;
      globeGroup.position.y = -visibleHeight * 0.10;
      globeGroup.scale.setScalar(0.62);
    }
  };
  updateGroupPosition(width, height);

  // 1. Solid Inner Sphere (dark navy to block back-face lines)
  const innerSphereGeo = new THREE.SphereGeometry(R * 0.985, 36, 36);
  const innerSphereMat = new THREE.MeshBasicMaterial({
    color: 0x0a1836,
    depthWrite: true,
  });
  const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
  globeGroup.add(innerSphere);

  // 2. Wireframe Icosahedron LineSegments
  const icosahedronGeo = new THREE.IcosahedronGeometry(R, 3);
  const wireframeGeo = new THREE.WireframeGeometry(icosahedronGeo);
  const wireframeMat = new THREE.LineBasicMaterial({
    color: 0x4d8dff,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  const wireframeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
  globeGroup.add(wireframeLines);

  // 3. Fibonacci Sphere Surface Nodes
  const nodePositions = new Float32Array(NODE_COUNT * 3);
  const nodeColors = new Float32Array(NODE_COUNT * 3);
  const spherePointsList: THREE.Vector3[] = [];

  const colorBlue = new THREE.Color(0x4d8dff);
  const colorTeal = new THREE.Color(0x31d0aa);
  const tempColor = new THREE.Color();

  for (let i = 0; i < NODE_COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const x = R * Math.sin(phi) * Math.cos(theta);
    const y = R * Math.sin(phi) * Math.sin(theta);
    const z = R * Math.cos(phi);

    nodePositions[i * 3] = x;
    nodePositions[i * 3 + 1] = y;
    nodePositions[i * 3 + 2] = z;

    spherePointsList.push(new THREE.Vector3(x, y, z));

    const lerpFactor = Math.random();
    tempColor.copy(colorBlue).lerp(colorTeal, lerpFactor);
    nodeColors[i * 3] = tempColor.r;
    nodeColors[i * 3 + 1] = tempColor.g;
    nodeColors[i * 3 + 2] = tempColor.b;
  }

  const nodesGeometry = new THREE.BufferGeometry();
  nodesGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
  nodesGeometry.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));

  const nodesMaterial = new THREE.PointsMaterial({
    size: 0.028,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
  });
  const nodePoints = new THREE.Points(nodesGeometry, nodesMaterial);
  globeGroup.add(nodePoints);

  // 4. Ambient Dust Particles
  const dustPositions = new Float32Array(DUST_COUNT * 3);
  const dustVelocities: THREE.Vector3[] = [];

  for (let i = 0; i < DUST_COUNT; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 16;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    dustVelocities.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004
      )
    );
  }

  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

  const dustMaterial = new THREE.PointsMaterial({
    size: 0.018,
    color: 0x93a2c4,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });
  const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
  scene.add(dustPoints);

  // 5. Attack Arcs
  const arcStates: ArcState[] = [];
  const arcGroup = new THREE.Group();
  globeGroup.add(arcGroup);

  const createArc = (): ArcState => {
    const idx1 = Math.floor(Math.random() * spherePointsList.length);
    let idx2 = Math.floor(Math.random() * spherePointsList.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * spherePointsList.length);
    }

    const p1 = spherePointsList[idx1];
    const p2 = spherePointsList[idx2];

    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const midLen = mid.length();
    if (midLen > 0.001) {
      const heightFactor = R * (1.3 + Math.random() * 0.3);
      mid.normalize().multiplyScalar(heightFactor);
    } else {
      mid.set(0, R * 1.4, 0);
    }

    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    const sampledPoints = curve.getPoints(64);

    const geo = new THREE.BufferGeometry().setFromPoints(sampledPoints);
    geo.setDrawRange(0, 0);

    const isRed = Math.random() < 0.28;
    const arcColor = isRed ? 0xff6b81 : 0x54c6f0;

    const mat = new THREE.LineBasicMaterial({
      color: arcColor,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const line = new THREE.Line(geo, mat);
    arcGroup.add(line);

    return {
      line,
      geometry: geo,
      material: mat,
      totalPoints: 64,
      currentProgress: 0,
      holdTimer: 0,
      maxHold: 0.6 + Math.random() * 0.8,
      fadeTimer: 0,
      maxFade: 0.5 + Math.random() * 0.4,
      state: "drawing",
    };
  };

  for (let i = 0; i < ARC_COUNT; i++) {
    const arc = createArc();
    arc.currentProgress = Math.random();
    arcStates.push(arc);
  }

  // Pointer Parallax
  let targetRotationX = 0;
  let targetRotationZ = 0;
  let targetCameraOffsetX = 0;
  let targetCameraOffsetY = 0;

  let currentRotationX = 0;
  let currentRotationZ = 0;
  let currentCameraOffsetX = 0;
  let currentCameraOffsetY = 0;

  const handlePointerMove = (e: PointerEvent) => {
    if (prefersReduced) return;
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;

    targetRotationX = normY * 0.35;
    targetRotationZ = -normX * 0.35;
    targetCameraOffsetX = normX * 0.4;
    targetCameraOffsetY = -normY * 0.4;
  };

  const handleResize = () => {
    const w = canvas.parentElement?.clientWidth || window.innerWidth;
    const h = canvas.parentElement?.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    updateGroupPosition(w, h);
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  // Animation Loop
  const clock = new THREE.Clock();
  let animationFrameId: number;

  const animate = () => {
    const rawDt = clock.getDelta();
    const dt = Math.min(rawDt, 0.05);

    if (!prefersReduced) {
      globeGroup.rotation.y += 0.18 * dt;

      currentRotationX += (targetRotationX - currentRotationX) * 0.045;
      currentRotationZ += (targetRotationZ - currentRotationZ) * 0.045;
      globeGroup.rotation.x = currentRotationX;
      globeGroup.rotation.z = currentRotationZ;

      currentCameraOffsetX += (targetCameraOffsetX - currentCameraOffsetX) * 0.045;
      currentCameraOffsetY += (targetCameraOffsetY - currentCameraOffsetY) * 0.045;
      camera.position.x = currentCameraOffsetX;
      camera.position.y = currentCameraOffsetY;

      // Update Dust
      const posAttr = dustGeometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < DUST_COUNT; i++) {
        const vel = dustVelocities[i];
        positions[i * 3] += vel.x;
        positions[i * 3 + 1] += vel.y;
        positions[i * 3 + 2] += vel.z;

        if (Math.abs(positions[i * 3]) > 8) vel.x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 5) vel.y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 5) vel.z *= -1;
      }
      posAttr.needsUpdate = true;

      // Update Attack Arcs
      for (let i = 0; i < arcStates.length; i++) {
        const arc = arcStates[i];

        if (arc.state === "drawing") {
          arc.currentProgress += dt * 1.4;
          if (arc.currentProgress >= 1) {
            arc.currentProgress = 1;
            arc.state = "holding";
          }
          const count = Math.floor(arc.currentProgress * arc.totalPoints);
          arc.geometry.setDrawRange(0, count);
        } else if (arc.state === "holding") {
          arc.holdTimer += dt;
          if (arc.holdTimer >= arc.maxHold) {
            arc.state = "fading";
          }
        } else if (arc.state === "fading") {
          arc.fadeTimer += dt;
          const fadeProgress = arc.fadeTimer / arc.maxFade;
          arc.material.opacity = Math.max(0, 0.85 * (1 - fadeProgress));

          if (arc.fadeTimer >= arc.maxFade) {
            arc.state = "dead";
            arcGroup.remove(arc.line);
            arc.geometry.dispose();
            arc.material.dispose();

            arcStates[i] = createArc();
          }
        }
      }
    }

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  // Cleanup handler
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("resize", handleResize);

    arcStates.forEach((arc) => {
      arcGroup.remove(arc.line);
      arc.geometry.dispose();
      arc.material.dispose();
    });

    innerSphereGeo.dispose();
    innerSphereMat.dispose();
    icosahedronGeo.dispose();
    wireframeGeo.dispose();
    wireframeMat.dispose();
    nodesGeometry.dispose();
    nodesMaterial.dispose();
    dustGeometry.dispose();
    dustMaterial.dispose();
    renderer.dispose();
  };
}
