
    //@ts-check
    (function () {
    function define(custEl) {
    let tagName = custEl.is;
    if (customElements.get(tagName)) {
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
const disabled = 'disabled';
function XtallatX(superClass) {
    return class extends superClass {
        constructor() {
            super(...arguments);
            this._evCount = {};
        }
        static get observedAttributes() {
            return [disabled];
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        attr(name, val, trueVal) {
            const v = val ? 'set' : 'remove'; //verb
            this[v + 'Attribute'](name, trueVal || val);
        }
        to$(n) {
            const mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
        }
        incAttr(name) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            }
            else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        de(name, detail) {
            const eventName = name + '-changed';
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }
        _upgradeProperties(props) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            });
        }
    };
}
const href = 'href';
const service_url = 'service-url';
const fetch_in_progress = 'fetch-in-progress';
const fetch_complete = 'fetch-complete';
const title = 'title';
class CorsAnywhere extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this._serviceUrl = 'https://cors-anywhere.herokuapp.com/';
        this._connected = false;
    }
    // _serviceUrl: string = 'https://crossorigin.me/';
    /** @type {string} Url of service that gets preview.
    *
    */
    get serviceUrl() {
        return this._serviceUrl;
    }
    set serviceUrl(val) {
        this.attr('service-url', val);
    }
    /** @type {string} Url to preview
    *
    */
    get href() {
        return this._href;
    }
    set href(val) {
        this.attr('href', val);
    }
    get fetchInProgress() {
        return this._fetchInProgress;
    }
    set fetchInProgress(val) {
        this._fetchInProgress = val;
        this.attr(fetch_in_progress, val, '');
        this.de(fetch_in_progress, {
            value: val
        });
    }
    get fetchComplete() {
        return this._fetchComplete;
    }
    set fetchComplete(val) {
        this._fetchComplete = val;
        this.attr(fetch_complete, val, '');
        this.de(fetch_complete, {
            value: val
        });
    }
    get title() {
        return this._title;
    }
    set title(val) {
        this._title = val;
        this.attr(title, val);
        // this.de(title,{
        //     value: val
        // })
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([href, service_url,]);
    }
    attributeChangedCallback(name, oldValue, newValue) {
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
    connectedCallback() {
        this._upgradeProperties(['disabled', href, 'serviceUrl']);
        this._connected = true;
        this.de('connected', {
            value: this.href
        });
        this.onPropsChange();
    }
    set abort(val) {
        if (this._controller)
            this._controller.abort();
    }
    doFetch() {
        const url = this.calculateURL();
        if (this._previousURL === url) {
            this.fetchComplete = false;
            this.fetchComplete = true;
            return;
        }
        this._previousURL = url;
        this.title = "Loading...";
        this.fetchInProgress = true;
        this.fetchComplete = false;
        let init = null;
        if (AbortController) {
            this._controller = new AbortController();
            init = this._controller.signal;
        }
        fetch(url, {
            signal: init,
        }).then(response => {
            this.fetchInProgress = false;
            this.processResponse(response);
            this.fetchComplete = true;
        });
    }
    calculateURL(upLevels = 0) {
        let href = this._href;
        if (upLevels) {
            const split = href.split('/');
            if (upLevels === -1) {
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
        if (!this._connected || !this._href || this.disabled || !this._serviceUrl)
            return;
        this.doFetch();
    }
    processResponse(resp) {
        const debug = this.hasAttribute('debug');
        resp.text().then(content => {
            if (debug)
                debugger;
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(content, "text/html");
            const manifestLink = htmlDoc.querySelector('link[rel="manifest"]');
            if (!manifestLink || !manifestLink.href)
                return;
            const path = location.href.split('/').slice(0, -1).join('/');
            //const lastPath = manifestLink.href.split('/').pop();
            let manifestURL = manifestLink.getAttribute('href');
            const upLevels = manifestURL.startsWith('/') ? -1 : 0;
            manifestURL = this.calculateURL(upLevels) + manifestURL;
            fetch(manifestURL).then(resp => {
                resp.json().then(json => {
                    json.url = this._href;
                    this.manifest = json;
                });
            });
        });
    }
    get manifest() {
        return this._manifest;
    }
    set manifest(val) {
        this._manifest = val;
        this.de('manifest', {
            value: val,
        });
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
class AvaPwarSimple extends AvaPwar {
    static get is() { return 'ava-pwar-simple'; }
    set manifest(val) {
        super.manifest = val;
        this.render();
    }
    render() {
        const input = this._manifest;
        const $ = this.$;
        if (!input.icons)
            return;
        let oneNineTwoIcon = input.icons.find(icon => (icon.sizes.indexOf('192') > -1));
        if (!oneNineTwoIcon)
            oneNineTwoIcon = input.icons[input.icons.length - 1];
        let imagePath = oneNineTwoIcon.src;
        if (imagePath.startsWith('/'))
            imagePath = imagePath.substring(1);
        const imgURL = imagePath.startsWith('http') ? imagePath : input.url + imagePath;
        const inverseColor = this.invertColor(input.background_color);
        this.innerHTML = /* html */ `
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
    $(str) {
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
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16), g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16), b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }
    padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
}
define(AvaPwarSimple);
    })();  
        