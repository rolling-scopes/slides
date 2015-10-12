###### `Object.create(proto)`

* proto - The object which should be the prototype of the newly-created object
<!-- .element: class="fragment" -->



### Classical inheritance

```javascript
function Shape() {
  this.x = 0;
  this.y = 0;
}

function Rectangle() {
  Shape.call(this); // call super constructor.
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Shape); // true
```
