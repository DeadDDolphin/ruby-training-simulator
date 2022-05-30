const path = require('path');
const fs = require('fs');
const async = require('async');


async function runMethodByParam(param, data) {
    switch (param) {
        case 'saveFile':
            let saveResponse = await saveFile(data);
            return saveResponse;
        case 'runTest':
            let testResult = await runTest(data);
            return testResult;
        case 'getFileNames':
            let fileNames = await getFileNames();
            return fileNames;
        default:
            return ['Wrong parameter']

    }

    async function getFiles (dirPath, callback) {

        var filePaths = [];

        await fs.readdir(dirPath, function (err, files) {
            if (err) return callback(err);
    
            
            async.eachSeries(files, function (fileName, eachCallback) {
                var filePath = path.join(dirPath, fileName);
    
                fs.stat(filePath, function (err, stat) {
                    if (err) return eachCallback(err);
    
                    // if (stat.isDirectory()) {
                    //     getFiles(filePath, function (err, subDirFiles) {
                    //         if (err) return eachCallback(err);
    
                    //         filePaths = filePaths.concat(subDirFiles);
                    //         eachCallback(null);
                    //     });
    
                    // } else {
                        if (stat.isFile() && /\.rb$/.test(filePath)) {
                            filePaths.push(filePath);
                        }
    
                        eachCallback(null);
                    // }
                });
            }, function (err) {
                callback(err, filePaths);
            });
    
        });
        return filePaths;
    }
    

    
    
    function removeLastNumber(path){
        return `${path.split("_").slice(0, -1).join('_')}`
    }

    async function saveFile(data) {
        const dir = removeLastNumber(data.path);

        console.log(data.path);
        const pathScripts = "./../ruby-scripts/";
        const fullPath = path.join(pathScripts, dir);

        const filePaths = await getFiles(fullPath, function (err, files) {
            console.log(err || files);

            const newArr = files.map((p) => {
                return Number(p.split("\\").slice(-1)[0].split(".")[0].split("_").slice(-1)[0]);
            })


            const lastIndex = Math.max.apply(Math, newArr);


            var result = {
                result: "success",
            };

            const name = path.join(
                fullPath,
                `${removeLastNumber(data.path)}_${lastIndex + 1}.rb`
            );
            const writedData = new Uint8Array(Buffer.from(data.rubyCode));
            fs.writeFile(name, writedData, (error) => {
                if (error) {
                    result = {
                        result: "error",
                    };
                }
            });
            console.log(result);
            return result;
        });

        return {result: "files not loaded"}
    }

    async function getFileNames() {
        const path = "./../ruby-scripts/";
        
        
        let result = await new Promise((resolve) => {
            var files = fs.readdirSync(path);
            resolve({files});
        })

        return result;
    }

    async function runCode(inpData) {
        //CODE: data.rubyCode
        //PATH: data.path
        const dir = removeLastNumber(data.path);

        const pathScript = `./../ruby-scripts/${dir}/${inpData.path}`;
        let result = await new Promise((resolve) => {

            const { exec } = require("child_process");

            exec(`ruby ${pathScript}`, (error, stdout, stderr) => {
                // console.log("error", error);
                // console.log("stdout", stdout);
                // console.log("stderr", stderr);
                if (error) {
                    console.log(`error: ${error.message}`);
                    resolve({
                        msg: "error",
                        error: error.message
                    });
                }
                resolve({
                    msg: "success",
                    codeResult: stdout
                });
            });

        });
        // console.log(result);
        return result;
    }

    async function runTest(inpData) {
        //CODE: data.rubyCode
        //PATH: data.pathTest
        const dir = removeLastNumber(inpData.path);
        const pathTest = `./../ruby-scripts-tests/${dir}-spec.rb`;
        const resultCode = await runCode(inpData);
        let result = await new Promise((resolve) => {
            
            const lastIndex = inpData.path.split("_").slice(-1)[0].split(".")[0];
            const requireScript = `require_relative './../ruby-scripts/${dir}/${dir}_${lastIndex}.rb'\r\n`;
            fs.open(pathTest, "r+", function(err, file_handle) {
                if (!err) {
                    fs.write(file_handle, requireScript, 0, function(err, written) {
                        if (!err) {
                            // Всё прошло хорошо
                        } else {
                            resolve([{
                                msg: "error",
                                error: err.message
                            }])
                        }
                    });
                } else {                    
                    resolve([{
                        msg: "error",
                        error: err.message
                    }])
                }
            });
            const { exec } = require("child_process");

            exec(`rspec spec ${pathTest}`, (error, stdout, stderr) => {
                // console.log("error test", error);
                // console.log("stdout test", stdout);
                // console.log("stderr test", stderr);
                if (error) {

                    resolve([{
                        msg: "error",
                        error: error.message,
                        testResult: stdout
                    }]);
                }
                resolve([
                  {
                    msg: "success",
                    testResult: stdout
                    // codeResult: runCode(inpData)
                  },
                  resultCode,
                ]);
            });

        });
        // console.log(result);
        return result;
    }


}


module.exports = runMethodByParam;