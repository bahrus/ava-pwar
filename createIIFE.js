const jiife = require('jiife');
const xl = 'node_modules/xtal-latx/';
jiife.processFiles([xl + 'define.js', xl + '/xtal-latx.js', 'cors-anywhere.js', 'ava-pwar.js', 'ava-pwar-simple.js'], 'ava-pwar.iife.js');