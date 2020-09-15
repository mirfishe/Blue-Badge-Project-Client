let API_URL = "";

switch (window.location.hostname) {
    case "localhost" || "127.0.0.1":
        API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
        break;
    case "tw-blue-badge-server":
        API_URL = "https://tw-blue-badge-server";
        break;
};

export default API_URL;