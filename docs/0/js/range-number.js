class RangeNumberElement extends HTMLElement {
    static get observedAttributes() {return 'value min max step'.split(' ')}
    constructor() {
        super();
        this._ = {value:0, min:0, max:100, step:1, el:{}, handler:{}};
        this._.el.number = null;
        this._.el.range = null;
        this._.el.host = null;
        this._.handler.number = {input:null, change:null};
        this._.handler.range = {input:null, change:null};
        this._.handler.host = {input:null, change:null};
        console.log(this._)
        this.#makeEl();
    }
    connectedCallback() {
//        'number range'.map(type=>this.#makeInput(type))
        this.append(this._.el.host);
        this.#resizeNumber()
    }
    disconnectedCallback() {
        'number range host'.map(t=>{
            'input change'.map(e=>this._.el[t].removeEventListener(e, this._.handler[t][e]));
        })
    }
    get value() {return this._.value}
    #isValid(v){}
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[ property ] = newValue;

    }
    #makeEl() {
        this._.el.number = this.#makeInput('number');
        this._.el.range = this.#makeInput('range');
        this._.el.host = this.#makeDiv();
        this._.el.host.append(this._.el.number, this._.el.range);
        this._.handler.host.input = (e)=>{
            e.preventDefault();
            if (!(e instanceof CustomEvent)) {return}
            console.log(e)
//            if (this._.el.host===e.detail.sender){return}
            for (let el of [this._.el.number, this._.el.range].filter(el=>el!==e.detail.sender)) {
                el.value = e.detail.value;
            }
        };
        this._.handler.host.change = this._.handler.host.input;
        'input change'.split(' ').map(type=>this._.el.host.addEventListener(type, this._.handler.host[type]))
//        this._.el.host.addEventListener('input', this._.handler.host.input);
//        this._.el.host.addEventListener('change', this._.handler.host.change);
        /*
        this._.handler.host.change = (e)=>{
            for (let el of [this._.el.number, this._.el.range].filter(el=>el!==e.detail.sender)) {
                el.value = e.detail.value;
            }
        };
        */
        //this._.el.host.addEventListener('input', this._.handler.host.input);
        //this._.el.host.addEventListener('change', this._.handler.host.change);
        //this.#addEventListeners('host');




    }
    #dispatch(type, sender, value) {
        this._.el.host.dispatchEvent(new CustomEvent(type, {detail:{sender:sender, value:value}}));
            /*
        this._.el.host.dispatchEvent(new CustomElement('input'), {detail:{
            {sender:sender, value:value}
//            {sender:e.currentTarget, value:e.currentTarget.value}
        }})
        */
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
        //RangeNumberElement.observedAttributes.map(k=>input[k]=this._[k]);
        //RangeNumberElement.observedAttributes.map(k=>{console.log(k,this._);input[k]=this._[k]});
        RangeNumberElement.observedAttributes.map(k=>input[k]=this._[k]);
        for (let evNm of 'input change'.split(' ')) {
            console.log(type, evNm, this._.handler)
            //this._.handler[type][evNm] = (e)=>this.#dispatch(e.type, e.currentTarget, e.currentTarget.value);
            this._.handler[type][evNm]=(e)=>{e.preventDefault();this.#dispatch(e.type, e.currentTarget, e.currentTarget.value);};
            input.addEventListener(evNm, this._.handler[type][evNm]);
        }
        /*
        */
        //this.#addEventListeners(type);
        return input;
    }
    /*
    #addEventListeners(elNm) {
        for (let evNm of 'input change'.split(' ')) {
            this._.handler[elNm][evNm] = (e)=>this.#dispatch(e.type, e.currentTarget, e.currentTarget.value);
            this._.el[elNm].addEventListener(evNm, this._.handler[type][evNm]);
        }
    }
    */
    #resizeNumber() {
        console.log(getComputedStyle(this._.el.number).fontSize)
        console.log(this._.el.number.style)
        console.log(this._.el.number.style.width)
        this._.el.number.style.width = `${parseFloat(getComputedStyle(this._.el.number).fontSize) * this._.max.toString().length}px`;
    }
    #makeInputNumber() {

    }
    #makeInputRange() {

    }
}
customElements.define('range-number', RangeNumberElement);
