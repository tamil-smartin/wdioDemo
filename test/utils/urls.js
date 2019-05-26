class urls {
    constructor() {
        this.envUrls = {
            prod: 'https://www.swiggy.com'
        };
    }

    getEnvUrl() { return browser.options.baseUrl; }
    getEnvNameUpperCase() { return this.getEnvName().toUpperCase(); }
    getEnvName() { return browser.options.env.toLowerCase(); }
   
}
export default new urls();