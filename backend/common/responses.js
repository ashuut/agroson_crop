const functions = require("./index");

module.exports = (req, res, next) => {
  const lang = "en";

  // success response
  res.success = (message, data) => {
    //message = messages[lang][message] || message;
    //message = functions.Function.prettyCase(message);

    return res.send({ statusCode: 200, message: message, data: data || {} });
  };

  // error response
  res.error = (code, message, data) => {
    // message = messages[lang][message] || message;
    // message = functions.Function.prettyCase(message);

    const isApp = /\/user\//.test(req.originalUrl || req.url);
    const status = !isApp && code === 401 ? 401 : 208;
    return res
      .status(status)
      .send({ statusCode: code, message: message, data: data || {} });
  };

  next();
};
