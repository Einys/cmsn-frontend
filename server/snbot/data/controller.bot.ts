//@ts-check
const { Router } = require('express')
const router = Router()
var debug = require('debug')('sn-project:server');
import Bot, * as bot from './model.bot'
const model = Bot


//오브젝트에서 모든 'secret' 필드(nested 필드까지)를 undefined처리해 반환하는 함수.
function hideSecret(obj){

    let o = typeof obj.toObject === 'function' ? obj.toObject() : obj

    if(typeof o !== 'object'){
        o = JSON.parse(o)
    }

    Object.keys(o).forEach(key => {
        if(key === 'secret'){
            obj[key] = undefined; //처리
        }else if(typeof obj[key] === 'object'){
            hideSecret(obj[key])
        }
    })

}

router.get('/', function(req, res) {
    let count = req.query.count | 10
    return model.find({}).limit(count).then((docs) =>{
        docs.forEach(doc =>{
            hideSecret(doc)
        })
        return res.json(docs);
    }).catch((err)=>{
        console.log(err)
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
