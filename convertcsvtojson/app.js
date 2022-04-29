/**
 * Дата справочника: 2022-05-01
 * Справочник информации о городах России находится по https://github.com/hflabs/city.git
 * 
 */

const { time, timeEnd, log } = require("console")
const fs = require("fs") 
const path = require('path')
const csv = require('csv-parser')

path.dirname('convertcsvtojson')

const inputFile = '/city-master/city.csv'
const outNameFile = 'fullcitycoords.json'

time('Read file')

const cities = []

// Читаем и парсим файл .csv
fs.createReadStream(`${__dirname}${inputFile}`, 'utf8')
.pipe(csv())
.on('data', (data) => {        
    const city = {
        city: !data.city ? (!data.area ? data.region : data.area) : data.city,
        region: data.region,
        region_type: data.region_type,
        geo_lat: +data.geo_lat,
        geo_lon: +data.geo_lon
    }
    cities.push(city)
})
.on('end', () => {       
    let res = {}
    let dedupcount = {}
    let dedup = {}

    for (const a of cities) {        
        for (const b of cities) {            
            if (a.city.toLowerCase() === b.city.toLowerCase() && a.region.toLowerCase() !== b.region.toLowerCase()) { 
                // Подсчет дублей
                dedupcount[a.city] ? dedupcount[a.city] += 1 : dedupcount[a.city] = 1 

                const region_type = b.region_type === 'Респ' ? '' : b.region_type
                const keyB = (`${b.city}, ${b.region} ${region_type}`).trim()
                dedup[keyB] = [b.geo_lat, b.geo_lon]     
            }            
        }
        res[a.city] = [a.geo_lat, a.geo_lon]    
    }

    // Удаляем из общего списка города, которые имеют дубли
    for (const a of Object.keys(dedupcount)) {
        for (const b of Object.keys(res)) {
            if (a.toLowerCase() === b.toLowerCase()) delete res[b]
        }
    }

    // Объединяем общий список городов с списком дублированных, но расположенных в разных регионах 
    const result = Object.assign(res, dedup)

    // Сортировка городов по алфавиту
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
    
    fs.writeFile(`${__dirname}/out/${outNameFile}`, data, err => {
        if (err) throw err
        log(`Data written to file: ${outNameFile}`)
    })
}
timeEnd('Write file')
