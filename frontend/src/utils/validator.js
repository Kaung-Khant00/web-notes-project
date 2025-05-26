function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function getFirstTwoLetter(name) {
  const words = name.split(" ");
  if (words.length > 1) {
    return words[0].charAt(0) + words[1].charAt(0);
  } else {
    return words[0].charAt(0) + words[0].charAt(0);
  }
}

export { isStrongPassword, isValidEmail, getFirstTwoLetter };
