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

console.log(typeof DeviceOrientationEvent.requestPermission);

document.getElementById("test").innerHTML = window.navigator.userAgent;
if(((window.DeviceOrientationEvent)&&('ontouchstart' in window))){
    var iosflg=false;
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
    var doflg=false;
    if(iosflg){
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
        main();
    }else{
        document.getElementById("button").disabled = "disabled";
        document.getElementById("dev").innerHTML = "ios12.2以下もしくはその他";
        document.getElementById("txt").innerHTML ="お使いのブラウザは対応しておりませんsorry";
    }
}

function main(){
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
}