const validate=(email,password,name="default")=>{
   
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
    if(emailRegex.test(email)===false)
    return "Please enter a valid email address.";
    if(passwordRegex.test(password)===false)
    return "Please enter a valid password.";
    if(nameRegex.test(name)===false)
    return "Please enter a valid name.";
   
    return null;
}

export default validate;