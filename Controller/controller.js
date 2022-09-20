const rationModel= require("../Model/ration");
const addFood = async (req, res) => {
  try {
    let foodDetails = req.body;
    foodDetails.packetType='food'
    let packetId = foodDetails.packetId;
    let packetContent = foodDetails.packetContent;
    let expiryDate = foodDetails.expiryDate;
    let calories = parseInt(foodDetails.calories);
    let dateArr = expiryDate.split("/");
    expiryDate = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    let data = await rationModel.create(foodDetails);
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
};
const addWater = async (req, res) => {
  try {
    let waterDetails = req.body;
    waterDetails.packetType='water'
    let packetId = waterDetails.packetId;
    let quantityInLiters = parseInt(waterDetails.quantityInLiters);
    let data = await rationModel.create(waterDetails);
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
};
const homePage = async (req,res)=>{
    let inventory = await rationModel.find({isDeleted:false})
    res.render('index', { title: 'RATION SYSTEM' ,supplies:inventory});
}
const deletePacket = async (req,res)=>{
    let productId =req.params.productId
    await rationModel.deleteOne({_id:productId})
    res.redirect('/')
}












module.exports = {
  addFood,
  addWater,
  homePage,
  deletePacket
};
