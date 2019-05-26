import { expect } from "chai";
class hc {
    isElementDisplay( pageElement,description) {
       if(browser.isVisible(pageElement)) {
        browser.saveScreenshot();   
        return true;
       }else {
           browser.saveScreenshot();
        expect.fail(0, 0, `Element is not Visible :: ${description}`);
        return false;
       }
    }

    waitForPageLoad() {
        let status = "complete"; //browser.desiredCapabilities.browserName =='firefox' ?  "interactive" : "complete";
        browser.waitUntil(() => browser.execute("return document.readyState").value == status, 15000, 'Page is loading after 15s');
      }

    clickAndsetValue(eleName, selector, value) {

    const ele = browser.element(selector);
    this.isVisibleByEle(eleName, ele);
    //this.waitForPreLoaderDisAppear();
    ele.click();
    ele.setValue(value);
    ele.addValue("\uE004");
    return expect(ele.getValue()).to.be.equal(value);
  }
  isVisibleByEle(eleName, ele) {
    if (ele.isVisible()) {
      return true;
    } else {
     // browser.saveScreenshot();
      expect.fail(0, 0, `Element is not Visible :: ${eleName}`);
      return false;
    }
  }
  getFormattedTestName(ScenarioName) {
    const channel = browser.desiredCapabilities.channel;
    let tcName = `${ScenarioName}_${channel}_${browser.desiredCapabilities.browserName}`;

    if (channel.toLowerCase() === "mobile" || channel.toLowerCase() === "tablet") {
      if (browser.desiredCapabilities.browserName == "chrome") {
        tcName = `${ScenarioName}_${channel}_${browser.desiredCapabilities.chromeOptions.mobileEmulation.deviceName}`;
      } else {
        tcName = `${ScenarioName}_${channel}_${browser.desiredCapabilities.deviceName}`;
      }
    }
    return tcName;
  }

  click(eleName, selector) {
    let clickvalue = this.isVisible(eleName, selector);
    try {
      browser.click(selector).value;
    } catch (error) {
      this.isVisible(eleName, selector);
      browser.click(selector).value;
    }
    return clickvalue;
  }
  isVisible(eleName, selector) {
    if (browser.isVisible(selector)) {
      //process.send({ event: 'steps', step: `${eleName}:: isVisible` });
      return true;
    } else {
      browser.saveScreenshot();
      expect.fail(0, 0, `Element is not Visible :: ${eleName}`);
      return false;
    }
  }

  waitForVisible(eleName, selector) {
    try {
      browser.waitUntil(() => browser.isVisible(selector), 15000, `Element is not Visible :: ${eleName}`);
    } catch (error) {
      console.log(`Wait for visible exception on Element :: ${eleName}`);
    }
  }

  jsClick(eleName, selector) {
    let clickvalue = this.isVisible(eleName, selector);
    try {
      browser.execute(`document.querySelector('${selector}').click();`);
    } catch (error) {
      this.isVisible(eleName, selector);
      browser.execute(`document.querySelector('${selector}').click();`);
    }
    return clickvalue;
  }
  getText(eleName, selector) {
    const ele = browser.element(selector);
    this.isVisibleByEle(eleName, ele);
    return ele.getText();
  }
}

export default new hc();