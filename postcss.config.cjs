module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./src/global.css']
    },
    'postcss-custom-media': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    }
  }
};
