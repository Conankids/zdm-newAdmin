module.exports = {
  proxy: {
    '/protected': {
      target: 'http://new.jiguo.com',
      secure: true,
      changeOrigin: true
    },
    '/admin': {
      target: 'http://zdm.jiguo.com',
      secure: true,
      changeOrigin: true
    },
    '/admin2': {
      target: 'http://zdm.jiguo.com',
      secure: true,
      changeOrigin: true
    },
  }
}
