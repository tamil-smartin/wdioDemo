import util from 'util';
import events from 'events';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

let tableHeader = "";
// let tableHeader = "<tr>"
//     + "<th style='width:5%;'>ID</th>"
//     + "<th style='width:50%;'>BDD steps</th>"
//     + "<th style='width:6%;'>Status</th>"
//     + "<th style='width:10%;'>Failure Type</th>"
//     + "<th style='width:29%;'>Comments</th></tr>";


let stepStatusSymbol = {
    Scenario: '<darkredColorTag>Scenario : </darkredColorTag>',
    Passed: '<greenColorTag>&#10004</greenColorTag>',
    Skipped: '<blueColorTag>?</blueColorTag>',
    Failed: '<redColorTag>&#10008</redColorTag>',
    Broken: '<yellowColorTag>&#33</yellowColorTag>',
    Pending: '<blueColorTag>?</blueColorTag>'
};

let caseStatusColor = {
    Passed: '<greenColorTag>PASSED</greenColorTag>',
    Skipped: '<blueColorTag>PASSED*</blueColorTag>',
    Failed: '<redColorTag>FAILED</redColorTag>',
    Broken: '<yellowColorTag>BROKEN</yellowColorTag>',
    Pending: '<blueColorTag>PENDING</blueColorTag>'
};


class CustomReporter extends events.EventEmitter {
    constructor(baseReporter, config, options = {}) {
        super();

        this.orderSummary = {};

        this.summary = {
            info: {
                thdEnv: '', baseUrl: '', specs: '', maxInstancesPerCapability: '',
                maxInstances: '', services: '', dynamicData: '',build: ''
            },
            counts: { Total: 0, Passed: 0, Failed: 0, Broken: 0, Skipped: 0 },
            bddcounts: { Total: 0, Passed: 0, Failed: 0, Broken: 0, Skipped: 0 },
            wdiocounts: { Total: 0, Passed: 0, Failed: 0, Broken: 0, Skipped: 0 },
            duration: { startTime: '', endTime: '', timeTaken: '' }
        };

        this.capabilitySummary = {};


        this.failures = {};

        this.specCid = "";
        this.specStatus = "";
        this.baseReporter = baseReporter;
        this.config = config;
        this.options = options;
     
        this.suiteNameRegEx = this.options.suiteNameFormat instanceof RegExp ? this.options.suiteNameFormat : /[^a-z0-9]+/;

        this.on('orderSummary', ({ event, cid, feature }) => {
            this.orderSummary[cid] = feature;
            console.log(`Process ${cid}. We tests feature: ${feature}`);
        });
        // this.on('runner:screenshot',({runner})  => {
        //     console.log(JSON.stringify(runner));
        //   });
      
        this.on('end', this.onEnd);
        }

    onEnd() {
        

        try {
            //console.log(this.baseReporter);
            //const { epilogue } = this.baseReporter
            console.log("Prepare HTML Report");

            this.summary.info.thdEnv = this.config.thdEnv;
            this.summary.info.baseUrl = this.config.baseUrl;
            this.summary.info.specs = this.config.specs;
            this.summary.info.maxInstancesPerCapability = this.config.maxInstancesPerCapability;
            this.summary.info.maxInstances = this.config.maxInstances;
            this.summary.info.services = this.config.services;
            this.summary.info.dynamicData = this.config.dynamicDataFetch;
            this.summary.info.build = this.config.buildName;
            //reportName = this.config.buildName;
            let stats = this.baseReporter.stats;

            // console.log(this.baseReporter);
            this.summary.duration.startTime = stats.start;
            this.summary.duration.endTime = stats.end;
            this.summary.duration.timeTaken = this.formatTime(stats.duration / 1000);

            this.createHtmlReport();

            //console.log("env" + JSON.stringify(this.config.thdEnv));

            console.log(`Test Summary Count :: ${JSON.stringify(this.summary.info)}`);
            console.log(`Test Summary Count :: ${JSON.stringify(this.summary.counts)}`);
            console.log(`BDDSteps Summary Count :: ${JSON.stringify(this.summary.bddcounts)}`);

            //epilogue.call(this.baseReporter)    
        } catch (error) {
            console.log(`on end error ::${error}`);
        }

    }

