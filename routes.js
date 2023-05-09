const express = require('express')

// //8 total queries
// View existing reviews of a given ad ///
// View aggregated rating of a seller / owner ///
// carsfilter -1 //Show all the cars for a given car make, body type and year in a specific location / area, along with the average price of the number of cars for each model
// Show all the used cars in a certain location in a given price range, with a given set of features ///needs rescraping
// Show the top 5 areas in cairo by amount of cars and show the average price for a given make / model   // done 
// Show the top 5 sellers by the amount of cars they have, along with their avg price per year      //done
// Show all the cars listed by a specific seller (given their first and last name and / or phone no)  
// Show the top 5 make / models cars by the amount of inventory and their average price for a given year range

const pool = require('./connectsql')

var router = express.Router()

router.post('/cars-filter-1', (req, res) => {
    try{
        const carMake=req.body.carMake
        const bodyType=req.body.bodyType
        const location=req.body.location
        let query = "SELECT * FROM `Cars`"
        
        if(carMake){
            query = query + ' WHERE Brand = "' + carMake + '"'
        }
        if(bodyType){
            if(carMake){
                query = query + ' AND Body_Type = "' + bodyType+ '"'
            }else{
                query = query + 'WHERE Body_Type = "' + bodyType+ '"'
            }
        }
        if(location){
            if(carMake || bodyType){
                query = query + ' AND Location = "' + location+'"'
            }else{
                query = query + 'WHERE Location = `' + location+'`'
            }
        }
        pool.query(query, function(err, rows2, fields) {
            // Connection is automatically released when query resolves
            if(err)
                console.log(err)
            else{
                console.log(rows2)
                res.send(rows2)
            }
        })
    }catch(e){
        res.status(500).send(err)
    }
    
})

