/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { WebDriverAdapter } from '../web_driver_adapter';
/**
 * Adapter for WebdriverIO.
 */
export declare class WebdriverIOAdapter extends WebDriverAdapter {
    private _driver;
    isTestrunner: boolean;
    static WEBDRIVERIO_PROVIDERS: {
        provide: typeof WebDriverAdapter;
        useFactory: () => WebdriverIOAdapter;
    }[];
    constructor(_driver: any);
    waitFor(callback: () => any): Promise<any>;
    executeScript(script: string): Promise<any>;
    executeAsyncScript(script: string): Promise<any>;
    capabilities(): Promise<any>;
    /**
     * is executed not in the same eventloop and therefor looses fiber context
     * if testrunner is used
     */
    logs(type: string): Promise<any>;
}
