###### `Object.observe(obj, cb[, acceptList])`

Asyncronously observe the changes to an object
<!-- .element: class="fragment" -->

<small>
ES7 proposal (Chrome 36+)
<!-- .element: class="fragment" -->
</small>




###### Accept list

types of changes to be observed

* add <!-- .element: class="fragment" -->
* update <!-- .element: class="fragment" -->
* delete <!-- .element: class="fragment" -->
* reconfigure <!-- .element: class="fragment" -->
* setPrototype <!-- .element: class="fragment" -->
* preventExtensions <!-- .element: class="fragment" -->



###### `cb(changes)`

* changes - array of objects each representing a change <!-- .element: class="fragment" -->

* change props: <!-- .element: class="fragment" -->
	* name - name of property which was changed <!-- .element: class="fragment" -->
	* object - result object after change was made <!-- .element: class="fragment" -->
	* type - type of change (add, update, delete) <!-- .element: class="fragment" -->
	* oldValue - the value before change (presents only in update and delete changes) <!-- .element: class="fragment" -->
