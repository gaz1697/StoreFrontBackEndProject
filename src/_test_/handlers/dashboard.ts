import app from "../..";
import supertest from "supertest";

const request = supertest(app);

describe("GET /userOrders/1", () => {
  it("should return 401 Unauthorized", () => {
    return request.get("/userOrders/1").expect(401);
  });
});