router.get('/avg-price-for-each-model', (req, res) => {
    try{    
        let priceQuery = `SELECT Model, AVG(Car_price) 
                            FROM Cars
                            GROUP BY Model
                            `

        pool.query(priceQuery, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            // console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.post('/top-5-areas-sortby-carscount-by-make', (req, res) => {
    try{    
        const make = req.body.make
        let query = `SELECT Location,Brand, COUNT(*) as carsCountForLocationAndBrand
                    FROM Cars
                    WHERE Brand = "${make}"
                    GROUP BY Location
                    ORDER BY COUNT(*) DESC LIMIT 5
                    `

        pool.query(query, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            // console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})


router.post('/top-5-cars-makes-by-yearRange', (req, res) => {
    try{    
        const make = req.body.make
        const Miniyear =req.body.Miniyear
        const Maxyear=req.body.Maxyear
        let query = `SELECT Brand, COUNT(*), AVG(Car_price) as carsCount_For_Brand_and_average_price
                    FROM Cars
                    WHERE carYear<="${Maxyear}" AND carYear>="${Miniyear}"
                    GROUP BY Brand
                    ORDER BY COUNT(*) DESC LIMIT 5
                    `
        pool.query(query, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            // console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})


// WHERE Brand = "${make}"

router.get('/top-5-cars-by-make', (req, res) => {
    try{    
        //const make = req.body.make
        let query = `SELECT Brand, COUNT(*) as carCount, AVG(Car_price) as carsCount_For_Brand_and_average_price
                    FROM Cars
                    GROUP BY Brand
                    ORDER BY COUNT(*) DESC LIMIT 5
                    `
        pool.query(query, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            // console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})


// router.post('/cars-by-sellername', (req, res) => {
//     try{    
//         const firstName = req.body.firstName
//         const lastName = req.body.lastName

//         let query = `SELECT *
//                     FROM Cars
//                     WHERE S_Name LIKE "%${firstName}%"
//                     OR WHERE S_Name LIKE "%${lastName}%"
//                     `

//         pool.query(query, function(err, rows, fields) {
//             // Connection is automatically released when query resolves
//             // console.log(rows)   
//             res.send(rows)
//         })
//     }
//     catch(err){
//         //console.log(err)
//         res.status(500).send(err)
//     }
    
// })

router.post('/cars-by-sellername', (req, res) => {
    try{    
        const firstName = req.body.firstName
        const lastName = req.body.lastName

        // let query = `SELECT SUBSTRING_INDEX(S_Name, ' ', 1) AS FName,
        //             SUBSTRING_INDEX(S_Name, ' ', -1) AS LASTNAME 
        //             FROM Seller S
        //             WHERE FName LIKE "%${firstName}%"
        //             OR WHERE LASTNAME LIKE "%${lastName}%"
        //             `
        if(!firstName && !lastName){
            throw new Error('Please enter either first or last name!');
        }
        let query = null
        if(firstName){
            query = `SELECT Cars.S_ID , Cars.Ad_id
                        FROM Cars inner join Seller ON Cars.S_ID = Seller.pk_link
                        WHERE SUBSTRING_INDEX(S_Name, ' ', 1) = "${firstName}"                         
                        `
            if(lastName){
                query = query + `AND SUBSTRING_INDEX(S_Name, ' ', -1) = "${lastName}"`
            }    
            query = query + `GROUP BY Cars.S_ID, Cars.Ad_id 
                            ORDER BY COUNT(*) DESC LIMIT 5  `
        }else{
            query = `SELECT Cars.S_ID , Cars.Ad_id
                        FROM Cars inner join Seller ON Cars.S_ID = Seller.pk_link
                        WHERE SUBSTRING_INDEX(S_Name, ' ', -1) = "${lastName}"                         
                        `
                        query = query + `GROUP BY Cars.S_ID, 
                        ORDER BY COUNT(*) DESC LIMIT 5  `
        }
        
        pool.query(query, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            // console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})


router.get('/top-5-areas-sortby-carscount', (req, res) => {
    try{    
        let query = `SELECT Location, COUNT(*) as carsCountForLocation
                    FROM Cars
                    GROUP BY Location
                    ORDER BY COUNT(*) DESC LIMIT 5
                    `
        pool.query(query, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            // console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.get('/top-5-Sellers-sortby-carscount', (req, res) => {
    try{    
        let query = `SELECT S_Name, COUNT(*) as carsCountForSeller, AVG(Car_price) as Averageprice
                    FROM Cars inner join Seller ON Cars.S_ID = Seller.pk_link
                    GROUP BY Cars.S_ID
                    ORDER BY COUNT(*) DESC LIMIT 5
                    `
        pool.query(query, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            // console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

// router.get('/top-5-Sellers-sortby-carscount', (req, res) => {
//     try{    
//         let query = `SELECT S_Name, COUNT(*) as carsCountForSeller, AVG(Car_price) as Averageprice
//                     FROM Cars inner join Seller ON Cars.S_ID = Seller.pk_link
//                     GROUP BY Cars.S_ID
//                     ORDER BY COUNT(*) DESC LIMIT 5
//                     `
//         pool.query(query, function(err, rows, fields) {
//             // Connection is automatically released when query resolves
//             // console.log(rows)   
//             res.send(rows)
//         })
//     }
//     catch(err){
//         //console.log(err)
//         res.status(500).send(err)
//     }
    
// })

router.post('/register-user', (req, res) => {
    try{                
        pool.query(
            `SELECT U_ID 
            FROM User
            ORDER BY U_ID DESC LIMIT 1`
            , function(err, rows, fields) {
                // Connection is automatically released when query resolves
                if(err)
                    console.log(err)
                else{
                    //console.log(rows)
                    const id = rows[0].U_ID+1
                    const username=req.body.username
                    const email=req.body.email
                    const gender=req.body.gender
                    const BOD = req.body.birthDate
                    // const age = req.body.age
                    const age = '20'
                    pool.query(`
                    INSERT INTO User (U_ID, U_Name,U_Email,gender,birthdate, age)
                    VALUES ("${id}", "${username}","${email}", '${gender}','${BOD}','${age}' ) 
                    `, function(err, rows2, fields) {
                        // Connection is automatically released when query resolves
                        if(err)
                            console.log(err)
                        else{
                            //console.log(rows)
                            res.send(rows2)
                        }
                    })
                }
            })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.get('/getallusers', (req, res) => {
    try{    
            
        pool.query('SELECT * FROM User', function(err, rows, fields) {
            // Connection is automatically released when query resolves
            console.log(rows[0].U_ID)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})
  
router.get('/getallcars', (req, res) => {
    try{    
            
        pool.query('SELECT * FROM Cars', function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err)
                console.log(err)
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.get('/getallsellers', (req, res) => {
    try{    
            
        pool.query('SELECT * FROM Seller', function(err, rows, fields) {
            // Connection is automatically released when query resolves
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})


module.exports = router;


