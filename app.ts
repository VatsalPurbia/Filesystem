
import express from "express"
import { db } from './DataBase/database'
import siningroute from './Router/singin'
import loginroute from './Router/login'
import logoutroute from './Router/logout'
import post from './Router/post'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc"
import sessionInfo from './Router/sessionInfo'
import { setuid } from "process"
const app = express()
const router = express.Router()

app.use(express.json())
const swaggerDefinition : SwaggerDefinition= {
    swagger : '2.0' ,
    info : {
        title : 'My Api',
        version : '1.0.0',
        description : 'my first swagger api page'
    }
};
const options = {
    swaggerDefinition,
    apis: ['./Router/login.ts']
}
const swaggerspec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerspec))

// const swaggerOptions = {
//      apis : ['./Router/login.ts'],
//      swaggerDefinition :{
//         info : {
//             titile : 'insta Api',
//             version : '1.0.0'
//         }
//     }
   
// }

// const swaggerDoc = swaggerJSDoc(swaggerOptions)
// app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDoc))
// post
app.use("/auth", siningroute)
app.use("/auth", loginroute)
app.use("/postauth", post)
app.use('/auth', logoutroute)

//get
app.use('/info', sessionInfo)

// app.use()

app.listen(3000, () => {
    db();
    console.log('server started on port 3000')
})

