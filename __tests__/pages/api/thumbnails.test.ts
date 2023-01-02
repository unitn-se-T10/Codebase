import { createMocks } from "node-mocks-http";
import thumbnailsHandler from "pages/api/thumbnails";

describe("GET /api/thumbnails", () => {
  it("should return 400, no values", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await thumbnailsHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual({
      success: false,
      error: "start and num must be numbers",
    });
  });
  it("should return 400, invalid numbers", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { start: "foo", num: "bar" },
    });
    await thumbnailsHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual({
      success: false,
      error: "start and num must be numbers",
    });
  });
  it("should return 400, negative numbers", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { start: -1, num: -1 },
    });
    await thumbnailsHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual({
      success: false,
      error: "start must be >= 0 and num must be >= 1",
    });
  });
  it("should return 200, valid numbers", async () => {
    const start = 1;
    const num = 4;
    const { req, res } = createMocks({
      method: "GET",
      query: { start: start, num: num },
    });
    await thumbnailsHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData().success).toEqual(true);
    expect(res._getData().ristoranti.length).toEqual(num);
  });
});
