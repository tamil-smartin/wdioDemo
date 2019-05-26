import fs from "fs";
class fileHelper {
constructor() {}

readJsonFile(file) {
    try {
       
       const fileTxt = fs.readFileSync(file, "utf8");
       return JSON.parse(fileTxt);
    } catch (e) {
       console.log(`Error Reading Json File${e}`);
      return null;
    }
  }


}

export default new fileHelper();