const express = require('express')
const router = express.Router();
const db = require('../model/db');

router.get("/",function(req,res){
    res.render('main',{title :'리뷰'});
})

router.get("/login",function(req,res){
    res.render('login',{title :'로그인'});
})

router.get("/createaccount",function(req,res){
    res.render('createAccount',{title :'회원가입'});
})


router.post("/review/create", function(req,res){
    let movie_id = req.body.movie_id;
    let review = req.body.review;   

    if(movie_id == '' || movie_id == 0){
        res.send({success:400})
    }else{
    db.reviews.create({
        movie_id:movie_id,
        review:review
    }).then(function(result){
        res.send({succes:200})
    })
}
})

router.get("/review/read",function(req,res){
    let movie_id = req.query.movie_id;

    db.reviews.findAll({where:{movie_id:movie_id}}).then(function(result){
        res.send({success:200, data:result})
    })
})


router.post('/signup', async (req, res) => {
    try {
        let user_id = req.body.user_id;
        let name = req.body.name;   
        let birthdate = req.body.birthdate;
        let password = req.body.password;    
      
        const existingUser = await db.users.findOne({ where: { user_id: user_id } });

        if (existingUser) {
            console.error(error);
            res.status(400).json({ success: false, error: '회원가입 실패 : 중복된 ID 사용' });
        } else {
            await db.users.create({
                user_id: user_id,
                name: name,
                birthdate: birthdate,
                password: password
            });

            res.status(201).json({ success: true, data: name });
        }
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: '회원가입 실패' });
    }
});

router.post('/login', async (req, res) => {
    const { user_id, password } = req.body;

    try {
        const user = await db.users.findOne({ where: { user_id: user_id } });

        if (user && user.password === password) {
            const { name } = user;
            res.status(200).json({ success: true, data: { name: name } });
        } else {
            res.status(401).json({ success: false, error: '로그인 실패. 아이디 또는 비밀번호가 올바르지 않습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: '서버 오류로 로그인에 실패했습니다.' });
    }
});




  

module.exports = router