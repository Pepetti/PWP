/**
 * @file generators.js
 * @description File for different functions that generate things
 */

const bcrypt = require("bcrypt");

/**
 * Password generation.
 *
 * Generates a hashed password from the given string.
 *
 * @param String    a   Given password as string
 *
 * @returns String   Hashed password
 */

const generatePass = a => {
  let h = bcrypt.hashSync(a, 10);
  return h;
};

/**
 * getTime
 *
 * Creates the time as a formatted string for the db
 *
 * @returns String  Returns the date as a string formatted mmddyyyy
 */

const getTime = () => {
  const d_ = new Date();
  const d = d_.getDate().toString();
  const m = (d_.getMonth() + 1).toString();
  const y = d_.getFullYear().toString();
  const date = d + m + y;
  return date;
};

module.exports = {
  generatePass,
  getTime
};
