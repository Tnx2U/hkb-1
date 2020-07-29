module.exports = function (api) {
  api.cache(false);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '>= 1%, not dead',
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        modules: false,
      },
    ],
  ];

  const plugins = ['@babel/plugin-proposal-class-properties'];
  return {
    presets,
    plugins,
  };
};
