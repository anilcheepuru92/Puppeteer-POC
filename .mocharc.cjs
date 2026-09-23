var dateString = new Date().toGMTString().replace(/,|:|[ ]/g, " ");
// var dateString = new Date().toLocaleDateString();
// var dateString = new Date().toGMTString();
console.log(`New Date value is: ${dateString}`);
module.exports = {
  timeout: 30000,
  reporter: "node_modules/mochawesome",
  "reporter-option": [
    `reportDir=./MochaReports_${dateString}`,
    `reportFilename=TestReport_${dateString}`,
    "overwrite=true",
    "reportTitle=My Custom Report Title",
    "showPassed=true",
    "charts=true",
  ],
  retries: 0,
};
