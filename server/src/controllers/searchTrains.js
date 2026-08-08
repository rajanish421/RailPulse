const express = require("express");
const railkit = require("railkit");
require("dotenv").config();



const searchTrainBtwStations = async(req,res)=>{
    try {
        railkit.configure(process.env.API_KEY);
        const fromSTNCode = req.params.fromSTNCode;
        const toSTNCode = req.params.toSTNCode;
        const date = req.params.date;

        // console.log(typeof hours);//
        
        console.log(date);


        if(fromSTNCode === "" || !fromSTNCode){
            return res.status(400).json({
                status:false,
                message:"ffromSTNCode required!"
            });
        }

        if(toSTNCode === "" || !toSTNCode){
            return res.status(400).json({
                status:false,
                message:"toSTNCode required!"
            });
        }



        const result = await railkit.searchTrainBetweenStations(fromSTNCode,toSTNCode,date);
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

module.exports = searchTrainBtwStations;