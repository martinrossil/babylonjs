import { Engine, GroundMesh, HemisphericLight, Mesh, Scene, Vector3, ArcFollowCamera, FreeCamera, ArcRotateCamera } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';

export default class BabylonApp extends HTMLElement {
	public constructor() {
		super();
		this.style.display = 'block';
		this.style.height = '100%';
		this.appendChild(this.canvas);
		this.ground;
		this.sphere;
		this.camera;
		this.light;
		// Render every frame
		this.engine.runRenderLoop(() => {
			this.scene.render();
		});
		// Watch for browser/canvas resize events
		window.addEventListener('resize', () => {
			this.engine.resize();
		});
	}

	private _ground!: GroundMesh;

	// Our built-in 'ground' shape.
	private get ground() {
		if (!this._ground) {
			this._ground = CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, this.scene);
			this._ground.material = this.material;
		}

		return this._ground;
	}

	private _sphere!: Mesh;

	// Our built-in 'sphere' shape.
	private get sphere() {
		if (!this._sphere) {
			this._sphere = CreateSphere('sphere1', { segments: 16, diameter: 2 }, this.scene);
			// Move the sphere upward 1/2 its height
			this._sphere.position.y = 2;
			// Affect a material
			this._sphere.material = this.material;
		}

		return this._sphere;
	}

	private _material!: GridMaterial;

	// Create a grid material
	private get material() {
		if (!this._material) {
			this._material = new GridMaterial('grid', this.scene);
		}

		return this._material;
	}

	private _light!: HemisphericLight;

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	private get light() {
		if (!this._light) {
			this._light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
			// Default intensity is 1. Let's dim the light a small amount
			this._light.intensity = 0.7;
		}

		return this._light;
	}

	private _camera!: ArcRotateCamera;

	// This creates and positions a free camera (non-mesh)
	private get camera() {
		if (!this._camera) {
			this._camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 0, 0), this.scene); // new FreeCamera('camera1', new Vector3(0, 5, -10));
			// This targets the camera to scene origin
			// this._camera.position = new Vector3(0, 0, 20);
			this._camera.setTarget(Vector3.Zero());
			// This attaches the camera to the canvas
			this._camera.attachControl(this.canvas, true);
		}

		return this._camera;
	}

	private _scene!: Scene;

	private get scene() {
		if (!this._scene) {
			this._scene = new Scene(this.engine);
		}

		return this._scene;
	}

	private _engine!: Engine;

	private get engine() {
		if (!this._engine) {
			this._engine = new Engine(this.canvas, true);
		}

		return this._engine;
	}

	private _canvas!: HTMLCanvasElement;

	private get canvas() {
		if (!this._canvas) {
			this._canvas = document.createElement('canvas');
			this._canvas.style.display = 'block';
			this._canvas.style.width = '100%';
			this._canvas.style.height = '100%';
			this._canvas.style.fontSize = '0';
			this._canvas.style.touchAction = 'none';
		}

		return this._canvas;
	}
}
customElements.define('babylon-app', BabylonApp);
