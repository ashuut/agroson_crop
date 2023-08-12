const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = Schema({
    service_name : {
        type: String,
        default :""
    },
    rate : {
        type: String,
        default:""
    }
});

const MachineSchema = Schema({
    Machine_name : {
        type: String,
        default:""
    },
    rate : {
        type :String,
        default:""
    }
})

const VendorSchema = Schema({
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
    lat:{
            type: Number,
            default:0
    },
    long:{
        type: Number,
        default:0
    },
    services: {
        type : [ServiceSchema],
        default : []
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
    }
},{ timestamps: true });

module.exports = mongoose.model("Vendor", VendorSchema);

