import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas: HTMLElement = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

// Axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
	const textGeometry = new TextGeometry("Praneeth Devarasetty", {
		font: font,
		size: 0.3,
		height: 0.2,
		curveSegments: 6,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5,
	});

	/* to center the text */
	textGeometry.computeBoundingBox();
	textGeometry.translate(
		-(textGeometry.boundingBox!.max.x - 0.02) * 0.5,
		-(textGeometry.boundingBox!.max.y - 0.02) * 0.5,
		-(textGeometry.boundingBox!.max.y - 0.02) * 0.5
	);
	textGeometry.center();

	// const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
	const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
	// textMaterial.matcap = matcapTexture;
	// textMaterial.wireframe = true;
	const text = new THREE.Mesh(textGeometry, material);

	scene.add(text);
	/**
	 * create geometry and material for donuts before loop for performance optimization
	 */
	const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
	// const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

	for (let i = 0; i < 300; i++) {
		const donut = new THREE.Mesh(donutGeometry, material);

		donut.position.x = (Math.random() - 0.5) * 10;
		donut.position.y = (Math.random() - 0.5) * 10;
		donut.position.z = (Math.random() - 0.5) * 10;

		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;

		const scale = Math.random();
		// donut.scale.x = scale;
		// donut.scale.y = scale;
		// donut.scale.z = scale;
		donut.scale.set(scale, scale, scale);

		scene.add(donut);
	}
});

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	60,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
// const clock = new THREE.Clock();

const tick = () => {
	// const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
