import { testingRefreshToken } from "../../utils/constants";
import {
    signUpApi,
    signInApi,
    getUsersApi,
    getUsersActiveApi,
    getAvatarApi,
    uploadAvatarApi,
    updateUserApi,
    activateUserApi,
    deleteUserApi,
    signUpAdminApi
} from "../../api/user";

const token = testingRefreshToken;

describe("Api de user", () => {
    it("Registro y activación de usuario", (done) => {
        let data = {
            "email": "david@gmail.com",
            "password": 12345678,
            "repeatPassword": 12345678
        }
        signUpApi(data).then((data) => {
            expect(data.status).toBe(200);
            activateUserApi(token, data.user._id, true).then((data) => {
                expect(data.status).toBe(200);
                done();
            });
        });
    });    
    it("Login de usuarios", (done) => {
        let data = {
            "email": "david@gmail.com",
            "password": '12345678',
        }
        signInApi(data).then((data) => {
            expect(data.status).toBe(200);
            done();
        });
    });
    it("Obteniendo usuarios activos", (done) => {
        getUsersActiveApi(token, true).then((data) => {
            expect(data.users.length).toBeGreaterThan(0);
            done();
        });
    });
    it("Actualizando avatar de usuario", (done) => {
        let avatarName = '9Eg7ljRnmzpFntEq';
        let userId = 'sdsdff5ssdf5';
        uploadAvatarApi(token, avatarName, userId).then((data) => {
            expect(data.status).toBe(404);
            done();
        });
    });
    it("Obteniendo avatar de usuario", (done) => {
        let avatarName = '9Eg7ljRnmzpFntEq';
        getAvatarApi(avatarName).then((data) => {
            expect(data.status).toBe(404);
            done();
        });
    });
    it("Actualizando usuario", (done) => {
        let userData = ({
            name: 'Antonio',
            lastname: 'Jaramillo',
            email: 'aj@gmail.com',
        })
        let userId = 'sd165s5cc562';
        updateUserApi(token, userData, userId).then((data) => {
            expect(data.status).toBe(404);
            done();
        });
    });
    it("Registrando usuario desde el panel de administrador", (done) => {
        let data = {
            "email": "david@gmail.com",
            "password": "123456"
        }
        signUpAdminApi(token, data).then((data) => {
            expect(data.message).toBe('El usuario ya existe.');
        });
        done();
    });
    it("Obteniendo todos los usuarios y eliminando al usuario registrado para el test", (done) => {
        getUsersApi(token).then((data) => {
            const dat = data.users;
            const testingEmail = dat.find(email => email.email === 'david@gmail.com');
            expect(data.users.length).toBeGreaterThan(0);            
            deleteUserApi(token, testingEmail._id).then((data) => {
                done();
            })
        });
    });
});
