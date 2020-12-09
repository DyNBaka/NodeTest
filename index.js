const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const { v4: uuid } = require('uuid')
const commentRoute = require('./comments.js')


app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))


function log(req, res, next){
    console.log('LOGGING on home page')
    next()
}


app.get('/',log,(req, res)=>{
    res.render('start', { home: 'HOME PAGE'})
})

app.use('/comments', commentRoute)

app.post('/form',(req, res)=>{
    let {meat, qty} = req.body
    const msg = `You ordered ${qty} of ${meat}`
    res.render('form', {msg})
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})



// let comments = [
//     {
//         id:uuid(),
//         username: 'use1',
//         comment: 'sup ppl'
//     },
//     {
//         id:uuid(),
//         username: 'use2',
//         comment: 'sup use1'
//     },
//     {
//         id: uuid(),
//         username: 'use3',
//         comment: 'sup guys'
//     }
// ]


// app.get('/comments',(req, res)=>{
//     res.render('comments/index', {comments})
// })

// app.get('/comments/new',(req, res)=>{
//     res.render('comments/new')
// })

// app.get('/comments/:id', (req, res) => {
//     const { id } = req.params
//     const comment = comments.find(c => c.id === id)
//     res.render('comments/show', {comment})
// })

// app.patch('/comments/:id', (req, res) => {
//     const { id } = req.params
//     const newComment = req.body.newcomment
//     const updateComment = comments.find(c => c.id === id)
//     updateComment.comment =  newComment
//     res.redirect('/comments')
// })


// app.get('/comments/:id/edit', (req, res) => {
//     const{id} = req.params
//     const comment = comments.find(c => c.id === id)
//     res.render('comments/edit', {comment})
// })

// app.post('/comments',(req, res) =>{
//     const { username, comment } = req.body
//     comments.push({id: uuid(), username, comment})
//     res.redirect('/comments')
// })

// app.delete('/comments/:id',(req, res)=>{
//     const {id} = req.params
//     comments = comments.filter(c => c.id !== id)
//     res.redirect('/comments')

// })

