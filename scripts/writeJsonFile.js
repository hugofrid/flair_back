
const start = new Date();
const readXlsxFile = require('read-excel-file/node');
// file system module to perform file operations
const fs = require('fs');

/* feature model 
[{
        "type": 'Features';
        "geometry": {
            "type": 'Polygon';
            "coordinates": null;
        },
        "properties": null
    }] */

    let geoData = {
        "type": "FeatureCollection",
        "features": []
    }
    let jsonContent;
//  CodePostal | CodeINSEE | NomVille | Geographie | Population | Estimation5 | Estimation10 | Estimation 15 | PrixM2 | PrixMinM2 | PrixMaxM2 | Salaire  
 
 readXlsxFile('../files/Flair.xlsx').then(async (rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    // const titles = rows.slice(0, 1);
    const cities = rows.slice(1);
   // console.log(titles,cities)
    await cities.map(async row => {
        let feature = {
            "type": 'Feature',
            "geometry": {
                "type": 'Polygon',
                "coordinates": JSON.parse(row[3]),
            },
            "properties": {
                "codePostal": row[0],
                "codeINSEE" : row[1],
                "city_name": row[2],
                "population": parseInt(row[4]),
                "estimation5": parseInt(row[5]),
                "estimation10": parseInt(row[6]),
                "estimation15": parseInt(row[7]),
                "M2price": parseInt(row[8]),
                "minM2price":parseInt(row[9]),
                "maxM2price": parseInt(row[10]),
                "salaire":parseInt(row[11])

            }
        }
        geoData.features.push(feature);
    })

    console.log(geoData);

   jsonContent  = await  JSON.stringify(geoData);
     
fs.writeFile("../files/output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
    const end = new Date();
    const tmp = Math.floor((end - start) / 1000);
    console.log("treatment time : " + tmp + "secondes")
});

})
      

    
    