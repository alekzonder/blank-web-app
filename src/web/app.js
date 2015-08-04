var $ = require('jquery');
var Vue = require('vue');

new Vue({
    el: $('._body').get(0),
    template: require('base.html'),
    data: function() {
        return {
            showHello: false,
            hello: 'Hello World!!!'
        };
    },
    methods: {
        welcome: function() {
            this.showHello = true;
            return false;
        }
    }
});
