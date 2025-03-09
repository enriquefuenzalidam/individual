
module.exports = {
    siteUrl: 'https://individual.cl',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: ['/src/', '/app/', '/assets/', '/components/', '/hooks/'] }
      ]
    }
  };