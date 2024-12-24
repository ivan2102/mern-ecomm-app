import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {

       generateToken(res, user._id)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {

        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})

const register = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {

        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({ name, email, password })

    if (user) {

        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {

        res.status(400)
        throw new Error('Something went wrong! Please try again!')
    } 
})

const logout = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {

        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'Logout successfully!' })
})

const userProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {

      res.status(404);
      throw new Error('User not found')
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {

            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.status(200).json({

            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {

        res.status(404)
        throw new Error('User not found')
    }

   
})

const getUsers = asyncHandler(async (req, res) => {

    res.send('users')
})

const deleteUser = asyncHandler(async (req, res) => {

    res.send('delete user')
})

const getUserById = asyncHandler(async (req, res) => {

    res.send('get user id')
})

const updateUser = asyncHandler(async (req, res) => {

    res.send('update user')
})

export {

    login,
    register,
    logout,
    userProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}
