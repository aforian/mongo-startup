class Mongoservice {
  /**
   * 
   * @param {MongoClient} mongoClient
   */

  constructor({mongoClient, echoDao }) {
    this.mongoClient = mongoClient;
    this.echoDao = echoDao;
  }

  /**
   * 
   * @returns Promise<bool>
   */
  isConnected() {
    return Promise.resolve(this.mongoClient.isConnected());
  }

  /**
   * 
   * @param {*} data 
   * @returns Promise
   */
  async insertEcho(data) {
    const {token} = data;
    if (token !== 'hello-mongo') {
      return Promise.reject(new Error('缺少 token'));
    }
    return this.echoDao.insert(data);
  }
}
module.exports = Mongoservice;