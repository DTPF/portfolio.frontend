export function minLenghtValidation(inputData, minLength, notRequired) {
  if (notRequired) {
    if (!inputData) {
      return true;
    } else {
      if (inputData?.length >= minLength) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (inputData?.length >= minLength) {
      return true;
    } else {
      return false;
    }
  }
}

export function isNumberValidation(inputData) {
  const isNumber = /^\d+$/;
  const resultValidation = isNumber.test(inputData);
  if (resultValidation) {
    return true;
  } else {
    return false;
  }
}

export function emailValidation(inputData) {
  const emailValid = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
  const resultValidation = emailValid.test(inputData);
  if (resultValidation) {
    return true;
  } else {
    return false;
  }
}

export function isPhoneNumberValidation(inputData, notRequired) {
  const isPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
  const resultValidation = isPhoneNumber.test(inputData);
  if (notRequired) {
    if (inputData === "") {
      return true;
    } else {
      if (resultValidation) {    
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (resultValidation) {    
      return true;
    } else {
      return false;
    }
  }
}

export function minLenghtValidationClass(inputData, minLength, notRequired) {
  const { value } = inputData;
  removeClassErrorSuccess(inputData);
  if (value.length >= minLength) {
    inputData.classList.add("form-validation-success");
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
    }
    return true;
  } else {
    inputData.classList.add("form-validation-error");
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
    }
    return false;
  }
}

export function isNotNumberValidationClass(inputData, noSuccessClass) {
  const isNumber = /^\d+$/;
  const valueSplit = inputData.value.replace(/ /g, "");
  removeClassErrorSuccess(inputData);
  const resultValidation = isNumber.test(valueSplit);
  if (resultValidation) {
    inputData.classList.add("form-validation-error");
    return true;
  } else {
    if (noSuccessClass) {
      removeClassErrorSuccess(inputData);
      return false;
    } else {
      inputData.classList.add("form-validation-success");
      return false;
    }
  }
}

export function minLenghtIsNotNumberValidationClass(
  inputData,
  minLength,
  notRequired
) {
  const { value } = inputData;
  removeClassErrorSuccess(inputData);
  const isNumber = /^\d+$/;
  const valueSplit = value.replace(/ /g, "");
  const resultValidation = isNumber.test(valueSplit);
    if (resultValidation) {
      inputData.classList.add("form-validation-error");
      return false;
    } else {
      inputData.classList.add("form-validation-success");
      if (value.length >= minLength) {
        inputData.classList.add("form-validation-success");
        if (notRequired) {
          if (value === "") {
            removeClassErrorSuccess(inputData);
            return true;
          }
        }
        return true;
      } else {
        inputData.classList.add("form-validation-error");
        if (notRequired) {
          if (value === "") {
            removeClassErrorSuccess(inputData);
            return false;
          }
        }
        return false;
      }
    }

}

export function emailValidationClass(inputData, initialClass) {
  const emailValid = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
  removeClassErrorSuccess(inputData);
  const resultValidation = emailValid.test(inputData.value);
  if (initialClass) {
    if (inputData.value === "") {
      removeClassErrorSuccess(inputData);
    } else {
      if (resultValidation) {
        inputData.classList.add("form-validation-success");
        return true;
      } else {
        inputData.classList.add("form-validation-error");
        return false;
      }
    }
  } else {
    if (resultValidation) {
      inputData.classList.add("form-validation-success");
      return true;
    } else {
      inputData.classList.add("form-validation-error");
      return false;
    }
  }
}

export function isPhoneNumberValidationClass(inputData, notRequired) {
  const isPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
  const { value } = inputData;
  removeClassErrorSuccess(inputData);
  const resultValidation = isPhoneNumber.test(value);
  if (resultValidation) {
    inputData.classList.add("form-validation-success");
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
    }
    return true;
  } else {
    inputData.classList.add("form-validation-error");
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
    }
    return false;
  }
}

function removeClassErrorSuccess(inputData) {
  inputData.classList.remove("form-validation-success");
  inputData.classList.remove("form-validation-error");
}
