const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProdectNew = new Schema({
    title: {type:String , required:[true,'Cant be Empty in Title']},
    description: {type:String , required:[true,'Cant be Empty in Pescription']},
    price: {type:Number , required:[true,'Cant be Empty in Price']},
    discountPercentage:{type:Number , required:[true,'Cant be Empty in DiscountPercentage']},
    rating: {type:Number , required:[true,'Cant be Empty in Rating']},
    stock: {type:Number , required:[true,'Cant be Empty in Stock']},
    brand: {type:String , required:[true,'Cant be Empty in Drand']},
    category: {type:String , required:[true,'Cant be Empty in Category']},
    avatar:String,
    gallery:Array 
}) 
const Article = mongoose.model('article',ProdectNew) 
module.exports=Article



