/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var web_driver_adapter_1 = require('../web_driver_adapter');
/**
 * Adapter for WebdriverIO.
 */
var WebdriverIOAdapter = (function (_super) {
    __extends(WebdriverIOAdapter, _super);
    function WebdriverIOAdapter(_driver) {
        _super.call(this);
        this._driver = _driver;
        this.isTestrunner = Boolean(_driver.options.isWDIO);
    }
    WebdriverIOAdapter.prototype.waitFor = function (callback) {
        /**
         * execute synchronous with wdio testrunner
         * wdioSync is a global function that gets registered by wdio-sync, see
         * (https://github.com/webdriverio/wdio-sync/blob/master/index.js#L123-L138)
         */
        if (this.isTestrunner) {
            return new Promise(function (resolve) { return global.wdioSync(callback, resolve)(); });
        }
        return callback();
    };
    WebdriverIOAdapter.prototype.executeScript = function (script) {
        var res = this._driver.execute(script);
        if (typeof res.then === 'function') {
            return res.then(function (response) { return response.value; });
        }
        return new Promise(function (resolve) { return resolve(res.value); });
    };
    WebdriverIOAdapter.prototype.executeAsyncScript = function (script) {
        var res = this._driver.executeAsync(script);
        if (typeof res.then === 'function') {
            return res.then(function (response) { return response.value; });
        }
        return new Promise(function (resolve) { return resolve(res.value); });
    };
    WebdriverIOAdapter.prototype.capabilities = function () {
        var _this = this;
        return new Promise(function (resolve) { return resolve(_this._driver.desiredCapabilities); });
    };
    /**
     * is executed not in the same eventloop and therefor looses fiber context
     * if testrunner is used
     */
    WebdriverIOAdapter.prototype.logs = function (type) {
        return this._driver.log(type).then(function (response) { return response.value; });
    };
    WebdriverIOAdapter.WEBDRIVERIO_PROVIDERS = [
        { provide: web_driver_adapter_1.WebDriverAdapter, useFactory: function () { return new WebdriverIOAdapter(global.browser); } }
    ];
    return WebdriverIOAdapter;
}(web_driver_adapter_1.WebDriverAdapter));
exports.WebdriverIOAdapter = WebdriverIOAdapter;
//# sourceMappingURL=webdriverio_adapter.js.map