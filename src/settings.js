const Settings = {
  projects: [],
  dialog: {},
  url: {
    terminal: (url) => {
      if (url) {
        localStorage.setItem("terminal", url);
      } else {
        return localStorage.getItem("terminal");
      }
    },
    app: (url) => {
      if (url) {
        localStorage.setItem("app", url);
      } else {
        return localStorage.getItem("app");
      }
    },
  },
  codesandbox: {
    url: "https://codesandbox.io/api/v1/sandboxes/define?json=1",
    sandboxID: (id) => {
      if (id) {
        localStorage.setItem("sandbox_id", id);
      } else {
        return localStorage.getItem("sandbox_id");
      }
    },
  },
  github: {
    client_id: "6a44f854367bd3fb5f13",
    token_url: "https://github.com/login/oauth/access_token",
    user: "https://api.github.com/user",
  },
  service: {
    auth: "https://nucleoid.com/oauth",
    projects: "https://nucleoid.com/projects",
  },
  connection: true,
  beta: (status) => {
    if (status !== undefined && status !== null) {
      localStorage.setItem("beta", status);
    } else {
      return localStorage.getItem("beta") === "true";
    }
  },
  debug: (status) => {
    if (status !== undefined && status !== null) {
      localStorage.setItem("debug", status);
    } else {
      return localStorage.getItem("debug") === "true";
    }
  },
  runtime: (data) => {
    if (data !== undefined && data !== null) {
      localStorage.setItem("runtime", data);
    } else {
      return localStorage.getItem("runtime");
    }
  },
  description: (data) => {
    if (data !== undefined && data !== null) {
      localStorage.setItem("description", data);
    } else {
      return localStorage.getItem("description");
    }
  },
  landing: (data) => {
    if (data !== undefined && data !== null) {
      localStorage.setItem("landing", JSON.stringify(data));
    } else {
      return JSON.parse(localStorage.getItem("landing"));
    }
  },
};

export default Settings;
