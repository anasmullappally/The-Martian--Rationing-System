const { food, water } = require("../Model/ration");
const addFood = async (req, res) => {
  try {
    console.log(req.body);
    let foodDetails = req.body;
    let packetId = foodDetails.packetId;
    let packetContent = foodDetails.packetContent;
    let expiryDate = foodDetails.expiryDate;
    let calories = parseInt(foodDetails.calories);
    let dateArr = expiryDate.split("/");
    expiryDate = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    let data = await food.create(foodDetails);
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
};
const addWater = async (req, res) => {
  try {
    console.log(req.body);
    let waterDetails = req.body;
    let packetId = waterDetails.packetId;
    let quantityInLiters = parseInt(waterDetails.quantityInLiters);
    let data = await water.create(waterDetails);
    res.redirect('/')
  } catch (error) {
    console.log(error);

  }
};
const homePage = async (req,res)=>{
    let inventory = await food.find({isDeleted:false})
    console.log(inventory);
    res.render('index', { title: 'RATION SYSTEM' ,supplies:inventory});
}

module.exports = {
  addFood,
  addWater,
  homePage
};
