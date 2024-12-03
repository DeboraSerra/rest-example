const { STATUS_CODES } = require("http");

const normalizeHttpErroName = (name) => name.toUpperCase().replace(/\s/g, "_");

const statusCodes = Object.keys(STATUS_CODES)
  .map((code) => ({
    [normalizeHttpErroName(STATUS_CODES[code])]: Number(code),
  }))
  .reduce((acc, curr) => ({ ...acc, ...curr }), {});

module.exports = { statusCodes };
