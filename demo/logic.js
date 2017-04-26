'use strict';
const start = new Date();

zombrex.preload([/*{
    name: 'DATA',
    url: 'http://requestb.in/1485a571',
    data: { a: 1 }
}*/]);

zombrex.after(function () {
    alert('done');
}); 

zombrex.constant('LANGUAGE', {
    HELLO: 'HELLO',
    BYE: 'BYE' 
});

zombrex.constant('ACCS', [{
    name: 'oliver'
}, {
    name: 'milo'
}]);

zombrex.view('#view1', function (scope, { LANGUAGE, zSHARE }) {
    console.log(scope);
    console.log(LANGUAGE);

    zSHARE.asus = function () {
        scope.innerHTML = 'view1 update';
    };
});

zombrex.view('#view2', function (scope, { ACCS, zSHARE }) {
    console.log(scope);
    console.log(ACCS);
    
    setTimeout(function () {
        zSHARE.asus();
    }, 3000);
});

zombrex.view('#view3', function (scope, { DATA }) {

});
