const THREE = require('three');
/**
 * Created by eason on 6/2/16.
 */
var container;
var camera, scene, renderer;
var mesh, geometry, material;
var worldWidth = 128, worldDepth = 128;
var clock = new THREE.Clock();

function init() {
    container = document.getElementById( 'background' );
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 18000 );
    camera.position.z = 100;
    camera.position.y = 0;
    camera.lookAt({
        x : 0,
        y : 0,
        z : 0
    });
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );
    geometry = new THREE.PlaneGeometry( 20000, 20000, worldWidth - 1, worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );
    for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
        geometry.vertices[ i ].y = 35 * Math.sin( i / 2 );
    }
    var texture = new THREE.TextureLoader().load( `./images/water.jpg` );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 5 );
    material = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: texture } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xaaccff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    var time = clock.getElapsedTime() * 10;
    for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
        geometry.vertices[ i ].y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
    }
    mesh.geometry.verticesNeedUpdate = true;
    if(camera.position.y < 150){
        camera.position.y++;
    }
    renderer.render( scene, camera );
}

exports.init = init;
exports.animate = animate;
