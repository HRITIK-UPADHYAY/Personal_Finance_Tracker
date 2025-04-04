const userAuthentication = (name, email, password, confirmPassword, isLogin) => {
   if(isLogin) {
    return new Promise((resolve, reject) => {
        if(!email || !password) return reject("All Fields Mandatory");
        resolve("OK");
    })
   }
   
    return new Promise((resolve, reject) => {
        if(!name || !email || !password || !confirmPassword) return reject("All Fields Mandatory");
        
        if(password != confirmPassword) return reject("Passowrd Doesn't Match With Confirm Password");

        resolve("OK");
    })
}

export default userAuthentication;