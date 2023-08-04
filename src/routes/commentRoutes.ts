import express from 'express'
import commentCtrl from '../controller/commentCtrl'
import auth from '../middleware/auth'

const router = express.Router();

router.post('/comment', auth, commentCtrl.createComment)

router.get('/comments/project/:id', commentCtrl.getComments)

router.post('/reply_comment', auth, commentCtrl.replyComment)

router.patch('/comment/:id', auth, commentCtrl.updateComment)

router.delete('/comment/:id', auth, commentCtrl.deleteComment)

export default router