    getBddByGroupedStatus() {

        let passedBddTableContent = "";
        let failedBddTableContent = "";
        let brokenBddTableContent = "";
        let skippedBddTableContent = "";

        try {

            for (let cid of Object.keys(this.baseReporter.stats.runners)) {
                // console.log("get bdd :: " + cid);
                this.specCid = cid;
                this.summary.counts.Total++;

                const capabilities = this.baseReporter.stats.runners[cid];

                this.specStatus = "";
                let tablecontent = this.prepareHtml(capabilities);
                //console.log(this.specStatus);
                if (this.specStatus == 'Passed') {
                    this.summary.counts.Passed++;
                    passedBddTableContent += tablecontent;
                } else if (this.specStatus == 'Failed') {
                    this.summary.counts.Failed++;
                    failedBddTableContent += tablecontent;
                } else if (this.specStatus == 'Broken') {
                    this.summary.counts.Broken++;
                    brokenBddTableContent += tablecontent;
                } else if (this.specStatus == 'Skipped') {
                    this.summary.counts.Skipped++;
                    skippedBddTableContent += tablecontent;
                }
            }

            return this.groupUnderAccordion(passedBddTableContent, failedBddTableContent, brokenBddTableContent, skippedBddTableContent);

        } catch (error) {
            console.log(`bdd report prep error:: ${error}`);
        }
    }

    groupUnderAccordion(passedBddTableContent, failedBddTableContent, brokenBddTableContent, skippedBddTableContent) {
        let passAccordion = "";
        let failAccordion = "";
        let brokenAccordion = "";
        let skippedAccordion = "";

        try {

            // let passedBddTable =  "<table>" + tableHeader + passedBddTableContent + "</table>";
            // let failedBddTable = "<table>" + tableHeader + failedBddTableContent + "</table>";
            // let brokenBddTable = "<table>" + tableHeader + brokenBddTableContent + "</table>";
            // let skippedBddTable = "<table>" + tableHeader + skippedBddTableContent + "</table>";

            if (this.summary.counts.Passed > 0) {
                passAccordion = `<button class='accordion passed'>( ${this.summary.counts.Passed} )  Passed  </button><div class='panel'>${passedBddTableContent}</div>`;
            }

            if (this.summary.counts.Skipped > 0) {
                skippedAccordion = `<button class='accordion broken'>( ${this.summary.counts.Skipped} ) Pending </button><div class='panel'>${skippedBddTableContent}</div>`;
            }

            if (this.summary.counts.Failed > 0) {
                failAccordion = `<button class='accordion failed'>( ${this.summary.counts.Failed} )  Failed  </button><div class='panel'>${failedBddTableContent}</div>`;
            }

            if (this.summary.counts.Broken > 0) {
                brokenAccordion = `<button class='accordion broken'>( ${this.summary.counts.Broken} )  Broken  </button><div class='panel'>${brokenBddTableContent}</div>`;
            }

            return passAccordion + skippedAccordion + failAccordion + brokenAccordion;

        } catch (error) {
            console.log(`Accordin create error :: ${error}`);
        }
    }

