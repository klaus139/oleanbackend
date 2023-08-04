"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogCtrl_1 = __importDefault(require("../controller/blogCtrl"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/blog', auth_1.default, blogCtrl_1.default.createBlog);
router.post('/slug', blogCtrl_1.default.updateSlug);
//router.get('/blogs', blogCtrl.getAllBlog)
//router.get('/noslug', blogCtrl.getNonSlug)
//router.get('/blogo/:id', blogCtrl.getblogo)
router.get('/home/researchs', blogCtrl_1.default.getHomeBlogs);
router.get('/researchs/category/:id', blogCtrl_1.default.getBlogsByCategory);
router.get('/researchs/user/:id', blogCtrl_1.default.getBlogsByUser);
router.route('/research/:id')
    .put(auth_1.default, blogCtrl_1.default.updateBlog)
    .delete(auth_1.default, blogCtrl_1.default.deleteBlog)
    .get(blogCtrl_1.default.getBlogById);
router.route('/project/:slug').get(blogCtrl_1.default.getBlog);
router.get('/search/blogs', blogCtrl_1.default.searchBlogs);
exports.default = router;
