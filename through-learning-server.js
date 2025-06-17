const http = require("http");
const path = require("path");
const fs = require("fs").promises;

const PORT = process.env.PORT || 9000;

const server = http.createServer(async (request, response) => {
  //   response.write("Hello, World!");
  //   response.setHeader("Content-Type", "application/json");

  // You can combine these two by using writeHead
  //   response.setHeader("Content-Type", "text/html");
  //   response.statusCode = 404;

  try {
    if (request.method === "GET") {
      let filePath;
      console.log(__dirname);
      if (request.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
        // response.writeHead(200, {
        //   "Content-Type": "text/html",
        // });
        // response.end("<h1>Welcome to the Home Page</h1>");
      } else if (request.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("File not found");
      }

      const data = await fs.readFile(filePath);
      response.setHeader("Content-Type", "text/html");
      response.write(data);
      response.end();
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    response.writeHead(500, {
      "Content-Type": "text/plain",
    });

    response.end(`Internal Server Error: ${error.message}`);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
