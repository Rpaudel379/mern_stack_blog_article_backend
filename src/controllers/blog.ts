import { NextFunction, Request, Response } from "express";
import Blog from "@models/Blog";
import { filterBlog } from "@utilities/filterBlog";
import handleMongoErrors from "@controllers/handleMongoErrors";

const perPage = 4;

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId, title, content, coverImage } = req.body;

  const filtered = filterBlog({ userId, title, content });
  if (!filtered.validation) {
    return next(Error(filtered.message));
  }

  try {
    let newBlog;
    if (coverImage) {
      newBlog = await Blog.create({ userId, title, content, coverImage });
    } else {
      newBlog = await Blog.create({ userId, title, content });
    }

    res
      .status(200)
      .json({ message: "blog created succesfully", newBlog, success: true });
  } catch (err: any) {
    const error = handleMongoErrors(err);

    return next(Error(error));
  }
};

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const pageNo = parseInt(req.query.pageNo as string);
  console.log(pageNo);

  const skip = (pageNo - 1) * perPage;

  const totalBlogs = await Blog.countDocuments();

  try {
    const blogs = await Blog.find()
      .populate("userId", "username")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({ blogs, totalBlogs });
  } catch (error) {
    return next(Error("500=something went wrong. try again"));
  }
};

export const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("userId", "username");
    if (!blog) {
      throw Error();
    }
    res.status(200).json({ blog });
  } catch (error) {
    return next(Error("404=Blog not found"));
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId, title, content, coverImage } = req.body;
  const blogId = req.params.id;

  const filtered = filterBlog({ userId, title, content });
  if (!filtered.validation) {
    return next(Error(filtered.message));
  }

  const update = coverImage
    ? { $set: { title, content, coverImage } }
    : { $set: { title, content } };

  try {
    /*    const newBlog = await Blog.updateOne(
      { _id: blogId },
      {
        $set: {
          title,
          content,
        },
      }
    ); */
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, update);

    res.status(200).json({
      message: "blog updated succesfully",
      updatedBlog,
      success: true,
    });
  } catch (err: any) {
    const error = handleMongoErrors(err);

    return next(Error(error));
  }
};

export const userBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  const pageNo = parseInt(req.body.pageNo as string);
  console.log(pageNo);
  const skip = (pageNo - 1) * perPage;

  const totalBlogs = await Blog.find({ userId }).countDocuments();

  try {
    const blogs = await Blog.find({ userId })
      .populate("userId", "username")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage);

    if (!blogs) {
      throw Error();
    }
    res.status(200).json({ blogs, totalBlogs });
  } catch (error) {
    return next(Error("500=something went wrong. try again"));
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const blogId = req.params.id;
  try {
    await Blog.findByIdAndDelete(blogId);

    res
      .status(200)
      .json({ message: "blog deleted succesfully", success: true });
  } catch (err: any) {
    const error = handleMongoErrors(err);
    return next(Error(error));
  }
};
