## Modules in JS. NPM



### Node.js
v8 + libuv + extensions (file system, network, etc)


### Install node.js
* Download (windows way)
* apt-get/brew
* n (sorry Windows)


### [N](https://github.com/tj/n)
Node version management for humans

To install node.js, install n<!-- .element class="fragment" -->

To install n, install node.js <!-- .element class="fragment" -->

??? <!-- .element class="fragment" -->


### n-install
```sh
curl -L http://git.io/n-install | bash
```


### install node.js (finally)
```sh
n latest
n stable
n lts
```


### Switch node version
```sh
n
```
![n demo](https://camo.githubusercontent.com/66e762002c2453c4756494f8dc4dea8a6665f240/68747470733a2f2f692e636c6f756475702e636f6d2f353963413856454461652e676966)


### Write some js
```js
// hello-world.js
console.log('hello node.js! 😺');
```

and run it with node <!-- .element class="fragment" -->
```sh
node hello-world.js
```
<!-- .element class="fragment" -->



### CommonJS
is a project with the goal of specifying an ecosystem for JavaScript outside the browser


### CommonJS modules contract


module should have function `require`


`require` returns the exported API of the foreign module


module should have variable `exports` that is an object that the module may add its API to as it executes


module should have property `id`


`require(module.id)`

returns the `exports` object from which the `module.id` originated


#### Node.js implementation of CommonJS modules

* `module.id` is path to file (no need to set this id manually)
* `require()` resolves relative paths
* `exports` variable is just an alias for `module.exports`


### Split your code into modules
```js
// math.js
function factorial(number) {
	if (numer === 2) {
		return 2;
	}

	return factorial(number) * factorial(number - 1);
}

exports.factorial = factorial;
```

```js
// index.js
const factorial = require('./math').factorial;
// you can omit file extension

const result = factorial(5);
console.log(result);
```



### NPM

NPM – node package manager


### NPM cli and `package.json`


`package.json` is a manifest for NPM


### `"name"`

```json
{
  "name": "hello-npm"
}
```


### `"version"`

```json
{
  "version": "1.0.0"
}
```


### `"description"`

```json
{
  "description": "Hello NPM"
}
```


### `"main"`

```json
{
  "main": "index.js"
}
```


### NPM cli and `package.json`


`npm init`

```json
{
  "name": "node-examples",
  "version": "1.0.0",
  "description": "",
  "main": "hello-world.js",
  "dependencies": {
    "express": "^4.13.4",
    "debug": "^2.2.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```


```sh
npm install
npm install --production
npm install express@4.13.4 --save
npm install debug --save-dev
```

<small>alias: `npm i`</small>

```json
{
  "dependencies": {
    "express": "^4.13.4"
  },
  "devDependencies": {
    "debug": "^2.2.0"
  }
}
```

node_modules folder <!-- .element class="fragment" -->


```sh
npm start
npm test
npm run debug
```

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node index.js",
  "debug": "node --debug index.js"
}
```


### Global install

```sh
[sudo] npm install <some-cli-tool> -g
```

```json
{
  "bin": {
    "my-tool": "./path/to/executable"
  }
}
```
<!-- .element class="fragment" -->

```js
#!/usr/bin/env node

console.log('hello world!');
```
<!-- .element class="fragment" -->



### [How require really works?](https://nodejs.org/api/modules.html#modules_all_together)



### Problem with relative paths
```js
const Article = require('../../../models/article');
//                       ^^^^^^^^
//                          😿
```

```js
const Article = require('app/models/article');
```
<!-- .element class="fragment" -->


### Solution
#### Symlink

* Create a symlink under node_modules to your app directory
* Linux: `ln -nsf node_modules app`
* Windows: `mklink /D app node_modules`


### NODE_PATH

```json
{
  "scripts": {
    "start": "NODE_PATH=. node app"
  }
}
```


### [more solutions](https://gist.github.com/branneman/8048520)
