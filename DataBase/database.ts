import mongoose from 'mongoose'

const url = 'mongodb+srv://User1:123@cluster1.rpqa3ja.mongodb.net/'
export const db = ()=>[
    mongoose.connect(url,{}).then(()=>{
        console.log("Connected to mongo")
    }).catch((err)=>{
    console.log(err)    
    })
]