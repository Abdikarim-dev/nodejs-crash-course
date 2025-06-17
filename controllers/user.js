const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    age: 32,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@gmail.com",
    age: 28,
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@gmail.com",
    age: 25,
  },
];

module.exports.getUsers = () => users;

module.exports.getUserById = (id) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }
  return user;
};

module.exports.addUser = (user) => {
  if (
    typeof user !== "object" ||
    !user.name ||
    !user.email || 
    users.some((u) => u.email === user?.email)
  ) {
    throw new Error("Invalid or duplicate user");
  }
  users.push({
    id: users.length + 1,
    ...user,
    createdAt: new Date().toLocaleDateString(),
  });
};

module.exports.editUser = (id, updatedUser) => {
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex !== -1) {
    if (
      typeof updatedUser !== "object" ||
      !updatedUser.name ||
      !updatedUser.email
    ) {
      throw new Error("Invalid User data");
    } else {
      // Preventing duplicate key from email field
      if (
        users.some((u, i) => u.email === updatedUser.email && i !== userIndex)
      ) {
        throw new Error("Duplicate Email");
      } else {
        users[userIndex] = {
          ...users[userIndex],
          ...updatedUser,
          updatedAt: new Date().toLocaleDateString(),
        };
        return users[userIndex];
      }
    }
  } else {
    throw new Error("User not found");
  }
};

module.exports.deleteUser = (id) => {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    throw new Error(`User to be deleting's id: ${id} not found`);
  }
  const deleted = users.splice(userIndex, 1)[0];
  return deleted;
};
