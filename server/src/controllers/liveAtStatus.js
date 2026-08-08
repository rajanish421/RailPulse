const express = require("express");
const railkit = require("railkit");
require("dotenv").config();



const liveAtStation = async(req,res)=>{
    try {
        railkit.configure(process.env.API_KEY);
        const stationCode = req.params.stationCode;
        // const hours = req.params.hours;

        // console.log(typeof hours);//
        
        // console.log(pnr);
        if(stationCode === "" || !stationCode){
            return res.status(400).json({
                status:false,
                message:"trainNo required!"
            });
        }

    


        const result = await railkit.liveAtStation(stationCode);
        // const result = await railkit.liveAtStation(stationCode,4);


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
            message:"successfully getting station details!",
            result:result.data
        });

        // if(railkit.configure)
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"internal error " + error
        });
    }
};

module.exports = liveAtStation;