[![zombrex icon](https://github.com/GaneschaLabs-OS/zombrex/blob/master/docs/img/icons/zombrex_text_cut.png?raw=true)](https://github.com/GaneschaLabs-OS/zombrex/blob/master/docs/img/icons/zombrex_text_cut.png?raw=true)

Zombrex, is a controversial framework that greatly slows the process of frontend zombification.

*Note:*
> Not production ready

## preload
Preload data from GET and POST requests.

```javascript 
zombrex.preload([{
    name: 'DATA',
    url: '/app',
}, {
    name: 'ACCS',
    url: '/accs',
    data: { method: 'getUser' }
}]);
```

## render
Render dynamic html before executing the view.

```javascript 
zombrex.render('#calendar', ({ BROWSER, DATA }) => {    
    return `<div>
        <h1>${DATA.title}</h1>
    </div>`; 
});
```

## views
Add views to zombrex. A view is similar to an angular controller. 
It wraps a part of the dom and allows you to interacte with this part.

```html
<html>
<head></head>
<body>
    <div id="dashboard">
        <p id="board"></p>
    </div>
    
    <!-- scope of calendar view -->
    <div id="calendar">
        <p id="name"></p>
    </div>
</body>
</html>
```

```javascript 
zombrex.view('#calendar', (scope, { BROWSER, DATA }) => {    
    const name = scope.querySelector('#name');
    
    name.innerText = DATA.name; 
});
```

## constants
Adds `constants` to the zombrex scope. All types are allowed.

```javascript 
zombrex.constant(Name String, Data Everything);
```

```javascript 
zombrex.constant('BROWSER', {
    language: (window.navigator.userLanguage || window.navigator.language).substring(0, 2),
    agent: navigator.userAgent,
    timeFormat: new Date().getTimezoneOffset()
});
```

## before 
Executes before `components` are added, or executing the `view`. 
Useful for pre compunting things. Has access to `constants` and build in zombrex components.

```javascript 
zombrex.before(({ BROWSER }) => {
    moment.updateLocale(BROWSER.language, { week: { dow: 1 } });
});
```

## after 
Is executed after `views`. Has access to everything.

```javascript 
zombrex.before(({ DATA, output }) => {
    console.log(DATA);
});
```

## components
`Components` are similar to angular factorys. The are used to generate 
reusable `components` over all `views` and [after](#after).

```javascript 
zombrex.component('output', ({ BROWSER }) => { 
    function browser () {
        return `Language is ${BROWSER.language} and useragent is ${BROWSER.agent}`;
    }
    
    return {
        browser: browser
    };
});    
```

```javascript 
zombrex.view('#dashboard', (scope, { output }) => {    
    output.browser();
});
```

## lambda
Executes functions after the `views` are executed and before `after` is executed.

```javascript
zombrex.lambda(function () {
    if (localStorage.getItem('dev')) { 
        console.log('dev version is activate');
    }
});
```

## zSHARE 
Adds shareable mutable variables over the zombrex scopes. 

```javascript 
zombrex.view('#dashboard', (scope, { zSHARE }) => {    
    const board = scope.querySelector('board');
    
    zSHARE.dashboard = function (text) {
        board.innerText = text; 
    };
});
```

```javascript 
zombrex.view('#calendar', (scope, { zSHARE }) => {     
    zSHARE.dashboard('invoked from calendar view');
});
```

## zombrex cycle 
[![zombrex cyle](https://github.com/GaneschaLabs-OS/zombrex/blob/master/docs/img/zombrex.jpg?raw=true)](https://github.com/GaneschaLabs-OS/zombrex/blob/master/docs/img/zombrex.jpg?raw=true)

## Build in Tools 

`zAjax` an axios wrapper 

`zBROWSER` a const with following properties

```javascript 
{
   languageLong: window.navigator.userLanguage || window.navigator.language,
   language: (window.navigator.userLanguage || window.navigator.language).substring(0, 2);,
   agent: navigator.userAgent,
   online: navigator.onLine,
   timeFormat: new Date().getTimezoneOffset()
} 
```

`zURLPARAM` an object returning the url parameter

