var App;
(function (App) {
    /**
    * @name Component
    * @description syntax sugar to ease transition to angular 2
    * @requires App.Common.RouteResolverServiceProvider
    */
    App.Component = function (options) {
        if (options.template || options.templateUrl) {
            var directiveDefinitionObject = {
                controllerAs: "vm",
                controller: options.componentName,
                restrict: options.restrict || "E",
                template: options.template,
                templateUrl: options.templateUrl,
                replace: options.replace || true,
                scope: options.scope || {}
            };
            angular.module(options.module).directive(options.selector.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }), [function () { return directiveDefinitionObject; }]);
            options.component.$inject = options.providers;
            angular.module(options.module).controller(options.componentName, options.component);
        }
        else if (options.dynamic) {
            options.component.$inject = options.providers;
            angular.module(options.module).service(options.componentName, options.component);
        }
        else {
            options.component.$inject = options.providers;
            angular.module(options.module)
                .controller(options.componentName, options.component);
            angular.module(options.module)
                .config([
                "routeResolverServiceProvider", function (routeResolverServiceProvider) {
                    routeResolverServiceProvider.configure({
                        route: options.key.route,
                        key: options.key,
                        promise: options.component.canActivate()
                    });
                }
            ]);
        }
    };
})(App || (App = {}));

//# sourceMappingURL=component.js.map

var App;
(function (App) {
    /**
     * @name Pipe
     * @description syntax sugar to ease transition to angular 2
     */
    App.Pipe = function (options) {
        angular.module(options.module).filter(options.pipeName, options.pipe);
    };
})(App || (App = {}));

//# sourceMappingURL=pipe.js.map

var App;
(function (App) {
    App.Route = function (options) {
        options.$routeProvider.when(options.when, {
            templateUrl: options.componentTemplateUrl,
            controller: options.componentName,
            controllerAs: "vm",
            resolve: {
                routeData: ["routeResolverService", function (routeResolverService) {
                        return routeResolverService.resolve(options.when);
                    }]
            }
        });
    };
})(App || (App = {}));

//# sourceMappingURL=route.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
angular.module("app.configuration", [
    "app.common",
    "app.data"
]);

//# sourceMappingURL=configuration.module.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
angular.module("app.photographer", [
    "app.common",
    "app.data"
]);

//# sourceMappingURL=photographer.module.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Photographer;
    (function (Photographer) {
        "use strict";
        var PhotographerRoutes = (function () {
            function PhotographerRoutes() {
            }
            PhotographerRoutes.Configure = function ($routeProvider) {
                $routeProvider.when("/about", {
                    templateUrl: "src/photographer/components/aboutPhotographer/aboutPhotographer.html",
                    controller: "aboutPhotographerController",
                    controllerAs: "vm",
                    resolve: {
                        routeData: ["routeResolverService", function (routeResolverService) {
                                return routeResolverService.resolve("/about");
                            }]
                    }
                });
            };
            return PhotographerRoutes;
        })();
        Photographer.PhotographerRoutes = PhotographerRoutes;
    })(Photographer = App.Photographer || (App.Photographer = {}));
})(App || (App = {}));

//# sourceMappingURL=photographer.routes.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
angular.module("app.common", []);

//# sourceMappingURL=common.module.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
angular.module("app.photography", [
    "ngAnimate",
    "ngRoute",
    "app.common",
    "app.configuration",
    "app.data",
    "app.photographer",
    "app.security",
    "app.ui"
]);
angular.module("photographyApp", [
    "app.photography"
]).config([
    "$routeProvider", "apiEndpointProvider", function ($routeProvider, apiEndpointProvider) {
        App.Photographer.PhotographerRoutes.Configure($routeProvider);
        App.Photography.PhotographyRoutesRoutes.Configure($routeProvider);
        App.Security.SecurityRoutes.Configure($routeProvider);
        $routeProvider.otherwise("/");
        apiEndpointProvider.configure("http://configurationapi.azurewebsites.net/api", "configuration");
        apiEndpointProvider.configure("http://photographyapi.azurewebsites.net/api", "photography");
        apiEndpointProvider.configure("http://qbsecurityapi.azurewebsites.net/api", "security");
    }
])
    .run([function () { FastClick.attach(document.body); }])
    .run(["backToTopButton", function (backToTopButton) { backToTopButton.bootstrap(); }]);

//# sourceMappingURL=photography.module.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        var PhotographyRoutesRoutes = (function () {
            function PhotographyRoutesRoutes() {
            }
            PhotographyRoutesRoutes.Configure = function ($routeProvider) {
                App.Route({
                    when: "/",
                    componentTemplateUrl: "src/photography/components/home.component.html",
                    componentName: "homeComponent",
                    $routeProvider: $routeProvider
                });
                $routeProvider.when("/photos", {
                    templateUrl: "src/photography/components/home.component.html",
                    controller: "homeComponent",
                    controllerAs: "vm",
                    resolve: {
                        routeData: ["routeResolverService", function (routeResolverService) {
                                return routeResolverService.resolve("/");
                            }]
                    }
                });
                $routeProvider.when("/rates", {
                    templateUrl: "src/photography/components/rates.component.html",
                    controller: "ratesComponent",
                    controllerAs: "vm",
                    resolve: {
                        routeData: ["routeResolverService", function (routeResolverService) {
                                return routeResolverService.resolve("/rates");
                            }]
                    }
                });
            };
            return PhotographyRoutesRoutes;
        })();
        Photography.PhotographyRoutesRoutes = PhotographyRoutesRoutes;
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=photography.routes.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
angular.module("app.data", [
    "app.common"
]);

//# sourceMappingURL=data.module.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
angular.module("app.security", [
    "ngRoute",
    "app.common",
    "app.configuration"
]);

//# sourceMappingURL=security.module.js.map

var App;
(function (App) {
    var Security;
    (function (Security) {
        var SecurityRoutes = (function () {
            function SecurityRoutes() {
            }
            SecurityRoutes.Configure = function ($routeProvider) {
                $routeProvider.when("/login", {
                    templateUrl: "src/security/components/login/login.html",
                    controller: "loginController",
                    controllerAs: "vm",
                    authenticationRequired: false
                });
            };
            return SecurityRoutes;
        })();
        Security.SecurityRoutes = SecurityRoutes;
    })(Security = App.Security || (App.Security = {}));
})(App || (App = {}));

//# sourceMappingURL=security.routes.js.map

/// <reference path="../../typings/typescriptapp.d.ts" />
angular.module("app.ui", [
    "ngAnimate",
    "app.common",
    "app.configuration"
]);

//# sourceMappingURL=ui.module.js.map

var App;
(function (App) {
    var Configuration;
    (function (Configuration_1) {
        "use strict";
        var Configuration = (function () {
            function Configuration() {
                this.createInstance = function () {
                    var instance = new Configuration();
                    return instance;
                };
            }
            return Configuration;
        })();
        Configuration_1.Configuration = Configuration;
        angular.module("app.configuration").service("configuration", [Configuration]);
    })(Configuration = App.Configuration || (App.Configuration = {}));
})(App || (App = {}));

//# sourceMappingURL=configuration.model.js.map

var App;
(function (App) {
    var Configuration;
    (function (Configuration) {
        "use strict";
        /**
         * @name ConfigurationDataService
         * @module App.Configuration
         */
        var ConfigurationDataService = (function () {
            function ConfigurationDataService(apiEndpoint, dataService) {
                this.apiEndpoint = apiEndpoint;
                this.dataService = dataService;
            }
            ConfigurationDataService.prototype.get = function () { return this.dataService.fromServiceOrCache({ url: this.baseUri + "/configuration", method: "GET" }); };
            Object.defineProperty(ConfigurationDataService.prototype, "baseUri", {
                get: function () { return this.apiEndpoint.getBaseUrl("configuration"); },
                enumerable: true,
                configurable: true
            });
            return ConfigurationDataService;
        })();
        Configuration.ConfigurationDataService = ConfigurationDataService;
        angular.module("app.configuration").service("configurationDataService", ["apiEndpoint", "dataService", ConfigurationDataService]);
    })(Configuration = App.Configuration || (App.Configuration = {}));
})(App || (App = {}));

//# sourceMappingURL=configurationDataService.js.map

var App;
(function (App) {
    var Configuration;
    (function (Configuration) {
        /**
         * @name ConfigurationManager
         * @module App.Configuration
         */
        var ConfigurationManager = (function () {
            function ConfigurationManager() {
            }
            return ConfigurationManager;
        })();
        Configuration.ConfigurationManager = ConfigurationManager;
        angular.module("app.configuration").service("configurationManager", [ConfigurationManager]);
    })(Configuration = App.Configuration || (App.Configuration = {}));
})(App || (App = {}));

//# sourceMappingURL=configurationManager.js.map