    getDefects() {

        const errorGrouping = {};

        let failAccordion = "";
        let brokenAccordion = "";
        //console.log(this.baseReporter.stats.failures);
        try {

            for (let index of Object.keys(this.baseReporter.stats.failures)) {

                let failure = this.baseReporter.stats.failures[index];
                let error = failure.err.message;

                if (!errorGrouping.hasOwnProperty(error))
                    errorGrouping[error] = [];

                for (let cid of Object.keys(failure.runner)) {
                    errorGrouping[error].push(cid);
                    //console.log(this.baseReporter.stats.runners[cid]);
                }

            }
            // let errTable = "";

            for (let index of Object.keys(errorGrouping)) {

                console.log(`${errorGrouping[index].length} test failed :: ${index}`);
                //console.log(errorGrouping[index]);

                //if (failure.err.type == 'AssertionError') {
                failAccordion += `<button class='accordion failed'>( ${errorGrouping[index].length} ) :: ${index}</button><div class='panel'>bdd table to be displayed</div>`;
                // } else {
                //     brokenAccordion += "<button class='accordion broken'>( " +  errorGrouping[index].length + " )  :: "  
                //                      + index + "</button>"
                //                      + "<div class='panel'>" + "bdd table to be displayed" + "</div>";
                // }

                //     console.log(errorGrouping[err].length + " tests failed due to :: "+ err);

                //     for (let cid of Object.keys(err)){

                //        let temp = this.baseReporter.stats.failures[cid]
                //         // console.log(temp);
                //         //  console.log(temp.title);
                //         //  console.log(temp.parent);
                //         //  console.log(temp.err.type);
                //         // console.log(temp.err.message);
                //         //  console.log(temp.err.stack);
                //      }
                //this.baseReporter.stats.failures[err]

            }

            return failAccordion + brokenAccordion;
        } catch (error) {
            console.log("getdefets error");
        } 


        // console.log(failure.cid);
        // console.log(failure.title);
        // console.log(failure.parent);
        // console.log(failure.err.type);
        // console.log(failure.err.message);
        // console.log(failure.err.stack);
    }

    getStats(counts){
        return  `<span><darkredColorTag> Total : ${counts.Total} </darkredColorTag></span><span><greenColorTag> Passed : ${counts.Passed} </greenColorTag></span><span><redColorTag> Failed : ${counts.Failed} </redColorTag></span><span><yellowColorTag> Broken : ${counts.Broken} </yellowColorTag></span>`;
                // +"<span><blueColorTag> Pending : "+ this.summary.counts.Skipped +" </blueColorTag></span>";
    }

    getMultiCapsStats(){

        let capSummmary = "";

        for (let key of Object.keys(this.capabilitySummary)) {
            capSummmary += `<div>${key}</div><div>${this.getStats(this.capabilitySummary[key])}</div>`;
        }    
        
        return `<button class='accordion'>${this.getStats(this.summary.counts)}</button><div class='panel'><div class='inner-grid'>${capSummmary}`;
    }

    getConfig(){
        return `<div>Environment :: ${this.summary.info.thdEnv}</div><div>Base Url :: ${this.summary.info.baseUrl}</div><div>Specs :: ${this.summary.info.specs}</div><div>Dynamic Data :: ${this.summary.info.dynamicData}</div><div>WDIO-Service :: ${this.summary.info.services}</div><div>Max Instance :: ${this.summary.info.maxInstances}</div>`;
              //  +"<div>Build :: " + this.summary.info.build +"</div>"
               // +"<div>Capabilities :: " + JSON.stringify(this.capabilitySummary) +"</div>"
    }   

    getDuration(){
        return `<h1>Time Taken :: ${this.summary.duration.timeTaken}</h1>`;
    }

