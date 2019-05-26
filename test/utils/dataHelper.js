
import urls from './urls';
import cd from './../utils/commonData';
import fh from './FileHelper';

class dataHelper {
    constructor() {
        this.title = 'DataHelper Page';
        this.staticDataObj = fh.readJsonFile("./test/metaData/testData.json");       
    }
    getPinCode() { 
        try {         
          let locid = this.staticDataObj.PINCODE.locationid;                 
           console.log(locid);                  
            return locid;
        }
        catch (e) {
            console.log(`Error fetching data`);
        }
    }
}

export default new dataHelper();