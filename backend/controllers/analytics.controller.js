import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); //data for last 7 days

    const dailySalesData = await getDailySalesData(startDate, endDate);
    res.json({
        analyticsData,
        dailySalesData
    })
  } catch (error) {
    console.log("Error in getAnalytics controller", error.message);
    res.status(500).send({ error: error.message });
  }
};

async function getAnalyticsData() {
  try {
    const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, //it groups all the documents(orders) together
        totalSales: { $sum: 1 }, //it will count the number of orders
        totalRevenue: { $sum: "$totalAmount" }, //it will sum the totalAmount of all the orders
      },
    },
  ]);
  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };
  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
  } catch (error) {
    console.log("Error in getAnalyticsData function", error.message);
  }
}

async function getDailySalesData(startDate, endDate) {
 try {
     const dailySalesData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, //it will group the orders by date
        sales: { $sum: 1 }, //it will count the number of orders
        revenue: { $sum: "$totalAmount" }, //it will sum the totalAmount of all the orders
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const dateArray = getDatesInRange(startDate,endDate)
  
  return dateArray.map(date=>{
    const foundData = dailySalesData.find(item=>item._id===date);
    return{
        name:date,
        sales:foundData?.sales || 0,
        revenue:foundData?.revenue || 0
    }
  })

 } catch (error) {
    console.log("Error in getDailySalesData function", error.message);
 }
}


function getDatesInRange(startDate,endDate){
   try {
     const dates = []
    let currentDate = new Date(startDate)
    while(currentDate<=endDate){
        dates.push(currentDate.toISOString().split('T')[0])
        currentDate.setDate(currentDate.getDate()+1)
    }
    return dates
   } catch (error) {
    console.log("Error in getDatesInRange function", error.message);
   }
}