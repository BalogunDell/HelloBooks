/**
 * @class header
 * @classdesc sets header for Cross origin resouce sharing (CORS)
 */
export default class Header {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns { object or a next function}
   */
  static setHeaders(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
    res.header('Access-Control-Request-Headers', 'X-PINGOTHER, Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
  }
}
