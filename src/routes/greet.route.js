const router = require('express').Router();

router.get('/', async (req, res) => {
    res.status(200).json({ message: 'Gracias por usar mi API. Para mas servicios comunicarse a mi email: ekiolivier@gmail.com' });
});


module.exports = router;