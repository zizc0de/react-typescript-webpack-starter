module.exports = {
  purge: {
    enabled: true,
    content: [
      "./src/client/*.tsx",
      "./src/client/components/*.tsx",
      "./src/client/components/**/*.tsx",
      "./public/index.html",
    ],
  },
  darkMode: false, // or "media" or "class"
  theme: {
    backgroundColor: {},
    borderColor: {},
    boxShadow: {},
    fontFamily: {},
    textColor: {},
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: [
        "odd",
      ],
      borderWidth: [
        "last",
      ],
    },
  },
  plugins: [],
}
