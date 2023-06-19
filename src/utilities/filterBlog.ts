import mongoose from "mongoose";

interface Blog {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  // coverImage: String;
}

export const filterBlog = ({ userId, title, content }: Blog) => {
  // splits into two values seperated by = /// 404=error message

  if (!userId) {
    return { validation: false, message: "400=require userId" };
  } else if (!title) {
    return { validation: false, message: "400=require title" };
  } else if (!content) {
    return { validation: false, message: "400=require blog body" };
  } else {
    if (title.length < 5) {
      return { validation: false, message: "400=title must be atleat 5 chars" };
    }
    if (content.length < 5) {
      return { validation: false, message: "400=body must be atleast 5 chars" };
    }
    return { validation: true };
  }
};
