var express = require('express');
var router = express.Router();
var filename = '../files/output.json'
let dataset = require(filename)


router.get('/', async (req, res, next) => {
    try{
        return res.status(200).send(JSON.stringify(dataset))
    } catch (err) {
        return res.status(500).send({
            message: err.message || "unknownError"
            ``
          });
    };
});


module.exports = router;