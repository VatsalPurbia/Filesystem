import express, { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { Request } from 'express';
const app = express();

const sequelize = new Sequelize('mydb', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
  });



(async function (){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);
User.sync({force : false})
class Group extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'groups',
  }
);
Group.sync({force : false})

class GroupMember extends Model {
  public id!: number;
  public groupId!: number;
  public userId!: number;
}

GroupMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references : {
        model : Group, 
        key : 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references : {
        model : User , 
        key : 'id'
      }
    },
  },
  {
    sequelize,
    tableName: 'group_members',
  }
);
GroupMember.sync({force : true})
class Message extends Model {
  public id!: number;
  public text!: string;
  public userId!: number;
  public groupId!: number;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'messages',
  }
);
Message.sync({force : false})
// Group.hasMany(Message);
// Message.belongsTo(Group);
// User.belongsToMany(Group, { through: GroupMember });
// Group.belongsToMany(User, { through: GroupMember });


// GroupMember.belongsTo(User, { foreignKey: 'userId' });
// GroupMember.belongsTo(Group, { foreignKey: 'groupId' });
// User.hasMany(GroupMember, { foreignKey: 'userId' });
// Group.hasMany(GroupMember, { foreignKey: 'groupId' });

// sequelize.sync();

console.log("The table for the User model was just (re)created!");

app.use(express.json());

app.post('/signup', async (req:Request, res:Response) => {

  const { username, password } = req.body;
  const user = await User.create({ username, password });
  const userId = user.id;
  const token = jwt.sign({ userId }, 'secret');
  res.status(201).json({message : "User created"})
});

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  const usernameRegex = /^[a-zA-Z0-9]{4,10}$/; // Alphanumeric, 4-10 characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // At least 8 characters, one lowercase, one uppercase, one digit

  if (!usernameRegex.test(username) || !passwordRegex.test(password)) {

    res.status(400).json({ message: 'Invalid username or password format' });
  } else {

    const validUsername = req.body.username;
    const validPassword = req.body.password

    if (username === validUsername && password === validPassword) {

      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  }
});
app.get('/groups', async (req, res) => {
  const groups = await Group.findAll();
  res.send({ groups });
});

app.post('/groups', async (req, res) => {
  const { name, description } = req.body;
  const group = await Group.create({ name, description });
  res.send({ group });
});

app.get('/messages/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body.user;
  const groupMember = await GroupMember.findOne({ where: { groupId, userId } });
  if (!groupMember) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const messages = await Message.findAll({ where: { groupId } });
  res.send({ messages });
});

app.post('/messages', async (req, res) => {
  const { text, groupId } = req.body;
  const { userId } = req.body.user;
  const groupMember = await GroupMember.findOne({ where: { groupId, userId } });
  if (!groupMember) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const message = await Message.create({ text, userId, groupId });
  res.send({ message });
});

app.post('/groups/:groupId/members', async (req, res) => {
  
  const { userId } = req.body;
  const { groupId } = req.params;
  console.log(userId)
  console.log(groupId)

  const groupMember = await GroupMember.create({ groupId, userId });
  res.send({ groupMember });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


