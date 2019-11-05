//@ts-check
const { Router } = require('express')
const router = Router()
var debug = require('debug')('sn-project:server');
import Auth from './model.auth'
const model = Auth

router.get('/', function(req, res) {
    let count = req.query.count | 10
    return model.find({}).limit(count).then((docs) =>{
        return res.json(docs);
    }).catch((err)=>{
        return res.status(err.status | 500).send(err.message)
    })
})
router.post('/', function(req, res) {
    function insert(){
        if(Array.isArray(req.body)){
            return model.insertMany(req.body).then((doc) =>{
                return res.json(doc);
            })
        }else{
            let arr = []
            arr.push(req.body)
            return model.insertMany(arr).then((doc) =>{
                return res.json(doc);
            })
        }
    }
    return insert().catch((err)=>{
        return res.status(err.status | 500).send(err.message)
    })

})
router.put('/:id', function(req, res) {
    return model.updateOne({id:req.params.id}, req.body).then((val) =>{
        return res.json(val);
    }).catch((err)=>{
        return res.status(err.status | 500).send(err.message)
    })
})
router.delete('/:id', function(req, res) {
    return model.deleteOne({id:req.params.id}).then((val) =>{
        return res.json(val)
    }).catch((err)=>{
        return res.status(err.status | 500).send(err.message)
    })
})

export default router
