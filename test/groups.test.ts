import request from "supertest";
import {Server, HTTPSServer, HTTPServer} from "../src/server";
import Framework from "../src/framework";
import router from "../src/routes/all";
import dotenv from "dotenv";
import http from "http";

/**
 * Creates the Express framework app
 * @returns {http.RequestListener }
 */
function getFramework(): http.RequestListener {
  const frameworkFactory = new Framework();
  const app = frameworkFactory.createExpressApp(router);
  return app;
}


/** utilise .env file */
function setupEnv(): void {
  dotenv.config();
}

describe("GET /groups", () => {

  let app: http.RequestListener;
  let server: HTTPServer;
  let framework: any;
  beforeAll(() => {
    setupEnv();
    const port = 8082;
    framework = getFramework();
    const serverFactory: Server = new Server();
    server = serverFactory.createHTTPServer(port);
    app = server.start(framework);
  });

  
  it("/groups should return 200 OK", () => {
      return request(app).get("/groups")
          .expect(200);
  });

  it("/groups/{groupId} should return 200 OK", () => {
    return request(app).get("/groups/1")
      .expect(200);
  });

});


