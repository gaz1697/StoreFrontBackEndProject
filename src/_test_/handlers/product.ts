import app from "../..";
import supertest from "supertest";

const request = supertest(app);

describe("GET /products", () => {
  it("should return 200 ok", () => {
    return request.get("/products").expect(200);
  });
});
