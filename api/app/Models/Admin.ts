import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm';
import Token from './Token';
import { v4 as uuid } from 'uuid';

export default class Admin extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public full_name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public token: string | null;

  @column()
  public token_created_at: Date | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>;

  @beforeSave()
  public static async hashPassword(admin: Admin) {
    if (admin.$dirty.password) {
      admin.password = await Hash.make(admin.password);
    }
  }

  @beforeCreate()
  public static assignUuid(admin: Admin) {
    admin.id = uuid();
  }
}
