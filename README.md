# \<ava-pwar\>

Web component that generates markup from manifest

<!--
```
<custom-element-demo>
  <template>
  <div style="width:600px;height:1800px;">
    <litter-g></litter-g>
  
    <h3>ava-pwar-simple - One possible View of a PWA Manifest</h3>

    <ava-pwar-simple href="https://www.polymer-project.org/"></ava-pwar-simple>

    <ava-pwar-simple href="https://stencilcomponents.com/"></ava-pwar-simple>

    <ava-pwar-simple href="https://hnpwa.com/"></ava-pwar-simple>

    <ava-pwar-simple href="https://mobile.twitter.com/"></ava-pwar-simple> 
    
    <ava-pwar-simple href="https://www.cnet.com/"></ava-pwar-simple>
    
    <ava-pwar-simple href="https://slate.com/"></ava-pwar-simple>

    <ava-pwar-simple href="https://app.destinyitemmanager.com/"></ava-pwar-simple>

    <ava-pwar-simple href="https://www.metalroofing.com/"></ava-pwar-simple>

    <ava-pwar-simple href="https://www.facturaelectronicagfa.mx/"></ava-pwar-simple>

    <ava-pwar-simple href="https://preactjs.com/"></ava-pwar-simple>
    
    <ava-pwar-simple href="https://www.curablehealth.com/clara"></ava-pwar-simple>

    <ava-pwar-simple href="https://littlezoo.febvre.info/"></ava-pwar-simple>
<hr>
    <h3>Minimal PWA Avator support -- build your own UI</h3>
    <label for="pwaurl">Enter PWA URL (end with slash):</label>
    <wired-input id="pwaurl" placeholder="Enter PWA url" value="https://www.webcomponents.org/"></wired-input>
    <p-d on="input" to="{input}"></p-d>
    <wired-button>Fetch</wired-button>
    <p-d on="click" if="wired-button" to="{href:target.input}"></p-d>
    <ava-pwar></ava-pwar>
    <p-d on="manifest-changed" to="xtal-json-editor{input};div.simple{input}"></p-d>
    <div class="simple" data-lit>
      <script nomodule>
        html `
          <div class="iconLabel">Icon:</div>
          <div class="icon"><img src="${input.icons ? input.url + input.icons[0].src : 'https://i.4pcdn.org/s4s/1510444672885s.jpg'}"/></div>
          <div class="nameLabel">Name:</div>
          <div class="name">${input.name}</div>
          <div class="shortNameLabel">Short Name:</div>
          <div class="shortName">${input.short_name}</div>
        `
      </script>
    </div>
    <xtal-json-editor options="{}" height="300px"></xtal-json-editor>


    <style>
      ava-pwar-simple{
        height: 300px;
        display:block;
      }
      .name,
      .shortName {
        font-weight: 800;
      }
      .iconLabel, .nameLabel, .shortNameLabel, .shortName{
        display: none;
      }
      .simple {
        padding: 16px;
        mix-blend-mode: difference;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1);

        /* Add shadows to create the "card" effect */
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        /* transition: 0.3s; */
      }

      a, a:visited, a:hover, a:active {
        color: inherit;
      }


      /* On mouse-over, add a deeper shadow */

      .simple:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }

      /* Add some padding inside the card container */

      ava-pwar-simple {
        padding: 2px 16px;
        margin-top:10px;
      }
    </style>
    <!-- Polyfills needed for re(dge)tro browsers -->
    <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <!-- End Edge Dependency (sigh) -->
    <script type="module" src="https://unpkg.com/ava-pwar@0.0.12/ava-pwar-simple.js?module"></script>
    <!-- <script type="module" src="../ava-pwar-simple.js?module"></script> -->
    <script type="module" src="https://unpkg.com/wired-button@0.7.0/wired-button.js?module"></script>
    <script type="module" src="https://unpkg.com/wired-input@0.6.6/wired-input.js?module"></script>
    <script type="module" src="https://unpkg.com/p-d.p-u@0.0.61/p-d.js?module"></script>
    <script type="module" src="https://unpkg.com/xtal-json-editor@0.0.29/xtal-json-editor.js"></script>
    <script type="module" src="https://unpkg.com/litter-g@0.0.12/litter-g.js?module"></script>
  </div>
  </template>
</custom-element-demo>
```
-->

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```


