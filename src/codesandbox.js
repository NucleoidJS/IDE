import Settings from "./settings";
import prettier from "./prettier";
import prettierPlugins from "./prettierPlugins";
import project from "./project";
import { v4 as uuid } from "uuid";

const CodeSandbox = {
  generateContent: (context) => {
    return {
      files: {
        "sandbox.config.json": {
          content: `{
              "template": "node",
              "container": {
                "port": 3000,
                "node": "16"
              }
            }`,
        },
        "index.js": {
          content:
            `const nuc = require("nucleoidjs");\nconst app = nuc();\n\n` +
            context.nucleoid.functions
              .map(
                (item) =>
                  item.definition +
                  "nuc.register(" +
                  item.path.split("/")[item.path.split("/").length - 1] +
                  ");\n\n"
              )
              .join("") +
            `app.openapi("./openapi.json");\napp.listen(3000);\n\n//👆 comes with Built-in Datastore🎈🎉`,
        },
        "package.json": {
          content: {
            name: project.get().name,
            description: Settings.description(),
            version: "1.0.0",
            main: "index.js",
            license: "MIT",
            dependencies: {
              nucleoidjs: Settings.beta() ? "beta" : "latest",
            },
            scripts: {
              start: "node index.js",
            },
          },
        },
        "openapi.json": {
          content: prettier.format(
            JSON.stringify({
              codesandbox: uuid(),
              api: context.nucleoid.api,
              types: context.nucleoid.types,
            }),
            {
              parser: "json",
              plugins: prettierPlugins,
            }
          ),
        },
      },
      template: "node",
      title: "Nucleoid Runtime",
    };
  },
};

export default CodeSandbox;
