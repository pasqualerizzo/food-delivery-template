const router = require('express').Router();
const admin = require('firebase-admin')

router.get('/', (req, res) => {
    return res.send('Inside the user router')
});

router.get("/jwtVerification", async (req, res) => {
    if (!req.headers.authorization){
        return res.status(500).send({ msg: "Token Non Trovato"});
    }


    const token = req.headers.authorization.split(" ")[1];
    try {
       const decodedValue = await admin.auth().verifyIdToken(token);
       if(!decodedValue) {
        return res
        .status(500)
        .json({ success: false, msg: 'Accesso non autorizzato'});
       }
       return res
       .status(200)
       .json({success : true, data: decodedValue});
    }
    catch(err){
        return res.send({
            success : false, 
            msg : `Errore nell'estrazione del token : ${err}`
        });
    }

});

module.exports = router