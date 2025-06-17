const http = require("http");

const PORT = process.env.PORT || 9000;

const server = http.createServer((request, response) => {
  //   response.write("Hello, World!");
  //   response.setHeader("Content-Type", "application/json");

  // You can combine these two by using writeHead
  //   response.setHeader("Content-Type", "text/html");
  //   response.statusCode = 404;

  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  response.end(
    `<h1>
    <strong>message</strong>: "Hello, World", 
    </h1>
    <p>
    <strong>timestamp</strong>: ${new Date().toISOString()}
    </p>
    `
  );
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
