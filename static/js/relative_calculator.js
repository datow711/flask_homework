var relationShipChain = [];
const relationShipMapping = {
    "爸爸": "父",
    "媽媽": "母",
    "哥哥": "兄",
    "弟弟": "弟",
    "妹妹": "妹",
    "姐姐": "姊",
    "丈夫": "夫",
    "妻子": "妻",
    "兒子": "子",
    "女兒": "女"
};

$(document).ready(function () {
    $('#sidebar').load('sidebar', function () {
        $(".relatives-calculator").addClass("selected-page");
    });
    document.getElementById('rIpt').addEventListener('input', () => {
        console.log(this.value);
    });
    $(`.calculator_bd .rel-btn`).click(function(event) {
        let targetID = event.target.id;
        if (targetID === "")
            targetID = event.target.parentNode.id;
        relationShipChain.push(relationShipMapping[targetID]);
        console.log(event.target.id);
        console.log(relationShipChain);
    });
    $(`#calClear`).click(function(event) {
        relationShipChain = [];
    });
});

//load data from json file and save it into a variable
var data = (function () {
    var json = null;
    $.ajax({
        'async'    : false,
        'global'   : false,
        'url'      : "./static/relationship.json",
        'dataType' : "json",
        'success'  : function (data) {
            json = data;
        }
    });
    return json;
})();

console.log(data);
var result;

function equal(){
    setTimeout(function(){
        result=document.getElementById('rIpt').value; 
        document.getElementById('callMe').innerHTML=result; 
        seekData(result)
    },500);

    function seekData(result){
        console.log(result);
        // var found=0;
        // for(let i = 0; i < data.length; i++){
        //     // console.log(data[i]["稱謂（漢）"]);
        //     // console.log(data[i]["稱謂（漢）"]+"=="+result);
        //     // if(data[i]["稱謂（漢）"] == result){
        //     //     // console.log(data[i]["稱謂（台）"]);
        //     //     document.getElementById('callMe').innerHTML = data[i]["稱謂（台）"];
        //     //     document.getElementById('callTai').innerHTML="【"+data[i]["臺羅拼音"]+"】";
        //     //     var audioPlayer = document.getElementById('audioPlayer');
        //     //     audioPlayer.src = "./static/data/wavs/"+data[i]["稱謂（台）"]+".wav";
        //     //     document.getElementById('taiShow').style.display="flex";
        //     //     found=1;
        //     //     break;
        //     // }
        // }
        if(1){
            // document.getElementById('taiShow').style.display="none";
            $.ajax({
                "url"         : "/relatives-calculator",
                "method"      : "post",
                "contentType" : "application/json",
                "dataType"    : "json",
                "data"        : JSON.stringify({ "relation-chain": relationShipChain }),
                "success"     : (response) => {
                    console.log(response["message"]);
                    document.getElementById('callMe').innerHTML = response["message"]["self"][0][1];
                    document.getElementById('callTai').innerHTML="【"+response["message"]["self"][0][2]+"】";
                    var audioPlayer = document.getElementById('audioPlayer');
                    audioPlayer.src = "./static/data/wavs/"+response["message"]["self"][0][1]+".wav";
                    document.getElementById('taiShow').style.display="flex";
                    console.log(response);
                    document.getElementById('rIpt').value = response["message"]["self"][0][0];
                }
            });
        }
        // document.getElementById('callMe').innerHTML=result;
    }
};

function playAudio() {
    var audioPlayer = document.getElementById('audioPlayer');

    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    }
}