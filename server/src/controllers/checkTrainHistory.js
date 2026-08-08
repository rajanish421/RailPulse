const express = require("express");
const railkit = require("railkit");
require("dotenv").config();



const checkTrainHistory = async(req,res)=>{
    try {
        railkit.configure(process.env.API_KEY);
        const trainNo = req.params.trainNo;
        let date = req.params.date;
        
        // console.log(pnr);
        if(trainNo === "" || !trainNo){
            return res.status(400).json({
                status:false,
                message:"trainNo required!"
            });
        }

    

        if (!date) {
            const today = new Date();

            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const year = String(today.getFullYear()).slice(-2);

            date = `${day}-${month}-${year}`;
        }

        console.log(date);

        const result = await railkit.trackTrain(trainNo,date);

        console.log(result);
        if(!result.success){
            return res.status(500).json({
                status:false,
                message:result.error
            });
        }

        // console.log(result);

        res.status(200).json({
            status:true,
            message:"successfully getting train history!",
            result:result.data
        });

        // if(railkit.configure)
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"internal error"
        });
    }
};

module.exports = checkTrainHistory;