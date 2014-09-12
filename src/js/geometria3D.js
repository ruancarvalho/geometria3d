/// <reference path="_references.js" />

(function () {
	
	this.geometria3D = this.geometria3D || {};
	var app = this.geometria3D;

	app.scene = {};
	app.camera = {};
	app.renderer = {};

	var ambientLight = {};
	var spotLight = {};
	var axes = {};
	var stats = {};
	var gui = {};
	var controls = {};

	var count = 1;

	app.initialize = function () {

		var w = $('body').innerWidth();;
		var h = $(document).height();

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			45, 
			w / h, 
			0.1, 
			1000
		);

		if ( Detector.webgl ) {
			//this.renderer = new THREE.WebGLRenderer();
			this.renderer = new THREE.WebGLRenderer( {antialias:true} );
		}
		else
			renderer = new THREE.CanvasRenderer(); 

		this.renderer.setClearColor(0x222222);
		this.renderer.setSize(w, h);

		// add the center axes to our scene.
		axes = new THREE.AxisHelper(5);
		this.scene.add(axes);

		// setup default camera
		this.camera.position.x = -15;
		this.camera.position.y = 15;
		this.camera.position.z = 15;
		this.camera.lookAt(this.scene.position);

		var size = 10;
		var step = 1;

		var gridHelper = new THREE.GridHelper( size, step );		
		this.scene.add( gridHelper );

		// GUI elements
		setupStats();
		//setupControls();

		this.controls = new THREE.OrbitControls(this.camera);
		this.controls.enabled = true;

		setupLighting();
		this.scene.add(ambientLight);
		this.scene.add( spotLight );

		this.scene.add(cubeDemo());

		console.log('Welcome to Geometria 3D!');
		console.log('> viewport at ' + w + ' x ' + h);
	}

	/*
	 * Renders everything
	 */
	app.render = function () {

		stats.update();
		this.controls.update();

		requestAnimationFrame(this.render.bind(this));
		this.renderer.render(this.scene, this.camera);
	}

	app.addCube = function () {

		var cubeSize = Math.ceil(4);
        var cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
        var cubeMaterial = new THREE.MeshLambertMaterial({color:  Math.random() * 0xffffff });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        //cube.castShadow = true;
        cube.name = "cube-" + this.scene.children.length;

        console.log(cube.name);
        count++;
        // position the cube randomly in the scene
	    cube.position.x= -4 * count;
	    cube.position.y=  2;
	    cube.position.z= 0;

        // add the cube to the scene
        this.scene.add(cube);
        //this.numberOfObjects = scene.children.length;
	}

	function setupStats() {
		
		stats = new Stats();
		
		stats.setMode(0);
		stats.domElement.style.position = 'relative';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		$("#stats").append( stats.domElement );
		
		return stats;
	}

	function setupControls() {

		controls = new function() {
			this.rotationSpeed = 0.02;
			this.addCube = function() {

                var cubeSize = Math.ceil(4);
                var cubeGeometry = new THREE.CubeGeometry(cubeSize,cubeSize,cubeSize);
                var cubeMaterial = new THREE.MeshLambertMaterial({color:  Math.random() * 0xffffff });
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;
                cube.name = "cube-" + app.scene.children.length;


                // position the cube randomly in the scene
                cube.position.x=-4;
                cube.position.y= 0;
                cube.position.z=-2;

                // add the cube to the scene
                app.scene.add(cube);
                this.numberOfObjects = app.scene.children.length;
            };

            this.numberOfObjects = app.scene.children.length;

            this.outputObjects = function() {
                console.log(app.scene.children);
            }
		}

		gui = new dat.GUI();
		gui.add(controls, 'rotationSpeed',0,0.5);
		gui.add(controls, 'addCube');
		gui.add(controls, 'outputObjects');
        gui.add(controls, 'numberOfObjects').listen();
	}

	function setupLighting() {

		ambientLight = new THREE.AmbientLight(0x0c0c0c);
		ambientLight.position.set( -45, 90, 60 );
		
		spotLight = new THREE.SpotLight( 0xffffff );
		//spotLight.position.set( -40, 60, -10 );
		spotLight.position.set( -45, 90, 60 );
		//spotLight.castShadow = true;
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
		cube.position.x = 0;
		cube.position.y = 2;
		cube.position.z = 0;
		cube.castShadow = true;
		
		return cube;
	}

	app.setCameraPerspective = function() {

		var w = $('body').innerWidth();;
		var h = $(document).height();

		if (this.camera instanceof THREE.OrthographicCamera) {

			this.camera = new THREE.PerspectiveCamera(
				45, 
				w / h, 
				0.1, 
				1000
			);
			
			this.camera.position.x = -15;
			this.camera.position.y = 15;
			this.camera.position.z = 15;
			this.camera.lookAt(this.scene.position);
			
			this.perspective = "Perspective";

			// check this. might create too many controls
			this.controls = new THREE.OrbitControls(this.camera);
			this.controls.enabled = true;
		};
	}

	app.setCameraOrthographic = function() {

		var w = $('body').innerWidth();;
		var h = $(document).height();

		if (this.camera instanceof THREE.PerspectiveCamera) {

			this.camera = new THREE.OrthographicCamera(
				-20, 
				 20, 
				 10, 
				-10,
				-200,
				500
			);

			this.camera.position.x = -15;
			this.camera.position.y = 15;
			this.camera.position.z = 15;
			this.camera.lookAt(this.scene.position);
			
			this.perspective = "Orthographic";
		}

					// check this. might create too many controls
			this.controls = new THREE.OrbitControls(this.camera);
			this.controls.enabled = true;
	}

})();