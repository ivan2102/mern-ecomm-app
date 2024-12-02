import bcrypt from "bcryptjs";

const users = [

    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('789101', 10),
        isAdmin: true
    },

    {
        name: 'Michael Oliver',
        email: 'michael.oliver@gmail.com',
        password: bcrypt.hashSync('789101', 10),
        isAdmin: false
    },

    {
        name: 'John Smith',
        email: 'john.smith@gmail.com',
        password: bcrypt.hashSync('789101', 10),
        isAdmin: false
    },
]

export default users;