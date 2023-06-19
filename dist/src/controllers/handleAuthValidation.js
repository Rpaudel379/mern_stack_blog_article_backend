"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterAPIRegister = exports.filterAPIUpdate = exports.filterAPILogin = void 0;
const filterAPILogin = ({ username, password }) => {
    if (!username || !password) {
        // splits into two values seperated by = /// 404=error message
        return { validation: false, message: "400=require username and password" };
    }
    else {
        return { validation: true };
    }
};
exports.filterAPILogin = filterAPILogin;
const filterAPIUpdate = ({ username, password }) => {
    if (username && !password) {
        console.log(true);
        if (username.length < 3) {
            return {
                validation: false,
                message: "400=Invalid username. Must be atleat 3 characters long",
            };
        }
        return { validation: true };
    }
    if (password && !username) {
        if (!isValidPassword(password)) {
            return {
                validation: false,
                message: "400=Invalid password. Password must be atleast 5 characters long, one uppercase letter and one digit",
            };
        }
        return { validation: true };
    }
    return { validation: false, message: "400=require username or password" };
};
exports.filterAPIUpdate = filterAPIUpdate;
const filterAPIRegister = ({ username, password }) => {
    if (!username) {
        // splits into two values seperated by = /// 404=error message
        return { validation: false, message: "400=require username" };
    }
    else if (!password) {
        return { validation: false, message: "400=require password" };
    }
    else {
        if (!isValidPassword(password)) {
            return {
                validation: false,
                message: "400=Invalid password. Password must be atleast 5 characters long, one uppercase letter and one digit",
            };
        }
        if (username.length < 3) {
            return {
                validation: false,
                message: "400=Invalid username. Must be atleat 3 characters long",
            };
        }
        return { validation: true };
    }
};
exports.filterAPIRegister = filterAPIRegister;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // it will return boolean
    return emailRegex.test(email);
};
const isValidPassword = (password) => {
    // Password must be atleast 5 characters long, one uppercase letter and one digit
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    // it will also return boolean
    return passwordRegex.test(password);
};
/*
export const filterAPIRegister = ({
  username,
  email,
  password,
}: Email) => {
  if (!username) {
      // splits into two values seperated by = /// 404=error message

    return { validation: false, message: "400=require Username" };
  } else if (!email) {
    return { validation: false, message: "400=require Email" };
  } else if (!password) {
    return { validation: false, message: "400=require Password" };
  } else {
    if (!isValidEmail(email)) {
      return {
        validation: false,
        message: "400=Invalid email. Please use valid email",
      };
    }

    if (!isValidPassword(password)) {
      return {
        validation: false,
        message:
          "400=Invalid password. Password must be atleast 5 characters long, one uppercase letter and one digit",
      };
    }

    if (username.length < 3) {
      return {
        validation: false,
        message: "400=Invalid username. Must be atleat 3 characters long",
      };
    }

    return { validation: true };
  }
};
*/
