import { AvaPwar } from './ava-pwar.js';
/**
 * `ava-pwar-simple`
 *  Web component wrapper around billboard.js charting library
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class AvaPwarSimple extends AvaPwar {
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
        const oneNineTwoIcon = input.icons.find(icon => (icon.sizes.indexOf('192') > -1));
        const inverseColor = this.invertColor(input.background_color);
        this.innerHTML = /* html */ `
        <div class="simple" style="background-color:${input.background_color};color:${inverseColor}">
          <div class="iconLabel">Icon:</div>
          <div class="icon"><img src="${input.url + oneNineTwoIcon.src}"/></div>
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
if (!customElements.get(AvaPwarSimple.is))
    customElements.define(AvaPwarSimple.is, AvaPwarSimple);
//# sourceMappingURL=ava-pwar-simple.js.map