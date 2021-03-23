
const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-transform-typeof-symbol',
  [
    '@babel/plugin-transform-runtime',
    {
      help: false,
    },
  ],
  ["import", { "libraryName": "ant-design-vue", "style": true }] // `style: true` 会加载 less 文件
];

const presets = [
  [
    '@babel/preset-env',
    {
      "targets": {
        "node": "current"
      }
    }
  ],
  "@vue/babel-preset-jsx"
]

module.exports = {
  presets,
  plugins
};
