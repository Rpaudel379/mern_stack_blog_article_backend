import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

interface User {
  _id: string;
  username: string;
  password: string;
}

interface UserModel extends Model<User> {
  login(username: string, password: string): Promise<User | null>;
}

const userSchema = new mongoose.Schema<User, UserModel>(
  {
    username: {
      type: String,
      minLength: [3, "must be atleast 3 chars"],
      maxLength: [20, "must be atmost 20 chars"],
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("updateOne", async function (next) {
  const update: any = this.getUpdate();
  const password = update.$set?.password;

  if (password) {
    const salt = await bcrypt.genSalt();
    update.$set.password = await bcrypt.hash(password, salt);
  }
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  if (user) {
    const auth = await bcrypt.compare(password, user.password.toString());
    if (auth) {
      const { password, ...info } = user.toObject();
      return info;
    } else {
      throw Error("400=incorrect password");
    }
  } else {
    throw Error("400=incorrect username");
  }
};

export default mongoose.model<User, UserModel>("User", userSchema);

/*  email: {
      type: String,
      required: true,
      minLength: [3, "must be atleast 3 chars"],
      maxLength: [20, "must be atmost 20 chars"],
      unique: true,
    },
 */
