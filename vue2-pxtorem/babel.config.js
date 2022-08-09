module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "~node_modules/element-theme-tsl-purple/lib",
      },
    ],
  ],
};
