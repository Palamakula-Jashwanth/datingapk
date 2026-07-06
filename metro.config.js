const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add 'cjs' to the resolver's source extensions to resolve newer packages like axios v1.x
config.resolver.sourceExts.push('cjs');

module.exports = config;
