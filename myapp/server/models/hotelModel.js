const path = require("path");
const multer = require("multer");

exports.all = function(req,listOfHotel) {
    
    let collection = getCollection(req);
    collection.find({},{},function(error,docs){
        listOfHotel(null,docs)
    });
}

exports.hotelWithoutFood = function(req,listOfHotel) {
    let collection = getCollection(req);
    collection.find({'foodlistcount':{$lt:1}},{},function(e,docs){
        listOfHotel(null,docs)
    });
}

exports.listOfHotelfood = function(req, listOfHotelFood) {
    let collection = getFoodCollection(req);
    collection.find({'hotelId':req.query.hotelId},{},function(e,docs){
        listOfHotelFood(null,docs)
    });
    collection.find({'hotelId':"hotelId"});
}

exports.searchedHotel = function(req,listOfHotel) {
    let collection = getCollection(req);
    let query = {"$or":[{name:req.query.name},{location:req.query.name}]}
    collection.find(query,{},function(e,docs){
        listOfHotel(null,docs)
    });
}

exports.listOfLocation = function(req,listOfLocation) {
    let collection = getCollection(req);
    collection.find({},{location:1},function(e,docs){
        listOfLocation(null,docs)
    });
}

exports.addHotelList = function(req,addedList) {
    console.log("In model",req.body);

    // upload(req, res, (err) => {
    //     console.log("Request ---", req.body);
    //     console.log("Request file ---", req.file);//Here you get file.
    //     /*Now do where ever you want to do*/
    //     if(!err)
    //        return res.send(200).end();
    //  });
    
    let collection = getCollection(req);
    collection.insert(req.body,function(e,docs){
        console.log("e = ", e,docs);
        
        addedList(e,docs)
    });
}

exports.addFoodList = function(req,addedList) {
    let collection = getCollection(req);
    let foodcollection = getFoodCollection(req);
    console.log(req.query)

    let hotelIdQuery = {_id:req.query.id} ;
    let foodlistcountIncrQuery = {$inc:{foodlistcount:1}}

    collection.update(hotelIdQuery,foodlistcountIncrQuery);
    foodcollection.insert(req.body);
}


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      console.log("file = ", file);
      
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
      console.log(file);
      console.log('req = ',req);
      
      
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  function upload (req,res) {
      console.log('re1 = ', req);
      
    multer({
        storage: storage,
        limits: {
        fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });
}

//   const Product = require("../models/product");

function getCollection (req) {
    let db = req.db;
    let collection = db.get('hotelcollection');
    return collection;
}

function getFoodCollection (req) {
    let db = req.db;
    let collection = db.get('foodcollection');
    return collection;
}