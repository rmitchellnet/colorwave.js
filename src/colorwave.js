/*!
 * colorwave.js
 * Author: Ryan Mitchell
 * Git: https://github.com/rmitchellnet/
 * License: MIT
 */
(function (window, root, factory) {
    var pluginName = 'Colorwave';

    if (typeof define === 'function' && define.amd) {
        define([], factory(window, pluginName));
    } else if (typeof exports === 'object') {
        module.exports = factory(window, pluginName);
    } else {
        root[pluginName] = factory(window, pluginName);
    }
}(window, this, function (window, pluginName) {
    'use strict';

    var defaults = {
        direction: 'to left bottom',
        colorA: '#f02fc2',
        colorB: '#6094ea'
    };

    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function (target, options) {
        var prop, extended = {};
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };

    // find color between 2 colors
    var betweenColor = function (a, b) {
        return Math.round(((parseInt(a.substring(0, 2), 16) + parseInt(b.substring(0, 2), 16)) / 2)).toString(16) +
            Math.round(((parseInt(a.substring(2, 4), 16) + parseInt(b.substring(2, 4), 16)) / 2)).toString(16) +
            Math.round(((parseInt(a.substring(4, 6), 16) + parseInt(b.substring(4, 6), 16)) / 2)).toString(16);
    }

    /**
     * Plugin Object
     * @param element The html element to initialize
     * @param {Object} options User options
     * @constructor
     */
    function Plugin(element, options) {
        this.element = element ? document.querySelector(element) : document.querySelector('body');
        this.defaults = defaults;
        this.options = extend(this.defaults, options);
        this.timeline = new TimelineMax();
    }

    // Plugin prototype
    Plugin.prototype = {
        start: function () {
            var that = this;
            var gradient = { percent: 0 };
            var between = '#' + betweenColor(that.options.colorA.replace('#', ''), that.options.colorB.replace('#', ''));
            this.timeline.to(gradient, 10, {
                percent: 1000, repeat: -1, onUpdate: function () {
                    that.element.style.background = 'linear-gradient( ' + that.options.direction + ', ' + that.options.colorA + ' ' + (gradient.percent - 1000) + '%, ' + between + ' ' + (gradient.percent - 750) + '%, ' + that.options.colorB + ' ' + (gradient.percent - 500) + '%, ' + that.options.colorA + ' ' + gradient.percent + '%, ' + between + ' ' + (gradient.percent + 250) + '%, ' + that.options.colorB + ' ' + (gradient.percent + 500) + '% )';
                }, ease: Linear.easeNone
            });
            this.timeline.repeat();
        },
        stop: function () {
            this.timeline.stop();
        }
    };
    return Plugin;
}));