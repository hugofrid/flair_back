
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
//
//new :  
// CodeINSEE | CodePostal | NomVille | Geographie | Population | PrixM22019 | PrixM22021 | EvolMarche2021 | PrixMoyenVenteBien2019 | PrixM22024 | EvolMarche2024 
 
 readXlsxFile('../files/Flair.xlsx').then(async (rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    const cities = rows.slice(1);
    await cities.map(async row => {
        let feature = {
            "type": 'Feature',
            "geometry": {
                "type": 'Polygon',
                "coordinates": JSON.parse(row[3]),
            },
            "properties": {
                "codePostal": row[1],
                "codeINSEE" : row[0],
                "city_name": row[2],
                "population": parseInt(row[4]),
                "prixActuel": parseFloat(row[5]).toFixed(3),
                "prix_2": parseFloat(row[6]).toFixed(3),
                "estimation2": parseFloat(row[7]).toFixed(3),
                "prixVenteMoyen": parseInt(row[8]),
                "prix_5": parseFloat(row[9]).toFixed(3),
                "estimation5": parseFloat(row[10]).toFixed(3),
            }
        }
        geoData.features.push(feature);
    })

    

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
      

    
    