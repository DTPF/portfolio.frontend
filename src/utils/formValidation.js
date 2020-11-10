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
    inputData.classList.add("success");
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
    }
    return true;
  } else {
    inputData.classList.add("error");
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
  removeClassErrorSuccess(inputData);
  const resultValidation = isNumber.test(inputData.value);
  if (resultValidation) {
    inputData.classList.add("error");
    return true;
  } else {
    if (noSuccessClass) {
      removeClassErrorSuccess(inputData);
      return false;
    } else {
      inputData.classList.add("success");
      return false;
    }
  }
}

export function minLenghtIsNotNumberValidationClass(
  inputData,
  minLength,
  notRequired
) {
  const isNumber = /^\d+$/;
  const { value } = inputData;
  removeClassErrorSuccess(inputData);
  const resultValidation = isNumber.test(value);
  const resultVal = () => {
    if (resultValidation) {
      inputData.classList.add("error");
      return true;
    } else {
      inputData.classList.add("success");
      return false;
    }
  };
  if (value.length >= minLength) {
    inputData.classList.add("success");
    resultVal();
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
    }
  } else {
    inputData.classList.add("error");
    resultVal();
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
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
        inputData.classList.add("success");
        return true;
      } else {
        inputData.classList.add("error");
        return false;
      }
    }
  } else {
    if (resultValidation) {
      inputData.classList.add("success");
      return true;
    } else {
      inputData.classList.add("error");
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
    inputData.classList.add("success");
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
    }
    return true;
  } else {
    inputData.classList.add("error");
    if (notRequired) {
      if (value === "") {
        removeClassErrorSuccess(inputData);
      }
    }
    return false;
  }
}

function removeClassErrorSuccess(inputData) {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
}
