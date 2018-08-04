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
                    console.log(json);
                    this.dumpJsonObj((<any>this) as HTMLElement, json)
                })
            })
        })
    }

    dumpJsonObj(parentEl: HTMLElement, obj: any){
        if(!obj) return;
        switch(typeof(obj)){
            case 'string':
            case 'number':
                parentEl.innerText = obj;
                break;
            case 'object':
                if(Array.isArray(obj)){
                    obj.forEach(item =>{
                        this.dumpJsonObj(parentEl, item);
                    })
                }else{
                    for(let key in obj){
                        switch(key){
                            case 'background_color':
                                parentEl.style.backgroundColor = obj[key];
                                break;
                            case 'src':
                                const img = document.createElement('img');
                                img.src = this._href + obj[key];
                                parentEl.appendChild(img);
                                break;
                                
                            default:
                                const div = document.createElement('div');
                                div.className = key;
                                const val = obj[key];
                                this.dumpJsonObj(div, val);
                                parentEl.appendChild(div);
                        }
                        
                    }
                }
        }

        
        //switch
    }
}

customElements.define(AvaPwar.is, AvaPwar);

