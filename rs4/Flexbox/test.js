$(document).ready(function(e) {
	$("#ex1").click(function(){
		console.log("smth");
        var ex1 = new Animator().addSubject(new CSSStyleSubject("ex1","nongrow","grow"));
        ex1.toggle();
    });
});
