const fs = require("fs"); 

fs.readFile('/home/kruvv/vtcservice/vtc-test/copytest/fullcities.json', 'utf8', (err, data) => {
    if (err) throw err;

    const cities = JSON.parse(data)
    let res = {}
    for (const el of cities) {
        // if (Object.keys(el).includes("city")) { 
            const key = `${el.city}, ${el.region} ${el.region_type}`           
            res[key] = [el.geo_lat, el.geo_lon] 
        // }
    }

    Object.keys(res).sort().forEach(function(key) {
        var value = res[key];
        delete res[key];
        res[key] = value;
    });


    // console.log(data);
    // console.log(res); 
    writeResult(res)   

});

function writeResult(coord) {

    let data = JSON.stringify(coord, null, '\t')
    
    fs.writeFile('/home/kruvv/vtcservice/vtc-test/copytest/fullcitycoords.json', data, err => {
        if (err) throw err
        console.log('Data written to file')
    })
}


// const readline = require('readline');

// async function processLineByLine() {
//   const fileStream = fs.createReadStream('/home/kruvv/vtcservice/vtc-test/copytest/fullcities.json');

//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   });
//   // Note: we use the crlfDelay option to recognize all instances of CR LF
//   // ('\r\n') in input.txt as a single line break.

//   for await (const line of rl) {
//     // Each line in input.txt will be successively available here as `line`.
//     console.log(`Line from file: ${line}`);
//   }
// }

// processLineByLine();