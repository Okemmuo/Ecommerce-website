const asyncHandler = require("express-async-handler");
const bcrypt =require("bcrypt")
const User=require("../Schema/User")
    
const Example = asyncHandler(async (req, res) =>{
    const {title,body}=req.body
    try {
       
    } catch (error) { }
});
const CreateNewUser = asyncHandler(async (req, res) =>{
    const {name, username, email, phone, password}=req.body
    try {
        const userExist = await User.findOne({
            username, email
        });
        if (userExist) {
            res.status(506).json({
                message: "User already Exist",
            });
        }
       const create =await User.create({
        name,
        username,
        email,
        phone,
        password,

       });
       res.status(200).json({message: "Post succesful", create});
    } catch (error) {
        res.status(401).json({
            message: "Unable to create post",
            error,
        });
     }
});

const Login = asyncHandler(async (req, res) =>{
    const { username, password}=req.body;
    try {
        const loginUser = await User.findOne({
            username,
        });
        if (!loginUser) {
            res.status(709).json({
                message: "No Username found",
            });
        }

    const passwordMatch = await bcrypt.compare
    (password, loginUser.password);
    if (!passwordMatch) {
        res.status(890).json({
            message: "Wrong password"
        });
    }
    res.status(200).json({
        message: "Login succesful",
        loginUser,
    });
       
    } catch (error) { 
        res.status(401).json({
            message: "Invalid User",
            error,
        });
    }
});

const getAllUsers =asyncHandler(async(req, res)=>{
    const getUsers =await User.find().sort({createdAt: -1});
    res.status(200).json(getUsers);
});

const getSingleUser = asyncHandler(async (req, res) =>{
    const{id} = req.params;
    try{
        const dorcas = await
        User.findById(id);
        res.status(200).json({
            message: "successful",
            dorcas,
        });
    } catch (error) {
        res.status(401).json({
            message: "error",
        });
    }
});

const getSingleUserByusername = asyncHandler(async (req, res) =>{
    const{username} = req.params;
    try{
        const dorcas = await
        User.findOne({username});
        res.status(200).json({
            message: "successful",
            dorcas,
        });
    } catch (error) {
        res.status(401).json({
            message: "error",
        });
    }
});
const UpdateUser = asyncHandler(async (req, res)=> {

    const {id} =req.params;// where to pass ur parameters and request.body
    const {name, username,email, phone, address, company, website } = req.body;
    try {
        const updateData = await User.findById(id);
        if (!updateData) {
            res.status (404).json({
                message: "User not Found"
            });
        }
        updateData.name = name || updateData.name;
        updateData.username = username|| updateData.username;
        updateData.phone = phone|| updateData.phone;
        updateData.address = address|| updateData.address;
        updateData.company = company|| updateData.company;
        updateData.website = website|| updateData.website;
        updateData.email = email|| updateData.email;
        await updateData.save();
        res.status(200).json({
            message: "update successful",
            updateData,
        });
            }catch (error){
                res.status(406).json({
                    message: "unable to upDate",
                    error,
                });
        
            }
        });

        const UpdateUserPassword = asyncHandler(async (req, res)=> {

            const {id} =req.params;// where to pass ur parameters and request.body
            const {password} = req.body;
            try {
                const updateData = await User.findById(id);
                if (!updateData) {
                    res.status (404).json({
                        message: "User not Found"
                    });
                }
                updateData.password = password || updateData.password;
                await updateData.save();
                res.status(200).json({
                    message: "update successful",
                    updateData,
                });
                    }catch (error){
                        res.status(404).json({
                            message: "unable to upDate",
                            error,
                        });
                
                    }
                });


module.exports = { CreateNewUser,
     Login, getAllUsers, getSingleUser, getSingleUserByusername, UpdateUser, UpdateUserPassword};



