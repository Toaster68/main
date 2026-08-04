!function(){
  var _0x5f=["getElementById","value","trim","toLowerCase","keydown","Enter","123456","games","cookie","location","open","about:blank","_blank","write","close","replace","https://google.com","alert","500 Internal Server Error","addEventListener","DOMContentLoaded","search","key","name=68; path=/; max-age=3600","/home.html","/picker.html","<style>*{margin:0;padding:0;box-sizing:border-box}body{height:100vh;display:flex;flex-direction:column}header{display:flex;justify-content:center;align-items:center;height:4vh;background:#240046;border-bottom:1px solid #5a189a}header button{margin:0 10px;padding:5px 15px;background:#3c096c;border:2px solid #5a189a;border-radius:10px;color:#e0aaff;font-family:'Prompt',sans-serif;cursor:pointer}header button:hover{filter:brightness(80%);transform:scale(1.07)}iframe{flex:1;border:none;width:100%}</style><header><button id=homeBtn>Home</button><button id=reloadBtn>Reload</button></header><iframe id=mainFrame></iframe><script>document.getElementById('mainFrame').src='"];
  var _0x1e="';document.getElementById('homeBtn').onclick=function(){document.getElementById('mainFrame').src='"+location.origin+_0x5f[26]+"';};document.getElementById('reloadBtn').onclick=function(){document.getElementById('mainFrame').contentWindow.location.reload();};<\/script>";

  function start(){
    var s = document[_0x5f[0]](_0x5f[23]);
    if(!s) return;
    s[_0x5f[19]](_0x5f[4], function(e){
      if(e[_0x5f[24]] === _0x5f[5]){
        e.preventDefault();
        var v = s[_0x5f[1]][_0x5f[2]]()[_0x5f[3]]();
        if(v === _0x5f[6] || v === _0x5f[7]){
          document[_0x5f[8]] = _0x5f[25];                // set cookie
          var w = window[_0x5f[10]](_0x5f[11], _0x5f[12]);
          w[_0x5f[9]].document[_0x5f[13]](_0x5f[28] + location.origin + _0x5f[27] + _0x1e);
          w[_0x5f[9]].document[_0x5f[14]]();
          window[_0x5f[9]][_0x5f[15]](_0x5f[16]);
        } else {
          window[_0x5f[17]](_0x5f[18]);
        }
      }
    });
  }

  if(document.readyState === "loading"){
    document[_0x5f[19]](_0x5f[20], start);
  } else {
    start();
  }
}();