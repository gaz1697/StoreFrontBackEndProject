import { user, UserStore } from "../user";

const store = new UserStore();

describe("User Model", () => {
  beforeAll(async () => {
    await store.create({
      id: 2,
      firstname: "test",
      lastname: "test",
      password: "test",
    });
  });
  afterAll(async () => {
    await store.delete("2");
  });
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result[0].id).toEqual(2);
    expect(result[0].firstname).toEqual("test");
    expect(result[0].lastname).toEqual("test");
  });
  it("show method should return the correct user", async () => {
    const result = await store.show("2");
    expect(result.id).toEqual(2);
    expect(result.firstname).toEqual("test");
    expect(result.lastname).toEqual("test");
  });
  it("authenticate method should return the user", async () => {
    const result = await store.authenticate("2", "test");
    expect(result!.id).toEqual(2);
    expect(result!.firstname).toEqual("test");
    expect(result!.lastname).toEqual("test");
  });
  it("authenticate method should return null", async () => {
    const result = await store.authenticate("2", "wrong");
    expect(result).toEqual(null);
  });
});
