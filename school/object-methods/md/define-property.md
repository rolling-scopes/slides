```javascript
Object.defineProperty(
	obj,
	prop,
	descriptor
)
```

* obj - The object on which to define the property <!-- .element: class="fragment" -->
* prop - The name of the property to be defined or modified <!-- .element: class="fragment" -->
* descriptor - The descriptor for the property being defined or modified <!-- .element: class="fragment" -->



### Descriptor

```javascript
var descriptor = {
	configurable: false,
	enumerable: false,
	value: undefined,
	writable: false,
	get: function () { return this._prop; }, // default is undefined
	set: function (value) {
		this._prop = value;
		console.log(value);
		return value;
	}
};
```



### Descriptor properties



configurable

`true` if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
Defaults to `false`

<!-- .element: class="fragment" -->



enumerable

`true` if and only if this property shows up during enumeration of the properties on the corresponding object.
Defaults to `false`

<!-- .element: class="fragment" -->



value

The value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
Defaults to `undefined`

<!-- .element: class="fragment" -->



writable

`true` if and only if the value associated with the property may be changed with an assignment operator.
Defaults to `false`

<!-- .element: class="fragment" -->



get

A function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property.
Defaults to `undefined`

<!-- .element: class="fragment" -->



set

A function which serves as a setter for the property, or undefined if there is no setter. The function will receive as only argument the new value being assigned to the property.
Defaults to `undefined`

<!-- .element: class="fragment" -->



### Examples



```javascript
var o = {}; // Creates a new object

Object.defineProperty(o, 'a', {
  value: 37,
  writable: false
});

console.log(o.a); // logs 37
o.a = 25; // throws in strict mode
console.log(o.a); // logs 37. The assignment didn't work.
```



```javascript
var o = {};
Object.defineProperty(o, 'a', { value: 1, enumerable: true });
Object.defineProperty(o, 'b', { value: 2, enumerable: false });
Object.defineProperty(o, 'c', { value: 3 }); // enumerable defaults to false
o.d = 4; // enumerable defaults to true when creating a property by setting it

for (var i in o) {
  console.log(i);
}
// logs 'a' and 'd' (in undefined order)

Object.keys(o); // ['a', 'd']

o.propertyIsEnumerable('a'); // true
o.propertyIsEnumerable('b'); // false
o.propertyIsEnumerable('c'); // false
```



```javascript
var o = {};
Object.defineProperty(o, 'a', {
  get: function() { return 1; },
  configurable: false
});

Object.defineProperty(o, 'a', { configurable: true }); // throws a TypeError
Object.defineProperty(o, 'a', { enumerable: true }); // throws a TypeError
Object.defineProperty(o, 'a', { set: function() {} }); // throws a TypeError (set was undefined previously)
Object.defineProperty(o, 'a', { get: function() { return 1; } }); // throws a TypeError (even though the new get does exactly the same thing)
Object.defineProperty(o, 'a', { value: 12 }); // throws a TypeError

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1
```



```javascript
var obj = {};

Object.defineProperty(obj, {
	get: function () { return this._prop; },
	set: function (value) {
		this._prop = value;
		console.log(value);
		return value;
	}
};
```
