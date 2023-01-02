import { createMocks } from "node-mocks-http";
import signupHandler from "pages/api/auth/signup";

describe("POST /api/auth/signup", () => {
  it("should return 500, no password", async () => {
    const { req, res } = createMocks({ method: "POST" });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Password is essential!",
    });
  });
  it("should return 500, password too short", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "foo" },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Password must be at least 8 characters",
    });
  });
  it("should return 500, password too long", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "f".repeat(257) },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Password too long! (max: 256)",
    });
  });
  it("should return 500, password must contain uppercase", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "foobarbaz" },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Password must contain at least 1 uppercase letter",
    });
  });
  it("should return 500, password must contain symbol", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "Foobarbaz" },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Password must contain at least 1 symbol letter",
    });
  });
  it("should return 500, password must contain lowercase", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "FOOBARBAZ" },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Password must contain at least 1 lowercase letter",
    });
  });
  it("should return 500, password must contain number", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "Foobarbaz." },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Password must contain at least 1 number letter",
    });
  });
  it("should return 500, password contain invalid char", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "Foobarbaz.'" },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Password contains invalid character",
    });
  });
  it("should return 500, email required", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "Foobarbaz.1" },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Email is required!",
    });
  });
  it("should return 500, invalid email", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "Foobarbaz.1", email: "foo" },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Invalid email",
    });
  });
  it("should return 500, name & surname required", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { password: "Foobarbaz.1", email: "foo@bar.baz" },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "This field is required",
    });
  });
  it("should return 500, isGestore required", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        password: "Foobarbaz.1",
        email: "foo@bar.bazz",
        name: "foo",
        surname: "bar",
      },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "User validation failed: isGestore: Path `isGestore` is required.",
    });
  });
  it("should return 409, email used", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        password: "Foobarbaz.1",
        email: "foo@bar.baz",
        name: "foo",
        surname: "bar",
      },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(409);
    expect(res._getData()).toEqual({
      success: false,
      error: "Email already in use",
    });
  });
  it("should return 500, name or surname too long", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        password: "Foobarbaz.1",
        email: "foo@bar.bazz",
        name: "f".repeat(51),
        surname: "bar",
      },
    });
    await signupHandler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({
      success: false,
      error: "Name too long! (max: 50)",
    });
  });
  // it("should return 201, created", async () => {
  //   const { req, res } = createMocks({
  //     method: "POST",
  //     body: {
  //       password: "Foobarbaz.1",
  //       email: "foo@bar.baz",
  //       name: "foo",
  //       surname: "bar",
  //       isGestore: false,
  //     },
  //   });
  //   await signupHandler(req, res);
  //   expect(res.statusCode).toBe(500);
  //   expect(res._getData()).toEqual({
  //     success: true,
  //     isUnitn: false,
  //   });
  // });
});
