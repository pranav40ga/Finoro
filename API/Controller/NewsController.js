import express from "express";
import axios from "axios";
export const News=async(req,res)=>{
    try{
         const rssUrl = 'https://www.moneycontrol.com/rss/MCtopnews.xml';
         const response = await axios.get(rssUrl);
    res.send(response.data); 

    }catch(err){
        res.status(500).json({"error":"Internal Server Error"});
    }
};
