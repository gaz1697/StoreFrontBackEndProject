import app from "../..";
import supertest from "supertest";

const request = supertest(app);

describe("GET /users", () => {
  it("should return 401 Unauthorized", () => {
    return request.get("/users").expect(401);
  });
});
