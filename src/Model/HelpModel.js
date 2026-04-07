import mongoose from "mongoose";

// 1 create Schema
const helpSchema = new mongoose.Schema({
    Key: {
        type: String,
        required: true,
    },
    Value: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
        enum: ["IT", "Billing", "General", "HR", "Facilities"],

        default: "General"
    },
}, 
{ timestamps: true }
);

const Help = mongoose.model("Help", helpSchema);

export default Help;
