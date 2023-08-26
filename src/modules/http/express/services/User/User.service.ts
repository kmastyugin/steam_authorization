import {UserModel} from "@models";
import {ApiError} from "@exceptions";
import {IUser} from "@/interfaces/User/IUser";
import {IResponseStructure} from "@/interfaces/Response/IResponseStructure";
import {ISteamUser} from "@/interfaces/User/ISteamUser";

class UserService {
  page: number = 0;
  size: number = 10;

  /**
   * Добавление записи
   * @param user - объект записи
   * @returns Promise<IUser> - объект записи
   */
  async create(user: IUser) {
    try {
      const userData = new UserModel(user);
      await userData.save();
      return userData;
    } catch(e) {
      throw ApiError.BadRequest('Непредвиденная ошибка');
    }
  }

  async createOrUpdate(user: ISteamUser) {
    const userData: IUser = await this.readBySteamId(user.steamid);

    // await this.setLocalImages(user);

    if(userData) {
      return await this.update({_id: userData._id, ...user});
    } else {
      return await this.create(user);
    }
  }

  // async setLocalImages(user: IUser) {
  //   const {large, medium, small} = await ImageService.getLocalImages(user);
  //   user.avatar.large = large;
  //   user.avatar.medium = medium;
  //   user.avatar.small = small;
  // }

  /**
   * Получение списка записей
   * @param page - индекс страницы
   * @param size - количество записей
   * @returns Promise<IResponseStructure<IUser>> - объект ответа со списком записей
   */
  async read(page: number = this.page, size: number = this.size): Promise<IResponseStructure<IUser>> {
    try {
      const list = await UserModel.find().limit(size).skip(size * page);
      const count = await UserModel.find().count();

      return {
        list,
        count,
        page,
        size,
      };
    } catch(e) {
      throw ApiError.BadRequest('Непредвиденная ошибка');
    }
  }

  /**
   * Получение записи
   * @param _id - id записи
   * @returns Promise<IUser> - объект записи
   */
  async readById(_id: string) {
    try {
      return await UserModel.findById(_id);
    } catch(e) {
      throw ApiError.BadRequest('Непредвиденная ошибка');
    }
  }

  /**
   * Получение записи
   * @param steamid - steam id записи
   * @returns Promise<IUser> - объект записи
   */
  async readBySteamId(steamid: string) {
    try {
      return await UserModel.findOne({ steamid });
    } catch(e) {
      throw ApiError.BadRequest('Непредвиденная ошибка');
    }
  }

  /**
   * Обновление записи
   * @param user - объект записи
   * @returns Promise<IUser> - объект записи
   */
  async update(user: IUser) {
    try {
      return await UserModel.findOneAndUpdate({ _id: user._id }, user, { new: true });
    } catch(e) {
      throw ApiError.BadRequest('Непредвиденная ошибка');
    }
  }
  /**
   * Удаление записи
   * @param _id - id записи
   * @returns Promise<IUser> - объект записи
   */
  async delete(_id: number) {
    try {
      const foundItem = await UserModel.findOne({ _id });

      if(foundItem) {
        return foundItem.deleteOne();
      } else {
        throw ApiError.NotFound('not found');
      }
    } catch(e) {
      throw ApiError.BadRequest('Непредвиденная ошибка');
    }
  }
}

export default new UserService();