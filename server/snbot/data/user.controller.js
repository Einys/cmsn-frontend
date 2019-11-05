export {}

const User = require('./user.model');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:false }));
router.use(bodyParser.json());


// User 생성
router.post('/', function(req, res) {

    User.create( {
        id: req.body.id,
        name: req.body.name,
        email: 'test@test.com'

        },
        function(err, user) {
            if (err) return res.status(500).send("User 생성 실패.");
            res.status(200).send(user);
        });
});

// User 리스트 조회
router.get('/', function(req, res) {

    let count = req.params.count || 5;
    let skip = req.params.skip || 0;

   User.find().sort({ 'updatedAt': -1 }).skip(skip).limit(5).exec().then( users => {
        
        res.status(200).send(users);  

    }).catch(err =>{
        res.status(500).send("User 리스트 조회 실패.");
    })
    
});
// User 조회
router.get('/:id', function(req, res) {
    User.findOne({id: req.params.id}).populate('_items').then(function (user) {
        if (!user) return res.status(404).send("존재하지 않는 User 입니다.");
        res.status(200).send(user);
    }).catch(err =>{
        return res.status(500).send(err.message);
    });
});
// User 삭제
router.delete('/:id', function (req, res) {
    User.findOneAndRemove({id:req.params.id}, function (err, user) {
        if (err) return res.status(500).send("User 삭제 실패");
        res.status(200).send("User "+ user.name +" 삭제됨.");
    });
});
// User 수정
router.put('/:id', function (req, res) {    
    User.findOneAndUpdate({id:req.params.id}, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user);
    });
});
module.exports = router;