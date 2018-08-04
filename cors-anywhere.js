import { XtallatX } from 'xtal-latx/xtal-latx.js';
const href = 'href';
const service_url = 'service-url';
const fetch_in_progress = 'fetch-in-progress';
const fetch_complete = 'fetch-complete';
const title = 'title';
export class CorsAnywhere extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this._serviceUrl = 'https://cors-anywhere.herokuapp.com/';
        this._connected = false;
    }
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
    doFetch() {
        const url = this.calculateURL();
        if (this._previousURL === url)
            return;
        this._previousURL = url;
        this.title = "Loading...";
        this.fetchInProgress = true;
        this.fetchComplete = false;
        fetch(url).then(response => {
            this.fetchInProgress = false;
            this.processResponse(response);
            this.fetchComplete = true;
        });
    }
    calculateURL() {
        return this._serviceUrl + this._href;
    }
}
//# sourceMappingURL=cors-anywhere.js.map