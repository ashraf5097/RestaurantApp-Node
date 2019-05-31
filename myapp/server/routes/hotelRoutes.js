const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {

      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {

    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });




// import * as hotelController from '../controller/hotelController';
/* GET home page. */

const hotelController = require('../controller/hotelController');
router.post('/addHotel',hotelController.postHotelList);

router.get('/', function(req, res, next) {res.render('index', { title: 'Express' });});

router.get('/checkUUID', hotelController.getListOfHotel);
router.get('/displayHotelList', hotelController.getListOfHotel1);

// router.get('/searchHotelByName', hotelController.getCheckUUID);

router.get('/displayHotelLocation', hotelController.getListOfLocation);

router.get('/searchHotelByName', hotelController.getSearchedHotel);

router.post('/addFood', hotelController.postFoodList);

router.get('/displayHotelListWithoutFood',hotelController.getListOfHotelWithoutfood);

router.get('/displayHotelFoodList', hotelController.getListOfHotelfood);


module.exports = router;
