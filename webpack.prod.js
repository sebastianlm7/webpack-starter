const HtmlWebpack    = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin     = require("copy-webpack-plugin");

const CssMinimazer   = require('css-minimizer-webpack-plugin');
const Terser         = require('terser-webpack-plugin');

module.exports = {
    mode: 'production', // esto me lo pone para produccion
    output: {
        clean: true, // limpia todos los archivos que esten antes en el dist 
        filename: 'main.[contenthash].js'

    },
    

    module: {
        rules: [
            {
                test: /\.html$/, // esto barre todos los archivos del proyecto cada vez que corra el build
                                 //y si encuentra un html ejecuta el loader
                loader: 'html-loader',
                options: {
                    sources: false 
                }
            },

            {
                test: /\.css$/, //aplico todas las reglas a los archivos css
                exclude: /styles.css$/, //excluyo este archivo de estas reglas
                use: ['style-loader', 'css-loader'] // uso los paquetes que descargue
            },

            {
                test: /styles.css$/, //aplico a este archivo
                use: [ MiniCssExtract.loader, 'css-loader' ] //cargo el archivo en el dist

            },

            {
                test: /\.(png|jpe?g|gif)$/, //aplico a imagen
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                    } 
            }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimazer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebpack({ //creo una nueva instancia de HtmlWebpack, esto pone el index en dist
            title: 'Mi Webpack App', //cambio el titulo de mi html
            filename: 'index.html',  //cambio el nombre de mi archivo html
            template: './src/index.html' //indico cual es el archivo que quiero mandar al dist

        }),

        new MiniCssExtract( { //creo instancia de MiniCssExtract
            filename: '[name].[fullhash].css', //le cambio el nombre a mi archivo global de estilos (el fullhash hace que el cliente no guarde el archivo en el cache)
            ignoreOrder: false

        }),

        new CopyPlugin({
            patterns: [
                {from: "src/assets/", to: "assets/"} //desde donde a donde mueva la imagen (o cualquier elemento estatico)
            ]
        })
        ] 
};