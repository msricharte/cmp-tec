Route.prototype = {
    name: undefined,
    htmlFile: undefined,
    default: undefined,

    constructor: function (name, htmlFile, isDefault) {
        this.name = name;
        this.htmlFile = htmlFile;
        this.default = isDefault;
    },

    isActive: function (hash) {
        return hash.replace('#', '') === this.name; 
    }
}


function Route(name, htmlFile, isDefault) {
    this.constructor(name, htmlFile, isDefault);
}
