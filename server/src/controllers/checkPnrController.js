const express = require("express");
const railkit = require("railkit");
require("dotenv").config();

const checkPnrStatus = async(req,res)=>{
    try {
        railkit.configure(process.env.API_KEY);
        const pnr = req.params.pnr;
        // console.log(pnr);
        if(pnr === "" || !pnr){
            return res.status(400).json({
                status:false,
                message:"PNR required!"
            });
        }

        const result = await railkit.checkPNRStatus(pnr);
        // const result = await railkit.getTrainInfo(pnr);

        // console.log(result);
        if(!result.success){
            return res.status(400).json({
                status:false,
                message:result.error
            });
        }

        res.status(200).json({
            status:true,
            message:"successfully getting status!",
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

module.exports = checkPnrStatus;