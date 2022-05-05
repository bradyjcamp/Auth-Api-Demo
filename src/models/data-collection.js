'use strict';

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id } });
      } else {
        return await this.model.findAll();
      }
    } catch (e) {
      console.error(e);
    }
  }
  async create(record) {
    try {
      return await this.model.create(record);
    } catch (e) {
      console.error(e)
    }
  }
  async update(id, data) {
    try {
      return await this.model.findOne({ where: { id } }).then(record => record.update(data));
    }
    catch (e) {
      console.error(e)
    }
  }
  async delete(id) {
    try {
      return await this.model.destroy({ where: { id } });
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = DataCollection;