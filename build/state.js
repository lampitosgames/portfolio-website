"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mainState = {
    variable0: "var0",
    variable1: "var1",
    variable2: 2

    //Export an example class
};
var DefaultUser = exports.DefaultUser = function () {
    function DefaultUser(username) {
        _classCallCheck(this, DefaultUser);

        //Set local username
        this.username = username;

        this.ManipulateStatefulChainable().SayHello();
    }

    _createClass(DefaultUser, [{
        key: "ManipulateStatefulChainable",
        value: function ManipulateStatefulChainable() {
            //Do something in this object
            //Return this object so we can daisy chain functions
            return this;
        }
    }, {
        key: "SayHello",
        value: function SayHello() {
            return "Hello!";
        }
    }]);

    return DefaultUser;
}();

//Test function


var TestTheStateFunction = function TestTheStateFunction(inputVar) {
    //This function will perform an action when called.  It has access to all
    //state variables above
    console.dir("Test Function Ran with " + inputVar + ". Main state variable says: " + mainState.variable1);
};

//Object where the keys are twitter usernames and the values are TwitterUser objects
var AppState = {
    mainState: mainState,
    defaultState: "Default State",
    testTheStateFunction: TestTheStateFunction
};

exports.default = AppState;