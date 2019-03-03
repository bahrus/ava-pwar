
    (function () {
    function define(custEl: any){
    let tagName = custEl.is;
    if(customElements.get(tagName)){
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
const disabled = 'disabled';

interface IXtallatXI extends HTMLElement {
    /**
     * Any component that emits events should not do so if it is disabled.
     * Note that this is not enforced, but the disabled property is made available.
     * Users of this mix-in should ensure not to call "de" if this property is set to true.
    */
    disabled: boolean;
    /**
     * Set attribute value.
     * @param name 
     * @param val 
     * @param trueVal String to set attribute if true.
     */
    attr(name: string, val: string | boolean, trueVal?: string): void;
    /**
     * Dispatch Custom Event
     * @param name Name of event to dispatch ("-changed" will be appended if asIs is false)
     * @param detail Information to be passed with the event
     * @param asIs If true, don't append event name with '-changed'
     */
    de(name: string, detail: any, asIs?: boolean): CustomEvent;
    /**
     * Needed for asynchronous loading
     * @param props Array of property names to "upgrade", without losing value set while element was Unknown
     */
    _upgradeProperties(props: string[]): void;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    connectedCallback?(): void;
    // static observedAttributes: string[]; 
}
type Constructor<T = {}> = new (...args: any[]) => T;
/**
 * Base class for many xtal- components
 * @param superClass
 */
function XtallatX<TBase extends Constructor<HTMLElement>>(superClass: TBase) {
    return class extends superClass implements IXtallatXI {
        static get observedAttributes() {
            return [disabled];
        }

        _disabled!: boolean;
        /**
         * Any component that emits events should not do so if it is disabled.
         * Note that this is not enforced, but the disabled property is made available.
         * Users of this mix-in should ensure not to call "de" if this property is set to true.
         */
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        /**
         * Set attribute value.
         * @param name 
         * @param val 
         * @param trueVal String to set attribute if true.
         */
        attr(name: string, val: string | boolean | null, trueVal?: string) {
            const v = val ? 'set' : 'remove';  //verb
            (<any>this)[v + 'Attribute'](name, trueVal || val);
        }
        _evCount: { [key: string]: number } = {};
        /**
         * Turn number into string with even and odd values easy to query via css.
         * @param n 
         */
        to$(n: number) {
            const mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
        }
        /**
         * Increment event count
         * @param name
         */
        incAttr(name: string) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            } else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name: string, oldVal: string, newVal: string) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }

        /**
         * Dispatch Custom Event
         * @param name Name of event to dispatch ("-changed" will be appended if asIs is false)
         * @param detail Information to be passed with the event
         * @param asIs If true, don't append event name with '-changed'
         */
        de(name: string, detail: any, asIs: boolean = false) {
            const eventName = name + (asIs ? '' : '-changed');
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            } as CustomEventInit);
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }

        /**
         * Needed for asynchronous loading
         * @param props Array of property names to "upgrade", without losing value set while element was Unknown
         */
        _upgradeProperties(props: string[]) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = (<any>this)[prop];
                    delete (<any>this)[prop];
                    (<any>this)[prop] = value;
                }
            })

        }
    }
}

const href = 'href';
const service_url = 'service-url';
const fetch_in_progress = 'fetch-in-progress';
const fetch_complete = 'fetch-complete';
const title = 'title';

abstract class CorsAnywhere extends XtallatX(HTMLElement){
    _serviceUrl: string = 'https://cors-anywhere.herokuapp.com/';
   // _serviceUrl: string = 'https://crossorigin.me/';
    /** @type {string} Url of service that gets preview.
    * 
    */
    get serviceUrl() {
        return this._serviceUrl;
    }
    set serviceUrl(val: string) {
        this.attr('service-url', val);
    }

    _href!: string;
    /** @type {string} Url to preview
    * 
    */
    get href() {
        return this._href;
    }
    set href(val: string) {
        this.attr('href', val);
    }

    _fetchInProgress!: boolean;
    get fetchInProgress(){
        return this._fetchInProgress;
    }
    set fetchInProgress(val){
        this._fetchInProgress = val;
        this.attr(fetch_in_progress, val, '');
        this.de(fetch_in_progress, {
            value: val
        })
    }

    _fetchComplete!: boolean;
    get fetchComplete(){
        return this._fetchComplete;
    }
    set fetchComplete(val: boolean, ){
        this._fetchComplete = val;
        this.attr(fetch_complete, val, '');
        this.de(fetch_complete, {
            value: val
        })
    }

    _title!: string;
    get title(){
        return this._title;
    }
    set title(val){
        this._title = val;
        this.attr(title, val);
        // this.de(title,{
        //     value: val
        // })
    }

