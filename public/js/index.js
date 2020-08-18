
$("form").submit(function(e) {
    var inp=document.querySelector("input").value
    e.preventDefault();
        var maxm=10000;
        var minm=99999
        var room=Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  window.location.href="/gameplay?name=" + inp + "&room=" + room

})