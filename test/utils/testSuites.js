class testSuites {
  constructor() {
    this.suites = {
      
      spec: ["./test/specs/*.js"],

      exclude: ["./features/*.*"],
     
    };
  }
}

export default new testSuites();