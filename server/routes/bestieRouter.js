const express = require('express');
const router = express.Router();
const {getBestie,getBestieById, createBestie, updateBestie, deleteBestie, deleteAllBestie}= require('../controller/bestieController'); // Import 


router.get('besties', getBestie);
router.get('besties/:id',getBestieById);
router.post('createbesties',createBestie);
router.patch('updatebesties/:id',updateBestie);
router.delete('deletebesties/:id',deleteBestie);
router.delete('deleteallbesties',deleteAllBestie);


module.exports=router