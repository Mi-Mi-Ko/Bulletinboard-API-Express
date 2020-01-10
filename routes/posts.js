const express = require('express');
const router = express.Router();
const PostService = require('../service/post');
const Auth = require('../utils/authorize');

// ADD NEW POST
router.post('/add', Auth.userRole,
  async function(req, res) {
    const result = await PostService.createPost(req);
    if(result.body.post && result.body.post.statusCode) {
      res.status(result.body.post.statusCode).send({ result });
    }
    res.status(result.body.statusCode).send({ result });
  }
);

router.post('/upload', Auth.userRole,

  async function(req, res) {
    const result = await PostService.createMultiplePosts(req);
    console.log("result",result);
   res.status(result.body.statusCode).send({ post : result });
  }
)
// GET ALL POST
router.get('/', Auth.userRole,
  async function(req, res) {
    const result = await PostService.getAllPosts(req);
    res.status(result.body.statusCode).send({ post : result });
  }
);

// GET ONE POST
router.get('/(:id)', Auth.userRole,
  async function(req, res) {
    const result = await PostService.getPostById(req);
    res.status(result.body.statusCode).send({ post : result });
  }
);

// GET ONE POST By Title
router.get('/title', Auth.userRole,
  async function(req, res) {
    const result = await PostService.getPostByTitle(req);
    res.status(result.body.statusCode).send({ post : result });
  }
);
// DELETE POST
router.delete('/delete/(:id)', Auth.userRole,
  async  function(req, res) {
    const result = await PostService.deletePost(req);
    res.status(result.body.statusCode).send({ post : result });
  }
);

// UPDATE POST
router.put('/update/(:id)', Auth.userRole,
  async function(req, res) {
    const result = await PostService.updatedPost(req);
    res.status(result.body.statusCode).send({ post : result });
  }
);

module.exports = router;
