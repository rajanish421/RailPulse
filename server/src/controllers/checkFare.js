const express = require("express");
const railkit = require("railkit");
require("dotenv").config();



const checkFare = async(req,res)=>{
    try {
        railkit.configure(process.env.API_KEY);
        const fromSTNCode = req.params.fromSTNCode;
        const toSTNCode = req.params.toSTNCode;
        const date = req.params.date;
        const trainNo = req.params.trainNo;
        const quota = req.params.quota;
        const coach = req.params.coach;
        

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

        if(date === "" || !date){
            return res.status(400).json({
                status:false,
                message:"date required!"
            });
        }

         if(quota === "" || !quota){
            return res.status(400).json({
                status:false,
                message:"quota required!"
            });
        }

         

          if(coach === "" || !coach){
            return res.status(400).json({
                status:false,
                message:"coach required!"
            });
        }
        



        const result = await railkit.fareLookup(trainNo,fromSTNCode,toSTNCode,date,coach,quota);
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
            message:"successfully getting fare!",
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

module.exports = checkFare;