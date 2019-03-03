const jiife = require('jiife');
const tiffe = require('jiife/tiffe')
const xl = 'node_modules/xtal-element/';
tiffe.processFiles([xl + 'define.ts', xl + '/xtal-latx.ts', xl + 'cors-anywhere.ts', 'ava-pwar.ts', 'ava-pwar-simple.ts'], 'dist/iife.ts');
jiife.processFiles(['ava-pwar-simple.js'], 'dist/ava-pwar-simple.js', true);