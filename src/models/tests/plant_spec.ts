import { plant, PlantStore } from "../plant";

const store = new PlantStore();

describe("Plant Model", () => {
  beforeAll(async () => {
    await store.create({
      name: "test",
      description: "test",
      id: 1,
    });
  });
  afterAll(async () => {
    await store.delete("2");
    await store.delete("1");
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

  it("create method should add a plant and index method should return a list of all plants", async () => {
    const create = await store.create({
      name: "test",
      description: "test",
      id: 2,
    });
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "test",
        description: "test",
      },
      {
        id: 2,
        name: "test",
        description: "test",
      },
    ]);
  });

  // it("delete method should remove the plant and show to method to return the plant if it exist or undefined if it doesn't exist", async () => {
  //   await store.delete("1");
  //   const result = await store.show("1");
  //   expect(result).toBeUndefined();
  // });
});
