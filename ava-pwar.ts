import { CorsAnywhere } from './cors-anywhere.js';

export class AvaPwar extends CorsAnywhere{
    static get is(){return 'ava-pwar';}
    onPropsChange(){
        if(!this._connected || !this._href || this.disabled || !this._serviceUrl) return;
        this.doFetch();
    }
    processResponse(resp: Response){
        resp.text().then(content =>{
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(content, "text/html");
            const manifestLink = htmlDoc.querySelector('link[rel="manifest"]')as HTMLLinkElement;
            
            if(!manifestLink || !manifestLink.href) return;
            const lastPath = manifestLink.href.split('/').pop();

            fetch(this.calculateURL() +  lastPath).then(resp =>{
                resp.json().then(json =>{
                    json.url = this._href;
                    this.manifest = json;
                })
            })
        })
    }

    _manifest: object;
    get manifest(){
        return this._manifest;
    }
    set manifest(val){
        this._manifest = val;
        this.de('manifest', {
            value: val,
        })
    }

}

customElements.define(AvaPwar.is, AvaPwar);

