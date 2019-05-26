'use strict';
const {Before, Given, When, Then} = require('cucumber');
import po from '../../pageobjects/po';


Given('Open browser and Start Application', function () {
   po.launchHomePage();
});

Then('I click the button', function () {
    po.clickbtn();
});