!function(){
  var _0x=["getElementById","value","trim","toLowerCase","keydown","Enter","123456","games","cookie","location","open","about:blank","_blank","URL","createObjectURL","Blob","text/html","href","replace","https://google.com","alert","500 Internal Server Error","addEventListener","DOMContentLoaded","search","key","name=68; path=/; max-age=3600","/home.html","/picker.html","<style>*{margin:0;padding:0;box-sizing:border-box}body{height:100vh;display:flex;flex-direction:column}header{display:flex;justify-content:center;align-items:center;height:4vh;background:#240046;border-bottom:1px solid #5a189a}header button{margin:0 10px;padding:5px 15px;background:#3c096c;border:2px solid #5a189a;border-radius:10px;color:#e0aaff;font-family:'Prompt',sans-serif;cursor:pointer}header button:hover{filter:brightness(80%);transform:scale(1.07)}iframe{flex:1;border:none;width:100%}</style><header><button id=homeBtn>Home</button><button id=reloadBtn>Reload</button></header><iframe id=mainFrame></iframe><script>document.getElementById('mainFrame').src='"];
  var _0x1="';document.getElementById('homeBtn').onclick=function(){document.getElementById('mainFrame').src='"+location.origin+_0x[27]+"';};document.getElementById('reloadBtn').onclick=function(){document.getElementById('mainFrame').contentWindow.location.reload();};<\/script>";

  function init(){
    var inp = document[_0x[0]](_0x[24]);
    if(!inp) return;
    inp[_0x[22]](_0x[4], function(e){
      if(e[_0x[25]] === _0x[5]){
        e.preventDefault();
        var val = inp[_0x[1]][_0x[2]]()[_0x[3]]();
        if(val === _0x[6] || val === _0x[7]){
          document[_0x[8]] = _0x[26];               // set cookie
          var win = window[_0x[10]](_0x[11], _0x[12]);
          var html = _0x[29] + location.origin + _0x[28] + _0x1; // full HTML
          var blob = new Blob([html], {type: _0x[16]});
          var url = URL[_0x[14]](blob);
          win[_0x[9]][_0x[17]] = url;                // redirect tab to blob
          window[_0x[9]][_0x[18]](_0x[19]);          // replace current tab with google
        } else {
          window[_0x[20]](_0x[21]);                  // alert error
        }
      }
    });
  }

  if(document.readyState === "loading"){
    document[_0x[22]](_0x[23], init);
  } else {
    init();
  }
}();