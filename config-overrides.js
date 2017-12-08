const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");

module.exports = function override(config, env) {
  /*配置ts-loader*/
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css',
      }) ]
    })
  };

  return config;
}