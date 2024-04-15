import { DataTypes, Model } from 'sequelize';
import database from '../../connections/sequelize';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public username!: string;
  public isActive!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isactive: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
  },
  {
    sequelize: database,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
