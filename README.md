humans-template-loader
==========================

Webpack loader for [humans and machines](http://humans.am/) flavored underscore templates.

### Delimiters

 - evaluate: `{{# … }}`
 - escaped output: `{{ … }}`
 - unescaped output: `{{= … }}`

### Usage


<br/>
**Add loader**
```javascript
module.exports = {
    //...
    loaders: [
        //...
        { test: /\.html/, loader: "underscore-template-loader" }
    ]
};
```

<br/>
**Loading templates**

```html
<!-- file: hello.html -->
<p>Hello&nbsp;<%=name%></p>
```

```javascript
var compiled = require('./hello.html');
return compiled({name: "world"});
```

<br/>
**Include tag**


```html
<!-- file: main.html -->
<p>Hello, <!--include message.html--></p>
```


```html
<!-- file: message.html -->
<em>how are you?</em>
```

<br/>
###License

Released under the MIT license.
