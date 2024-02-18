const register = require("./registo");

// *****Test for user created******
test("User is created", () => {
  const mockForm = {
    username: { value: "Inesewqeq" },
    password: { value: "123" },
    email: { value: "ines@gmail.qweqwept" },
    firstName: { value: "Ricardo" },
    lastName: { value: "Elias" },
    phoneNumber: { value: "934951893" },
    photo: {
      value:
        "https://yt3.googleusercontent.com/ytc/AIf8zZSF75D4cZJkF5nNZ7jTM43Qsq4EThYuFzHEUw-N=s900-c-k-c0x00ffffff-no-rj",
    },
  };
  register.addUser(mockForm).then((response) => {
    expect(response).toBe(201);
  });
});

// *****Username or email already exists******
test("Username or email already exists", () => {
  const mockForm = {
    username: { value: "Ines" },
    password: { value: "123" },
    email: { value: "elias@gmail.com" },
    firstName: { value: "Ricardo" },
    lastName: { value: "Elias" },
    phoneNumber: { value: "934951893" },
    photo: {
      value:
        "https://yt3.googleusercontent.com/ytc/AIf8zZSF75D4cZJkF5nNZ7jTM43Qsq4EThYuFzHEUw-N=s900-c-k-c0x00ffffff-no-rj",
    },
  };
  register.addUser(mockForm).then((response) => {
    expect(response).toBe(409);
  });
});
