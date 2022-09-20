const rationModel = require("../Model/ration");
const addFood = async (req, res) => {
  try {
    let foodDetails = req.body;
    foodDetails.packetType = "food";
    let packetId = foodDetails.packetId;
    let packetContent = foodDetails.packetContent;
    let expiryDate = foodDetails.expiryDate;
    let calories = parseInt(foodDetails.calories);
    let dateArr = expiryDate.split("/");
    expiryDate = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    let data = await rationModel.create(foodDetails);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
const addWater = async (req, res) => {
  try {
    let waterDetails = req.body;
    waterDetails.packetType = "water";
    let packetId = waterDetails.packetId;
    let quantityInLiters = parseInt(waterDetails.quantityInLiters);
    let data = await rationModel.create(waterDetails);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
const deletePacket = async (req, res) => {
  let productId = req.params.productId;
  await rationModel.updateOne(
    { _id: productId },
    { $set: { isDeleted: true } }
  );
  res.redirect("/");
};

const homePage = async (req, res) => {
  // initially all default empty array
  let supplies = [];
  let waterLimit = 2;
  let waterArr = [];

  let foodLimit = 2500;
  let foodArr = [];

  let displayDate = "";
  let dateObj = new Date();
  let outputArr = [];
  //   do {
  let date =
    dateObj.getFullYear() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getDate();
  displayDate =
    dateObj.getDate() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getFullYear();

  try {
    supplies = await rationModel.find({ isDeleted: false });
  } catch (error) {
    console.log("Unable to fetch API");
  }

  for (let sup of supplies) {
    if (sup.packetType == "food") foodArr.push(sup);
    else waterArr.push(sup);
  }

  waterArr.sort((a, b) => a.quantityInLiters - b.quantityInLiters);
  foodArr.sort((a, b) => a.expiryDate - b.expiryDate);

  let currentIndex = 0;
  let dailySupplies = [];
  while (currentIndex < waterArr.length) {
    if (waterArr[currentIndex]) {
      if (waterArr[currentIndex].quantityInLiters === 1) {
        // we need atleast two one liter to survive
        if (waterArr.length > currentIndex + 1) {
          dailySupplies.push({
            waters: [waterArr[currentIndex], waterArr[currentIndex + 1]],
            foods: [],
            isOk: false,
          });
          currentIndex += 2;
        }
        currentIndex += 1;
      } else {
        dailySupplies.push({
          waters: [waterArr[currentIndex]],
          foods: [],
          isOk: false,
        });
        currentIndex += 1;
      }
    }
  }

  currentIndex = 0;
  let surviveDays = 0;
  let finalResult = [];
  date = new Date();
  for (let daily of dailySupplies) {
    let limit = 0;
    while (currentIndex < foodArr.length && limit < foodLimit) {
      // console.log(date.toISOString().slice(0,10) > JSON.stringify(foodArr[currentIndex].expiryDate).slice(1,11));
      if (
        date.toISOString().slice(0, 10) >
        JSON.stringify(foodArr[currentIndex].expiryDate).slice(1, 11)
      ) {
        currentIndex++;
      } else {
        daily.foods.push(foodArr[currentIndex]);
        limit += foodArr[currentIndex].calories;
        if (limit >= foodLimit) {
          daily.isOk = true;
          daily["date"] = date.toLocaleDateString();
          date.setDate(date.getDate() + 1);
          finalResult.push(daily);
        }
        currentIndex++;
      }
    }
  }

  surviveDays = finalResult.length;

  // console.log("final datas : ", supplies, finalResult, dailySupplies, surviveDays);
  if (typeof req.query.api != "undefined" && req.query.api == 1) {
    res.json({ supplies, output: outputArr });
  } else {
    // res.send(dailySupplies)
    res.render("index", {
      title: "The Martian - Rationing System",
      supplies,
      output: finalResult,
      surviveDays,
    });
  }
  //   let inventory = await rationModel.find({ isDeleted: false });
  //   res.render("index", { title: "RATION SYSTEM", supplies: inventory });
};

module.exports = {
  addFood,
  addWater,
  homePage,
  deletePacket,
};
