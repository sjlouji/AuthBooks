const fieldType = {
    EMAIL: 'email',
    PASSWORD: 'password',
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
}

const authError = {
    AUTH01: {
        message: 'Email is required',
        code: 'AUTH01',
        type: fieldType.EMAIL
    },
    AUTH02: {
        message: 'Invalid Email Format',
        code: 'AUTH02',
        type: fieldType.EMAIL
    },
    AUTH03: {
        message: 'Password is required',
        code: 'AUTH03',
        type: fieldType.PASSWORD
    },
    AUTH04: {
        message: 'User does not exists',
        code: 'AUTH04',
        type: fieldType.EMAIL
    },
    AUTH05: {
        message: 'Account Deactivated',
        code: 'AUTH05',
        type: fieldType.EMAIL
    },
    AUTH06: {
        message: 'Invalid Password',
        code: 'AUTH06',
        type: fieldType.EMAIL
    },
    AUTH07: {
        message: 'First Name is required',
        code: 'AUTH07',
        type: fieldType.FIRSTNAME
    },
    AUTH08: {
        message: 'Last Name is required',
        code: 'AUTH08',
        type: fieldType.LASTNAME
    },
    AUTH09: {
        message: 'Password must contain atleast 6 characters',
        code: 'AUTH09',
        type: fieldType.PASSWORD
    },
    AUTH10: {
        message: 'Password must have atleast one uppercase letter',
        code: 'AUTH10',
        type: fieldType.PASSWORD
    },
    AUTH11: {
        message: 'Password must have atleast one lowercase letter',
        code: 'AUTH11',
        type: fieldType.PASSWORD
    },
    AUTH12: {
        message: 'Password must have atleast one number letter',
        code: 'AUTH12',
        type: fieldType.PASSWORD
    },
    AUTH13: {
        message: 'Password must have atleast one special case letter',
        code: 'AUTH13',
        type: fieldType.PASSWORD
    },
    AUTH14: {
        message: 'Password can not contain first name and last name',
        code: 'AUTH14',
        type: fieldType.PASSWORD
    },
    AUTH15: {
        message: 'Password can not contain name in Email',
        code: 'AUTH15',
        type: fieldType.PASSWORD
    },
    AUTH16: {
        message: 'is not allowed',
        code: 'AUTH16',
    },
    AUTH17: {
        message: 'User exists',
        code: 'AUTH17',
        type: fieldType.EMAIL
    },
    AUTH18: {
        message: 'Invalid Token',
        code: 'AUTH18'
    },
    AUTH19: {
        message: 'Token expired',
        code: 'AUTH19'
    },
}

const blackListError = {
    BLACK01: {
        message: 'Name cannot be empty',
        code: 'BLACK01'
    }, 
    BLACK02: {
        message: 'Name already exists',
        code: 'BLACK02'
    }, 
    BLACK03: {
        message: 'Could not find the name',
        code: 'BLACK03'
    },
    BLACK04: {
        message: 'Id cannot be empty',
        code: 'BLACK04'
    },
    BLACK05: {
        message: 'Id not found',
        code: 'BLACK05'
    }
}

const serverError = {
    SER01: {
        message: 'Try again later',
        code: 'SER01',
    }
}

module.exports = {
    authError,
    serverError,
    blackListError
}