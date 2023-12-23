import express from 'express';
import mongoose from 'mongoose';


const app = express()



app.listen(8000, () => {
    console.log("Server running on PORT 8000");
})