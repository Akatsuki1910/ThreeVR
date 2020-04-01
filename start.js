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

if(((window.DeviceOrientationEvent)&&('ontouchstart' in window))){
    var iosflg=false;
	for (var i = 0; i < ua.length; i++) {
		if (navigator.userAgent.indexOf(ua[i]) > 0) {
            flg=true;
            break;
		}
    }
    var doflg=false;
    if(flg){
        //ios
        if(typeof DeviceOrientationEvent.requestPermission==="function"){
            DeviceOrientationEvent.requestPermission().then(res => {
                //yes
                if(res==="granted"){
                    doflg=true;
                //no
                }else{
                    doflg=false;
                }
            });
        // not iOS13+
        }else{
            doflg=false;
        }
    }else{
        //android
        doflg=true;
    }
    if(doflg){
        window.addEventListener("deviceorientation", (dat) => {
            alpha = dat.alpha;  // z軸（表裏
            beta  = dat.beta;   // x軸（左右
            gamma = dat.gamma;  // y軸（上下
        });
        var Cap_Beta = 2;
        var Cap_Gamma = 2;
        var timer = window.setInterval(() => {
            displayData();
            if((-Cap_Beta<=beta&&Cap_Beta>=beta) && (-Cap_Gamma<=gamma&&Cap_Gamma>=gamma)){
                document.getElementById("flg").innerHTML = "YES";
                $("#flg").css("color","green");
                document.getElementById("button").disabled = "";
            }else{
                document.getElementById("flg").innerHTML = "NO";
                $("#flg").css("color","red");
                document.getElementById("button").disabled = "disabled";
            }
        }, 33);

        var displayData = ()=>{
            var txt = document.getElementById("txt");
            txt.innerHTML = "alpha: " + alpha + "<br>"+ "beta:  " + beta  + "<br>"+ "gamma: " + gamma;
        };
    }else{
        document.getElementById("button").disabled = "disabled";
    }
} else {
    document.getElementById("button").disabled = "disabled";
}