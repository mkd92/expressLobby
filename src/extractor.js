module.exports = (header) => {
  return function (request) {
    var token = null;
    if (request.headers[header]) {
      token = request.headers[header_name].split(" ")[1];
    }
    return token;
  };
};
