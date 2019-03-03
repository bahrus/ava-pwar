import { CorsAnywhere } from 'xtal-element/cors-anywhere.js';
import {define} from 'xtal-element/define.js';
/**
 * `ava-pwar`
 *  Find and Process PWA Manifest url.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class AvaPwar extends CorsAnywhere {
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

