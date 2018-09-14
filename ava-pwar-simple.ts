import {AvaPwar} from './ava-pwar.js';
import {define} from 'xtal-latx/define.js';

/**
 * `ava-pwar-simple`
 *  Simple view of PWA Manifest
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class AvaPwarSimple extends AvaPwar{
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