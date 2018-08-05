import { CorsAnywhere } from './cors-anywhere.js';
/**
 * `ava-pwar`
 *  Web component wrapper around billboard.js charting library
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class AvaPwar extends CorsAnywhere {
    static get is() { return 'ava-pwar'; }
    onPropsChange() {
        if (!this._connected || !this._href || this.disabled || !this._serviceUrl)
            return;
        this.doFetch();
    }
    processResponse(resp) {
        resp.text().then(content => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(content, "text/html");
            const manifestLink = htmlDoc.querySelector('link[rel="manifest"]');
            if (!manifestLink || !manifestLink.href)
                return;
            const path = location.href.split('/').slice(0, -1).join('/');
            //const lastPath = manifestLink.href.split('/').pop();
            let manifestURL = manifestLink.href.replace(path, this.calculateURL());
            manifestURL = manifestURL.replace(location.origin + '/', this.calculateURL());
            // console.log({
            //     manifesLinkhref: manifestLink.href,
            //     location_origin: location.origin,
            //     path: path,
            //     url: this.calculateURL(),
            //     manifestURL: manifestURL,
            // })
            // console.log(manifestURL);
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
customElements.define(AvaPwar.is, AvaPwar);
//# sourceMappingURL=ava-pwar.js.map