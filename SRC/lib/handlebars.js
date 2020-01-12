//Dar formato de tiempo aproximado a las etiquetas de tiempo
const { format } = require('timeago.js');
const helpers = {};
helpers.timeago = (timestamp) =>  {
    return format(timestamp);
};
module.exports = helpers;
