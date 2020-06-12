module.exports = {
    plugins: [
        require('autoprefixer'), require('cssnano')({ // подключили cssnano
            preset: 'default'
        })
    ]
};
