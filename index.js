const width = window.innerWidth;
const height = window.innerHeight;

const rendererThree = new THREE.WebGLRenderer({
	canvas: document.querySelector('canvas')
});
rendererThree.setPixelRatio(window.devicePixelRatio);
rendererThree.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, width / height);
camera.position.set(0, 0, 1000);
const controls = new THREE.DeviceOrientationControls(camera, true);
controls.connect();
const controls2 = new THREE.OrbitControls(camera);
controls2.enableDamping = true;

const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

let geometry=[];
let material=[];
let box=[];
let num = 900;

for(var i=0;i<100;i++){
    geometry[i] = new THREE.CylinderGeometry(50, 50, 400, 10, 10, false );
    material[i] = new THREE.MeshBasicMaterial( { color: 0x008866, wireframe:true} );
    box[i] = new THREE.Mesh(geometry[i], material[i]);
    box[i].position.set((Math.random()*num)-num/2,(Math.random()*num)-num/2,(Math.random()*num)-num/2);
    scene.add(box[i]);
}


!function animate(){
    requestAnimationFrame(animate);
    for(var i=0;i<100;i++){
        box[i].rotation.x++;
    }
    controls.update();
    // controls2.update();
    stats.update();
	rendererThree.render(scene, camera);
}();

window.addEventListener("deviceorientation", function(event){
    console.log('alpha:', event.alpha);
    console.log('beta:', event.beta);
    console.log('gamma:', event.gamma);
});