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
    }
  }

  getCaps(cap) {

    let dynamic = [this.chrome];

    switch (cap) {
      case "chrome":
        return [this.chrome];
    
      default:
        return [this.chrome];

    }
  }
}


export default new capability();
