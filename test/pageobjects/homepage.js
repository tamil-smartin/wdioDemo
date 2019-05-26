import urls from '../utils/urls';
import { expect } from "chai";
import hc from '../utils/HelperClass';
import td from './../metaData/testData.json';
import dh from '../utils/dataHelper';


import  { swiggyhomePage } from './pagefactory';
import fh from '../utils/FileHelper';


class homepage {
    constructor() {
        this.staticDataObj = fh.readJsonFile('./test/metaData/testData.json');
     }

   

    verifyPageTitle(){
        hc.isVisibleByEle("Page Title",swiggyhomePage.title);
        console.log(browser.element(swiggyhomePage.title).getText());
    }

    userLogin(){

    }

    enterLocation(){
    let pinCode = dh.getPinCode();
    
    hc.clickAndsetValue("location input",swiggyhomePage.locationBox,'600045');
   
    }
    clickFindLocation(){
     
        hc.click("find location button",swiggyhomePage.findFood);
        
                    
    }
    verifyDeliveryMsg(){
        
        //  
         // hc.waitForPageLoad();
          //console.log(dh.getSChennai(location));
        let deliveryMsg = hc.getText('delivery location message',swiggyhomePage.suggestionPanel);
        deliveryMsg === swiggyhomePage.deliveryMsg ? '' :
            expect(0,1,'Delivery Message is not matching');
    }
    clickAreaSugestion(){
        hc.click('click suggestion',swiggyhomePage.suggestionPanel);
       
    }
 
}
export default new homepage();