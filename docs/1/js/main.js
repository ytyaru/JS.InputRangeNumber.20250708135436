window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    const author = 'ytyaru';
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/JS.InputRangeNumber.20250708135436/`}, 'InputRangeNumber')),
        van.tags.p('input要素のrangeとnumberを組合せたWebComponentを作る。'),
//        van.tags.p('Create a WebComponent that combines the range and number of input elements.'),
    );
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make());

    const a = new Assertion();
    console.log(document.querySelector(`#one`))
    console.log(document.querySelector(`#two`));
    document.querySelector(`#two`).value = 999;
    console.log(document.querySelector(`#two`).value);
    document.querySelector(`#two`).value = 30;
    console.log(document.querySelector(`#two`).value);
    a.t(true);
    a.f(false);
    a.e(TypeError, `msg`, ()=>{throw new TypeError(`msg`)});
    a.fin();
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