    prepareHtml(capabilities) {

        let bddTableContent = "";

        try {
            const packageName = this.options.packageName
                ? `${capabilities.sanitizedCapabilities}-${this.options.packageName}`
                : capabilities.sanitizedCapabilities;

                if (!this.capabilitySummary.hasOwnProperty(packageName)){
                    this.capabilitySummary[packageName]={Total:0, Passed: 0, Failed: 0, Broken: 0, Skipped: 0, Pending: 0};
                }
            
            for (let specId of Object.keys(capabilities.specs)) {
                const spec = capabilities.specs[specId];

                for (let suiteKey of Object.keys(spec.suites)) {
                    /**
                     * ignore root before all
                     */
                    /* istanbul ignore if  */
                    if (suiteKey.match(/^"before all"/)) {
                        continue;
                    }
                    const suite = spec.suites[suiteKey];

                    let suiteSessionID = specId || '';
                    let suiteName = suite.title ? suite.title : 'Skipped test'; //this.prepareName(suite.title)
                    let suiteDuration = this.formatTime(suite.duration / 1000) || '';
                    let suiteCaps = packageName || '';
                    let suitePath = spec.files[0].replace(process.cwd(), '.');
                    let suiteStatus = { Passed: 0, Failed: 0, Broken: 0, Skipped: 0, Pending: 0 };
                    let stepContent = "";
                                    
                    let suitefailureType = "";
                    let suiteFailureMessage = "";
                    let suiteFailureStack = "";

                    // console.log(JSON.stringify(suite.hooks));

                    for (let testKey of Object.keys(suite.tests)) {

                        if (testKey !== 'undefined') { // fix cucumber hooks crashing reporter
                            this.summary.bddcounts.Total++;

                            const test = suite.tests[testKey];

                            let stepName = test.title || "";
                            let stepTime = this.formatTime(test.duration / 1000) || "";
                            let stepStatus = test.state == 'pass' ? "Passed" :
                                test.state == 'fail' ? "Failed" :
                                    test.state == 'pending' ? "Skipped" : "Pending";

                            if (test.error) {
                                stepStatus = test.error.type == 'AssertionError' ? "Failed" : "Broken";
                                suitefailureType = test.error.type;
                                suiteFailureMessage = test.error.message;
                                suiteFailureStack = test.error.stack;

                                // const output = this.getStandardOutput(test)
                                // //     if (output) testCase.standardOutput(`\n${output}\n`)
                                // // }

                            }

                            this.summary.bddcounts[stepStatus]++;
                            //    console.log(test.state + "step status " + stepStatus); 
                            suiteStatus[stepStatus]++;
                            // const output = this.getStandardOutput(test)
                            //     if (output) testCase.standardOutput(`\n${output}\n`)
                            // }
                            stepContent += this.getStepLine(stepStatus, stepName, stepTime);
                        }
                    }

                    let caseId = this.getCaseId(this.specCid);
                    let bddInlineTable = this.getInlineTable(suiteName, suiteDuration, stepContent);

                    this.specStatus = suiteStatus['Failed'] > 0 ? 'Failed' :
                                      suiteStatus['Broken'] > 0 ? 'Broken' :
                                      suiteStatus['Skipped'] > 0 ? 'Passed' : 'Passed';
                    
                    this.capabilitySummary[packageName].Total++;
                    this.capabilitySummary[packageName][this.specStatus]++;

                    // console.log(this.specStatus);  
                    bddTableContent += this.getBddRow(caseId, bddInlineTable, suitefailureType, suiteFailureMessage);
                }
            }
            return bddTableContent;
        } catch (error) {
            console.log(`prep error ${error}`);

        } 
    }

    getCaseId(suiteCid) {
        return `<button onclick='showWdiotable("${suiteCid.trim()}")'>${suiteCid}</btton>`;
    }

    getStepLine(stepStatus, stepName, stepTime) {
        return `<div>&emsp;${stepStatusSymbol[stepStatus]}&emsp;${stepName}&emsp;(${stepTime})</div>`;
    }

    getInlineTable(suiteName, suiteDuration, stepContent) {
        return `<div>${stepStatusSymbol["Scenario"]} &emsp;${suiteName}&emsp;(${suiteDuration})</div>${stepContent}`;
    }

    getBddRow(caseId, bddInlineTable, suitefailureType, suiteFailureMessage) {

        let comments = this.specStatus == 'Passed' ? this.orderSummary[this.specCid] : suiteFailureMessage; 

        return `<div class='bdd-grid'><div class='bddSteps-grid'>${bddInlineTable}</div><div>${caseStatusColor[this.specStatus]}</div><div>${suitefailureType}</div><div><p>${comments}</p></div><div>${caseId}</div></div>`;// + wdioTable
    }

