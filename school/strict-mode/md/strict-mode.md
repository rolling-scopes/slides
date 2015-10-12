### Changes in strict mode



```javascript
mistypedVaraible = 17;
window.mistypedVaraible === 17 // true
```

```javascript
"use strict";

mistypedVaraible = 17; // Reference Error
```
<!-- .element: class="fragment" -->



```javascript
"use strict";
delete Object.prototype; // throws a TypeError
```



```javascript
"use strict";
var o = { p: 1, p: 2 }; // !!! syntax error
```



```javascript
function sum(a, a, c){ // !!! syntax error
  "use strict";
  return a + b + c;
}
```



```javascript
"use strict";
var sum = 015 + // !!! syntax error
          197 +
          142;
```



```javascript
"use strict";
var x = 17;
with (obj) // !!! syntax error
{
  // If this weren't strict mode, would this be var x, or
  // would it instead be obj.x?  It's impossible in general
  // to say without running the code, so the name can't be
  // optimized.
  x;
}
```



```javascript
var x = 17;
var evalX = eval("'use strict'; var x = 42; x");
// will not introduce variable x in surrounding scope
console.assert(x === 17);
console.assert(evalX === 42);
```



```javascript
"use strict";
eval = 17;
arguments++;
++eval;
var obj = { set p(arguments) { } };
var eval;
try { } catch (arguments) { }
function x(eval) { }
function arguments() { }
var y = function eval() { };
var f = new Function("arguments", "'use strict'; return 17;");
```



```javascript
function f(a){
  "use strict";
  a = 42;
  return [a, arguments[0]];
}

var pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17); // 42 without strict mode
```



```javascript
"use strict";
var f = function() { return arguments.callee; };
f(); // throws a TypeError
```



```javascript
function logThis() {
	'use strict';
	console.log(this); // window without 'use strict'
}

logThis();
```



```javascript
'use strict';

function () {
	return arguments.caller; // throws
}
```



```javascript
function package(protected){ // !!!
  "use strict";
  var implements; // !!!

  interface: // !!!
  while (true){
    break interface; // !!!
  }

  function private() { } // !!!
}
function fun(static) { 'use strict'; } // !!!
```



```javascript
"use strict";
if (true){
  function f() { } // !!! syntax error
  f();
}

for (var i = 0; i < 5; i++){
  function f2() { } // !!! syntax error
  f2();
}

function baz(){ // kosher
  function eit() { } // also kosher
}
```
