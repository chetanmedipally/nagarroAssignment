import { expect } from "chai";
import * as UserController from "../src/controllers/usersController";
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config({ path: ".env" })
describe('User Middlware', function () {
  before(function (done) {
    mongoose
      .connect(process.env.MONGO_URI as string + "/AssignmentDB")
      .then((result: any) => {
        done();
      });
  });
  it('should send a 500 response for an non existing user', function (done) {
    const req: any = { user: { userId: new mongoose.Types.ObjectId('6378a3763283c1a68a9c55a2') } };
    const res: any = {
      statusCode: 500,
      message: null,
      status: function (code: number) {
        this.statusCode = code;
        return this;
      },
      json: function (data: any) {
        this.message = data.message;
      }
    };
    UserController.getFriends(req, res, () => { })
    expect(res.statusCode).to.be.equal(500);
    done();
  });
  after(function (done) {
    mongoose.disconnect()
      .then(() => { done() })
  })
});