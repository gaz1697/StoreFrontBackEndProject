import { dashboardQ } from "../../services/dashboard";

const dashboard = new dashboardQ();

describe("Dashboard service", () => {
  it("should have a getUserActiveOrders method", () => {
    expect(dashboard.getUserActiveOrders).toBeDefined();
  });
});
