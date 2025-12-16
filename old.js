!function(){
  var _0x1a2b = ["getElementById","style","display","none","keydown","slice","includes"];
  var _0xsecret = String.fromCharCode(49,50,51,52,53,54);

  document["addEventListener"]("DOMContentLoaded", function(){
    var blankLink = document[_0x1a2b[0]]("blan");
    if (blankLink) {
      blankLink[_0x1a2b[1]][_0x1a2b[2]] = _0x1a2b[3];
    }

    let listofchars = "";

    window["addEventListener"](_0x1a2b[4], function(e){
      listofchars += e.key;
      if (listofchars["length"] > 10) {
        listofchars = listofchars[_0x1a2b[5]](-10);
      }

      if (listofchars[_0x1a2b[6]](_0xsecret)) {
        blankLink[_0x1a2b[1]][_0x1a2b[2]] = "";
        listofchars = "";
      }
    });
  });
}();