    static get observedAttributes() {
        return super.observedAttributes.concat( [href, service_url,]);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'href':
                this._href = newValue;
                // if(this._once) this.loadHref();
                break;
            case 'service-url':
                this._serviceUrl = newValue;
                break;

        }
        this.onPropsChange();
    }

    _connected = false;
    connectedCallback(){
        this._upgradeProperties(['disabled', href, 'serviceUrl']);
        this._connected = true;
        this.de('connected',{
            value: this.href
        });
        this.onPropsChange();
    }
    _previousURL!: string;

    abstract onPropsChange() : void;
    _controller! : AbortController;

    set abort(val: boolean){
        if(this._controller && val) this._controller.abort();
    }
    doFetch(){
        const url = this.calculateURL();
        if(this._previousURL === url) {
            this.fetchComplete = false;
            this.fetchComplete = true;
            return;
        }
        this._previousURL = url;
        this.title = "Loading...";
        this.fetchInProgress = true;
        this.fetchComplete = false;
        let init: any  = null;
        if(AbortController){
            this._controller = new AbortController();
            init = this._controller.signal;
        }
        fetch(url, {
            signal: init as AbortSignal,
        }).then(response => {
            
            this.fetchInProgress = false;
            this.processResponse(response);
            this.fetchComplete = true;
        }).catch(err => {
            if (err.name === 'AbortError') {
              console.log('Fetch aborted');
              delete this._previousURL;
            }
        })
    }

    abstract processResponse(resp: Response) : void;

    calculateURL(upLevels = 0){
        let href = this._href;
        if(upLevels){
            const split = href.split('/');
            if(upLevels === -1){
                href = [split[0], split[1], split[2]].join('/');
            }
        }
        return this._serviceUrl + href;
    }
}
/**
 * `ava-pwar`
 *  Find and Process PWA Manifest url.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AvaPwar extends CorsAnywhere {
    static get is() { return 'ava-pwar'; }
    onPropsChange() {
        if (!this._connected || !this._href || this.disabled || !this._serviceUrl) return;
        this.doFetch();
    }
    processResponse(resp: Response) {
        const debug =  this.hasAttribute('debug');
        resp.text().then(content => {
            if(debug) debugger; 
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(content, "text/html");
            const manifestLink = htmlDoc.querySelector('link[rel="manifest"]') as HTMLLinkElement;

            if (!manifestLink || !manifestLink.href) return;

            const path = location.href.split('/').slice(0, -1).join('/');

            //const lastPath = manifestLink.href.split('/').pop();
            let manifestURL = manifestLink.getAttribute('href');
            const upLevels = manifestURL.startsWith('/') ? -1 : 0;
            manifestURL = this.calculateURL(upLevels) + manifestURL;
            fetch(manifestURL).then(resp => {
                resp.json().then(json => {
                    json.url = this._href;
                    this.manifest = json;
                })
            })
        })
    }

    _manifest: any; //TODO:  create typing for manifest?
    get manifest() {
        return this._manifest;
    }
    set manifest(val) {
        this._manifest = val;
        this.de('manifest', {
            value: val,
        })
    }

}
define(AvaPwar);



/**
 * `ava-pwar-simple`
 *  Simple view of PWA Manifest
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AvaPwarSimple extends AvaPwar{
    static get is(){return 'ava-pwar-simple';}
    set manifest(val){
        super.manifest = val;
        this.render();
    }

    render(){
        const input = this._manifest;
        
        const $ = this.$;
        if(!input.icons) return;
        let oneNineTwoIcon = input.icons.find(icon => (icon.sizes.indexOf('192') > -1));
        if(!oneNineTwoIcon) oneNineTwoIcon = input.icons[input.icons.length - 1];
        let imagePath = oneNineTwoIcon.src;
        if(imagePath.startsWith('/')) imagePath = imagePath.substring(1);
        const imgURL = imagePath.startsWith('http') ? imagePath : input.url + imagePath;
        const inverseColor = this.invertColor(input.background_color);
        this.innerHTML =  /* html */`
        <div class="simple" style="background-color:${input.background_color};color:${inverseColor}">
          <div class="iconLabel">Icon:</div>
          <div class="icon"><img height="192" width="192" src="${imgURL}"/></div>
          <div class="nameLabel">Name:</div>
          <div class="name">${$(input.name)}</div>
          <div class="shortNameLabel">Short Name:</div>
          <div class="shortName">${$(input.short_name)}</div>
          <a class="url" target="_blank" href="${input.url}">${$(input.url)}</a>
        </div>
        `;
    }

    $(str: string){
        return str.replace(/(<([^>]+)>)/ig, '');
    }

    invertColor(hex) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        // invert color components
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }
    
    padZero(str, len?) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
}
define(AvaPwarSimple)
    })();  
        