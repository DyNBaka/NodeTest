const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))


app.get('/',(req, res)=>{
    res.render('start', { home: 'HOME PAGE'})
})

const comments = [
    {
        username: 'use1',
        comment: 'sup ppl'
    },
    {
        username: 'use2',
        comment: 'sup use1'
    },
    {
        username: 'use3',
        comment: 'sup guys'
    }

]
app.get('/comments',(req, res)=>{
    res.render('comments/index', {comments})
})

app.post('/form',(req, res)=>{
    // const { query } = req.params
    let {meat, qty} = req.body
    const msg = `You ordered ${qty} of ${meat}`
    res.render('form', {msg})
})



app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})