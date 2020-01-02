"use strict";

const validator = require('validator');

class CustomValidator {
  /**
   * Type determination of character string
   * @param {string} value
   * @param {string} field
   * @param {string} message
   * @return {Object|null}
   */

  static isRequired(value, field, name) {
    if (!value || value == null || value == undefined || typeof value != "string") {

      return {
        message: name + " is Required.",
        field: field
      };
    }
    return null;
  }
  static isString(value, field, message) {
    if (typeof value !== "string") {
      return {
        message: message
          ? message
          : `${field}Please enter the character string。`,
        field: field
      };
    }
    return null;
  }

  /**
   * Type determination of numbers
   * @param {string} value
   * @param {string} field
   * @param {string} message
   * @return {Object|null}
   */
  static isNumber(value, field = "value", message = null) {
    if (typeof value !== "number") {
      return {
        message: message ? message : `${field}Please enter a numeric value。`,
        field: field
      };
    }
    return null;
  }

  /**
   * Type determination of boolean values
   * @param {string} value
   * @param {string} field
   * @param {string} message
   * @return {Object|null}
   */
  static isBool(value, field = "value", message = null) {
    if (typeof value !== "boolean") {
      return {
        message: message ? message : `${field}Please enter the boolean。`,
        field: field
      };
    }
    return null;
  }

  /**
   * Type determination of array
   * @param {string} value
   * @param {string} field
   * @param {string} message
   * @return {Object|null}
   */
  static isArray(value, field = "value", message = null) {
    if (toString.call(value) !== "[object Array]") {
      return {
        message: message ? message : `${field} Please enter the array。`,
        field: field
      };
    }
    return null;
  }

  /**
   * Type determination of objects
   * @param {string} value
   * @param {string} field
   * @param {string} message
   * @return {Object|null}
   */
  static isObject(value, field = "value", message = null) {
    if (toString.call(value) !== "[object Object]") {
      return {
        message: message ? message : `${field}Please enter object。`,
        field: field
      };
    }
    return null;
  }

  static isEmail(value, field, message) {
		if(!validator.isEmail(value)) {
			return {
				message: message + 'should be email format.',
				field: field
			};
    }
    return null;
  }
  
  static isLength(value, field, name, min, max) {
		if(value.length < min || value.length > max) {
     
			return {
        message: `${name} length must be between  ${min}-${max}.`,
        field: field
			};
    }
    return null;
	}
}

module.exports = CustomValidator;
