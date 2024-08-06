function isUndefined(value) {
    return value.every(el => {
        return el !== undefined;
    });
}

function isValidateEmail(email) {
    return /^[a-zA-z0-9_\*]{3,}\@[a-z0-9]{2,}\.[a-z]{2,}$/i.test(email) && email.length < 64;
}

function isValidateNames(name) {
    return name.every(el=>{
        return /^[a-zA-z]{3,}\s*$/.test(el);
    })

}

function isValidateTel(tel) {
    tel = tel.split("-");
    for (let i = 0; i < tel.length; i++) {
        if (!/^[0-9]$/.test(tel[i])) {
            return false;
        } else {
            if (tel.length < 6) return false;
        }
    }
    return true;
}

//Minimum eight characters, at least one letter and one number:
function isValidatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(password);
}

module.exports = {
    name: isValidateNames,
    mail: isValidateEmail,
    password: isValidatePassword,
    telephone: isValidateTel,
    isUndefined: isUndefined,
}