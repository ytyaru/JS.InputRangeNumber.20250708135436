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
    // getter
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        return one!==two && [one, two].every(el=>el instanceof HTMLInputRangeNumberElement);
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        console.log(one.value, two.value, typeof one.value);
        return '0'===one.value && '0'===two.value && 0===one.valueN && 0===two.valueN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        return '0'===one.min && '0'===two.min && 0===one.minN && 0===two.minN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        return '100'===one.max && '100'===two.max && 100===one.maxN && 100===two.maxN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        return '1'===one.step && '1'===two.step && 1===one.stepN && 1===two.stepN;
    });

    // setter
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.value = 33;
        return 0===one.valueN && '33'===two.value && 33===two.valueN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.value = '44';
        return 0===one.valueN && '44'===two.value && 44===two.valueN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.valueN = 55;
        return 0===one.valueN && '55'===two.value && 55===two.valueN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.valueN = '66'; // 変更されない！　Number型でないから。
        return 0===one.valueN && '55'===two.value && 55===two.valueN;
    });
    // min
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.value = 0;
        two.min = 33;
        console.log(0===one.valueN , '33'===two.min , 33===two.minN, two.min)
        return 0===one.valueN && '33'===two.min && 33===two.minN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.min = '44';
        return 0===one.valueN && '44'===two.min && 44===two.minN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.minN = 55;
        return 0===one.valueN && '55'===two.min && 55===two.minN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.minN = '66'; // 変更されない！　Number型でないから。
        return 0===one.valueN && '55'===two.min && 55===two.minN;
    });
    // max
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.value = 0;
        two.max= 999;
        console.log(0===one.valueN , '999'===two.max , 999===two.maxN, two.max)
        return 0===one.valueN && '999'===two.max && 999===two.maxN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.max = '888';
        return 0===one.valueN && '888'===two.max && 888===two.maxN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.maxN = 777;
        return 0===one.valueN && '777'===two.max && 777===two.maxN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.maxN = '666'; // 変更されない！　Number型でないから。
        return 0===one.valueN && '777'===two.max && 777===two.maxN;
    });
    // step
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.value = 0;
        two.step= 10;
        console.log(0===one.valueN , '10'===two.step , 10===two.stepN, two.step)
        return 0===one.valueN && '10'===two.step && 10===two.stepN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.step = '20';
        return 0===one.valueN && '20'===two.step && 20===two.stepN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.stepN = 30;
        return 0===one.valueN && '30'===two.step && 30===two.stepN;
    });
    a.t(()=>{
        const one = document.querySelector(`#one`);
        const two = document.querySelector(`#two`);
        two.stepN = '40'; // 変更されない！　Number型でないから。
        return 0===one.valueN && '30'===two.step && 30===two.stepN;
    });







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

