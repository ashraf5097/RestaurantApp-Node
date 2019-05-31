let hotelModel = require('../models/hotelModel');
var request = require('request');

// const getListOfHotel = (req, res) => {
  
// };


const getListOfHotel1 = (req, res) => {
    hotelModel.all(req,function(err, hotelList){
        res.status(200)
        res.send(hotelList)
    });

};

const getListOfHotelWithoutfood = (req, res) => {
    hotelModel.all(req,function(err, ListOfHotelWithoutfood){
        res.send(ListOfHotelWithoutfood)
    });
};

const getListOfHotelfood = (req, res) => {

    hotelModel.listOfHotelfood(req, function(err, ListOfHotelfood){
        res.status(200)
        res.send(ListOfHotelfood)
    })
}

const getListOfLocation = (req, res) => {
    hotelModel.listOfLocation(req,function(err, ListOfLocation){
        res.send(ListOfLocation)
    });
};

const getSearchedHotel = (req, res) => {
    hotelModel.searchedHotel(req,function(err, hotelList){
        res.send(hotelList)
    });
};

const postHotelList = (req, res) => {
    hotelModel.addHotelList(req,function(err, hotelList){
        console.log("hotelList = ", hotelList);

        // res.sendStatus(200);
        res.send(hotelList);

    });
};

const postFoodList = (req, res) => {
    hotelModel.addFoodList(req,function(err, foodList){
        res.sendStatus(200);
    });
};

module.exports = {getListOfLocation, getListOfHotel, getSearchedHotel, postHotelList, getListOfHotelWithoutfood, postFoodList,getListOfHotelfood,getListOfHotel1 };
