const width = window.innerWidth;
const height = window.innerHeight;

$("body").css('height',height);
$("body").css('width',width);

const rendererThree = new THREE.WebGLRenderer({
	canvas: document.querySelector('canvas')
});
rendererThree.setPixelRatio(window.devicePixelRatio);
rendererThree.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, width / height);
camera.position.set(0, 0, 0);
const controls = new THREE.DeviceOrientationControls(camera, true);
controls.connect();
// const controls2 = new THREE.OrbitControls(camera);
// controls2.enableDamping = true;

const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

let geometry=[];
let material=[];
let box=[];
let num = 4000;

for(var i=0;i<5000;i++){
    geometry[i] = new THREE.SphereGeometry(10);
    material[i] = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors} );
    for(let l=0; l<geometry[i].faces.length; l++){geometry[i].faces[l].color.set(Math.random() * 0xCC0000);}
    box[i] = new THREE.Mesh(geometry[i], material[i]);
    box[i].position.set((Math.random()*num)-num/2,(Math.random()*num)-num/2,(Math.random()*num)-num/2);
    scene.add(box[i]);
}

let g = new THREE.CylinderGeometry( 5, 5, 20, 32 );
let m = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
let b = new THREE.Mesh( g, m );
scene.add( b );
b.position.set(0,0,500);

!function animate(){
    requestAnimationFrame(animate);
    for(var i=0;i<box.length;i++){
        box[i].rotation.y+=0.1;
    }
    controls.update();
    // controls2.update();
    stats.update();
	rendererThree.render(scene, camera);
}();