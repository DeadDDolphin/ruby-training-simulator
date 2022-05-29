async function runMethodByParam(param, data) {
    switch (param) {
        case 'runTest':
            let updateProductResult = await runTest(data);
            return updateProductResult;
        default:
            return ['Wrong parameter']

    }

    async function runTest(inpData) {
        //CODE: data.rubyCode
        //PATH: data.pathTest
        
        const fullPath = "./ruby-scripts-tests/" + data.pathTest;

        let result = await new Promise((resolve) => {

            const { exec } = require("child_process");

            exec(`rspec spec ${fullPath}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    resolve([{
                        msg: "error",
                        error: error.message
                    }]);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    resolve([{
                        msg: "error",                        
                        stderr: stderr.message
                    }]);
                }
                console.log(`stdout: ${stdout}`);
                resolve([{
                    msg: "success",
                    stdout: stdout.message
                }]);
            });

        });

        return result;
    }
}


module.exports = runMethodByParam;