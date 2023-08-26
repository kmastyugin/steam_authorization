import {Request, Response} from "express";
import {UserService} from "@services";
import path from "path";

class UserController {
  test(req: Request, res: Response) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  }

  /**
   * Добавление записи
   * @param req
   * @param res
   */
  async post(req: Request, res: Response) {
    try {
      const item = await UserService.create(req.body);
      res.json(item);
    } catch(e) {
      res.status(e.status ? e.status : 400).json(e.message);
    }
  }

  /**
   * Получение записей
   * @param req
   * @param res
   * @queryParam page - индекс страницы
   * @queryParam size - количество записей
   */
  async get(req: Request, res: Response) {
    try {
      const {page, size} = req.query;
      const list = await UserService.read(page, size);
      res.json(list);
    } catch(e) {
      res.status(e.status ? e.status : 400).json(e.message);
    }
  }

  /**
   * Получение записи по id
   * @param req
   * @param res
   * @queryParam id - id записи
   */
  async getById(req: Request, res: Response) {
    try {
      const item = await UserService.readById(req.params.id);
      res.json(item);
    } catch(e) {
      res.status(e.status ? e.status : 400).json(e.message);
    }
  }

  /**
   * Изменение записи
   * @param req
   * @param res
   * @body IUser - поля для изменения записи
   */
  async put(req: Request, res: Response) {
    try {
      const item = await UserService.update(req.body);
      res.json(item);
    } catch(e) {
      res.status(e.status ? e.status : 400).json(e.message);
    }
  }

  /**
   * Удаление записи
   * @param req
   * @param res
   * @bodyParam _id - id записи
   */
  async delete(req: Request, res: Response) {
    try {
      const item = await UserService.delete(req.body._id);
      res.json(item);
    } catch(e) {
      res.status(e.status ? e.status : 400).json(e.message);
    }
  }
}

export default new UserController();