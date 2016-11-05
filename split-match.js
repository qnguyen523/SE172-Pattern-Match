// My name: Quoc Nguyen
// Homework: Pattern Match
// Class: SE 172 
var fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface(
{
    input: process.stdin,
    output: process.stdout
});

// console.log("Please follow this format on your terminal:");
// console.log("node <file_name>.js [arguments]");

if (process.argv.length < 2)
{
    console.log("Error in command format.");
    console.log("Please follow this format on your terminal:");
    console.log("node <file_name>.js [arguments]");
}
else if (process.argv.length == 2)
{
    var consoleOutput = "---Input---\n";
    rl.question('what pattern to match (i.e; . , and so on)?\n', (answer) => 
    {
        // TODO: Log the answer in a database
        if (answer != '.' && answer != ',')
        {
            console.log("Error. Not correct punctuation");
        }
        else
        {
            var readStream = fs.createReadStream('input-sensor.txt');
            var data = [];
            readStream.on('data', function(chunk)
            {
                consoleOutput += chunk.toString() + '\n';
                if (answer === '.')
                {
                    data = chunk.toString().replace(/\n/g, '').replace(/\. /g,';').split(";");
                    // console.log(data);
                }
                else if(answer === ',')
                {
                    data = chunk.toString().replace(/\n/g, '').replace(/, /g,',').split(",");
                    // console.log(data);
                }
            });
            readStream.on('end', function()
            {
                consoleOutput += "---Output---\n";
                consoleOutput = "[ ";
                for (var i = 0; i < data.length; i++)
                {
                    if(i == data.length - 1)
                    {
                        consoleOutput = consoleOutput+"'"+ data[i].slice(0, -1)+"']";
                    }
                    else
                    {
                        consoleOutput = consoleOutput+"'"+data[i]+"'"+", \n ";
                    }
                }
            console.log(consoleOutput);
            console.log(consoleOutput);
            // print output to stream-output.txt
            var writableStream = fs.createWriteStream('stream-output.txt');
            writableStream.write(consoleOutput);
            });
        }
        rl.close();
    });
}
else if (process.argv.length > 2)
{
    var consoleOutput = "---Input---\n";
    // TODO: Log the answer in a database
    if (process.argv[2] != '-p' || (process.argv[3] != '.' && process.argv[3] != ','))
    {
        console.log("Error. You must pass wrong arguments");
        console.log("Error in command format.");
        console.log("Please follow this format on your terminal:");
        console.log("node <file_name>.js -p [additional arguments]");
        console.log("For example: node test.js -p ,")
    }
    else
    {
        var readStream = fs.createReadStream('input-sensor.txt');
        var data = [];
        readStream.on('data', function(chunk)
        {
            consoleOutput += chunk.toString() + '\n';
            if (process.argv[3] === '.')
            {
                data = chunk.toString().replace(/\n/g, '').replace(/\. /g,';').split(";");
                // console.log(data);
            }
            else if(process.argv[3] === ',')
            {
                data = chunk.toString().replace(/\n/g, '').replace(/, /g,',').split(",");
                // console.log(data);
            }
        });
        readStream.on('end', function()
        {
            consoleOutput += "---Output---\n";
            consoleOutput += "[ ";
            for (var i = 0; i < data.length; i++)
            {
                if(i == data.length - 1)
                {
                    consoleOutput = consoleOutput+"'"+ data[i].slice(0, -1)+"']";
                }
                else
                {
                    consoleOutput = consoleOutput+"'"+data[i]+"'"+", \n ";
                }
            }
        console.log(consoleOutput);
        // print output to stream-output.txt
        var writableStream = fs.createWriteStream('stream-output.txt');
        writableStream.write(consoleOutput);
        });
    }
    rl.close();
}

