const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MachineSchema = Schema({
    Machine_name : {
        type: String,
        default:""
    }
});

const OrderFlowSchema = Schema({
    Order_Place :  {
        type : String,
        default :""
    },
    Confirmed : {
        type : String,
        default :""
    },
    Service_Call  :{
        type : String,
        default :""
    },
    Complete : {
        type : String,
        default :""
    },
    Payment : {
        type : String,
        default : ""
    }
})

const EnquirySchema = Schema({
    name : {
        type: String,
        default: "",
    },
    email:{
        type:String,
        default:""
    },
    state : {
        type : String,
        default : ""
    },
    alternative_phone : {
        type : String,
        default:""
    },
    contact:{
        type:String,
        default:""
    },
    dist : {
        type:String,
        default :""
    },
    taluka : {
        type :String,
        default : ""
    },
    village : {
        type : String,
        default: ""
    },
    country:{
        type : String,
        default :""
    },
    pincode:{
        type:String,
        default:""
    },
    machinery: {
        type: [MachineSchema],
        default:[]
    },
    ServiceCategory : {
        type:String,
        default : ""
    },
    ServiceSubCategory : {
        type : String,
        default : ""
    },
    EnquiryType : {
        type:String,
        enum:["Service","Product"]
    },
    Acre:{
        type:Number,
        default:0
    },
    Guntha :{
        type:Number,
        default:0
    },
    product_name : {
        type :String,
        default :""
    },
    description : {
        type :String,
        default :""
    },
    Order_Flow : OrderFlowSchema
},{ timestamps: true });


module.exports = mongoose.model("EnquirySupport", EnquirySchema);

