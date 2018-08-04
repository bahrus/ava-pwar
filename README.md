# \<ava-pwar\>

Web component that generates markup from manifest

<!--
```
<custom-element-demo>
  <template>
    <div>
      <!-- Polyfills needed for red(ge)tro browsers -->
      <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
      <script type="module" src="https://unpkg.com/ava-pwar@0.0.1/ava-pwar.js?module"></script>
      <script type="module" src="https://unpkg.com/wired-button@0.7.0/wired-button.js?module"></script>
      <script type="module" src="https://unpkg.com/wired-input@0.6.6/wired-input.js?module"></script>
      <script type="module" src="https://unpkg.com/p-d.p-u@0.0.61/p-d-x.js?module"></script>
      <h3>Basic ava-pwar demo</h3>
      <label for="pwaurl">Enter PWA URL (end with slash):</label>
      <wired-input id="pwaurl" placeholder="Enter PWA url" value="https://www.webcomponents.org/"></wired-input>
      <p-d on="input" to="{input}"></p-d>
      <wired-button>Get PWA Manifest</wired-button>
      <p-d on="click" if="wired-button" to="{href:target.input}"></p-d>
      <ava-pwar></ava-pwar>
      <p-d on="manifest-changed" to="{input}"></p-d>
      <xtal-json-editor options="{}" height="300px"></xtal-json-editor>

      <script type="module" src="https://unpkg.com/xtal-json-editor@0.0.29/xtal-json-editor.js"></script>
      <script type="module" src="https://unpkg.com/p-d.p-u@0.0.61/p-d-x.js?module"></script>
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
