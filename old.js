!function() {
  var _ = [
    "getElementById",       // 0
    "value",                // 1
    "trim",                 // 2
    "toLowerCase",          // 3
    "keydown",              // 4
    "Enter",                // 5
    "123456",               // 6
    "games",                // 7
    "cookie",               // 8
    "location",             // 9
    "open",                 // 10
    "about:blank",          // 11
    "_blank",               // 12
    "document",             // 13
    "write",                // 14
    "close",                // 15
    "replace",              // 16
    "https://google.com",   // 17
    "alert",                // 18
    "500 Internal Server Error", // 19
    "addEventListener",     // 20
    "DOMContentLoaded",     // 21
    "search",               // 22
    "key",                  // 23
    "name=68; path=/; max-age=3600", // 24
    "/home.html",           // 25
    "/picker.html",         // 26
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{height:100vh;display:flex;flex-direction:column}header{display:flex;justify-content:center;align-items:center;height:4vh;background:#240046;border-bottom:1px solid #5a189a}header button{margin:0 10px;padding:5px 15px;background:#3c096c;border:2px solid #5a189a;border-radius:10px;color:#e0aaff;font-family:\'Prompt\',sans-serif;cursor:pointer}header button:hover{filter:brightness(80%);transform:scale(1.07)}iframe{flex:1;border:none;width:100%}</style><header><button id=homeBtn>Home</button><button id=reloadBtn>Reload</button></header><iframe id=mainFrame></iframe><script>document.getElementById(\'mainFrame\').src=\'' // 27
  ];
  var tail =
    '\';document.getElementById(\'homeBtn\').onclick=function(){document.getElementById(\'mainFrame\').src=\'' +
    location.origin + _[25] +
    '\';};document.getElementById(\'reloadBtn\').onclick=function(){document.getElementById(\'mainFrame\').contentWindow.location.reload();};<\/script>';

  function attach() {
    var s = document[_[0]](_[22]);          // document.getElementById("search")
    if (!s) return;
    s[_[20]](_[4], function(e) {           // addEventListener("keydown")
      if (e[_[23]] === _[5]) {             // e.key === "Enter"
        e.preventDefault();
        var v = s[_[1]][_[2]]()[_[3]]();   // value.trim().toLowerCase()
        if (v === _[6] || v === _[7]) {    // "123456" or "games"
          document[_[8]] = _[24];           // set cookie "name=68..."
          var w = window[_[10]](_[11], _[12]);  // window.open("about:blank","_blank")
          w[_[13]][_[14]](_[27] + location.origin + _[26] + tail); // w.document.write(...)
          w[_[13]][_[15]]();               // w.document.close()
          window[_[9]][_[16]](_[17]);       // location.replace("https://google.com")
        } else {
          window[_[18]](_[19]);             // alert("500 Internal Server Error")
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document[_[20]](_[21], attach);        // wait for DOMContentLoaded
  } else {
    attach();
  }
}();