const isProdMode = Object.is(process.env.NODE_ENV, 'production')
module.exports = {
  baseUrl: isProdMode ? 'http://www.hoboy.cn/api/' : 'api/'
};
