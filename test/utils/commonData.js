import urls from './urls';
class commonData {
    constructor() {
        this.title = "Common Data Page";
        this.orderDetails ={};
        this.user = {
            type: "guest",
            email: "auto1853532017190510aa@swiggy.com",
            password: "qa02test"
 
        };
        this.card = {
            type: "VISA_card",
            number: "4111111111111111",
            expMonth: "12",
            expYear: "2022",
            cvv: "123",
            pojob: "ABCD1234",
            buyer: "Rocky Rockcy",
            pin: "1234",
            amexCvv: "1234"
        };

        
    }
    setItemDetails(pincode) {
        let orderDetails = {            
            zipCode: pincode,           
        };
        let objLength = Object.keys(this.orderDetails).length + 1;
        this.orderDetails[`itemid${objLength}`] = orderDetails;
    }
}

export default new commonData();
