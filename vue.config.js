module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: "graphql-tag/loader",
        },
        
      ],
    },
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/ruter-vue/" : "/",
}
