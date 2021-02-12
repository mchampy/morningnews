export default function (source = "fr", action) {
    if (action.type === "changeSources") {
      return action.country;
    } else {
      return source;
    }
  }