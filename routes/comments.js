const express = require('express');
const router = express.Router();
const CommentService = require('../service/comment');
const Auth = require('../utils/authorize');

// ADD NEW COMMENT
router.post('/add', Auth.userRole,
  async function(req, res) {
    const result = await CommentService.createComment(req);
    res.status(result.body.statusCode).send({ comment : result });
  }
);

// UPDATE COMMENT
router.put('/update/(:id)', Auth.userRole,
  async function(req, res) {
    const result = await CommentService.updateComment(req);
    res.status(result.body.statusCode).send({ comment : result });
  }
);

// DELETE COMMENT
router.delete('/delete/(:id)', Auth.userRole,
  async  function(req, res) {
    const result = await CommentService.deleteComment(req);
    res.status(result.body.statusCode).send({ comment : result });
  }
);

// GET ALL COMMENT
router.get('/', Auth.userRole,
  async function(req, res) {
    const result = await CommentService.getAllComments(req);
    res.status(result.body.statusCode).send({ comment : result });
  }
);

// GET ONE COMMENT
router.get('/(:id)', Auth.userRole,
  async function(req, res) {
    const result = await CommentService.getCommentById(req);
    res.status(result.body.statusCode).send({ comment : result });
  }
);

// GET COMMENT BY POST
router.get('/ByPost/(:postId)', Auth.userRole,
  async function(req, res) {
    const result = await CommentService.getCommentByPostId(req);
    res.status(result.body.statusCode).send({ comment : result });
  }
);

module.exports = router;
