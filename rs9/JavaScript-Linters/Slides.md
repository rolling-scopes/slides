
# JavaScript Linters

***

# Linting

Syntax validation to eliminate suspicious code and violations of code style.

***

![](crock.png)

***

# Suspicious code (bugs potentially)

Undefined variables

```javascript
function bad() {
    return foo;
}
```

***
# Suspicious code (bugs potentially)

Lack of brackets

```javascript
if (someVal)
    someVal += otherVal;
    someVal++;
    return someVal;    
```

*** 
# Code Style

Invalid

```javascript
function BAD_func (b , c){ 
      var a = 3333
    return a;
  }
```

Valid

```javascript
function goodFunc(b, c) { 
    var a = 3333;
    return a;
}
```

***

# [JSLint]

- http://jslint.com
- &copy; Douglas Crockford, 2002
- enforcing "The Good Parts"

![](jslint.png)

****

# [JSHint]

- http://jshint.org
- &copy; Anton Kovalyov, 2010
- more configurable, less strict by default

![](jshint.png)

****

# How to use 

- CLI application `jshint file.js`
- config file `.jshintrc`, JSON with comments

***

# .jshintrc

- rules (boolean or string)
- environments (browser, node, etc.)
- globals

```json
{
    "bitwise"       : true,
    "camelcase"     : true, 
    "quotmark"      : "single",

    "node": true,

    "globals": {
        "foo": true,
        "bar": false // readonly
    }
}
```

***

# Configuration per file

```javascript
/*globals foo: false, baz: false */
/*jshint camelcase: false */

var bar = 444;

/* jshint ignore:start */
foo = 777;
var FooBar = 888;
/* jshint ignore:end */
```

***

# Output

- list of errors 
- line and position of error, description
- different formats (human readable, JSON, XML, etc.)

```javascript
var foo = function() {
    return a;
};
```

```
jshint example.js
```

```
example1.js: line 2, col 5, Missing "use strict" statement.
example1.js: line 2, col 12, 'a' is not defined.
example1.js: line 1, col 8, 'foo' is defined but never used.

3 errors
```

***
# Favorite rules
****

### `undef` Require all non-global variables to be declared (prevents global leaks)

Not valid
```javascript
function bad() {
    return foo;
}
```

Valid
```javascript
function good() {
    var foo;
    return foo;
}
```

****

### `unused` Require all defined variables be used

Not valid
```javascript
function bad(baz) {
    var foo = 5;
    return foo;
}
```

Valid
```javascript
function good() {
    var foo = 5;
    return foo;
}
```

***

### `asi` Require semicolons

Not valid
```javascript
function bad(baz) {
    var foo = 5
    return foo
}
```

Valid
```javascript
function good() {
    var foo = 5;
    return foo;
}
```
***

### `curly` Require {} for every new block or scope

Not valid
```javascript
function bad(baz) {
    if (baz > 5)
        return baz;
    return 10;
}
```

Valid
```javascript
function good() {
    if (baz > 5) {
        return baz;
    }
    return 10;
}
```

***

### `newcap` Require capitalization of all constructor functions 
### `camelcase` Identifiers must be in camelCase

Not valid
```javascript
var my_bar = new bar();
```

Valid
```javascript
var myBar = new Bar();
```

****

### `indent` Spaces to indent 
### `quotmark` Quotation mark

Not valid
```javascript
function bad(){
return 'foo' + "bar";
}
```

Valid
```javascript
function bad(){
    return 'foo' + 'bar';
}
```

***

# Under the trunk

- tokenize JavaScript

***

# JSHint 3.0

- more modular 
- user rules
- get rid of code style checking

***

# Enter [Esprima]

***

# [ESLint]

- http://eslint.org
- working with AST 
- more sofisticated and complex rules
- more robust alert levels (ignore, warning or error)
- 99% rules of [JSHint]
- each rule in separate file
- environments with globals and rules
- user can write own rules

![](eslint.png)

***

# Same configuration as [JSHint]

- `.eslintrc` (JSON or YAML)
- `/*eslint ... */` 

***

# Favorite rules

****

### `no-dupe-keys` Disallow duplicate keys

Not valid
```javascript
var foo = {
    bar: "baz",
    bar: "qux"
};
```

Valid
```javascript
var foo = {
    bar: "baz"
};
```
****

### `block-scoped-vars` Threat var as block scoped

Not valid
```javascript
function doSomething(a) {
    if (a) {
        var build = true;
    }
    console.log(build);
}
```

Valid 
```javascript
function doSomething(a) {
    var build;
    if (a) {
        build = true;
    }
    console.log(build);
}
```

****

### `consistent-this` Require consistent `this`
```
"consistent-this": [2, "self"]
```

Not valid
```javascript
var that = this;
```

Valid
```javascript
var self = this;
```

****

