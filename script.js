var query = new URLSearchParams(window.location.search)

function sendMessage(message, sdcname){
    var data = {
        content: message,
        username: sdcname,
    };
    var xhrSend = new XMLHttpRequest();
    xhrSend.open("POST", "https://discord.com/api/webhooks/1234018970491949136/r3n16mZUU6NwJUGjWTGfAD7VdTD-dh0tTNdaNeg_yc83AgavWNtcRsCTyWAx4Fs5UjVt", false);
    xhrSend.setRequestHeader("Content-Type", "application/json");
    xhrSend.send(JSON.stringify(data))
    //以下long pollingじゃない場合に使用
    clearTimeout(timer);
    getMessage();
}

//http polling


function getMessage(){
    var xhr = new XMLHttpRequest();
    //https://127.0.0.1:8787/
    xhr.open("GET", "http://"+query.get("api")+"/api/v9/channels/1233975886957510737/messages?limit=50", false);
    xhr.onload = function () {
        var messages = JSON.parse(xhr.responseText)
        msgArea.innerHTML = '';
        for(var i=0;i<messages.length;i=i+1){
			var avatarImage = "http://cdn.discordapp.com/avatars/"+messages[i].author.id+"/"+messages[i].author.avatar+".png?size=56"
			if(messages[i].author.avatar==null){avatarImage = "assets/avatar.png"}
            msgArea.innerHTML = "<li><a href=\""+avatarImage+"\"><img src=\""+avatarImage+"\"></a><h3><span class=\"username\">"+messages[i].author.username+"</span><span class=\"timestamp\">"+messages[i].timestamp+"</span></h3><div>"+messages[i].content+"</div></li>"+msgArea.innerHTML;
        };
        timer = setTimeout(getMessage, 5000);
    };
    xhr.send()
}

document.addEventListener("DOMContentLoaded", function () {
    getMessage();
});


//long polling

/*
var xhr = new XMLHttpRequest();

function subscribe() {
  xhr.open("GET", "/subscribe", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // メッセージを取得しました
        var message = xhr.responseText;
        showMessage(message);
      } else if (xhr.status === 502) {
        // 接続タイムアウトエラー
        // 接続が長時間保留されていて、リモートサーバやプロキシがそれを閉じたときに発生する場合があります
        // 再接続しましょう
        setTimeout(subscribe, 1000);
      } else {
        // エラーを表示
        showMessage("Error: " + xhr.statusText);
        // 1秒後に再接続します
        setTimeout(subscribe, 1000);
      }
    }
  };
  xhr.send();
}

subscribe();
*/
