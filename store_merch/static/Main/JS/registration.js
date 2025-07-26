class FormValidation{
    formValues = {
        username : "",
        email : "",
        password : "",
        confirmpassword : ""
    }
    errorValues = {
        usernameErr : "",
        emailErr : "",
        phonenumberErr : "",
        passwordErr : "",
        confirmpasswordErr : ""
    }
    showErrorMsg(index,msg){
        const input_box = document.getElementsByClassName('input-box')[index]
        input_box.classList.add('error')
        input_box.getElementsByTagName('span')[0].textContent = msg   
    }
    showSuccessMsg(index){
        const input_box = document.getElementsByClassName('input-box')[index]
        input_box.classList.remove('error')
        input_box.classList.add('success')
    }
    getInputs(){
        this.formValues.username = document.getElementById('username').value.trim()
        this.formValues.email = document.getElementById('email').value.trim()
        this.formValues.password = document.getElementById('password').value.trim()
        this.formValues.confirmpassword = document.getElementById('confirmpassword').value.trim()
    }
    validateUsername(){
        if(this.formValues.username === ""){
            this.errorValues.usernameErr = //"* Please Enter Your Name"
            this.showErrorMsg(0,this.errorValues.usernameErr)
        } else if(this.formValues.username.length <= 4 ){
            this.errorValues.usernameErr = //"* Username must be atleast 5 Characters"
            this.showErrorMsg(0,this.errorValues.usernameErr)
        } else if(this.formValues.username.length > 14){
            this.errorValues.usernameErr = //"* Username should not exceeds 14 Characters"
            this.showErrorMsg(0,this.errorValues.usernameErr)
        } else {
            this.errorValues.usernameErr = ""
            this.showSuccessMsg(0)
        }
    }
    validateEmail(){
        //abc@gmail.co.in
        const regExp = /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/
        if(this.formValues.email === ""){
            this.errorValues.emailErr = //"* Please Enter Valid Email"
            this.showErrorMsg(1,this.errorValues.emailErr)
        } else if(!(regExp.test(this.formValues.email))){
            this.errorValues.emailErr = //"* Invalid Email"
            this.showErrorMsg(1,this.errorValues.emailErr)
        } else {
            this.errorValues.emailErr = ""
            this.showSuccessMsg(1)
        }
    }
    validatePassword(){
        if(this.formValues.password === ""){
           this.errorValues.passwordErr = //"* Please Provide a Password"
            this.showErrorMsg(3,this.errorValues.passwordErr)
        } else if(this.formValues.password.length <= 4){
            this.errorValues.passwordErr = //"* Password must be atleast 5 Characters"
            this.showErrorMsg(3,this.errorValues.passwordErr)
        } else if(this.formValues.password.length > 10){
            this.errorValues.passwordErr = //"* Password should not exceeds 10 Characters"
            this.showErrorMsg(3,this.errorValues.passwordErr)
        } else {
            this.errorValues.passwordErr = ""
            this.showSuccessMsg(3)
        }
    }
    validateConfirmpassword(){
        if(this.formValues.confirmpassword === ""){
            this.errorValues.confirmpasswordErr = //"* Invalid Confirm Password"
            this.showErrorMsg(4,this.errorValues.confirmpasswordErr)
        } else if(this.formValues.confirmpassword === this.formValues.password && this.errorValues.passwordErr === ""){
            this.errorValues.confirmpasswordErr = ""
            this.showSuccessMsg(4)
        } else if(this.errorValues.passwordErr){
            this.errorValues.confirmpasswordErr = //"* An error occurred in Password Field"
            this.showErrorMsg(4,this.errorValues.confirmpasswordErr)
        } else {
            this.errorValues.confirmpasswordErr = //"* Password Must Match"
            this.showErrorMsg(4,this.errorValues.confirmpasswordErr)
        }
    }
    alertMessage(){
        const {usernameErr , emailErr, passwordErr , confirmpasswordErr}= this.errorValues
        if(usernameErr === "" && emailErr === "" && passwordErr === "" && confirmpasswordErr === ""){
            swal("Registration Successful","ThankYou , "+this.formValues.username,"success").then(() => {
                console.log(this.formValues)
                this.removeInputs()
            })
        } else {
            swal("Give Valid Inputs","Click ok to Continue" ,"error")
        }
    }

    removeInputs(){
        const input_box = document.getElementsByClassName('input-box')
        Array.from(input_box).forEach(element => {
            element.getElementsByTagName('input')[0].value = ""
            element.getElementsByTagName('span')[0].textContent = ""
            element.classList.remove('success')
        })
    }
} 

const ValidateUserInputs = new FormValidation()

document.getElementsByClassName('form')[0].addEventListener('submit' , event => {
    event.preventDefault()
    ValidateUserInputs.getInputs()
    ValidateUserInputs.validateUsername()
    ValidateUserInputs.validateEmail()
    ValidateUserInputs.validatePassword()
    ValidateUserInputs.validateConfirmpassword()
    ValidateUserInputs.alertMessage()
})
