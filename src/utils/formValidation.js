export function minLenghtValidation(inputData, minLength) {
  const { value } = inputData;
  removeClassErrorSuccess(inputData);
  if (value.length >= minLength) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

export function emailValidation(inputData) {
  const emailValid = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
  const { value } = inputData;
  removeClassErrorSuccess(inputData);
  const resultValidation = emailValid.test(value);
  if(resultValidation) {
      inputData.classList.add("success");
      return true;
  } else {
      inputData.classList.add("error");
      return false;
  }
}

function removeClassErrorSuccess(inputData) {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
}