    createHtmlReport() {
        console.log("html prep started ");
        try {
        
            let bddSummary = this.getBddByGroupedStatus(this.baseReporter) || "Empty bdd Summary Template";
            let failureSummary = this.getDefects() || "Empty failure summary Template"; 
            let stats = this.getMultiCapsStats() || "Empty stats Template"; //this.getStats(this.summary.counts);
            let config = this.getConfig() || "Empty config";
            let duration = this.getDuration() || "Empty Duration Template";
                        
            let folder = this.options.outputDir ? this.options.outputDir : './report';
            let fileName = this.options.reportName ? this.options.reportName : './summary';
            
            const bddSummaryTemplate = fs.readFile('./test/metaData/templates/newTemplate1.html', (err, html) => {
                    dd(html.toString());
            });

           let dd = resp => {
                try {
                    let temp = resp.toString();

                    temp = stats !== "" ?  temp.replace(/@@bddStats##/g, stats) : temp.replace(/@@bddStats##/g, "No Data to populate");
                    temp = config !== "" ?  temp.replace(/@@wdioConfig##/g, config) : temp.replace(/@@wdioConfig##/g, "No Data to populate");
                    temp = duration !== "" ?  temp.replace(/@@wdioDuration##/g, duration) : temp.replace(/@@wdioDuration##/g, "No Data to populate");
                    temp = bddSummary !== "" ?  temp.replace(/@@bddTable##/g, bddSummary) : temp.replace(/@@bddTable##/g, "No Data to populate");
                    temp = failureSummary !== "" ?  temp.replace(/@@failureSummaryTable##/g, failureSummary) : temp.replace(/@@failureSummaryTable##/g, "No Data to populate");
                    
                    //const dir = path.resolve(this.options.outputDir);
                    const dir = path.resolve(folder);
                    const filepath = path.join(dir, `${fileName}.html`);
                    mkdirp.sync(dir);

                    fs.writeFileSync(filepath, temp, 'utf8', () => {
                        console.log("writing html report");
                        //if (error) { console.log(err); }
                        console.log("The file was saved!");
                    });

                } catch (error) {
                    console.log(`Html report write error${error}`);
                }
            };
        } catch (error) {
            console.log(`Html report write error${error}`);
        }
    }

    getStandardOutput(test) {
        /* istanbul ignore if  */
        if (this.options.writeStandardOutput === false) {
            return '';
        }
        let standardOutput = [];
        test.output.forEach((data) => {
            switch (data.type) {
                case 'command':
                    standardOutput.push(
                        `COMMAND: ${data.payload.method.toUpperCase()} ` +
                        `${data.payload.uri.href} - ${this.format(data.payload.data)}`
                    );
                    break;
                case 'result':
                    standardOutput.push(`RESULT: ${this.format(data.payload.body)}`);
                    break;
            }
        });
        return standardOutput.length ? standardOutput.join('\n') : '';
    }

    write(capabilities, cid, xml) {
        /* istanbul ignore if  */
        if (!this.options || typeof this.options.outputDir !== 'string') {
            return console.log(`Cannot write xunit report: empty or invalid 'outputDir'.`);
        }

        /* istanbul ignore if  */
        if (this.options.outputFileFormat && typeof this.options.outputFileFormat !== 'function') {
            return console.log(`Cannot write xunit report: 'outputFileFormat' should be a function`);
        }

        try {
            const dir = path.resolve(this.options.outputDir);
            const filename = this.options.outputFileFormat ? this.options.outputFileFormat({
                capabilities: capabilities.sanitizedCapabilities,
                cid,
                config: this.config
            }) : `WDIO.xunit.${capabilities.sanitizedCapabilities}.${cid}.xml`;
            const filepath = path.join(dir, filename);
            mkdirp.sync(dir);
            fs.writeFileSync(filepath, xml);
            console.log(`Wrote xunit report to [${this.options.outputDir}].`);
        } catch (e) {
            /* istanbul ignore next */
            console.log(`Failed to write xunit report to [${this.options.outputDir}]. Error: ${e}`);
        }
    }

    format(val) {
        return JSON.stringify(this.baseReporter.limit(val));
    }

    formatTime(seconds){
        let minutes = Math.floor(seconds/60);
        seconds = Math.round(seconds%60) ;
        return `${minutes}m ${seconds}s` ;
    }
}

CustomReporter.reporterName = 'CustomReporter';

/**
 * Inherit from EventEmitter
 */
//util.inherits(CustomReporter, events.EventEmitter);

/**
 * Expose Custom Reporter
 */
exports = module.exports = CustomReporter;