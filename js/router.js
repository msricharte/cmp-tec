Router.prototype = {
    routeList: undefined,
    root: undefined,

    constructor: function (routeList) {
        this.routeList = routeList;
        this.root = document.getElementById('app');
    },

    init: function () {
        var r = this.routeList;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },

    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActive(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlFile);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlFile);
                }
            }
        }
    },

    goToRoute: function (htmlFile) {
        (function(scope) { 
            var url = 'views/' + htmlFile,
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.root.innerHTML = this.responseText;
                    if(htmlFile==="chat.html"){initChat();}

                    if(htmlFile=== "profile.html"){applyFriendStatus()}
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};



function Router(routeList) {
    this.constructor(routeList);
    this.init();
}