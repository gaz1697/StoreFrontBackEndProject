import app from "../..";
import supertest from "supertest";

const request = supertest(app);

describe("GET /orders", () => {
  it("should return 401 Unauthorized", () => {
    return request.get("/orders").expect(401);
  });
});
