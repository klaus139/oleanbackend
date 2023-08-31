import { Request, Response } from 'express'
import slugify from 'slugify'
import Blogs from '../models/blogModel'
import Comments from '../models/commentModel'
import { IReqAuth } from '../config/interface'
import mongoose from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'


const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
}
const searchHelper:any = (searchKey:any, query:any, req:any) => {

  if (req.query.search) {

      const searchObject:any = {};

      const regex = new RegExp(req.query.search, "i")

      searchObject[searchKey] = regex

      query = query.where(searchObject);
    
      return query
  }

  return query;
}

const blogCtrl = {
  createBlog: async (req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({msg: "Invalid Authentication."})

    try {
      const { title, content, methodology, thumbnail, pages, chapter, price, category } = req.body
       const slug = slugify(title, { lower: true });

      const newBlog = new Blogs({
        user: req.user._id,
        title: title.toLowerCase(), 
        content,
        methodology, 
        slug,
        thumbnail, 
        pages,
        price,
        chapter,
        category
      })

      await newBlog.save()
      res.json({
        ...newBlog._doc,
        user: req.user
      })

    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  },
  getHomeBlogs: async (req: Request, res: Response) => {
    try {
      const blogs = await Blogs.aggregate([
      
        // User
        {
          $lookup:{
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 }},
              
            ],
            as: "user"
          }
        },
        // array -> object
        { $unwind: "$user" },
        // Category
        {
          $lookup: {
            "from": "categories",
            "localField": "category",
            "foreignField": "_id",
            "as": "category"
          }
        },
        // array -> object
        { $unwind: "$category" },
        // Sorting
        { $sort: { "createdAt": -1 }},
        { $limit: 2000 },
        // Group by category
        {
          $group: {
            _id: "$category._id",
            name: { $first: "$category.name" },
            blogs: { $push: "$$ROOT" },
            count: { $sum: 1 }
          }
        },
        // Pagination for blogs
        {
          $project: {
            blogs: {
              $slice: ['$blogs', 0, 5]
            },
            count: 1,
            name: 1
          }
        }
      ]).allowDiskUse(true).collation({locale: "en_US", numericOrdering: true});

      res.json(blogs)
      

    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  },
  getBlogsByCategory: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req)

    try {
      const Data = await Blogs.aggregate([
        {
          $facet: {
            totalData: [
              { 
                $match:{ 
                  category: new mongoose.Types.ObjectId(req.params.id) 
                } 
              },
              // User
              {
                $lookup:{
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 }},
                    
                  ],
                  as: "user"
                }
              },
              // array -> object
              { $unwind: "$user" },
              // Sorting
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              // { $limit: limit }
            ],
            totalCount: [
              { 
                $match: { 
                  category: new mongoose.Types.ObjectId(req.params.id) 
                } 
              },
              { $count: 'count' }
            ]
          }
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1
          }
        },
        
      ],
      {allowDiskUse: true})

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      // Pagination
      let total = 0;

      if(count % limit === 0){
        total = count / limit;
      }else {
        total = Math.floor(count / limit) + 1;
      }

      res.json({ blogs, total })
    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  },
  getBlogsByUser: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req)

    try {
      const Data = await Blogs.aggregate([
        {
          $facet: {
            totalData: [
              { 
                $match:{ 
                  user: new mongoose.Types.ObjectId(req.params.id) 
                } 
              },
              // User
              {
                $lookup:{
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 }},
                    
                  ],
                  as: "user"
                }
              },
              // array -> object
              { $unwind: "$user" },
              // Sorting
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { 
                $match: { 
                  user: new mongoose.Types.ObjectId(req.params.id) 
                } 
              },
              { $count: 'count' }
            ]
          }
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1
          }
        }
      ]).allowDiskUse(true);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      // Pagination
      let total = 0;

      if(count % limit === 0){
        total = count / limit;
      }else {
        total = Math.floor(count / limit) + 1;
      }

      res.json({ blogs, total })
    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  },
  getBlog: async (req: Request, res: Response) => {
    try {
      const blog = await Blogs.findOne({slug: req.params.slug})
      .populate("user", "-password")
      //console.log(blog)

      if(!blog) return res.status(400).json({ msg: "Article does not exist." })

      return res.json(blog)
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateBlog: async (req: IReqAuth, res: Response) => {
    if(!req.user) 
      return res.status(400).json({msg: "Invalid Authentication."})

    try {
      const blog = await Blogs.findOneAndUpdate({
        _id: req.params.id, user: req.user._id
      }, req.body)

      if(!blog) return res.status(400).json({msg: "Invalid Authentication."})

      res.json({ msg: 'Update Success!', blog })

    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  },
 
 
  // getNonSlug :async (req: Request, res: Response) => {
  //   try {
  //     const blogs = await Blogs.find().exec();
  //     const blogsWithoutSlug = blogs.filter((blog) => !blog.slug);
  
  //     res.json(blogsWithoutSlug); // Send the blogs without slug as a JSON response
  //   } catch (err: any) {
  //     console.error(err);
  //     res.status(500).json({ error: "Internal server error" }); // Send an error response if something went wrong
  //   }
  // },
  updateSlug : async (req: Request, res: Response) => {
    
    try {
      const blogs = await Blogs.find();
  
      for (const blog of blogs) {
        if (!blog.slug) {
          const newSlug = slugify(blog.title, { lower: true });
          blog.slug = newSlug;
          await blog.save();
        }
      }
  
      res.json({ msg: "Slugs updated successfully." });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getblogo:async(req:Request, res: Response) => {
    try {
      const { id } = req.params; // Extract the blog ID from the request parameters
      const blogo = await Blogs.findOne({ _id: id });
  
      if (!blogo) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      res.json(blogo);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  

  deleteBlog: async (req: IReqAuth, res: Response) => {
    if(!req.user) 
      return res.status(400).json({msg: "Invalid Authentication."})

    try {
      // Delete Blog
      const blog = await Blogs.findOneAndDelete({
        _id: req.params.id, user: req.user._id
      })

      if(!blog) 
        return res.status(400).json({msg: "Invalid Authentication."})

      // Delete Comments
      await Comments.deleteMany({ blog_id: blog._id })

      res.json({ msg: 'Delete Success!' })

    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  },
  searchBlogs: async (req: Request, res: Response) => {
    try {
      const blogs = await Blogs.aggregate([
        {
          $search: {
            index: "searchTitle",
            autocomplete: {
              "query": `${req.query.title}`,
              "path": "title"
            },
           
          }
        },
        { $sort: { createdAt: -1 } },
        { $limit: 5},
        {
          $project: {
            title: 1,
            methodology: 1,
             slug: 1,
            // thumbnail: 1,
            createdAt: 1,
           
          }
        },
        
      ])

      if(!blogs.length)
        return res.status(400).json({msg: 'No Article Found.'})

      res.json(blogs)

    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  },
  getBlogById: async (req: Request, res: Response) => {
    try {
      const blog = await Blogs.findOne({_id: req.params.id})
      .populate("user", "-password")

      if(!blog) return res.status(400).json({ msg: "Blog does not exist." })

      return res.json(blog)
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
}


export default blogCtrl;