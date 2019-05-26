require('babel-register');
const args = require("yargs").argv;
//const fs = require('fs');

const testSuites = require('./test/utils/testSuites').default;
const capability = require('./test/utils/capabilities').default;
const urls = require('./test/utils/urls').default;

const CustomReporter = require('./test/utils/reporter');
const expect = require("chai").expect;


let config = {
 
  services: args.i ? ["sauce"] : ["selenium-standalone"],
  // services: ['appium'],
 // buildName: "mycheckout_" + args.e + "_" + args.s + "_" + args.c + "_" + timestamp,
  env: args.e ? args.e : "testEnv",
  specs: args.s ? testSuites.suites[args.s] : testSuites.suites["spec"],
  exclude: testSuites.suites.exclude,
  maxInstances: args.i ? 30 : 1,
  maxInstancesPerCapability: args.i ? 30 : 1,
  capabilities: args.c ? capability.getCaps(args.c) : capability.getCaps("chrome"),
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  screenshotOnReject: true,
  screenshotPath: "./screenshots/",
  baseUrl: urls.envUrls[args.e],
  waitforTimeout: 60000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 10,
  framework: "mocha",
  
  // seleniumInstallArgs: { version: '3.4.0' },
  // seleniumArgs: { version: '3.4.0' },

  reporters: ['spec', 'junit', CustomReporter, 'allure','json-cucumber'],
  reporterOptions: {
    allure: { outputDir: "./target/allure-report"},
    junit: { outputDir: "./target/junit" }
  },
  
  // onPrepare: function(config, capabilities){},
   beforeSession: function (config, capabilities, specs) {
		//console.log(browser.desiredCapabilities);
	}, 
  // before: (specs) => {},
  before: function() {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  },

  afterTest: () => {
    
  },

  afterSuite: (suite) => {
    
  }
};

exports.config = config;
