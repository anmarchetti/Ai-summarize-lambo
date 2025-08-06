const path = require('path');

module.exports = {
  entry: './src/TextSummarizerVanilla.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'text-summarizer-vanilla.js',
    library: 'TextSummarizerVanilla',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.js']
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  },
  mode: 'production'
};