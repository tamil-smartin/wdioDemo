class capability {
  constructor() {

    this.chrome = {
      build: `Checkout-Wdio-Chrome-${new Date()}`,
      seleniumVersion: "3.10",
      chromedriverVersion: "2.38",
      channel: "desktop",
      browserName: "chrome",
      platform: "windows 7",
      version: "latest",
      screenResolution: "2560x1600",
      // avoidProxy: true,
      acceptSslCerts: true,
      autoAcceptAlerts: true,
      unexpectedAlertBehaviour: "dismiss",
      idleTimeout:"180",
      chromeOptions: {
        args: ['--start-maximized', '--enable-automation', '--ignore-certificate-errors']
      }
    },

      this.ie11 = {
        build: `Checkout-Wdio-ie11-${new Date()}`,
        //seleniumVersion: "3.10",
        //iedriverVersion: "x64_2.48.0",
        channel: "desktop",
        browserName: "internet explorer",
        platform: "windows",
        version: "11",
        screenResolution: "2560x1600",
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss",
        ignoreProtectedModeSettings: true,
        ignoreZoomSetting: true,
        requireWindowFocus: true,
        browserAttachTimeout: 5000

      },

      this.edge = {
        build: `Checkout-Wdio-Edge-${new Date()}`,
       // seleniumVersion: "3.11.0",
        acceptSslCerts: true,
        channel: "desktop",
        browserName: "MicrosoftEdge",
        platform: "windows 10",
        version: "latest",
        screenResolution: "2560x1600",
        avoidProxy: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss"
      },

      this.firefox = {
        build: `Checkout-Wdio-Firefox-${new Date()}`,
        //seleniumVersion: "3.10",
        channel: "desktop",
        browserName: "firefox",
        platform: "windows",
        version: "latest",
        screenResolution: "2560x1600",
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss"
      },

      this.safari = {
        build: `Checkout-Wdio-Safari-${new Date()}`,
        //seleniumVersion: "3.10",
        channel: "desktop",
        browserName: "safari",
        platform: "macOS 10.13", //"macOS 10.12",
        version: "11.0", //"11.0",
        screenResolution: "2048x1536", //"2360x1770",
        autoAcceptAlerts: true,
        acceptSslCerts: true,
        avoidProxy: true
      },

      this.iphoneX = {
        build: `Checkout-Wdio-iphoneX-${new Date()}`,
        seleniumVersion: "3.10",
        chromedriverVersion: "2.38",
        channel: "mobile",
        browserName: "chrome",
        platform: "windows 7",
        version: "latest",
        screenResolution: "1920x1200",
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss",
        elementScrollBehavior: 1,
        chromeOptions: {
          args: ['--start-maximized', '--enable-automation', '--ignore-certificate-errors', '--incognito'],
          mobileEmulation: {
            deviceName: "iPhone X"
          }
        }
      },
      this.iphone8plus = {
        build: `Checkout-Wdio-iPhone8-${new Date()}`,
        seleniumVersion: "3.10",
        chromedriverVersion: "2.38",
        channel: "mobile",
        browserName: "chrome",
        platform: "windows 7",
        version: "latest",
        screenResolution: "1920x1200",
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss",
        elementScrollBehavior: 1,
        chromeOptions: {
          args: ['--start-maximized', '--enable-automation', '--ignore-certificate-errors','--incognito'],
          mobileEmulation: {
            deviceName: "iPhone 8 Plus"
          }
        }
      },
      this.ipad = {
        build: `Checkout-Wdio-iPad-${new Date()}`,
        seleniumVersion: "3.10",
        chromedriverVersion: "2.38",
        channel: "tablet",
        browserName: "chrome",
        platform: "windows 7",
        version: "latest",
        autoAcceptAlerts: true,
        acceptSslCerts: true,
        unexpectedAlertBehaviour: "dismiss",
        screenResolution: "1920x1200",
        chromeOptions: {
          args: ['--start-maximized', '--enable-automation', '--ignore-certificate-errors'],
          mobileEmulation: {
            deviceName: "iPad"
          }
        }
      },
      this.pixel2 = {
        build: `Checkout-Wdio-pixel2-${new Date()}`,
        seleniumVersion: "3.10",
        chromedriverVersion: "2.38",
        channel: "mobile",
        browserName: "chrome",
        platform: "windows 7",
        version: "latest",
        screenResolution: "1920x1200",
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss",
        elementScrollBehavior: 1,
        chromeOptions: {
          args: ['--start-maximized', '--enable-automation', '--ignore-certificate-errors'],
          mobileEmulation: {
            deviceName: "Pixel 2"
          }
        }
      },
      this.pixel2xl = {
        build: `Checkout-Wdio-pixel2-${new Date()}`,
        seleniumVersion: "3.10",
        chromedriverVersion: "2.38",
        channel: "mobile",
        browserName: "chrome",
        platform: "windows 7",
        version: "latest",
        screenResolution: "1920x1200",
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss",
        elementScrollBehavior: 1,
        chromeOptions: {
          args: ['--start-maximized', '--enable-automation', '--ignore-certificate-errors'],
          mobileEmulation: {
            deviceName: "Pixel 2 XL"
          }
        }
      },
      this.qp = {
        build: `Checkout-Wdio-qp-${new Date()}`,
        seleniumVersion: "3.10",
        chromedriverVersion: "2.38",
        channel: "desktop",
        browserName: "chrome",
        platform: "windows 7",
        version: "latest",
        screenResolution: "1920x1200",
        autoAcceptAlerts: true,
        loggingPrefs: {
          //browser: "ALL",
          performance: "INFO"
        }
      },

      this.iPhone7Simulator = {
        build: `Checkout-Wdio-iPhone7Simulator-${new Date()}`,
        seleniumVersion: "3.10",
        appiumVersion: "1.7.2",
        channel: "mobile",
        browserName: "Safari",
        deviceName: "iPhone 7 Simulator",
        deviceOrientation: "portrait",
        platformVersion: "11.0",
        platformName: "iOS",
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss"
      },

      this.iPhoneXSimulator = {
        build: `Checkout-Wdio-iPhoneXSimulator-${new Date()}`,
        seleniumVersion: "3.10",
        appiumVersion: "1.7.2",
        channel: "mobile",
        browserName: "Safari",
        deviceName: "iPhone X Simulator",
        deviceOrientation: "portrait",
        platformVersion: "11.0",
        platformName: "iOS",
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        unexpectedAlertBehaviour: "dismiss"
      },

      this.pixel = {
        address: '127.0.0.1',
        commandTimeout: '12000',
        channel: "mobile",
        sessionOverride: true,
        debugLogSpacing: true,
        platformVersion: '8.0.0',
        platformName: 'Android',
        deviceName: 'Google Pixel',
        nativeInstrumentsLib: true,
        isolateSimDevice: true,
        browserName: 'Chrome'
      };
  }

  getCaps(cap) {

    let dynamic = [this.chrome, this.iphoneX, this.ipad, this.ie11, this.edge, this.firefox, this.safari, this.iphone8plus, this.pixel2];

    switch (cap) {
      case "chrome":
        return [this.chrome];

      case "iphoneX":
        return [this.iphoneX];

      case "iphone8plus":
        return [this.iphone8plus];

      case "ipad":
        return [this.ipad];

      case "ie11":
        return [this.ie11];

      case "edge":
        return [this.edge];

      case "safari":
        return [this.safari];

      case "firefox":
        return [this.firefox];

      case "pixel":
        return [this.pixel];

      case "iPhone7Simulator":
        return [this.iPhone7Simulator];

      case "pixel2":
        return [this.pixel2];

      case "iPhoneXSimulator":
        return [this.iPhoneXSimulator];

      case "cbt":
        return [this.chrome, this.iphoneX, this.ipad, this.ie11, this.edge, this.firefox, this.safari];

      case "dynamic":
        return [dynamic[Math.floor(Math.random() * dynamic.length)]];

      case "channels":
        return [this.chrome, this.iphoneX, this.ipad];

      case "desktopMobile":
        return [this.chrome, this.iphoneX];

      default:
        return [this.chrome];

    }
  }
}


export default new capability();