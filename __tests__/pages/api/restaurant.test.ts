import { createMocks } from "node-mocks-http";
import restaurantHandler from "pages/api/restaurant";

describe("GET /api/restaurant", () => {
  it("should return 400, no values", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await restaurantHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual({
      success: false,
      error: "Missing id",
    });
  });
  it("should return 404, not found", async () => {
    const { req, res } = createMocks({ method: "GET", query: { id: "foo" } });
    await restaurantHandler(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._getData()).toEqual({
      success: false,
      error: "Restaurant not found",
    });
  });
  it("should return 200, valid id", async () => {
    const id = "ce4b9005-bbcf-4451-a435-46d2cfa9307b";
    const { req, res } = createMocks({ method: "GET", query: { id } });
    await restaurantHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData().success).toEqual(true);
    expect(res._getData().ristorante.id).toEqual(id);
    expect(res._getData().ristorante.menuIds.length).toEqual(5);
  });
});

// NOTE: Could not find a way to unit test the authenticated endpoints
