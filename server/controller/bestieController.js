const db = require("../config/db")

//GET Function
const getBestie=async (req,res) =>{
 try {
    const data = await db.query('SELECT * FROM besties')
    res.status(200).json(data)
    if (!data){
        return res.status(404).send({success:"false",message:"No data found" })
    }
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:"false",
        message: "GET Method Error",

    })
 }
}//GET:id Function
const getBestieById=async (req,res) =>{
    try {
       const bestieid=req.params.id 
       if( bestieid){
        return res.status(404).send({success:"false",message:"No id found" })
       }
       const data = await db.query('SELECT * FROM bestie WHERE id=?', [bestieid])
       res.status(200).send({
        success:"true",
     bestieDetails:data
       })
       if(!data){
        return res.status(404).send({success:"false",message:"No data found" })
       }
    } catch (error) {
        console.log(error)
    res.status(500).send({
        success:"false",
        message: "GET By Id Method Error",

    })
    }
}
const createBestie = async(req,res)=>{
try {
    const{name,gender,role,description}=req.body
    if(!name||!gender||!description||!role){
        return res.status(400).send({success:"false",message:"Please fill all the fields"})
    }
    if (gender=="male") {
        img_url =`https://avatar.iran.liara.run/public/boy?username=${name}`
        
    }
    else if(gender=="female"){
     img_url =`https://avatar.iran.liara.run/public/girl?username=${name}`

    }
    else{
        img_url="none"
    }

    const data = await db.query('INSERT INTO besties(name,gender,role,description,imgUrl) VALUES(? ,?, ?,?)',[name,gender,role,description,img_url])
   
    if(!data){
        return res.status(404).send({success:"false",message:"No data found" })
    } 
    res.status(200).send({success:"true",message:"Bestie created successfully",data})
} catch (error) {
    res.status(500).send({
        success:"false",
        message: "Error Creating Ref",

    })
}
}
const updateBestie = async(req,res)=>{
    try {
        const bestieid=req.params.id 
        if(!bestieid){
            return res.status(404).send({success:"false",message:"No id found" })
           }

        const{name,role,description}=req.body
        if(!name||!description||!role){
            return res.status(400).send({success:"false",message:"Please fill all the fields"})
        }
        const data = await db.query('UPDATE besties SET name=?, role=?, description=? WHERE id =?',[name,role,description,bestieid])
        if(!data){
            return res.status(404).send({success:"false",message:"No data found" })
            }
            res.status(200).send({success:"true",message:"Bestie updated successfully",data})
        
    } catch (error) {
        res.status(500).send({
            success:"false",
            message: "Error Updating Bestie",
    
        })
    }
}
const deleteBestie = async(req,res)=>{
    try {
        const bestieid=req.params.id 
        if(!bestieid){
            return res.status(404).send({success:"false",message:"No id found" })
           }
           const data = await db.query('DELETE FROM besties WHERE id =?',[bestieid])
           if(!data){
            return res.status(404).send({success:"false",message:"No data found" })
            }
            res.status(200).send({success:"true",message:"Bestie deleted successfully",data})
        
    } catch (error) {
        res.status(500).send({
            success:"false",
            message: "Error Deleting  Bestie",
    
        })
    }
}
const deleteAllBestie = async(req,res)=>{
    try {
        const data = await db.query('DELETE FROM besties')
        if(!data){
            return res.status(404).send({success:"false",message:"No data found" })
            }
            res.status(200).send({success:"true",message:"Bestie deleted successfully",data})
        
    } catch (error) {
        res.status(500).send({
            success:"false",
            message: "Error Deleting All Besties",
    
        })
    }
}

module.exports={getBestie,getBestieById,createBestie,updateBestie,deleteBestie,deleteAllBestie}

//POST Function,