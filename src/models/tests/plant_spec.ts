import { plant, PlantStore } from "../plant";

const store = new PlantStore();

describe("Plant Model", () => {
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

  it("create method should add a plant", async () => {
    const result = await store.create({
      name: "test",
      description: "test",
      id: 0,
    });

    expect(result).toEqual({
      id: 1,
      name: "test",
      description: "test",
    });
  });

  it("index method should return a list of plants", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "test",
        description: "test",
      },
    ]);
  });

  it("show method should return the correct plant", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      name: "test",
      description: "test",
    });
  });

  it("delete method should remove the plant", async () => {
    await store.delete("1");
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
