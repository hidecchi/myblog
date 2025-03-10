module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN:
      process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    ENV: process.env.ENV,
    GTM_ID: process.env.GTM_ID,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: "raw-loader",
    });
    return config;
  },
};
