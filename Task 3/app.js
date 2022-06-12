const yargs = require('yargs')
const https = require("https")

yargs.command({
    command: "fetch",           //function name
    builder:{                   //function paramiters
        url:{demandOption:true}
    },
    handler:function(argv){
        const req = https.request(argv.url, (res) => {
            let allData = ""
            res.on("data", (myData) => {
                allData += myData.toString()
            })
            res.on("end", () => {
                console.log(JSON.parse(allData))
            })
        })
        req.on("error", (err) => console.log(`error ${err}`))
        req.end()
    }
})
yargs.argv

