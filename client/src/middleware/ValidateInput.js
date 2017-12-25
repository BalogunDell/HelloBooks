/**
 * @class ValidateInput
 * @classdesc returns validation results
 */
export default class ValidateInput {
  /**
   * 
   * @param {*} item
   * @param {*} expectedLength
   * @returns {*} returns the result
   */
  static validateLength(item, expectedLength) {
    return item.length < expectedLength;
  }
}
