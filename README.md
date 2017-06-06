# zombrex
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
Add views to zombrex

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

```javascript 
zombrex.constant('BROWSER', {
    language: (window.navigator.userLanguage || window.navigator.language).substring(0, 2),
    agent: navigator.userAgent,
    timeFormat: new Date().getTimezoneOffset()
});
```

## before 

```javascript 
zombrex.before(({ BROWSER }) => {
    moment.updateLocale(BROWSER.language, { week: { dow: 1 } });
});
```

## after 

```javascript 
zombrex.before(({ DATA }) => {
    console.log(DATA);
});
```

## components

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

## zSHARE 

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

