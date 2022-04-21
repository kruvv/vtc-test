const { time, timeEnd, log } = require("console")
const fs = require("fs") 
const path = require('path')

path.dirname('/home/kruvv/vtcservice/vtc-test/copytest/')

// Чтение файла
time('Read file')
fs.readFile(`${__dirname}/fullcities.json`, 'utf8', (err, data) => {
    if (err) throw err

    const cities = JSON.parse(data)

    let res = {}
    let dedupcount = {}
    let dedup = {}

    for (const a of cities) {        
        for (const b of cities) {            
            if (a.city.toLowerCase() === b.city.toLowerCase() && a.region.toLowerCase() !== b.region.toLowerCase()) { 

                dedupcount[a.city] ? dedupcount[a.city] += 1 : dedupcount[a.city] = 1 

                const region_type = b.region_type === 'Респ' ? '' : b.region_type
                const keyB = (`${b.city}, ${b.region} ${region_type}`).trim()
                dedup[keyB] = [b.geo_lat, b.geo_lon]     
            }            
        }
        res[a.city] = [a.geo_lat, a.geo_lon]    
    }

    for (const a of Object.keys(dedupcount)) {
        for (const b of Object.keys(res)) {
            if (a.toLowerCase() === b.toLowerCase()) delete res[b]
        }
    }

    const result = Object.assign(res, dedup)

    Object.keys(result).sort().forEach(function(key) {
        let value = result[key]
        delete result[key]
        result[key] = value
    })

    writeResult(result)  
})
timeEnd('Read file')

// Запись файла
time('Write file')
function writeResult(coord) {

    let data = JSON.stringify(coord, null, '\t')
    
    fs.writeFile(`${__dirname}/fullcitycoords.json`, data, err => {
        if (err) throw err
        log('Data written to file')
    })
}
timeEnd('Write file')
