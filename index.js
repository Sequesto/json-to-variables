const fs = require("fs");
const path = require("path");
const core = require("@actions/core");

try {
  const fileName = core.getInput("filename", { required: true });
  const prefix = core.getInput("prefix") || "json";

  const fullPath = path.resolve(fileName);
  core.info(`Processing file: ${fullPath}`);

  const rawdata = fs.readFileSync(fullPath);
  const rootObj = JSON.parse(rawdata);

  const processVariable = (variable, name) => {
    if (typeof variable === "undefined" || variable === null) {
      return;
    }

    if (Array.isArray(variable)) {
      variable.forEach((value, index) => {
        processVariable(value, index);
      });
    } else if (typeof variable === "object") {
      for (const field in variable) {
        processVariable(variable[field], field);
      }
    } else {
      core.info(`SET ENV '${name}' = ${variable}`);
      core.exportVariable(name, variable.toString());
    }
  };

  processVariable(rootObj, prefix);
} catch (error) {
  core.setFailed(error.message);
}
