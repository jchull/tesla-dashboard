import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {
  ChargeSession,
  ChargeSessionType,
  DriveSession,
  DriveSessionType
} from '@teslapp/common';

@Injectable()
export class TagService {
  constructor(
      @InjectModel('DriveSession')
      private readonly driveSessionModel: Model<DriveSessionType>,
      @InjectModel('ChargeSession')
      private readonly chargeSessionModel: Model<ChargeSessionType>
  ) {
  }


  // TODO: charge/session filter
  async getTags(username: string): Promise<string[]> {
    const query = this.driveSessionModel.find();
    // TODO: filter by username, not sure why ID seems to be required here, research
    //{vehicle: {username}},
    query.setQuery({ tags: {$exists: true, $not: {$size: 0}}});
    const results = await query.exec();
    return results.reduce((acc, cur) => {
      cur.tags.forEach((tag) => {
        if (tag.length && !acc.includes((tag))) {
          acc.push(tag);
        }
      });
      return acc;
    }, [] as string[]);
  }
}
