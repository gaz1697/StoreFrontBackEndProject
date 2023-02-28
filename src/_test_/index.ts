import app from "..";
import supertest from "supertest";

const request = supertest(app);

describe("GET /", () => {
  it("should return 200 OK", () => {
    return request.get("/").expect(200);
  });
});
