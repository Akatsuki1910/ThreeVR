var ua = [
	"iPod",
	"iPad",
	"iPhone"
];

function success() {
	document.getElementById("txt").innerHTML = "ボタンを押してください!";
	document.getElementById("check").disabled = "";
}

function failure() {
	document.getElementById("txt").innerHTML = "このデバイスでは対応しておりません";
}


document.getElementById("test").innerHTML = window.navigator.userAgent;
var iosflg = false;
if (((window.DeviceOrientationEvent) && ('ontouchstart' in window))) {
	//mobile
	for (var i = 0; i < ua.length; i++) {
		if (window.navigator.userAgent.indexOf(ua[i]) > 0) {
			iosflg = true;
			success();
			break;
		}
	}

	if (!iosflg && window.navigator.userAgent.indexOf("Android") > 0) {
		success();
	}

} else {
	//pc
	failure();
}

function check() {
	document.getElementById("check").disabled = "disabled";
	if (iosflg) {
		//ios
		try {
			DeviceOrientationEvent.requestPermission().then(res => {
				//yes
				if (res === 'granted') {
					main();
					//no
				} else {
					failure();
				}
			});
		} catch (e) {
			failure();
			alert(e);
		}
	} else {
		//android
		main();
	}
}

var manager = nipplejs.create({
	zone: document.getElementById('pixiview'),
	catchDistance: 150,
	color: 'white'
});

manager.on("move",(e,n)=>{
	console.log(n.angle.degree);
});

function main() {
	document.getElementById("pixiview").style.display = "inline";
	document.getElementById("title").style.display = "none";
	// document.body.requestFullscreen();//ios非対応

	window.resizeTo(window.innerWidth, window.innerHeight);
	var width = window.innerWidth;
	var height = window.innerHeight;

	var stage = new PIXI.Container();
	var renderer = PIXI.autoDetectRenderer({
		width: width,
		height: height,
		resolution: 1,
		antialias: true,
		transparent: true
	});
	document.getElementById('pixiview').appendChild(renderer.view);

	var word = "";
	var style = {
		fontFamily: 'Arial',
		fontSize: '40px',
		fill: 'white',
		fontWeight: "bold"
	};
	var obj = new PIXI.Text(word, style);
	obj.position.x = width / 2;
	obj.position.y = height / 2;
	obj.anchor.x = 0.5;
	obj.anchor.y = 0.5;
	stage.addChild(obj);
	manager.on("move",(e,n)=>{
		obj.text=Math.floor(n.angle.degree * 1000)/1000;
	});

	//threejs
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
	// const controls2 = new THREE.OrbitControls(camera);//pc用
	// controls2.enableDamping = true;

	const stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);

	// var axes = new THREE.AxesHelper(1000); なぜか表示されない
	// scene.add(axes);

	let geometry = new THREE.SphereGeometry(10);
	let material = new THREE.MeshBasicMaterial({
		vertexColors: THREE.FaceColors
	});
	for (let l = 0; l < geometry.faces.length; l++) {
		geometry.faces[l].color.set(Math.random() * 0xCC0000);
	}

	let box = [];
	let num = 4000;

	for (var i = 0; i < 5000; i++) {
		box[i] = new THREE.Mesh(geometry, material);
		box[i].position.set((Math.random() * num) - num / 2, (Math.random() * num) - num / 2, (Math.random() * num) - num / 2);
		scene.add(box[i]);
	}

	let g = new THREE.CylinderGeometry(5, 5, 20, 32);
	let m = new THREE.MeshBasicMaterial({
		color: 0xFF0000
	});
	let b = new THREE.Mesh(g, m);
	scene.add(b);
	b.position.set(0, 0, -500);


	// onResize(); リサイズいらなくなった
	// window.addEventListener('resize', onResize);

	// function onResize() {
		// const width = window.innerWidth;
		// const height = window.innerHeight;

		// renderer.resize(width,height);
		// obj.position.x = width / 2;
		// obj.position.y = height / 2;
		// obj.anchor.x = 0.5;
		// obj.anchor.y = 0.5;

		// rendererThree.setPixelRatio(window.devicePixelRatio);
		// rendererThree.setSize(width, height);

		// camera.aspect = width / height;
		// camera.updateProjectionMatrix();
	// }

	window.addEventListener("deviceorientation", handleOrientation, true);//デバッグ
	function handleOrientation(event) {
		var absolute = event.absolute;
		var alpha    = event.alpha;
		var beta     = event.beta;
		var gamma    = event.gamma;
		console.log(alpha,beta,gamma);
	}

	(function animate() {
		requestAnimationFrame(animate);
		for (var i = 0; i < box.length; i++) {
			box[i].rotation.y += 0.1;
		}
		controls.update();
		// controls2.update();
		stats.update();
		rendererThree.render(scene, camera);
		renderer.render(stage);
	}());
}