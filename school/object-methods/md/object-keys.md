###### `Object.keys(obj)`

* obj - The object whose enumerable own properties are to be returned
<!-- .element: class="fragment" -->



```javascript
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(an_obj)); // console: ['2', '7', '100']

var my_obj = Object.create({}, {
	getFoo: {
		value: function() { return this.foo; }
	}
});

my_obj.foo = 1;

console.log(Object.keys(my_obj)); // console: ['foo']
```
