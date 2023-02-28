import { product, ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
  beforeAll(async () => {
    await store.create({
      id: 1,
      name: "test",
      price: 1,
    });
    await store.create({
      id: 1,
      name: "test",
      price: 1,
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
  it("should have an update method", () => {
    expect(store.update).toBeDefined();
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result[0].name).toEqual("test");
  });
  it("show method should return the correct product", async () => {
    const result = await store.show("2");
    expect(result.id).toEqual(2);
    expect(result.name).toEqual("test");
  });
  it("update method should update the product", async () => {
    const p: product = {
      id: 2,
      name: "test",
      price: 2,
    };
    const result = await store.update(p);
    expect(result.id).toEqual(2);
    expect(result.name).toEqual("test");
    expect(result.price).toEqual(2);
  });
});
