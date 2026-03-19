import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Application = sequelize.define('Application', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wallet: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  networks: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  brand_logo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  brand_fav_icon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  system_prompt: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  user_prompt: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'active'
  },
  vercel_project_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wallet_project_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  design_system_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  chat_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  chat_init_response: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'applications',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Application;
