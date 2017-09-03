/**
 * @class header
 * @classdesc sets header for Cross origin resouce sharing (CORS)
 */
class Header {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object}
   */
  static setHeaders(res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
  }
}

export default Header;
