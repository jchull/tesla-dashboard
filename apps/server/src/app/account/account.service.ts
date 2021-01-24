import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { UserType } from '@tesla-dashboard/schemas'
import { User, UserRoles } from '@tesla-dashboard/types'

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserType>
  ) {}

  sanitizeUser(user: User): Partial<User> {
    const { username, email, role } = user
    return { sub: user._id, username, email, role }
  }

  async get(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username })
  }

  async validateNewAccount(user: Partial<User>): Promise<string | undefined> {
    const exists = await this.get(user.username)
    if (exists) {
      return 'Username taken'
    }
  }

  async create(user: Partial<User>): Promise<User> {
    if (!bcrypt) {
      throw Error('Cannot run bcrypt in worker!')
    }

    const saltRounds = 10
    const hash = await bcrypt.hashSync(user.password, saltRounds)
    return this.userModel.create({
      username: user.username,
      email: user.email,
      pwdHash: hash,
      role: UserRoles.Standard,
    })
  }

  async update(user: User): Promise<User> {
    return this.userModel.updateOne({ username: user.username }, user)
  }

  async delete(username: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ username })
    return !!result
  }

  async getPreferences(username: string) {
    return this.userModel.findOne({ username })
  }
}
