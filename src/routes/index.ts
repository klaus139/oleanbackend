import authRouter from './authRoutes';
import userRouter from './userRouter';
import categoryRouter from './categoryRoutes';
import blogRouter from './blogRoutes';
import commentRouter from './commentRoutes'

const routes = [
    authRouter,
    userRouter,
    categoryRouter,
    blogRouter,
    commentRouter

]

export default routes;