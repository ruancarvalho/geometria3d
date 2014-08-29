/// <reference path="_references.js" />

(function () {
	
	this.geometria3D = this.geometria3D || {};
	var app = this.geometria3D;

	app.scene = {};
	app.camera = {};
	app.renderer = {};

	var spotLight = {};
	var axes = {};
	var stats = {};
	var gui = {};
	var controls = {};

	app.initialize = function () {

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			45, 
			window.innerWidth / window.innerHeight, 
			0.1, 
			1000
		);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(0x222222);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		// add the center axes to our scene.
		axes = new THREE.AxisHelper(5);
		this.scene.add(axes);

		// setup default camera
		this.camera.position.x = -30;
		this.camera.position.y = 40;
		this.camera.position.z = 50;
		this.camera.lookAt(this.scene.position);

		// GUI elements
		setupStats();
		setupControls();

		setupLighting();
		this.scene.add( spotLight );

		this.scene.add(cubeDemo());

		console.log('Welcome to Geometria 3D!');
	}

	app.render = function () {

		stats.update();
		//this.renderer.setSize(window.innerWidth, window.innerHeight);

		requestAnimationFrame(this.render.bind(this)); // verify this bind
		this.renderer.render(this.scene, this.camera);
	}

	function setupStats() {
		
		stats = new Stats();
		
		stats.setMode(0);
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		$("#stats").append( stats.domElement );
		
		return stats;
	}

	function setupControls() {

		controls = new function() {
			this.rotationSpeed = 0.02;
			this.bouncingSpeed = 0.03;
		}

		gui = new dat.GUI();
		gui.add(controls, 'rotationSpeed',0,0.5);
		gui.add(controls, 'bouncingSpeed',0,0.5);
	}

	function setupLighting() {
		spotLight = new THREE.SpotLight( 0xffffff );
		spotLight.position.set( -40, 60, -10 );
		spotLight.castShadow = true;
	}

	function cubeDemo() {

		var BoxGeometry = new THREE.BoxGeometry(4,4,4);
		var cubeMaterial = new THREE.MeshLambertMaterial(
			{
				color: 0xff0000, 
				wireframe: false
			}
		);
		
		var cube = new THREE.Mesh(BoxGeometry, cubeMaterial);
		cube.position.x = -4;
		cube.position.y = 2;
		cube.position.z = 0;
		cube.castShadow = true;
		
		return cube;
	}

})();