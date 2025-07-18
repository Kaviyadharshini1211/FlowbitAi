const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  output: {
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        support_tickets: 'support_tickets@http://localhost:3002/remoteEntry.js'
      },
      
      shared: {
        react: {
          singleton: true,
          eager: false,
          requiredVersion: false
        },
        'react-dom': {
          singleton: true,
          eager: false,
          requiredVersion: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
