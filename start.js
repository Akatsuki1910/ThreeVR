function change(){
    $('iframe').css("display","inline");
    $('#title').css("display","none");
    document.body.requestFullscreen();
    var iframe = document.getElementById('frametarget');
    iframe.contentWindow.location.reload(true);
}

var ua = [
    "iPod",
    "iPad",
    "iPhone"
];

document.getElementById("test").innerHTML = window.navigator.userAgent;
var iosflg=false;
if(((window.DeviceOrientationEvent)&&('ontouchstart' in window))){
	for (var i = 0; i < ua.length; i++) {
		if (window.navigator.userAgent.indexOf(ua[i]) > 0) {
            iosflg=true;
            document.getElementById("dev").innerHTML = ua[i];
            document.getElementById("check").disabled = "";
            break;
		}
    }

    if(!iosflg){
        document.getElementById("dev").innerHTML = "android";
        document.getElementById("check").disabled = "";
    }

} else {
    document.getElementById("button").disabled = "disabled";
    document.getElementById("dev").innerHTML = "PC";
    document.getElementById("txt").innerHTML ="お使いのブラウザは対応しておりませんsorry";
}

function check(){
    document.getElementById("check").disabled = "disabled";
    console.log(typeof DeviceOrientationEvent.requestPermission);
    if(iosflg){
        //ios
        //if(typeof DeviceOrientationEvent.requestPermission==="function"){
            try{
                DeviceOrientationEvent.requestPermission().then(res => {
                    //yes
                    if(res === 'granted'){
                        main();
                    //no
                    }else{
                        document.getElementById("button").disabled = "disabled";
                        document.getElementById("dev").innerHTML = "ios12.2以下もしくはその他";
                        document.getElementById("txt").innerHTML ="お使いのブラウザは対応しておりませんsorry";
                    }
                });
            }
            catch(e){
                document.getElementById("button").disabled = "disabled";
                document.getElementById("dev").innerHTML = "ios12.2以下もしくはその他";
                document.getElementById("txt").innerHTML ="お使いのブラウザは対応しておりませんsorry";
                alert(e);
            }
        // not iOS13+
        //}else{
        //    doflg=false;
        //}
    }else{
        //android
        main();
    }
}

// function main(){
//     window.addEventListener("deviceorientation", (dat) => {
//         alpha = dat.alpha;  // z軸（表裏
//         beta  = dat.beta;   // x軸（左右
//         gamma = dat.gamma;  // y軸（上下
//     });
//     var Cap_Beta = 2;
//     var Cap_Gamma = 2;
//     var timer = window.setInterval(() => {
//         displayData();
//         if((-Cap_Beta<=beta&&Cap_Beta>=beta) && (-Cap_Gamma<=gamma&&Cap_Gamma>=gamma)){
//             document.getElementById("flg").innerHTML = "YES";
//             $("#flg").css("color","green");
//             document.getElementById("button").disabled = "";
//         }else{
//             document.getElementById("flg").innerHTML = "NO";
//             $("#flg").css("color","red");
//             document.getElementById("button").disabled = "disabled";
//         }
//     }, 33);

//     var displayData = ()=>{
//         var txt = document.getElementById("txt");
//         txt.innerHTML = "alpha: " + alpha + "<br>"+ "beta:  " + beta  + "<br>"+ "gamma: " + gamma;
//     };
// }

function main(){
    $('#threejs').css("display","inline");
    $('#title').css("display","none");
    document.body.requestFullscreen();

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

    let geometry = new THREE.SphereGeometry(10);
    let material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors} );
    for(let l=0; l<geometry.faces.length; l++){geometry.faces[l].color.set(Math.random() * 0xCC0000);}

    let box=[];
    let num = 4000;

    for(var i=0;i<5000;i++){
        box[i] = new THREE.Mesh(geometry, material);
        box[i].position.set((Math.random()*num)-num/2,(Math.random()*num)-num/2,(Math.random()*num)-num/2);
        scene.add(box[i]);
    }

    let g = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    let m = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
    let b = new THREE.Mesh( g, m );
    scene.add( b );
    b.position.set(0,0,-500);

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
}