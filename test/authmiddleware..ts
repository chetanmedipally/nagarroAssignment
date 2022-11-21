import { expect } from "chai";
import authMiddleware from "../src/middleware/authMiddleware";

//https://github.com/chaijs/chai/issues/882#issuecomment-322131680

describe('Auth Middlware', function () {
  it('should throw an error if no authorization header is present', function () {
    const req: any = {
      headers: {}
    };
    const res: any = {
      statusCode: null,
      message: null,
      status: function (code: number) {
        this.statusCode = code;
        return this;
      },
      json: function (data: any) {
        this.message = data.message;
      }
    };
    authMiddleware(req, res, () => { }).catch(error => {
      expect(error).to.be.an('error').with.property('message', 'Not Authorized');
      expect(res.statusCode).to.be.equal(401);
    });
  });

  it('should throw an error if the authorization header is only one string', function () {
    const req: any = {
      headers: {
        authorization: "xyz"
      }
    }
    const res: any = {
      statusCode: null,
      message: null,
      status: function (code: number) {
        this.statusCode = code;
        return this;
      },
      json: function (data: any) {
        this.message = data.message;
      }
    };
    authMiddleware(req, res, () => { }).catch(error => {
      expect(error).to.be.an('error').with.property('message', 'Not Authorized');
      expect(res.statusCode).to.be.equal(401);
    });
  });
});