var App;
(function (App) {
    var Photographer;
    (function (Photographer_1) {
        "use strict";
        /**
         * @name Photographer
         * @module App.Photographer
         */
        var Photographer = (function () {
            function Photographer($q) {
                var _this = this;
                this.$q = $q;
                this.createInstanceAsync = function (options) {
                    var instance = new Photographer(_this.$q);
                    instance.fullName = options.data.fullName;
                    instance.profileImageUrl = options.data.profileImageUrl;
                    return _this.$q.when(instance);
                };
            }
            Object.defineProperty(Photographer.prototype, "fullName", {
                get: function () { return this._fullName; },
                set: function (value) { this._fullName = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Photographer.prototype, "profileImageUrl", {
                get: function () { return this._profileImageUrl; },
                set: function (value) { this._profileImageUrl = value; },
                enumerable: true,
                configurable: true
            });
            return Photographer;
        })();
        Photographer_1.Photographer = Photographer;
        angular.module("app.photographer").service("photographer", ["$q", Photographer]);
    })(Photographer = App.Photographer || (App.Photographer = {}));
})(App || (App = {}));

//# sourceMappingURL=photographer.model.js.map

var App;
(function (App) {
    var Photographer;
    (function (Photographer) {
        "use strict";
        /**
         * @name PhotographerDataService
         * @module App.Photographer
         */
        var PhotographerDataService = (function () {
            function PhotographerDataService($q) {
                var _this = this;
                this.$q = $q;
                this.getFeaturedPhotographer = function () {
                    return _this.$q.when({ data: {
                            fullName: "Quinntyne Brown",
                            profileImageUrl: "/assets/images/quinntyne_brown.jpg"
                        } });
                };
            }
            return PhotographerDataService;
        })();
        Photographer.PhotographerDataService = PhotographerDataService;
        angular.module("app.photographer").service("photographerDataService", ["$q", PhotographerDataService]);
    })(Photographer = App.Photographer || (App.Photographer = {}));
})(App || (App = {}));

//# sourceMappingURL=photographerDataService.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
         * @name ApiEndpointProvider
         */
        var ApiEndpointProvider = (function () {
            function ApiEndpointProvider() {
                var _this = this;
                this.config = {
                    getBaseUrl: function (name) {
                        var baseUrl = "";
                        if (name) {
                            _this.config.baseUrls.forEach(function (endpointDefinition) {
                                if (name === endpointDefinition.name) {
                                    baseUrl = endpointDefinition.url;
                                }
                            });
                        }
                        if (!name || baseUrl === "") {
                            _this.config.baseUrls.forEach(function (endpointDefinition) {
                                if (!endpointDefinition.name && baseUrl === "") {
                                    baseUrl = endpointDefinition.url;
                                }
                            });
                        }
                        return baseUrl;
                    },
                    baseUrls: [],
                    configure: function (baseUrl, name) {
                        var self = this;
                        self.baseUrls.push({ url: baseUrl, name: name });
                    }
                };
            }
            ApiEndpointProvider.prototype.configure = function (baseUrl, name) {
                this.config.baseUrls.push({ url: baseUrl, name: name });
            };
            ApiEndpointProvider.prototype.$get = function () {
                return this.config;
            };
            return ApiEndpointProvider;
        })();
        Common.ApiEndpointProvider = ApiEndpointProvider;
        angular.module("app.common").provider("apiEndpoint", ApiEndpointProvider);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=apiEndpointProvider.js.map

var App;
(function (App) {
    var Common;
    (function (Common) {
        var element = document.querySelectorAll('[data-ng-app]')[0];
        if (element)
            var appName = element.getAttribute("data-ng-app");
        angular.module("app.common").value("appName", appName);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=appName.js.map

var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        var $q = angular.injector(['ng']).get("$q");
        var $compile = angular.injector(['ng']).get("$compile");
        /**
         * @name compileAsync
         * @module App.Common
         */
        Common.compileAsync = function (options) {
            return $q.when(options.augmentedJQuery = $compile(options.template)(options.scope));
        };
        angular.module("app.common").value("compileAsync", Common.compileAsync);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=compileAsync.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
         * @name ComponentStyleSheetsMappingsProvider
         * @module App.Common
         */
        var ComponentStyleSheetsMappingsProvider = (function () {
            function ComponentStyleSheetsMappingsProvider() {
                var _this = this;
                this._componentStyleSheetMappings = [];
                this.configure = function (options) {
                    _this._componentStyleSheetMappings.push(options.mapping);
                };
                this.$get = [function () {
                        getStyleSheetUrlsForComponent: (function (options) {
                        });
                    }];
            }
            return ComponentStyleSheetsMappingsProvider;
        })();
        Common.ComponentStyleSheetsMappingsProvider = ComponentStyleSheetsMappingsProvider;
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=componentStyleSheetMappings.js.map

var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        // Extracted from Underscore.js 1.5.2
        function debounce(func, wait, immediate) {
            var timeout, args, context, timestamp, result;
            return function () {
                context = this;
                args = arguments;
                timestamp = new Date();
                var later = function () {
                    var last = (new Date()) - timestamp;
                    if (last < wait) {
                        timeout = setTimeout(later, wait - last);
                    }
                    else {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    }
                };
                var callNow = immediate && !timeout;
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
                if (callNow) {
                    result = func.apply(context, args);
                }
                return result;
            };
        }
        Common.debounce = debounce;
        angular.module("app.common").value("debounce", debounce);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=debounce.js.map



//# sourceMappingURL=dot.js.map

var App;
(function (App) {
    var Common;
    (function (Common) {
        (function (formFactor) {
            formFactor[formFactor["mobile"] = 0] = "mobile";
            formFactor[formFactor["tablet"] = 1] = "tablet";
            formFactor[formFactor["desktop"] = 2] = "desktop";
        })(Common.formFactor || (Common.formFactor = {}));
        var formFactor = Common.formFactor;
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=formFactor.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        var getFormFactor = function () {
            var width = window.innerWidth;
            if (width <= 768)
                return Common.formFactor.mobile;
            if (width <= 1064)
                return Common.formFactor.tablet;
            return Common.formFactor.desktop;
        };
        angular.module("app.common").value("getFormFactor", getFormFactor);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=getFormFactor.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
        * @name ILoadStyleSheet
        * @module App.Common
        * @description load styleSheet if not already loaded
        */
        var loadStyleSheet = function (options) {
            var $q = angular.injector(['ng']).get("$q");
            var $http = angular.injector(['ng']).get("$http");
            var deferred = $q.defer();
            var styleSheets = document.styleSheets;
            var loaded = false;
            for (var i = 0, max = styleSheets.length; i < max; i++) {
                if (styleSheets[i].href == options.styleSheetUrl) {
                    loaded = true;
                    deferred.resolve();
                }
            }
            if (!loaded) {
                $http({ method: "GET", url: options.styleSheetUrl, cache: true }).then(function () {
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = options.styleSheetUrl;
                    document.getElementsByTagName("head")[0].appendChild(link);
                    deferred.resolve();
                });
            }
            return deferred.promise;
        };
        angular.module("app.common").value("loadStyleSheet", loadStyleSheet);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=loadStyleSheet.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        angular.module("app.common").value("localStorage", localStorage);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=localStorage.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
         * @name LocalStorageService
         */
        var LocalStorageService = (function () {
            function LocalStorageService() {
                this.get = function (options) {
                };
                this.set = function (options) {
                };
                this._inMemoryStorage = {};
            }
            return LocalStorageService;
        })();
        Common.LocalStorageService = LocalStorageService;
        angular.module("app.common").service("localStorageService", ["localStorage", LocalStorageService]);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=localStorageService.js.map

var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
         * @name parseBoolean
         * @module App.Common
         * @description convert string true or false to boolean value
         */
        Common.parseBoolean = function (options) { return options.value && options.value.toUpperCase() === "TRUE"; };
        angular.module("app.common").value("parseBoolean", Common.parseBoolean);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=parseBoolean.js.map

var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
        * @name RequestCounter
        * @module App.Common
        */
        var RequestCounter = (function () {
            function RequestCounter($q) {
                var _this = this;
                this.$q = $q;
                this.requests = 0;
                this.request = function (config) {
                    _this.requests += 1;
                    return _this.$q.when(config);
                };
                this.requestError = function (error) {
                    _this.requests -= 1;
                    return _this.$q.reject(error);
                };
                this.response = function (response) {
                    _this.requests -= 1;
                    return _this.$q.when(response);
                };
                this.responseError = function (error) {
                    _this.requests -= 1;
                    return _this.$q.reject(error);
                };
                this.getRequestCount = function () {
                    return _this.requests;
                };
            }
            RequestCounter.createInstance = function ($q) { return new RequestCounter($q); };
            return RequestCounter;
        })();
        Common.RequestCounter = RequestCounter;
        angular.module("app.common").factory("requestCounter", ["$q", RequestCounter.createInstance])
            .config([
            "$httpProvider", function ($httpProvider) {
                $httpProvider.interceptors.push("requestCounter");
            }
        ]);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=requestCounter.js.map

var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
        * @name RouteResolverServiceProvider
        * @module App.Common
        * @description Collect and execute route promises that should be resolve before a route is loaded
        */
        var RouteResolverServiceProvider = (function () {
            function RouteResolverServiceProvider() {
                var _this = this;
                this.configure = function (routePromise) { _this._routePromises.push(routePromise); };
                this.$get = ["$injector", "$q", function ($injector, $q) {
                        return {
                            resolve: function (routeName, routeParams) {
                                _this.routeParams = routeParams;
                                var deferred = $q.defer();
                                var resolvedRouteData = {};
                                var routePromises = _this.getRoutePromisesByRouteName(routeName);
                                var prioritizedGroups = _this.reduceRoutePromisesByPriority(routePromises);
                                _this.invoke($injector, $q, prioritizedGroups, 0, function () {
                                    deferred.resolve(resolvedRouteData);
                                }, resolvedRouteData);
                                return deferred.promise;
                            }
                        };
                    }
                ];
                /* @internal */
                this._routePromises = [];
                /**
                * @name getRoutePromisesByRouteName
                * @description the route promises that will be resolved on an route
                * if the value of the route key matches the route definition '/foo/{id}' or '/foos'
                * include that routePromises
                * if they is no specific route mention, it's assumed you want that promise to be resolved on
                * every route
                */
                this.getRoutePromisesByRouteName = function (route) {
                    return _this._routePromises.filter(function (routePromise) {
                        if (routePromise.route)
                            return routePromise.route === route;
                        return true;
                    });
                };
                /**
                 * Reduce RoutePromises into prioritized groups
                 * Put the route promises with the same priority in the same group
                 * Eventually will be resolve together asynchronously with $q.all
                 */
                this.reduceRoutePromisesByPriority = function (routePromises) {
                    var priorities = [];
                    var routePromisesPrioritizedGroups = [];
                    routePromises.forEach(function (promise) {
                        if (priorities.indexOf(promise.priority) < 0)
                            priorities.push(promise.priority);
                    });
                    priorities.forEach(function (priority, index) {
                        routePromisesPrioritizedGroups.push({
                            promises: routePromises.filter(function (promise) { return promise.priority == priority; }),
                            priority: priority,
                            isLast: index == priorities.length - 1
                        });
                    });
                    return routePromisesPrioritizedGroups;
                };
                /**
                 * Invoke the grouped promises. Reducing the results into the resolvedRouteData object
                 * If the route promise inside the group has a key defined, the result will be attached to the
                 * resolved object (routeData) using that key
                 * After you reach the last group, call the callback that will resolve the object that
                 * will have a key value dictionary with the results of any promises with a key defined
                 */
                this.invoke = function ($injector, $q, groups, currentGroupIndex, callback, resolvedRouteData) {
                    var excutedPromises = [];
                    var currentGroup = groups[currentGroupIndex];
                    currentGroup.promises.forEach(function (statePromise) {
                        excutedPromises.push($injector.invoke(statePromise.promise));
                    });
                    $q.all(excutedPromises).then(function (results) {
                        results.forEach(function (result, index) {
                            if (currentGroup.promises[index].key)
                                resolvedRouteData[currentGroup.promises[index].key] = results[index];
                        });
                        currentGroup.isLast ? callback() : _this.invoke($injector, $q, groups, currentGroupIndex + 1, callback, resolvedRouteData);
                    });
                };
            }
            Object.defineProperty(RouteResolverServiceProvider.prototype, "routePromises", {
                /**
                 * get route promises ordered by priority (ASC)
                 * priority 1 runs before priority 10
                 */
                get: function () {
                    return this._routePromises.sort(function (a, b) {
                        return a.priority - b.priority;
                    });
                },
                enumerable: true,
                configurable: true
            });
            return RouteResolverServiceProvider;
        })();
        Common.RouteResolverServiceProvider = RouteResolverServiceProvider;
        angular.module("app.common")
            .provider("routeResolverService", [RouteResolverServiceProvider])
            .run(["$injector", "$location", "$rootScope", function ($injector, $location, $rootScope) {
                $rootScope.$on("$viewContentLoaded", function () {
                    var $route = $injector.get("$route");
                    var instance = $route.current.scope[$route.current.controllerAs];
                    if (instance.onInit)
                        instance.onInit();
                });
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    var instance = current && current.controllerAs ? current.scope[current.controllerAs] : null;
                    if (instance && instance.canDeactivate && !instance.deactivated) {
                        event.preventDefault();
                        instance.canDeactivate().then(function (canDeactivate) {
                            if (canDeactivate) {
                                instance.deactivated = true;
                                $location.path(next.originalPath);
                            }
                        });
                    }
                    else {
                        if (instance && instance.deactivate)
                            instance.deactivate();
                    }
                });
            }]);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=routeResolverServiceProvider.js.map

var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
         * @name WindowResizeEventEmitter
         * @module App.Common
         */
        var WindowResizeEventEmitter = (function () {
            function WindowResizeEventEmitter($rootScope, debounce) {
                this.$rootScope = $rootScope;
                this.debounce = debounce;
                this.innerWidth = null;
                window.addEventListener("resize", debounce(onResize, 300));
                var self = this;
                function onResize() {
                    if (self.innerWidth != window.innerWidth) {
                        self.innerWidth = window.innerWidth;
                        $rootScope.$broadcast("windowInnerWidthChanged");
                    }
                }
            }
            return WindowResizeEventEmitter;
        })();
        Common.WindowResizeEventEmitter = WindowResizeEventEmitter;
        angular.module("app.common")
            .service("windowResizeEventEmitter", ["$rootScope", "debounce", WindowResizeEventEmitter])
            .run(["windowResizeEventEmitter", function (windowResizeEventEmitter) { }]);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));

//# sourceMappingURL=windowResizeEventEmitter.js.map

var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
         * @name HomeComponent
         * @module App.Photography
         */
        var HomeComponent = (function () {
            function HomeComponent($q, routeData) {
                this.$q = $q;
                this.routeData = routeData;
            }
            Object.defineProperty(HomeComponent.prototype, "photos", {
                get: function () { return this.routeData.photos; },
                enumerable: true,
                configurable: true
            });
            HomeComponent.canActivate = function () {
                return ["$http", "$q", "photo", "photoDataService", function ($http, $q, photo, photoDataService) {
                        var deferred = $q.defer();
                        photoDataService.getAllFeaturedPhotos().then(function (results) {
                            var promises = [];
                            for (var i = 0; i < results.data.length; i++) {
                                promises.push(photo.createInstanceAsync({ data: results.data[i] }));
                            }
                            $q.all(promises).then(function (photos) {
                                deferred.resolve(photos);
                            });
                        });
                        return deferred.promise;
                    }];
            };
            return HomeComponent;
        })();
        Photography.HomeComponent = HomeComponent;
        App.Component({
            module: "app.photography",
            component: HomeComponent,
            componentName: "homeComponent",
            providers: ["$q", "routeData"],
            route: "/",
            key: "photos"
        });
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=home.component.js.map

var App;
(function (App) {
    var Photography;
    (function (Photography) {
        var MobileMenuController = (function () {
            function MobileMenuController() {
            }
            return MobileMenuController;
        })();
        Photography.MobileMenuController = MobileMenuController;
        angular.module("app.photography").controller("photographyMobileMenuController", [MobileMenuController]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=mobileMenu.component.js.map

var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
         * @name photoUploadController
         * @module App.Photography
         */
        var PhotoUploadController = (function () {
            function PhotoUploadController() {
            }
            Object.defineProperty(PhotoUploadController.prototype, "photoUploadUrl", {
                get: function () { return "http://localhost:65186/api/photo/upload"; },
                enumerable: true,
                configurable: true
            });
            return PhotoUploadController;
        })();
        Photography.PhotoUploadController = PhotoUploadController;
        angular.module("app.photography").controller("photoUploadController", [PhotoUploadController]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=photoUpload.component.js.map

var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
         * @name RateCalculatorController
         * @module App.Photography
         */
        var RateCalculatorController = (function () {
            function RateCalculatorController($scope, $element, $attrs) {
                this.$scope = $scope;
                this.$element = $element;
                this.$attrs = $attrs;
            }
            return RateCalculatorController;
        })();
        Photography.RateCalculatorController = RateCalculatorController;
        angular.module("app.photography").controller("rateCalculatorController", ["$scope", "$element", "$attrs", RateCalculatorController]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=rateCalculator.component.js.map

var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
         * @name RatesComponent
         * @module App.Photography
         */
        var RatesComponent = (function () {
            function RatesComponent(routeData) {
                this.routeData = routeData;
            }
            RatesComponent.canActivate = function () {
                return ["$q", function ($q) { return $q.when(true); }];
            };
            return RatesComponent;
        })();
        Photography.RatesComponent = RatesComponent;
        App.Component({
            module: "app.photography",
            component: RatesComponent,
            componentName: "ratesComponent",
            providers: ["routeData"],
            route: "/rates",
            key: "rates"
        });
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=rates.component.js.map

var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
         * @name Gallery
         * @module App.Photography
         */
        var Gallery = (function () {
            function Gallery($q) {
                var _this = this;
                this.$q = $q;
                this.createInstanceAsync = function (options) {
                    var instance = new Photography.Photo(_this.$q);
                    return _this.$q.when(instance);
                };
            }
            Object.defineProperty(Gallery.prototype, "photos", {
                get: function () { return this._photos; },
                set: function (value) { this._photos = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Gallery.prototype, "description", {
                get: function () { return this._description; },
                set: function (value) { this._description = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Gallery.prototype, "title", {
                get: function () { return this._title; },
                set: function (value) { this._title = value; },
                enumerable: true,
                configurable: true
            });
            return Gallery;
        })();
        Photography.Gallery = Gallery;
        angular.module("app.photography").service("gallery", ["$q", Gallery]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=gallery.model.js.map

var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
         * @name Photo
         * @module App.Photography
         */
        var Photo = (function () {
            function Photo($q) {
                var _this = this;
                this.$q = $q;
                this.createInstanceAsync = function (options) {
                    var deferred = _this.$q.defer();
                    var instance = new Photo(_this.$q);
                    instance.url = options.data.url;
                    deferred.resolve(instance);
                    return deferred.promise;
                };
            }
            Object.defineProperty(Photo.prototype, "base64String", {
                get: function () { return this._base64String; },
                set: function (value) { this._base64String = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Photo.prototype, "description", {
                get: function () { return this._description; },
                set: function (value) { this._description = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Photo.prototype, "url", {
                get: function () { return this._url; },
                set: function (value) { this._url = value; },
                enumerable: true,
                configurable: true
            });
            return Photo;
        })();
        Photography.Photo = Photo;
        angular.module("app.photography").service("photo", ["$q", Photo]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=photo.model.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
        * @name GalleryDataService
        * @module App.Photography
        */
        var GalleryDataService = (function () {
            function GalleryDataService(apiEndpoint, dataService) {
                var _this = this;
                this.apiEndpoint = apiEndpoint;
                this.dataService = dataService;
                this.getByName = function (options) {
                    return _this.dataService.fromServiceOrCache({ url: _this.baseUri + "/getByName", params: options.params });
                };
            }
            Object.defineProperty(GalleryDataService.prototype, "baseUri", {
                get: function () { return this.apiEndpoint.getBaseUrl("photography") + "/gallery"; },
                enumerable: true,
                configurable: true
            });
            return GalleryDataService;
        })();
        Photography.GalleryDataService = GalleryDataService;
        angular.module("app.photography").service("galleryDataService", ["dataService", Photography.PhotoDataService]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=galleryDataService.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
        * @name PhotoDataService
        * @module App.Photography
        */
        var PhotoDataService = (function () {
            function PhotoDataService($q, apiEndpoint, dataService) {
                var _this = this;
                this.$q = $q;
                this.apiEndpoint = apiEndpoint;
                this.dataService = dataService;
                this.getAllFeaturedPhotos = function () {
                    return _this.$q.when({
                        data: [
                            { url: "assets/images/DSC_1287.JPG" },
                            { url: "assets/images/DSC_1256.JPG" },
                            { url: "assets/images/DSC_1245.JPG" }
                        ]
                    });
                };
            }
            Object.defineProperty(PhotoDataService.prototype, "baseUri", {
                get: function () { return this.apiEndpoint.getBaseUrl("photography") + "/photo"; },
                enumerable: true,
                configurable: true
            });
            return PhotoDataService;
        })();
        Photography.PhotoDataService = PhotoDataService;
        angular.module("app.photography").service("photoDataService", ["$q", "apiEndpoint", "dataService", PhotoDataService]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=photoDataService.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Photography;
    (function (Photography) {
        "use strict";
        /**
        * @name PhotographyAppHeaderManager
        * @module App.Photography
        */
        var PhotographyAppHeaderManager = (function () {
            function PhotographyAppHeaderManager() {
                this._links = [
                    { caption: "Home", url: "#/" },
                    { caption: "Photos", url: "#/photos" },
                    { caption: "Rates", url: "#/rates" },
                    { caption: "About", url: "#/about" }
                ];
            }
            Object.defineProperty(PhotographyAppHeaderManager.prototype, "links", {
                get: function () { return this._links; },
                set: function (value) { this._links = value; },
                enumerable: true,
                configurable: true
            });
            PhotographyAppHeaderManager.prototype.getMobileMenuTemplateUrl = function () {
                return "/src/photography/components/mobileMenu/mobileMenu.html";
            };
            return PhotographyAppHeaderManager;
        })();
        Photography.PhotographyAppHeaderManager = PhotographyAppHeaderManager;
        angular.module("app.photography").service("photographyAppHeaderManager", [PhotographyAppHeaderManager]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=photographyAppHeaderManager.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Photography;
    (function (Photography) {
        /**
         * @name PhotographyManager
         * @module App.Photography
         */
        var PhotographyManager = (function () {
            function PhotographyManager() {
            }
            return PhotographyManager;
        })();
        Photography.PhotographyManager = PhotographyManager;
        angular.module("app.photography").service("photographyManager", [PhotographyManager]);
    })(Photography = App.Photography || (App.Photography = {}));
})(App || (App = {}));

//# sourceMappingURL=photographyManager.js.map

var App;
(function (App) {
    var Data;
    (function (Data) {
        /**
         * @name DataService
         * @module App.Data
         */
        var DataService = (function () {
            function DataService($http, $q, localStorageService) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.localStorageService = localStorageService;
                this.inMemoryCache = {};
                this.fromServiceOrCache = function (options) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: options.method, url: options.url }).then(function (results) {
                        deferred.resolve(results);
                    });
                    return deferred.promise;
                };
                this.fromService = function (options) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: options.method, url: options.url }).then(function (results) {
                        deferred.resolve(results);
                    });
                    return deferred.promise;
                };
                this.invalidateCache = function () {
                    _this.inMemoryCache = {};
                };
            }
            return DataService;
        })();
        Data.DataService = DataService;
        angular.module("app.data").service("dataService", ["$http", "$q", "localStorageService", DataService]);
    })(Data = App.Data || (App.Data = {}));
})(App || (App = {}));

//# sourceMappingURL=dataService.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var Security;
    (function (Security) {
        "use strict";
        /**
         * @name SecurityDataService
         * @module App.Security
         */
        var SecurityDataService = (function () {
            function SecurityDataService(apiEndpoint, dataService) {
                this.apiEndpoint = apiEndpoint;
                this.dataService = dataService;
            }
            Object.defineProperty(SecurityDataService.prototype, "baseUri", {
                get: function () { return this.apiEndpoint.getBaseUrl("security"); },
                enumerable: true,
                configurable: true
            });
            return SecurityDataService;
        })();
        Security.SecurityDataService = SecurityDataService;
        angular.module("app.security").service("securityDataService", ["apiEndpoint", "dataService", SecurityDataService]);
    })(Security = App.Security || (App.Security = {}));
})(App || (App = {}));

//# sourceMappingURL=securityDataService.js.map

var App;
(function (App) {
    var Security;
    (function (Security) {
        "use strict";
        /**
        * @name SecurityManager
        * @module App.Security
        */
        var SecurityManager = (function () {
            function SecurityManager(localStorageService) {
                this.localStorageService = localStorageService;
            }
            return SecurityManager;
        })();
        Security.SecurityManager = SecurityManager;
        angular.module("app.security").service("securityManager", ["localStorageService", Security.SecurityDataService]);
    })(Security = App.Security || (App.Security = {}));
})(App || (App = {}));

//# sourceMappingURL=securityManager.js.map

var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        var $q = angular.injector(['ng']).get("$q");
        /**
         * @name appendToBodyAsync
         * @module App.UI
         */
        UI.appendToBodyAsync = function (options) {
            var deferred = $q.defer();
            document.body.appendChild(options.nativeElement);
            setTimeout(function () { deferred.resolve(); }, options.wait || 100);
            return deferred.promise;
        };
        angular.module("app.ui").value("appendToBodyAsync", UI.appendToBodyAsync);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=appendToBodyAsync.js.map

var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name destroyScope
         * @module App.UI
         */
        UI.destroyScope = function (options) {
            if (options.scope) {
                options.scope.$destroy();
                options.scope = null;
            }
        };
        angular.module("app.ui").value("destroyScope", UI.destroyScope);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=destroyScope.js.map

var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        var $q = angular.injector(['ng']).get("$q");
        /**
         * @name extendCssAsync
         * @module App.UI
         */
        UI.extendCssAsync = function (options) {
            return $q.when(angular.extend(options.nativeHTMLElement.style, options.cssObject));
        };
        angular.module("app.ui").value("extendCssAsync", UI.extendCssAsync);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=extendCssAsync.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        var getHtml = function (who, deep) {
            if (!who || !who.tagName)
                return '';
            var txt, ax, el = document.createElement("div");
            el.appendChild(who.cloneNode(false));
            txt = el.innerHTML;
            if (deep) {
                ax = txt.indexOf('>') + 1;
                txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
            }
            el = null;
            return txt;
        };
        angular.module("app.ui").value("getHtml", getHtml);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=getHTML.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        /**
         * @name Position
         * @module App.UI
         */
        var Position = (function () {
            function Position($q, ruler, space, translateXY) {
                var _this = this;
                this.$q = $q;
                this.ruler = ruler;
                this.space = space;
                this.translateXY = translateXY;
                this.somewhere = function (a, b, space, directionPriorityList) {
                    var deferred = _this.$q.defer();
                    return deferred.promise;
                };
                this.above = function (a, b, space) {
                    var deferred = _this.$q.defer();
                    _this.$q
                        .all([_this.ruler.measure(a), _this.ruler.measure(b)])
                        .then(function (resultsArray) {
                        var aRectangle = resultsArray[0];
                        var bRectangle = resultsArray[1];
                        _this.translateXY({
                            element: b,
                            x: aRectangle.centerX - bRectangle.radiusX,
                            y: aRectangle.bottom + space
                        });
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.below = function (a, b, space) {
                    var deferred = _this.$q.defer();
                    _this.$q
                        .all([_this.ruler.measure(a), _this.ruler.measure(b)])
                        .then(function (resultsArray) {
                        var aRectangle = resultsArray[0];
                        var bRectangle = resultsArray[1];
                        _this.translateXY({
                            element: b,
                            x: aRectangle.centerX - bRectangle.radiusX,
                            y: aRectangle.bottom + space
                        });
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.left = function (a, b, space) {
                    var deferred = _this.$q.defer();
                    _this.$q
                        .all([_this.ruler.measure(a), _this.ruler.measure(b)])
                        .then(function (resultsArray) {
                        var aRectangle = resultsArray[0];
                        var bRectangle = resultsArray[1];
                        _this.translateXY({
                            element: b,
                            x: aRectangle.centerX - bRectangle.radiusX,
                            y: aRectangle.bottom + space
                        });
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.right = function (a, b, space) {
                    var deferred = _this.$q.defer();
                    _this.$q
                        .all([_this.ruler.measure(a), _this.ruler.measure(b)])
                        .then(function (resultsArray) {
                        var aRectangle = resultsArray[0];
                        var bRectangle = resultsArray[1];
                        _this.translateXY({
                            element: b,
                            x: aRectangle.centerX - bRectangle.radiusX,
                            y: aRectangle.bottom + space
                        });
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
            }
            return Position;
        })();
        UI.Position = Position;
        angular.module("app.ui").service("position", ["$q", "ruler", "space", "translateXY", Position]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=position.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name Rectangle
         * @module App.UI
         */
        var Rectangle = (function () {
            function Rectangle() {
                this.createInstance = function (options) {
                    var instance = new Rectangle();
                    if (options.clientRect) {
                        instance.left = options.clientRect.left;
                        instance.top = options.clientRect.top;
                        instance.height = options.clientRect.height;
                        instance.width = options.clientRect.width;
                    }
                    else {
                        instance.left = options.left;
                        instance.top = options.top;
                        instance.height = options.height;
                        instance.width = options.width;
                    }
                    return instance;
                };
            }
            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () { return this.left + this.width; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: function () { return this.top + this.height; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "centerX", {
                get: function () { return this.left + (this.width / 2); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "centerY", {
                get: function () { return this.top + (this.height / 2); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "radiusX", {
                get: function () { return this.width / 2; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "radiusY", {
                get: function () { return this.height / 2; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "middle", {
                get: function () { return { x: this.centerX, y: this.centerY }; },
                enumerable: true,
                configurable: true
            });
            return Rectangle;
        })();
        UI.Rectangle = Rectangle;
        angular.module("app.ui").service("rectangle", [Rectangle]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=rectangle.js.map

var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name removeElement
         * @module App.UI
         */
        UI.removeElement = function (options) {
            if (options.nativeHTMLElement) {
                var $target = angular.element(options.nativeHTMLElement);
                options.nativeHTMLElement.parentNode.removeChild(options.nativeHTMLElement);
                $target.remove();
                delete options.nativeHTMLElement;
            }
        };
        angular.module("app.ui").value("removeElement", UI.removeElement);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=removeElement.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name Ruler
         * @module App.UI
         */
        var Ruler = (function () {
            function Ruler($document, $q, $timeout, rectangle) {
                var _this = this;
                this.$document = $document;
                this.$q = $q;
                this.$timeout = $timeout;
                this.rectangle = rectangle;
                this.measure = function (element) {
                    var deferred = _this.$q.defer();
                    var documentRef = angular.element(_this.$document)[0];
                    if (documentRef.body.contains(element)) {
                        deferred.resolve(_this.rectangle.createInstance({ clientRect: element.getBoundingClientRect() }));
                    }
                    else {
                        _this.$timeout(function () {
                            documentRef.body.appendChild(element);
                            var clientRect = element.getBoundingClientRect();
                            element.parentNode.removeChild(element);
                            deferred.resolve(_this.rectangle.createInstance({ clientRect: clientRect }));
                        }, 0, false);
                    }
                    return deferred.promise;
                };
            }
            return Ruler;
        })();
        UI.Ruler = Ruler;
        angular.module("app.ui").service("ruler", ["$document", "$q", "$timeout", "rectangle", Ruler]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=ruler.js.map

var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        var $q = angular.injector(['ng']).get("$q");
        /**
         * @name setOpacityAsync
         * @module App.UI
         */
        UI.setOpacityAsync = function (options) {
            var deferred = $q.defer();
            if (options.nativeHtmlElement) {
                options.nativeHtmlElement.style.opacity = options.opacity;
                options.nativeHtmlElement.addEventListener('transitionend', resolve, false);
            }
            function resolve() {
                options.nativeHtmlElement.removeEventListener('transitionend', resolve);
                deferred.resolve();
            }
            return deferred.promise;
        };
        angular.module("app.ui").value("setOpacityAsync", UI.setOpacityAsync);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=setOpacityAsync.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        var Space = (function () {
            function Space() {
                this.above = function (spaceNeed, rectangle) {
                    return false;
                };
                this.below = function (spaceNeed, rectangle) {
                    return false;
                };
                this.left = function (spaceNeed, rectangle) {
                    return false;
                };
                this.right = function (spaceNeed, rectangle) {
                    return false;
                };
            }
            return Space;
        })();
        UI.Space = Space;
        angular.module("app.ui").service("space", [Space]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=space.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        var $q = angular.injector(['ng']).get("$q");
        UI.translateXAsync = function (options) {
            var deferred = $q.defer();
            angular.element(options.element).css({
                "-moz-transform": "translateX(" + options.x + "px)",
                "-webkit-transform": "translateX(" + options.x + "px)",
                "-ms-transform": "translateX(" + options.x + "px)",
                "-transform": "translateX(" + options.x + "px)"
            });
            options.element.addEventListener('transitionend', function () {
                deferred.resolve();
            }, false);
            return deferred.promise;
        };
        angular.module("app.ui").value("translateXAsync", UI.translateXAsync);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=translateXAsync.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        UI.translateXY = function (options) {
            angular.element(options.element).css({
                "-moz-transform": "translate(" + options.x + "px, " + options.y + "px)",
                "-webkit-transform": "translate(" + options.x + "px, " + options.y + "px)",
                "-ms-transform": "translate(" + options.x + "px, " + options.y + "px)",
                "-transform": "translate(" + options.x + "px, " + options.y + "px)"
            });
            return options.element;
        };
        angular.module("app.ui").value("translateXY", UI.translateXY);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=translateXY.js.map

/// <reference path="../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        var $q = angular.injector(['ng']).get("$q");
        UI.translateXYAsync = function (options) {
            var deferred = $q.defer();
            options.element.addEventListener('transitionend', function () {
                deferred.resolve();
            }, false);
            angular.element(options.element).css({
                "-moz-transform": "translate(" + options.x + "px, " + options.y + "px)",
                "-webkit-transform": "translate(" + options.x + "px, " + options.y + "px)",
                "-ms-transform": "translate(" + options.x + "px, " + options.y + "px)",
                "-transform": "translate(" + options.x + "px, " + options.y + "px)"
            });
            return deferred.promise;
        };
        angular.module("app.ui").value("translateXYAsync", UI.translateXYAsync);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=translateXYAsync.js.map

var App;
(function (App) {
    var Photographer;
    (function (Photographer) {
        "use strict";
        /**
         * @name AboutPhotographerController
         * @module App.Photographer
         */
        var AboutPhotographerController = (function () {
            function AboutPhotographerController(routeData) {
                this.routeData = routeData;
            }
            Object.defineProperty(AboutPhotographerController.prototype, "photographer", {
                get: function () { return this.routeData["photographer"]; },
                enumerable: true,
                configurable: true
            });
            AboutPhotographerController.canActivate = function () {
                return ["$q", "photographerDataService", "photographer", function ($q, photographerDataService, photographer) {
                        var deferred = $q.defer();
                        photographerDataService.getFeaturedPhotographer().then(function (results) {
                            photographer.createInstanceAsync({ data: results.data }).then(function (results) {
                                deferred.resolve(results);
                            });
                        });
                        return deferred.promise;
                    }];
            };
            return AboutPhotographerController;
        })();
        Photographer.AboutPhotographerController = AboutPhotographerController;
        angular.module("app.photographer")
            .controller("aboutPhotographerController", ["routeData", AboutPhotographerController])
            .config([
            "routeResolverServiceProvider", function (routeResolverServiceProvider) {
                routeResolverServiceProvider.configure({
                    route: "/about",
                    key: "photographer",
                    promise: AboutPhotographerController.canActivate()
                });
            }
        ]);
    })(Photographer = App.Photographer || (App.Photographer = {}));
})(App || (App = {}));

//# sourceMappingURL=aboutPhotographer.controller.js.map

var App;
(function (App) {
    var Security;
    (function (Security) {
        "use strict";
        var LoginController = (function () {
            function LoginController() {
            }
            return LoginController;
        })();
        Security.LoginController = LoginController;
        angular.module("app.security").controller("loginController", [LoginController]);
    })(Security = App.Security || (App.Security = {}));
})(App || (App = {}));

//# sourceMappingURL=login.controller.js.map

var App;
(function (App) {
    var Security;
    (function (Security) {
        "use strict";
        /**
         * @name login
         * @module App.Security
         */
        var Login = (function () {
            function Login() {
                this.template = [""].join(" ");
                this.restrict = "E";
                this.replace = true;
                this.controller = "loginController";
                this.controllerAs = "vm";
            }
            Login.createInstance = function () { return new Login(); };
            Login.styleUrls = [];
            return Login;
        })();
        Security.Login = Login;
        angular.module("app.security").directive("login", [Login.createInstance]);
    })(Security = App.Security || (App.Security = {}));
})(App || (App = {}));

//# sourceMappingURL=login.directive.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name AppFooterController
         * @module App.UI
         */
        var AppFooterController = (function () {
            function AppFooterController() {
            }
            return AppFooterController;
        })();
        UI.AppFooterController = AppFooterController;
        angular.module("app.ui").controller("appFooterController", [AppFooterController]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=appFooter.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        var AppFooter = (function () {
            function AppFooter() {
                this.template = [
                    "<div class='app-footer'>",
                    "</div>"
                ].join(" ");
                this.styles = "";
                this.restrict = "E";
                this.replace = true;
                this.controllerAs = "vm";
                this.controller = "appFooterController";
            }
            AppFooter.createInstance = function () { return new AppFooter(); };
            return AppFooter;
        })();
        UI.AppFooter = AppFooter;
        angular.module("app.ui").directive("appFooter", [AppFooter.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=appFooter.directive.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name BackDrop
         * @module App.UI
         */
        var BackDrop = (function () {
            function BackDrop($q, appendToBodyAsync, extendCssAsync, removeElement, setOpacityAsync) {
                var _this = this;
                this.$q = $q;
                this.appendToBodyAsync = appendToBodyAsync;
                this.extendCssAsync = extendCssAsync;
                this.removeElement = removeElement;
                this.setOpacityAsync = setOpacityAsync;
                this.createInstance = function (options) {
                    var instance = new BackDrop(_this.$q, _this.appendToBodyAsync, _this.extendCssAsync, _this.removeElement, _this.setOpacityAsync);
                    return instance;
                };
                this.openAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.initializeAsync()
                        .then(_this.appendBackDropToBodyAsync)
                        .then(_this.showAsync)
                        .then(function () {
                        _this.isOpen = true;
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.closeAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.hideAsync().then(function (results) {
                        _this.dispose();
                        _this.isOpen = false;
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.initializeAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.augmentedJQuery = angular.element("<div></div>");
                    _this.extendCssAsync({
                        nativeHTMLElement: _this.nativeHTMLElement,
                        cssObject: {
                            "-webkit-transition": "opacity 300ms ease-in-out",
                            "-o-transition": "opacity 300ms ease-in-out",
                            "transition": "opacity 300ms ease-in-out",
                            "opacity": "0",
                            "position": "fixed",
                            "top": "0",
                            "left": "0",
                            "height": "100%",
                            "width": "100%",
                            "background-color": "rgba(0, 0, 0, .25)",
                            "display": "block"
                        }
                    }).then(function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.showAsync = function () {
                    return _this.setOpacityAsync({ nativeHtmlElement: _this.nativeHTMLElement, opacity: 25 });
                };
                this.appendBackDropToBodyAsync = function () {
                    return _this.appendToBodyAsync({ nativeElement: _this.nativeHTMLElement });
                };
                this.hideAsync = function () {
                    return _this.setOpacityAsync({ nativeHtmlElement: _this.nativeHTMLElement, opacity: 0 });
                };
                this.dispose = function () {
                    _this.removeElement({ nativeHTMLElement: _this.nativeHTMLElement });
                    _this.augmentedJQuery = null;
                };
                this.isOpen = false;
                this.isAnimating = false;
            }
            Object.defineProperty(BackDrop.prototype, "nativeHTMLElement", {
                get: function () { return this.augmentedJQuery[0]; },
                enumerable: true,
                configurable: true
            });
            return BackDrop;
        })();
        UI.BackDrop = BackDrop;
        angular.module("app.ui").service("backDrop", ["$q", "appendToBodyAsync", "extendCssAsync", "removeElement", "setOpacityAsync", BackDrop]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=backDrop.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name CalloutController
         * @module App.UI
         */
        var CalloutController = (function () {
            function CalloutController($attrs, $compile, $element, $http, $q, $scope, $timeout, appendToBodyAsync, backDrop, destroyScope, extendCssAsync, parseBoolean, position, removeElement, setOpacityAsync) {
                var _this = this;
                this.$attrs = $attrs;
                this.$compile = $compile;
                this.$element = $element;
                this.$http = $http;
                this.$q = $q;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.appendToBodyAsync = appendToBodyAsync;
                this.backDrop = backDrop;
                this.destroyScope = destroyScope;
                this.extendCssAsync = extendCssAsync;
                this.parseBoolean = parseBoolean;
                this.position = position;
                this.removeElement = removeElement;
                this.setOpacityAsync = setOpacityAsync;
                this.bootstrap = function () {
                    _this.triggerEvent = _this.$attrs["triggerEvent"] || "click";
                    _this.nativeOriginalHTMLElement.addEventListener(_this.triggerEvent, _this.onTrigger);
                    _this.$scope.$on("$destroy", function () {
                        _this.dispose();
                        _this.nativeOriginalHTMLElement.removeEventListener(_this.triggerEvent, _this.onTrigger);
                        angular.element(_this.nativeOriginalHTMLElement).remove();
                        _this.$element.remove();
                        _this.$element = null;
                        _this.$attrs = null;
                    });
                };
                this.onTrigger = function () {
                    if (_this.isAnimating)
                        return;
                    if (_this.isOpen) {
                        _this.closeAsync();
                    }
                    else {
                        if (_this.displayBackDrop) {
                            _this.backDropInstance = _this.backDrop.createInstance();
                            _this.backDropInstance.openAsync()
                                .then(_this.openAsync);
                        }
                        else {
                            _this.openAsync();
                        }
                    }
                };
                this.backDropInstance = null;
                this.isOpen = false;
                this.isAnimating = false;
                this.getCalloutTemplateAsync = function () {
                    var deferred = _this.$q.defer();
                    if (_this.$attrs["templateUrl"]) {
                        _this.$http({ method: "GET", url: _this.$attrs["templateUrl"] }).then(function (results) {
                            _this.calloutTemplate = results.data;
                            deferred.resolve();
                        });
                    }
                    else {
                        _this.calloutTemplate = _this.defaultCalloutTemplate;
                        deferred.resolve();
                    }
                    return deferred.promise;
                };
                this.compileCalloutTemplateAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.calloutAugmentedJQuery = _this.$compile(_this.calloutTemplate)(_this.calloutScope);
                    deferred.resolve();
                    return deferred.promise;
                };
                this.positionCalloutAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.position.below(_this.nativeOriginalHTMLElement, _this.nativeCalloutElement, 30).then(function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.appendCalloutToBodyAsync = function () { return _this.appendToBodyAsync({ nativeElement: _this.nativeCalloutElement }); };
                this.showCalloutElementAsync = function () { return _this.setOpacityAsync({ nativeHtmlElement: _this.nativeCalloutElement, opacity: 100 }); };
                this.hideCalloutElementAsync = function () {
                    return _this.setOpacityAsync({ nativeHtmlElement: _this.nativeCalloutElement, opacity: 0 });
                };
                this.setInitialCalloutCssAsync = function () {
                    return _this.extendCssAsync({
                        nativeHTMLElement: _this.nativeCalloutElement, cssObject: {
                            "-webkit-transition": "opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out",
                            "-o-transition": "opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out",
                            "transition": "opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out",
                            "opacity": "0",
                            "position": "fixed",
                            "top": "0",
                            "left": "0",
                            "display": "block"
                        }
                    });
                };
                this.openAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.isAnimating = true;
                    _this.calloutScope = _this.$scope.$new();
                    _this.getCalloutTemplateAsync()
                        .then(_this.compileCalloutTemplateAsync)
                        .then(_this.setInitialCalloutCssAsync)
                        .then(_this.positionCalloutAsync)
                        .then(_this.appendCalloutToBodyAsync)
                        .then(_this.showCalloutElementAsync)
                        .then(function () {
                        _this.isAnimating = false;
                        _this.isOpen = true;
                        _this.closeCalloutScheduledPromise = _this.$timeout(_this.closeAsync, Number(_this.$attrs["displayFor"] || 2000), false);
                    });
                    return deferred.promise;
                };
                this.closeAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.isAnimating = true;
                    _this.$timeout.cancel(_this.closeCalloutScheduledPromise);
                    _this.hideCalloutElementAsync().then(function () {
                        _this.dispose();
                        _this.isOpen = false;
                        _this.isAnimating = false;
                        if (_this.backDropInstance) {
                            _this.backDropInstance.closeAsync().then(function () {
                                deferred.resolve();
                                _this.backDropInstance = null;
                            });
                        }
                        else {
                            deferred.resolve();
                        }
                    });
                    return deferred.promise;
                };
                this.dispose = function () {
                    _this.destroyScope({ scope: _this.calloutScope });
                    _this.removeElement({ nativeHTMLElement: _this.nativeCalloutElement });
                    _this.calloutAugmentedJQuery = null;
                    _this.closeCalloutScheduledPromise = null;
                    _this.calloutTemplate = null;
                };
                this.closeCalloutScheduledPromise = null;
                this.defaultCalloutTemplate = [
                    "<div class='callout'>",
                    "<h1>Callout</h1>",
                    "</div>"
                ].join(" ");
                this.bootstrap();
            }
            Object.defineProperty(CalloutController.prototype, "nativeCalloutElement", {
                get: function () { return this.calloutAugmentedJQuery ? this.calloutAugmentedJQuery[0] : null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CalloutController.prototype, "nativeOriginalHTMLElement", {
                get: function () { return this.$element[0]; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CalloutController.prototype, "transitionDurationInMilliseconds", {
                get: function () { return this.$attrs["transitionDurationInMilliseconds"] || 1000; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CalloutController.prototype, "defaultDirection", {
                get: function () { return this.$attrs["defaultDirection"] || "bottom"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CalloutController.prototype, "displayBackDrop", {
                get: function () { return this.parseBoolean({ value: this.$attrs["displayBackDrop"] }); },
                enumerable: true,
                configurable: true
            });
            return CalloutController;
        })();
        UI.CalloutController = CalloutController;
        angular.module("app.ui").controller("calloutController", [
            "$attrs",
            "$compile",
            "$element",
            "$http",
            "$q",
            "$scope",
            "$timeout",
            "appendToBodyAsync",
            "backDrop",
            "destroyScope",
            "extendCssAsync",
            "parseBoolean",
            "position",
            "removeElement",
            "setOpacityAsync", CalloutController]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=callout.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name Callout
         * @module App.UI
         */
        var Callout = (function () {
            function Callout() {
                this.restrict = "A";
                this.controller = "calloutController";
                this.controllerAs = "vm";
            }
            Callout.createInstance = function () { return new Callout(); };
            Callout.styleUrls = ["/src/app/ui/components/callout/callout.css"];
            return Callout;
        })();
        UI.Callout = Callout;
        angular.module("app.ui").directive("callout", [Callout.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=callout.directive.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name AppHeader
         * @module App.UI
         */
        var AppHeader = (function () {
            function AppHeader($injector, $scope, appName, getFormFactor) {
                var _this = this;
                this.$injector = $injector;
                this.$scope = $scope;
                this.appName = appName;
                this.getFormFactor = getFormFactor;
                this.hamburgerButtonClick = function () { };
                this.isDeskTop = function () { return _this.getFormFactor() === App.Common.formFactor.desktop; };
                this.getMobileMenuTemplateUrl = function () { return _this.appHeaderManager.getMobileMenuTemplateUrl(); };
                $scope.$on("windowInnerWidthChanged", function () { $scope.$digest(); });
            }
            Object.defineProperty(AppHeader.prototype, "appHeaderManager", {
                get: function () {
                    if (this._appHeaderManager)
                        return this._appHeaderManager;
                    this._appHeaderManager = this.$injector.get(this.appName + "HeaderManager");
                    return this._appHeaderManager;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AppHeader.prototype, "links", {
                get: function () { return this.appHeaderManager.links; },
                enumerable: true,
                configurable: true
            });
            return AppHeader;
        })();
        UI.AppHeader = AppHeader;
        App.Component({
            module: "app.ui",
            component: AppHeader,
            componentName: "appHeader",
            selector: "app-header",
            providers: ["$injector", "$scope", "appName", "getFormFactor"],
            template: [
                "<div class='app-header'>",
                "<div data-ng-if='vm.isDeskTop()'>",
                "<a href='{{ ::link.url }}' data-ng-repeat='link in vm.links'>{{ ::link.caption }}</a>",
                "</div>",
                "<div data-ng-if='!vm.isDeskTop()'>",
                "<hamburger-button callout callout-templateUrl='vm.getMobileMenuTemplateUrl()'></hamburger-button>",
                "</div>",
                "</div>"
            ].join(" ")
        });
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=appHeader.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name FileUploadController
         * @module App.UI
         */
        var FileUploadController = (function () {
            function FileUploadController($attrs, $element, $http, $scope) {
                var _this = this;
                this.$attrs = $attrs;
                this.$element = $element;
                this.$http = $http;
                this.$scope = $scope;
                this.onDrop = function (dragEvent) {
                    dragEvent.stopPropagation();
                    dragEvent.preventDefault();
                    if (dragEvent.dataTransfer && dragEvent.dataTransfer.files) {
                        _this.$http({
                            method: "POST",
                            url: _this.$attrs["fileUploadUrl"],
                            data: _this.packageFiles(dragEvent.dataTransfer.files),
                            headers: { 'Content-Type': undefined }
                        }).then(function (results) {
                            _this.$scope.$emit("fileUpload", {
                                files: results.data,
                            });
                        });
                    }
                };
                this.packageFiles = function (fileList) {
                    var formData = new FormData();
                    for (var i = 0; i < fileList.length; i++) {
                        formData.append(fileList[i].name, fileList[i]);
                    }
                    return formData;
                };
                this.bootstrap = function (options) {
                    var drop = options.element.find(".drop-zone")[0];
                    drop.addEventListener("dragover", function (dragEvent) {
                        dragEvent.stopPropagation();
                        dragEvent.preventDefault();
                    }, false);
                    drop.addEventListener("drop", _this.onDrop, false);
                };
                this.bootstrap({ element: $element });
            }
            return FileUploadController;
        })();
        UI.FileUploadController = FileUploadController;
        angular.module("app.ui").controller("fileUploadController", [
            "$attrs",
            "$element",
            "$http",
            "$scope",
            FileUploadController
        ]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=fileUpload.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name FileUpload
         * @module App.UI
         */
        var FileUpload = (function () {
            function FileUpload() {
                this.template = [
                    "<div>",
                    '<div class="drop-zone">Drop your files here!</div>',
                    "</div>"
                ].join("");
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = "fileUploadController";
                this.controllerAs = "vm";
            }
            FileUpload.createInstance = function () { return new FileUpload(); };
            FileUpload.styleUrls = ["/src/app/ui/components/fileUpload/fileUpload.css"];
            return FileUpload;
        })();
        UI.FileUpload = FileUpload;
        angular.module("app.ui").directive("fileUpload", [FileUpload.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=fileUpload.directive.js.map

var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        //http://www.uxplore.ca/#/
        /**
        * @name BackToTopButton
        * @module App.UI
        */
        var BackToTopButton = (function () {
            function BackToTopButton($q, appendToBodyAsync, debounce, extendCssAsync, removeElement, setOpacityAsync) {
                var _this = this;
                this.$q = $q;
                this.appendToBodyAsync = appendToBodyAsync;
                this.debounce = debounce;
                this.extendCssAsync = extendCssAsync;
                this.removeElement = removeElement;
                this.setOpacityAsync = setOpacityAsync;
                this.bootstrap = function () { window.addEventListener("scroll", _this.debounce(function () { _this.onScroll(); }, 100)); };
                this.onScroll = function () {
                };
                this.initializeAsync = function () {
                };
                this.showAsync = function () {
                };
                this.hideAsync = function () {
                };
                this.dispose = function () {
                };
                this.onClick = function () {
                };
                this.isOpen = false;
                this.isAnimating = false;
            }
            return BackToTopButton;
        })();
        UI.BackToTopButton = BackToTopButton;
        angular.module("app.ui").service("backToTopButton", ["$q", "appendToBodyAsync", "debounce", "extendCssAsync", "removeElement", "setOpacityAsync", BackToTopButton]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=backToTopButton.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name modalService
         * @module App.UI
         */
        var ModalService = (function () {
            function ModalService($q) {
                this.$q = $q;
                this.open = function () {
                };
                this.close = function () {
                };
            }
            return ModalService;
        })();
        UI.ModalService = ModalService;
        angular.module("app.ui").service("modalService", ["$q", ModalService]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=modal.service.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name HamburgerButton
         * @module App.UI
         */
        var HamburgerButton = (function () {
            function HamburgerButton() {
                this.template = [
                    "<div class='hamburger-button' data-ng-click='onClick()'>",
                    "<div></div>",
                    "<div></div>",
                    "<div></div>",
                    "</div>"
                ].join(" ");
                this.replace = true;
                this.restrict = "E";
                this.scope = { onClick: "&" };
            }
            HamburgerButton.createInstance = function () { return new HamburgerButton(); };
            return HamburgerButton;
        })();
        UI.HamburgerButton = HamburgerButton;
        angular.module("app.ui").directive("hamburgerButton", [HamburgerButton.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=hamburgerButton.directive.js.map

var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name Flyout
         * @description
         */
        var Flyout = (function () {
            function Flyout($q, extendCssAsync) {
                var _this = this;
                this.$q = $q;
                this.extendCssAsync = extendCssAsync;
                this.createInstance = function (options) {
                    var instance = new Flyout(_this.$q, _this.extendCssAsync);
                    return instance;
                };
                this.initializeAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.augmentedJQuery = angular.element("<div></div>");
                    _this.extendCssAsync({
                        nativeHTMLElement: _this.nativeElement,
                        cssObject: {
                            "transition": "transform .500s cubic-bezier(.10, .10, .25, .90)",
                            "opacity": "100",
                            "position": "fixed",
                            "top": "0",
                            "left": "-100",
                            "height": "100%",
                            "width": "100%",
                            "background-color": "rgba(0, 0, 0, .25)",
                            "display": "block"
                        }
                    }).then(function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.showAsync = function () {
                };
                this.hideAsync = function () {
                };
                this.dispose = function () {
                };
                this.onClick = function () {
                };
                this.isOpen = false;
                this.isAnimating = false;
            }
            Object.defineProperty(Flyout.prototype, "nativeElement", {
                get: function () { return this.augmentedJQuery[0]; },
                enumerable: true,
                configurable: true
            });
            return Flyout;
        })();
        UI.Flyout = Flyout;
        App.Component({
            dynamic: true,
            module: "app.ui",
            componentName: "flyout",
            component: Flyout,
            providers: ["$q"]
        });
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=flyout.js.map



//# sourceMappingURL=tabContent.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name TabTitle
         * @module App.UI
         */
        var TabContent = (function () {
            function TabContent() {
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.template = [
                    "<div>",
                    "</div>"
                ].join(" ");
                this.controller = "tabContentController";
                this.controllerAs = "vm";
            }
            TabContent.createInstance = function () { return new TabContent(); };
            TabContent.styleUrls = [];
            return TabContent;
        })();
        UI.TabContent = TabContent;
        angular.module("app.ui").directive("tabContent", [TabContent.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=tabContent.directive.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name TabsController
         * @module App.UI
         */
        var TabsController = (function () {
            function TabsController($scope, $transclude, getHtml) {
                var _this = this;
                this.$scope = $scope;
                this.$transclude = $transclude;
                this.getHtml = getHtml;
                this.initialRender = function () { };
                $transclude($scope, function (clone) {
                    _this.clone = clone;
                    _this.initialRender();
                });
            }
            Object.defineProperty(TabsController.prototype, "templateRef", {
                get: function () {
                    if (this._templateRef)
                        return this._templateRef;
                    this._templateRef = angular.element(this.getHtml(this.clone[0].children[0], true));
                    return this._templateRef;
                },
                enumerable: true,
                configurable: true
            });
            return TabsController;
        })();
        UI.TabsController = TabsController;
        angular.module("app.ui").controller("tabsController", ["$scope", "$transclude", TabsController]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=tabs.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name Tabs
         * @module App.UI
         */
        var Tabs = (function () {
            function Tabs() {
                this.restrict = "E";
                this.replace = true;
                this.template = [
                    "<div>",
                    "<button>Next Tab</button>",
                    "</div>"
                ].join(" ");
                this.transclude = "element";
                this.controller = "tabsController";
                this.controllerAs = "vm";
            }
            Tabs.createInstance = function () { return new Tabs(); };
            Tabs.styleUrls = [];
            return Tabs;
        })();
        UI.Tabs = Tabs;
        angular.module("app.ui").directive("tabs", [Tabs.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=tabs.directive.js.map



//# sourceMappingURL=tabTitle.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name TabTitle
         * @module App.UI
         */
        var TabTitle = (function () {
            function TabTitle() {
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.template = [
                    "<h1>",
                    "{{ ::vm.title }}",
                    "</h1>"
                ].join(" ");
                this.controller = "tabTitleController";
                this.controllerAs = "vm";
            }
            TabTitle.createInstance = function () { return new TabTitle(); };
            TabTitle.styleUrls = [];
            return TabTitle;
        })();
        UI.TabTitle = TabTitle;
        angular.module("app.ui").directive("tabTitle", [TabTitle.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=tabTitle.directive.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        /**
         * @name CarouselController
         * @module App.UI
         */
        var CarouselController = (function () {
            function CarouselController($attrs, $compile, $element, $q, $scope, $transclude, getHtml, removeElement, translateXAsync) {
                var _this = this;
                this.$attrs = $attrs;
                this.$compile = $compile;
                this.$element = $element;
                this.$q = $q;
                this.$scope = $scope;
                this.$transclude = $transclude;
                this.getHtml = getHtml;
                this.removeElement = removeElement;
                this.translateXAsync = translateXAsync;
                this.dispose = function () {
                    angular.element(_this.containerNavtiveElement).find(".slide").remove();
                    _this.containerNavtiveElement.innerHTML = "";
                    _this.$element[0].innerHTML = null;
                    _this.$element = null;
                    _this.$attrs = null;
                    _this.clone = null;
                    delete _this.$element;
                    delete _this.clone;
                };
                this.onNextAsync = function () {
                    var deferred = _this.$q.defer();
                    if (!_this.isAnimating) {
                        var promises = [];
                        _this.isAnimating = true;
                        for (var i = 0; i < _this.slideNavtiveElements.length; i++) {
                            promises.push(_this.translateXAsync({ element: _this.slideNavtiveElements[i], x: 100 }));
                        }
                        _this.$q.all(promises).then(function () {
                            _this.isAnimating = false;
                            deferred.resolve();
                        });
                    }
                    else {
                        deferred.reject();
                    }
                    return deferred.promise;
                };
                this.onPreviousAsync = function () {
                    var deferred = _this.$q.defer();
                    if (!_this.isAnimating) {
                        var promises = [];
                        _this.isAnimating = true;
                        for (var i = 0; i < _this.slideNavtiveElements.length; i++) {
                            promises.push(_this.translateXAsync({ element: _this.slideNavtiveElements[i], x: 100 }));
                        }
                        _this.$q.all(promises).then(function () {
                            _this.isAnimating = false;
                            deferred.resolve();
                        });
                    }
                    else {
                        deferred.reject();
                    }
                    return deferred.promise;
                };
                this.initialRender = function () {
                    var fragment = document.createDocumentFragment();
                    var template = _this.getHtml(_this.clone[0].children[0], true);
                    for (var i = 0; i < _this.items.length; i++) {
                        var childScope = _this.$scope.$new(true);
                        childScope[_this.$attrs["carouselForName"] || "carouselItem"] = _this.items[i];
                        childScope.$$index = i;
                        childScope.$$isFirst = (i === 0);
                        childScope.$$isLast = (i === _this.items.length - 1);
                        var itemContent = _this.$compile(angular.element(template))(childScope);
                        itemContent.addClass("slide");
                        fragment.appendChild(itemContent[0]);
                    }
                    _this.containerNavtiveElement.appendChild(fragment);
                };
                this.isAnimating = false;
                $scope.$on("$destroy", function () { _this.dispose(); });
                $transclude($scope, function (clone) {
                    _this.clone = clone;
                    _this.initialRender();
                });
            }
            Object.defineProperty(CarouselController.prototype, "items", {
                get: function () { return this.$scope["carouselFor"]; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "viewPortRef", {
                get: function () { return this.$element.find(".view-port"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "containerNavtiveElement", {
                get: function () { return this.$element.find(".container")[0]; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "viewPortNavtiveElement", {
                get: function () { return this.viewPortRef[0]; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "slideNavtiveElements", {
                get: function () { return this.viewPortNavtiveElement.children; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "previousButtonImgUrl", {
                get: function () { return this.$attrs["previousButtonImgUrl"] || "assets/images/carousel_button_prev.png"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "nextButtonImgUrl", {
                get: function () { return this.$attrs["nextButtonImgUrl"] || "assets/images/carousel_button_next.png"; },
                enumerable: true,
                configurable: true
            });
            return CarouselController;
        })();
        UI.CarouselController = CarouselController;
        angular.module("app.ui").controller("carouselController", ["$attrs", "$compile", "$element", "$q", "$scope", "$transclude", "getHtml", "removeElement", "translateXAsync", CarouselController]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=carousel.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name Carousel
         * @module App.UI
         */
        var Carousel = (function () {
            function Carousel() {
                this.template = [
                    "<div class='carousel'> ",
                    "<div class='view-port'>",
                    "<div class='container'></div>",
                    "<div class='previous-arrow' data-ng-click='vm.onPreviousAsync()'><img src='assets/images/carousel_button_prev.png' /></div>",
                    "<div class='next-arrow' data-ng-click='vm.onNextAsync()'><img src='assets/images/carousel_button_next.png' /></div>",
                    "</div>",
                    "</div>"
                ].join(" ");
                this.restrict = "E";
                this.replace = true;
                this.transclude = "element";
                this.controllerAs = "vm";
                this.controller = "carouselController";
                this.scope = { carouselFor: "=" };
            }
            Carousel.createInstance = function () { return new Carousel(); };
            return Carousel;
        })();
        UI.Carousel = Carousel;
        angular.module("app.ui").directive("carousel", [Carousel.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=carousel.directive.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
        * @name SearhBoxController
        * @module App.UI
        */
        var SearhBoxController = (function () {
            function SearhBoxController($scope, $element, $attrs) {
            }
            return SearhBoxController;
        })();
        UI.SearhBoxController = SearhBoxController;
        angular.module("app.ui").controller("searhBoxController", ["$scope", "$element", "$attrs", SearhBoxController]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=searchBox.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name SearhBox
         * @module App.UI
         */
        var SearchBox = (function () {
            function SearchBox() {
                this.template = [
                    "<div class='search-container'>",
                    "<form name='searchForm'>",
                    "<input></input>",
                    "</form>",
                    "</div>"
                ].join(" ");
                this.styleUrls = [""];
                this.replace = true;
                this.restrict = "E";
                this.controller = "searchBoxController";
                this.controllerAs = "vm";
            }
            SearchBox.createInstance = function () { return new SearchBox(); };
            return SearchBox;
        })();
        UI.SearchBox = SearchBox;
        angular.module("app.ui").directive("searchBox", [SearchBox.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=searchBox.directive.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name WorkSpinnerController
         * @module App.UI
         */
        var WorkSpinnerController = (function () {
            function WorkSpinnerController(requestCounter) {
                this.requestCounter = requestCounter;
            }
            Object.defineProperty(WorkSpinnerController.prototype, "requestCount", {
                get: function () { return this.requestCounter.getRequestCount(); },
                enumerable: true,
                configurable: true
            });
            return WorkSpinnerController;
        })();
        UI.WorkSpinnerController = WorkSpinnerController;
        angular.module("app.ui").controller("workSpinnerController", ["requestCounter", WorkSpinnerController]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=workSpinner.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name WorkSpinner
         * @module App.UI
         * @description work-spinner component interface boundary
         */
        var WorkSpinner = (function () {
            function WorkSpinner() {
                this.restrict = "A";
                this.template = [
                    "<ng-transclude ng-show='vm.requestCount'>",
                    "</ng-transclude>"
                ].join(" ");
                this.controller = "workSpinnerController";
                this.controllerAs = "vm";
                this.transclude = "element";
            }
            WorkSpinner.createInstance = function () { return new WorkSpinner(); };
            return WorkSpinner;
        })();
        UI.WorkSpinner = WorkSpinner;
        angular.module("app.ui").directive("workSpinner", [WorkSpinner.createInstance]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=workSpinner.directive.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        var VirtualForController = (function () {
            function VirtualForController() {
            }
            return VirtualForController;
        })();
        UI.VirtualForController = VirtualForController;
        angular.module("app.ui").controller("virtualForController", [VirtualForController]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=virtualFor.controller.js.map

/// <reference path="../../../../typings/typescriptapp.d.ts" />
var App;
(function (App) {
    var UI;
    (function (UI) {
        "use strict";
        /**
         * @name VirtualFor
         * @module App.UI
         */
        var VirtualFor = (function () {
            function VirtualFor() {
            }
            VirtualFor.createInstance = function () {
                return new VirtualFor();
            };
            return VirtualFor;
        })();
        UI.VirtualFor = VirtualFor;
        angular.module("app.ui").directive("virtualFor", [VirtualFor]);
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));

//# sourceMappingURL=virtualFor.directive.js.map
