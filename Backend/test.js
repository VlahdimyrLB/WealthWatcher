const bcrypt = require("bcrypt");

const plainPassword = "Vlahdim";
const storedHashedPassword =
  "$2b$10$rg2Gxty.3fmPe0VCWBU.6O1LmwPDE3vLDw3GWz9ktWkkxWqXJIDdu";

bcrypt.compare(plainPassword, storedHashedPassword, (err, isMatch) => {
  if (err) {
    console.error("Error during password comparison:", err);
  } else {
    console.log("Passwords match:", isMatch);
  }
});
