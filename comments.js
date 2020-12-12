const express = require('express')
const { v4: uuid } = require('uuid')
const { ROLES } = require('./data')
const router = express.Router()

let comments = [
    {
        id:uuid(),
        username: 'use1',
        comment: 'sup ppl'
    },
    {
        id:uuid(),
        username: 'use2',
        comment: 'sup use1'
    },
    {
        id: uuid(),
        username: 'use3',
        comment: 'sup guys'
    }
]

// function log(req, res, next){
//     console.log('requesting comment starting page')
//     next()
// }

router.get('/',(req, res)=>{
    req.idk = ROLES
    // console.log(req)
    console.log(req.username)
    console.log(req.idk)
    res.render('comments/index', {comments})
})

router.get('/new',(req, res)=>{
    res.render('comments/new')
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const newComment = req.body.newcomment
    const updateComment = comments.find(c => c.id === id)
    updateComment.comment =  newComment
    res.redirect('/comments')
})

router.get('/:id/edit', (req, res) => {
    const{id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', {comment})
})

router.post('/',(req, res) =>{
    const { username, comment } = req.body
    // console.log(req.body)
    comments.push({id: uuid(), username, comment})
    res.redirect('/comments')
})

router.delete('/:id',(req, res)=>{
    const {id} = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')

})
module.exports = router


