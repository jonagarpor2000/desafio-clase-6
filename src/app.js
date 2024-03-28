import express from 'express'
import ProductManager  from './ProductManager.js'
const app = express()

const path_products = './file/products.json'
const pmg = new ProductManager(path_products)
let users = []

app.use(express.json)
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo</h1>')
})
app.get('/products', (req, res) => {
    let content
    read = async () => {
        content = await pmg.getProducts()
    }

    read()
    res.send(content)
    //res.send({status:'success',payload:pmg.getProducts()})
    //res.status(404).send("Coso")
})
//R
app.get('/api/users/', (req, res) => {
    res.send(users)
})

app.get('/api/users/:uid', (req, res) => {
    res.send('get user')
})

//C
app.post('/api/users/', (req, res) => {
    //puedo definirlo como objeto con const user = req.body
    const {first_name,last_name,email,password} = req.body
    const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        password
    }
    users.push(newUser)
    res.send('Hola soy servidoreitor')
})
//U
app.put('/api/users/:uid', (req, res) => {
    const {uid} = req.params.uid
    const userToUpdate = req.body
    const userIndex  = users.findIndex(user => user.id === parseInt(uid))
    if(userIndex===-1) return res.status(404).send({status:'error',error:'user not found'})
    users[userIndex] = userToUpdate
    res.send({status:'success',payload: userToUpdate})
})

//D
app.delete('/api/users/:uid', (req, res) => {
    const {uid} = req.params.uid
    const UserResult  = users.filter(user => user.id === parseInt(uid))
    if(UserResult===-1) return res.status(404).send({status:'error',error:'user not found'})
    res.send({status:'success',payload: UserResult})
})



app.listen(8080,(error)=>{
    if(error) return console.log(error)
    console.log('Servidor escuchando en el puerto 8080')
})