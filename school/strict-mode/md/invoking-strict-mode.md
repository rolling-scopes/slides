### Invoking strict mode

```javascript
'use strict';

function helloworld() {
	alert('This function will be executed in strict mode');
}
```



### `use strict` in global scope

```javascript
(function () {
	'use strict';

	function helloworld() {
		alert('This function will be executed in strict mode');
	}
})();
```
<!-- .element: class="fragment" -->
