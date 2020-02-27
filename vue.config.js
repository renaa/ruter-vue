
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: 'graphql-tag/loader'
        }
      ]
    },
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },
  

  
  
}