# zombrex
Zombrex, is a controversial framework that greatly slows the process of frontend zombification.

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
zombrex.view('#calendar', function (scope, { BROWSER, DATA }) {    
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
zombrex.before(function ({ BROWSER }) {
    moment.updateLocale(BROWSER.language, { week: { dow: 1 } });
});
```

## after 

```javascript 
zombrex.before(function ({ DATA }) {
    console.log(DATA);
});
```

## components

```javascript 
zombrex.component('output', function ({ BROWSER }) { 
    function browser () {
        return `Language is ${BROWSER.language} and useragent is ${BROWSER.agent}`;
    }
    
    return {
        browser: browser
    };
});    
```

```javascript 
zombrex.view('#dashboard', function (scope, { output }) {    
    output.browser();
});
```

## zSHARE 

```javascript 
zombrex.view('#dashboar', function (scope, { zSHARE }) {    
    const board = scope.querySelector('board');
    
    zSHARE.dashboard = function (text) {
        board.innerText = text; 
    };
});
```

```javascript 
zombrex.view('#calendar', function (scope, { zSHARE }) {    
    zSHARE.dashboard('invoked from calendar view');
});
```

