
const express = require('express');
const postRoutes = require('./posts/postRouter');
const userRoutes = require('./users/userRouter');
const server = express();


server.use(express.json())

server.get('/', (req, res)=>{
    res.json({
        message: "Welcome to my API :)"
    })
})

server.use('/api/posts/', postRoutes);
server.use('/api/users/', userRoutes)


const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

