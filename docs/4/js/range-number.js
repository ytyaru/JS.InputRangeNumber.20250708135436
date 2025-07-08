class HTMLInputRangeNumberElement extends HTMLElement {
    static get observedAttributes() {return 'value min max step'.split(' ')}
    constructor() {
        super();
        this._ = {d:{s:{}, n:{}}, el:{}, handler:{}, setT:{s:{},n:{}}};
        this._.d.n = {value:0, min:0, max:100, step:1};
        this._.d.s = {value:'0', min:'0', max:'100', step:'1'};
        this._.el.number = null;
        this._.el.range = null;
        this._.el.host = null;
        this._.handler.number = {input:null, change:null};
        this._.handler.range = {input:null, change:null};
        this._.handler.host = {input:null, change:null};
        this._.setT.s.is = (v)=>('string'===typeof v || v instanceof String);
        this._.setT.s.parse = (v)=>Number(v);
        this._.setT.n.is = (v)=>('number'===typeof v && !Number.isNaN(v));
        this._.setT.n.parse = (v)=>v.toString();
        console.log(this._)
        this.#makeEl();
    }
    connectedCallback() {
        this.append(this._.el.host);
        this.#resizeNumber()
    }
    disconnectedCallback() {
        'number range host'.map(t=>{
            'input change'.map(e=>this._.el[t].removeEventListener(e, this._.handler[t][e]));
        })
    }
    get value() {return this._.el.number.value}
    set value(v) {return this.#set('value',v)}
    get min() {return this._.el.number.min}
    set min(v) {return this.#set('min',v)}
    get max() {return this._.el.number.max}
    set max(v) {return this.#set('max',v)}
    get step() {return this._.el.number.step}
    set step(v) {return this.#set('step',v)}
    #set(t,v) {
        if ('s n'.split(' ').some(sn=>this.#setT(t,v,sn,this._.setT[sn].is,this._.setT[sn].parse))) {return true}
        else {return false}
    }
    #setN(t,v){return this.#setT(t,v,'n',this._.setT.n.is,this._.setT.n.parse)}
    #setS(t,v){return this.#setT(t,v,'s',this._.setT.s.is,this._.setT.s.parse)}
    #setT(t,v,sn,is,parse) {
        if (is(v)) {
            this._.d[sn][t] = v;
            this._.d['s'===sn ? 'n' : 's'][t] = parse(v);
            this.#setInputs(v);
            return true
        } else {return false}
    }
    #setInputs(v){'number range'.split(' ').map(n=>this._.el[n].value=v);}
    get valueN() {return this._.d.n.value}
    set valueN(v) {return this.#setN('value',v)}
    get minN() {return this._.d.n.min}
    set minN(v) {return this.#setN('min',v)}
    get maxN() {return this._.d.n.max}
    set maxN(v) {return this.#setN('max',v)}
    get stepN() {return this._.d.n.step}
    set stepN(v) {return this.#setN('step',v)}
    #isValid(v){}
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;

    }
    #makeEl() {
        this._.el.number = this.#makeInput('number');
        this._.el.range = this.#makeInput('range');
        this._.el.host = this.#makeDiv();
        this._.el.host.append(this._.el.number, this._.el.range);
        this._.handler.host.input = (e)=>{
            e.preventDefault();
            if (!(e instanceof CustomEvent)) {return}
            for (let el of [this._.el.number, this._.el.range].filter(el=>el!==e.detail.sender)) {
                el.value = e.detail.value;
            }
            this._.d.s.value = e.detail.value.toString();
            this._.d.n.value = Number(e.detail.value.toString());
        };
        this._.handler.host.change = this._.handler.host.input;
        'input change'.split(' ').map(type=>this._.el.host.addEventListener(type, this._.handler.host[type]))
    }
    #dispatch(type, sender, value) {
        this._.el.host.dispatchEvent(new CustomEvent(type, {detail:{sender:sender, value:value}}));
    }
    #makeDiv() {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        div.style.flexWrap= 'wrap'; // nowrap/wrap/wrap-reverse
        //div.style.justifyContent = 'center';//align-items
        div.style.alignItems = 'center';//align-items
        return div;
    }
    #makeInput(type) {
        const input = document.createElement('input');
        input.type = type;
        'value min max step'.split(' ').map(k=>input[k]=this._.d.s[k]);
        for (let evNm of 'input change'.split(' ')) {
            console.log(type, evNm, this._.handler)
            this._.handler[type][evNm]=(e)=>{e.preventDefault();this.#dispatch(e.type, e.currentTarget, e.currentTarget.value);};
            input.addEventListener(evNm, this._.handler[type][evNm]);
        }
        return input;
    }
    #resizeNumber() {this._.el.number.style.width = `${parseFloat(getComputedStyle(this._.el.number).fontSize) * this._.d.s.max.length}px`;}
}
customElements.define('range-number', HTMLInputRangeNumberElement);
