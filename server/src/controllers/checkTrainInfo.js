const express = require("express");
const railkit = require("railkit");
require("dotenv").config();



const checkTrainInfo = async(req,res)=>{
    try {
        railkit.configure(process.env.API_KEY);
        const trainNo = req.params.trainNo;
        // console.log(pnr);
        if(trainNo === "" || !trainNo){
            return res.status(400).json({
                status:false,
                message:"trainNo required!"
            });
        }

        const result = await railkit.getTrainInfo(trainNo);
        // const result = await railkit.getTrainInfo(pnr);

        // console.log(result);
        if(!result.success){
            return res.status(500).json({
                status:false,
                message:result.error
            });
        }

        console.log(result);

        res.status(200).json({
            status:true,
            message:"successfully getting train details!",
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

module.exports = checkTrainInfo;