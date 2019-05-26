
import po from '../pageobjects/po';
import hc from '../utils/HelperClass';
const scenarioName = hc.getFormattedTestName('Swiggy.HomePage.VerifyUI');

describe(scenarioName, () => {

	it('Given swiggy guest user enters location', () => {
	po.launchHomePage();
	po.homepage.enterLocation();
	
			
	});

	it('When i see sugestion panel', () => {
	po.homepage.clickAreaSugestion();
	});	
	
	it('Then i should see captcha section and click I am not a robot', () => {
		
	});	
	it('And i should click check balance', () => {
		
	});	
});