### `func-style` Enforce function style

```
"func-style": [2, "expression"]
```

Not valid
```javascript
function foo(){};
```

Valid
```javascript
var foo = function(){};
```

***

### `radix` require radix for `parseInt`

Not valid
```javascript
var a = parseInt("055");
```

Valid
```javascript
var a = parseInt("055", 10);
```
****

### `semi` can enforce absent of semi

```
semi: [2, "never"]
```

****

# Drawbacks

- still in-dev
- does not support ES6+ (will be 0.5.0)
- a bit slow (5x [JSHint])

****

# [JSCS]

- https://github.com/mdevils/node-jscs 
- JavaScript Code Style checker
- based on Esprima

****

# Favorite rules

****

### `disallowImplicitTypeConversion`

Not valid
```javascript
var a = !!someVar;
var b = +someInt;
var c = '' + someStr;
```

Valid
```javascript
var a = Boolean(someVar);
var b = Integer(someInt);
var c = String(someStr);
```

****

### `requireCurlyBraces` Requires curly braces after statements

```json 
{
    "requireCurlyBraces": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "try",
        "catch"
    ]
}
```

****

### `requireSpaceAfterKeywords`, `disallowSpaceAfterKeywords`

```json
{
    "requireSpaceAfterKeywords": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "return",
        "try",
        "catch",
        "case"
    ],
    "disallowSpaceAfterKeywords": [
        "default"
    ]
}
```

***

# All code style

- `validateLineBreaks` 
- `validateQuoteMarks` 
- `validateIndentation` 
- `disallowMixedSpacesAndTabs` 
- `disallowTrailingWhitespace`

****

# Integration (when CLI is not enough)

****

# Editors

****

# SublimeLinter

![](sublimelinter.png)

****

# ...and all other editors

****

# CI

- before/after testing
- gulp, Grunt, etc.

****

# Computer, fix my code

![](fixit.jpg)

****

# [EditorConfig]

- http://editorconfig.org
- simple format
- claims to become a standard
- file `.editorconfig` for project and plugins for almost all IDEs

![](editorconfig.png)

****

# Favorite options

```ini
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{md,jade}]
trim_trailing_whitespace = false
```

****

# JavaScript Formatters

****

# [JS Beautifier]

- http://jsbeautifier.org
- whitespaces and newlines
- based on tokens
- stable, in general
- not very configurable :(

****

# Favorite rules

```json
{    
    "indent_size": 4,
    "indent_char": " ",
    "indent_level": 0,

    "preserve_newlines": true,
    "max_preserve_newlines": 2,

    "jslint_happy": false,
    "brace_style": "collapse",

    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "space_in_paren": false,
}
```
****
# Example

Before
```javascript
var a   = 33;
var obj = { a :  33,
    b: "bzzz"
    };
if(a>3){console.log( a);}
```

After
```javascript
var a = 33;
var obj = {
    a: 33,
    b: "bzzz"
};
if (a > 3) {
    console.log(a);
}
```

****

# [ESFormatter]

- https://github.com/millermedeiros/esformatter
- whitespaces and newlines (planning semicolons)
- based on Esprima
- seems configurable
- early and unstable :(

****

# Rules

```json
{
    "lineBreak": {
        "before": {
            "AssignmentExpression": 1,
            "BlockStatement": 0
            // ....
        },
        "after": {
            "AssignmentExpression": 1,
            "BlockStatement": 1
            // ....
        }
    },
    "whitespace": {
        "before": {
            "ArrayExpressionOpening": 0,
            "ArrayExpressionClosing": 0,
            // ...
        },
        "after": {
            "ArrayExpressionOpening": 2,
            "ArrayExpressionClosing": 0,
            // ...
        }
    }
}
```

****
# Example

Before
```javascript
Q
    .when(doSomething())
    .then(function() {
        return 333;
    });
```

After
```javascript
Q
    .when(doSomething())
    .then(function() {
    return 333;
});
```

****

# Integration

- same as linting
- but better diff than replace

****

# Plan to follow

1. Install [EditorConfig]
2. Install your favorite linters and add them to your favorite editor
3. Try to lint your existing code
4. Play with settings
5. Try to install and configure formatters

****

# Quick way

```
$ npm install -g generator-linters
```

****
# Thank you!

[JSLint]: http://jslint.com/  "JSLint"
[JSHint]: http://jshint.org/  "JSHint"
[ESLint]: http://eslint.org/  "ESLint"
[Esprima]: http://esprima.org/  "Esprima"
[JSCS]: https://github.com/mdevils/node-jscs  "JSCS"
[SublimeLinter]: http://sublimelinter.readthedocs.org "SublimeLinter"
[JS Beautifier]: http://jsbeautifier.org
[ESFormatter]: https://github.com/millermedeiros/esformatter
[EditorConfig]: http://editorconfig.org
