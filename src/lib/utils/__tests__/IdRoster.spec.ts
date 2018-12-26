import { IdRoster } from "../IdRoster";

describe("IdRoster", () => {
  test("creates ids", () => {
    const idRoster = new IdRoster("foo", "pfx");
    expect(idRoster).toMatchInlineSnapshot(`
IdRoster {
  "prefix": "pfx",
  "rootId": "foo",
}
`);
  });
});
