import { order, OrderStore } from "../order";
import { product, ProductStore } from "../product";
import { user, UserStore } from "../user";
const store = new OrderStore();
const pStore = new ProductStore();
const uStore = new UserStore();

describe("Order Model", () => {
  beforeAll(async () => {
    await uStore.create({
      id: 1,
      firstname: "test",
      lastname: "test",
      password: "test",
    });
    await pStore.create({
      id: 1,
      name: "test",
      price: 1,
    });
    await store.create([
      { id: 1, product_id: 1, quantity: 1, user_id: 1, status: "active" },
    ]);
    await store.create([
      { id: 2, product_id: 1, quantity: 1, user_id: 1, status: "active" },
    ]);
  });
  afterAll(async () => {
    await store.delete("1");
    await store.delete("2");
    await uStore.delete("1");
    await pStore.delete("1");
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
  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result[0].id).toEqual(1);
    expect(result[0].product_id).toEqual(1);
    expect(result[0].quantity).toEqual(1);
    expect(result[0].user_id).toEqual(1);
    expect(result[0].status).toEqual("active");
  });
  it("show method should return the correct order", async () => {
    const result = await store.show("1");
    expect(result[0].id).toEqual(1);
    expect(result[0].product_id).toEqual(1);
    expect(result[0].quantity).toEqual(1);
    expect(result[0].user_id).toEqual(1);
    expect(result[0].status).toEqual("active");
  });
  it("update method should update the order", async () => {
    const result = await store.update({
      id: 2,
      product_id: 1,
      quantity: 2,
      user_id: 1,
      status: "active",
    });
    expect(result.id).toEqual(2);
    expect(result.product_id).toEqual(1);
    expect(result.quantity).toEqual(2);
    expect(result.user_id).toEqual(1);
    expect(result.status).toEqual("active");
  });
});
