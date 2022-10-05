const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
        email: {
            type:String,
            required:true,
            unique:true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email.'],
        },
        joined: { type: Date, default: Date.now }
    },
    {
        toJSON: {
        virtuals: true,
        }
    }
);


const User = model('user', userSchema);

module.exports=User;