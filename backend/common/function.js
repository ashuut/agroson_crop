const _ = require("lodash");



const prettyCase = (str) => {
    if (/^[A-Z_]+$/.test(str)) {
        str = _.lowerCase(str);
        str = _.upperFirst(str);
    }
    return str;
};

module.export = {
    prettyCase
}