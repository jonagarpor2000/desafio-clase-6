import express from 'express'
import ProductManager  from './ProductManager.js'
import {__dirname} from './utils.js'
const expressport = 8080
const app = express()

const path_products = __dirname+'/file/products.json'
const pmg = new ProductManager(path_products)


app.get('/', (req, res) => {
    res.send({status:'success',payload: 'Hola mundo'})
    console.log('bienvenido')
})


app.get('/products', async (req, res) => {
    const readprods = await pmg.getProducts()
    let limit  = parseInt(req.query.limit)
    if(!limit) return res.send({status:'success',payload: readprods})
    let trimmedprods = readprods.slice(0,limit)
    res.send({status:'success',payload: trimmedprods})
})

app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params
    let id = parseInt(pid)
    const readprods = await pmg.getProductById(id)
    res.send({status:'success',payload: readprods})
})

app.listen(expressport,(error)=>{
    if(error) return console.log(error)
    console.log(`Servidor escuchando en el puerto ${expressport}`)
})
