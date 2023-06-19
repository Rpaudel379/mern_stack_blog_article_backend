import nodemailer from 'nodemailer'

interface Cred{
    username:string;
    email:string;
    password?:string;
}

interface Message{
    message:string
}

export default ({username, email, password}:Cred, {message}:Message )=>{

    
}