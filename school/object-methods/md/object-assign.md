###### `Object.assign(target, ...sources)`

* copies all enumerable own properties from one or more source objects to a target object <!-- .element: class="fragment" -->
* returns target object <!-- .element: class="fragment" -->



### Cloning an object

```javascript
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```



### Merging objects

```javascript
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, target object itself is changed.
```



### Primitives will be wrapped to objects

```javascript
var v1 = '123';
var v2 = true;
var v3 = 10;
var v4 = Symbol('foo')

var obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
// Primitives will be wrapped, null and undefined will be ignored.
// Note, only string wrappers can have own enumerable properties.
console.log(obj); // { "0": "1", "1": "2", "2": "3" }
```
