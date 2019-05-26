import urls from '../utils/urls';
import { loginModule, swiggyhomePage } from './pagefactory';
import hc from '../utils/HelperClass';
import { expect } from "chai";
import homepage from './homepage';
import dh from './../utils/dataHelper';

class po {
    constructor(){
        this.title = 'base page';
        this.homepage = homepage;
        this.loginModule = loginModule;
    
    }
    open(path){
        browser.url(path);
    }
    launchHomePage() {

       
        this.open(urls.getEnvUrl());
        hc.waitForPageLoad();
        this.verifyHomePageUrl();
        
    }

    verifyHomePageUrl(){
        expect(browser.getUrl()).to.contains(urls.getEnvUrl());
    }
	
}
export default new po();