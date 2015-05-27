//////////	
// MAIN //
//////////

var blue = "#3591ac";

// standard global variables
var container, scene, camera, renderer, controls, stats;

var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var SCREEN_WIDTH;
var SCREEN_HEIGHT;

var FLOOR_WIDTH = 1000;
var FLOOR_HEIGHT = 1000;

// initialization
init();

// animation loop / game loop
animate();


///////////////
// FUNCTIONS //
///////////////
			
function init() 
{
	configure_city();
	configure_floor_sky();	
}

function animate() 
{
  requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	// delta = change in time since last call (in seconds)
	var delta = clock.getDelta(); 

	// functionality provided by THREEx.KeyboardState.js
	// if ( keyboard.pressed("1") ) document.getElementById('message').innerHTML = ' Have a nice day! - 1';	
	// if ( keyboard.pressed("2") ) document.getElementById('message').innerHTML = ' Have a nice day! - 2 ';	
	
	// console.log(camera.position);
	controls.update();
	stats.update();
}

function render() 
{	
	renderer.render( scene, camera );
}

function add_cube(largura, altura, profundidade, posx, posz, relative){

	var set_position_top_left = function(posx, posz){
		var _posx = ((-FLOOR_WIDTH/2)+largura) + posx;
		var _posy =  altura/2;
		var _posz = ((-FLOOR_HEIGHT/2)+profundidade) + posz;

		return [_posx, _posy, _posz];
	} 

	var set_position_bottom_left = function(_posx, _posz){
		var _posx = ((-FLOOR_WIDTH/2)+largura) + _posx;
		var _posy =  altura/2;
		var _posz = ((FLOOR_HEIGHT/2)-profundidade) - _posz;

		return [_posx, _posy, _posz];
	} 

	var set_position_top_right = function(_posx, _posz){
		var _posx = ((FLOOR_WIDTH/2)-largura) - _posx;
		var _posy =  altura/2;
		var _posz = ((-FLOOR_HEIGHT/2)+profundidade) + _posz;

		return [_posx, _posy, _posz];
	} 

	var set_position_bottom_right = function(_posx, _posz){
		var _posx = ((FLOOR_WIDTH/2)-largura) - _posx;
		var _posy =  altura/2;
		var _posz = ((FLOOR_HEIGHT/2)-profundidade) - _posz;

		return [_posx, _posy, _posz];
	} 

	var set_position_center = function(_posx, _posz){
		var _posx = 0 + _posx;
		var _posy =  altura/2;
		var _posz = 0 + _posz;

		return [_posx, _posy, _posz];
	} 

	if(relative == 0) pos_base = set_position_top_left(posx, posz);
	if(relative == 1) pos_base = set_position_bottom_left(posx, posz);
	if(relative == 2) pos_base = set_position_top_right(posx, posz);
	if(relative == 3) pos_base = set_position_bottom_right(posx, posz);
	if(relative == 4) pos_base = set_position_center(posx, posz);

	var color = getRandomColor();
	// Create an array of materials to be used in a cube, one for each side
	var cubeMaterialArray = [];
	// order to add materials: x+,x-,y+,y-,z+,z-
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: color } ) );
	var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
	// Cube parameters: width (x), height (y), depth (z), 
	//        (optional) segments along x, segments along y, segments along z
	var cubeGeometry = new THREE.CubeGeometry( largura, altura, profundidade, 1, 1, 1 );

	// using THREE.MeshFaceMaterial() in the constructor below
	//   causes the mesh to use the materials stored in the geometry
	var cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
	cube.position.set(pos_base[0], pos_base[1], pos_base[2]);
	scene.add( cube );		
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function configure_city(){
	///////////
	// SCENE //
	///////////
	scene = new THREE.Scene();

	////////////
	// CAMERA //
	////////////
	
	// set the view size in pixels (custom or according to window size)
	// var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;	
	// camera attributes
	var VIEW_ANGLE = 45, 
			ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, 
			NEAR = 0.1, 
			FAR = 20000;

	// set up camera
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

	// add the camera to the scene
	scene.add(camera);

	// the camera defaults to position (0,0,0)
	// 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
	camera.position.set(-35,1073, 1277);
	camera.lookAt(scene.position);	
	
	//////////////
	// RENDERER //
	//////////////
	
	// create and start the renderer; choose antialias setting.
	if ( Detector.webgl ) renderer = new THREE.WebGLRenderer( {antialias:true} );
	else renderer = new THREE.CanvasRenderer(); 
	
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	
	////////////
	// EVENTS //
	////////////

	// automatically resize renderer
	THREEx.WindowResize(renderer, camera);

	// toggle full-screen on given key press
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	
	//////////////
	// CONTROLS //
	//////////////

	// move mouse and: left   click to rotate, 
	//                 middle click to zoom, 
	//                 right  click to pan
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	///////////
	// STATS //
	///////////
	
	// displays current and past frames per second attained by scene
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	
	///////////
	// LIGHT //
	///////////
	
	// create a light
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	var ambientLight = new THREE.AmbientLight(0x111111);	
	scene.add(ambientLight);
}

function configure_floor_sky(){
	///////////
	// FLOOR //
	///////////
	
	// note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	// DoubleSide: render texture on both sides of mesh
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry( FLOOR_WIDTH, FLOOR_HEIGHT, 1, 1);

	var floor = new THREE.Mesh( floorGeometry, floorMaterial );
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	
	/////////
	// SKY //
	/////////
	
	// recommend either a skybox or fog effect (can't use both at the same time) 
	// without one of these, the scene's background color is determined by webpage background

	// make sure the camera's "far" value is large enough so that it will render the skyBox!
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	// BackSide: render faces from inside of the cube, instead of from outside (default).
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	// scene.add(skyBox);
	
	// fog must be added to scene before first render
	scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
}