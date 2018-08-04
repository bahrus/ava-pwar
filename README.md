# \<ava-pwar\>

Web component that generates markup from manifest

<!--
```
<custom-element-demo>
  <template>
      <div style="width:600px;height:660px;">
          
          
          <h3>Basic ava-pwar demo</h3>
          <label for="pwaurl">Enter PWA URL (end with slash):</label>
          <wired-input id="pwaurl" placeholder="Enter PWA url" value="https://www.webcomponents.org/"></wired-input>
          <p-d on="input" to="{input}"></p-d>
          <wired-button>Fetch</wired-button>
          <p-d on="click" if="wired-button" to="{href:target.input}"></p-d>
          <ava-pwar></ava-pwar>
          <p-d on="manifest-changed" to="xtal-json-editor{input};create-some-view-of-pwa-manifest-action{input}"></p-d>
          <script type="module">
            import {PDQ} from 'https://unpkg.com/p-d.p-u@0.0.61/PDQ.js?module';
            PDQ.define('create-some-view-of-pwa-manifest-action', input => {
              if(!input) return 'Click Fetch Button to see FWA info';
              return `
                <div class="iconLabel">Icon:</div>
                <div class="icon"><img src="${input.icons? input.url + input.icons[0].src : 'https://i.4pcdn.org/s4s/1510444672885s.jpg'}"/></div>
                <div class="nameLabel">Name:</div>
                <div class="name">${input.name}</div>
                <div class="shortNameLabel">Short Name:</div>
                <div class="shortName">${input.short_name}</div>
              `;

            });
          </script>
          <style>
              .name, .shortName{
                font-weight:800;
              }
          </style>
          <create-some-view-of-pwa-manifest-action></create-some-view-of-pwa-manifest-action>
          <p-d on="value-changed" to="{innerHTML}"></p-d>
          <div>
          </div>
          
          <xtal-json-editor options="{}" height="300px"></xtal-json-editor>
    
          <!-- Polyfills needed for red(ge)tro browsers -->
          <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
          <!-- End Edge Dependency (sigh) -->
          <script type="module" src="https://unpkg.com/ava-pwar@0.0.1/ava-pwar.js?module"></script>
          <script type="module" src="https://unpkg.com/wired-button@0.7.0/wired-button.js?module"></script>
          <script type="module" src="https://unpkg.com/wired-input@0.6.6/wired-input.js?module"></script>
          <script type="module" src="https://unpkg.com/p-d.p-u@0.0.61/p-d-x.js?module"></script>
          <script type="module" src="https://unpkg.com/xtal-json-editor@0.0.29/xtal-json-editor.js"></script>
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

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
