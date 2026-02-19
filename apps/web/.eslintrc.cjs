module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
