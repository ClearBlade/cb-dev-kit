const { createEntryObject } = require("../../templates/createEntryObject");

jest.mock("../../templates/getFilesFromDir", () => {
  return jest.fn(() => [
    "C:\\Users\\name\\test-cb-dev-kit\\src\\portals\\testHotReload\\config\\widgets\\HTML_WIDGET_COMPONENT_ec83d63d-325e-45f7-9f64-a85f005ba966\\parsers\\html\\incoming_parser\\index.tsx",
  ]);
});

describe("createEntryObject", () => {
  it("handles windows path", () => {
    const rtn = createEntryObject(
      `C:\Users\name\test-cb-dev-kit\src\portals\testHotReload\config`,
      [".js", ".jsx", ".ts", ".tsx"],
      "config\\"
    );
    expect(rtn).toEqual({
      "widgets\\HTML_WIDGET_COMPONENT_ec83d63d-325e-45f7-9f64-a85f005ba966\\parsers\\html\\incoming_parser\\index.js":
        "C:\\Users\\name\\test-cb-dev-kit\\src\\portals\\testHotReload\\config\\widgets\\HTML_WIDGET_COMPONENT_ec83d63d-325e-45f7-9f64-a85f005ba966\\parsers\\html\\incoming_parser\\index.tsx",
    });
  });
});
