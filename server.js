const http = require("http");
const {
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
} = require("./controllers/user");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  try {
    // console.log(`Received request for ${req.url} with method ${req.method}`);
    if (req.url.startsWith("/api/users")) {
      if (req.method === "GET" && req.url === "/api/users") {
        res.setHeader("Content-Type", "application/json");
        res.write(
          JSON.stringify({
            users: getUsers(),
            message: "Users fetched successfully",
          })
        );
        res.end();
      } else if (req.method === "GET" && req.url.startsWith("/api/users/")) {
        const parts = req.url.split("/");
        const userId = parseInt(parts[3]);
        if (userId) {
          const user = getUserById(userId);
          if (user) {
            res.setHeader("Content-Type", "application/json");
            res.write(
              JSON.stringify({ user, message: "User fetched successfully" })
            );
            res.end();
          } else {
            res.writeHead(404, {
              "Content-Type": "text/plain",
            });
            res.end("User not found!");
          }
        } else {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("User ID not provided!");
        }
      } else if (req.method === "POST" && req.url == "/api/users") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          try {
            const user = JSON.parse(body);
            addUser(user);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "User added successfully!",
                user,
              })
            );
          } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                error: error.message,
              })
            );
          }
        });
      } else if (req.method === "PUT") {
        const parts = req.url.split("/");
        const userId = parseInt(parts[3]);
        if (userId) {
          try {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });

            req.on("end", () => {
              const user = JSON.parse(body);
              const edittedUser = editUser(userId, user);
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  message: "User Editted Successfully!",
                  user: edittedUser,
                })
              );
            });
          } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
          }
        } else {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("User ID not provided!");
        }
      } else if (req.method === "DELETE") {
        const userId = parseInt(req.url.split("/")[3], 10);

        if (userId) {
          try {
            const deletedUser = deleteUser(userId);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "Deleted User Successfully!",
                user: deletedUser,
              })
            );
          } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
          }
        } else {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("User ID not provided!");
        }
      }
    } else {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end(`Not Found! URL ${req.method}`);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });
    res.end(`Internal Server Error: ${error.message}`);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
