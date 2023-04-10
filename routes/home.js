const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.render('index',{app_title:'loan status',para_msg:'dfcu loan status'});
});

module.exports = router;