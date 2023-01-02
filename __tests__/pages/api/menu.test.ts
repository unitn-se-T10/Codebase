import { createMocks } from "node-mocks-http";
import menuHandler from "pages/api/menu";

describe("GET /api/menu", () => {
  it("should return 400, no values", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await menuHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual({
      success: false,
      error: "id not provided",
    });
  });
  it("should return 404, not found", async () => {
    const { req, res } = createMocks({ method: "GET", query: { id: "foo" } });
    await menuHandler(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._getData()).toEqual({
      success: false,
      error: "Menu not found",
    });
  });
  it("should return 200, valid id", async () => {
    const id = "20e0ffac-7e4a-41be-87c3-6d7181e7356b";
    const { req, res } = createMocks({ method: "GET", query: { id } });
    await menuHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData().success).toEqual(true);
    expect(res._getData().menu.id).toEqual(id);
    expect(res._getData().menu.piatti.length).toEqual(3);
  });
});

// NOTE: Could not find a way to unit test the authenticated endpoints
