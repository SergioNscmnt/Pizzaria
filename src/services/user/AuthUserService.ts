import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){

        //Verifica se o e-mail existe

        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user){
            throw new Error("Usuário ou senha está incorreto!")
        }

        // Verifica se a senha que ele inseriu está correta

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuário ou senha está incorreto!")
        }

        // Gera um token JWT e devolver os dados do usuário, como id, nome e email

        // Se deu tudo certo, gera um token para o usuario

        const token = sign(
            {
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }