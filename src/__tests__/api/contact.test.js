import { testingRefreshToken } from "../../utils/constants";
import {
    subscribeContactApi,
    getMessagesApi,
    getMessagesUnreadApi,
    checkMessageApi,
    deleteContactMessageApi
} from "../../api/contact";

const token = testingRefreshToken;

describe("Api de contact", () => {
    it("Enviar mensaje de contacto", (done) => {
        let data = {
            "email": "d@d.com",
            "subject": "",
        };
        subscribeContactApi(data).then((data) => {
            expect(data.message).toBe('El asunto es obligatorio.');
            done();
        });
    });
    it("Obtener todos los mensajes", (done) => {
        getMessagesApi(token).then((data) => {
            expect(data.status).toBe(200);
            done();
        });
    });
    it("Obtener los mensajes no leídos", (done) => {
        getMessagesUnreadApi(token, false).then((data) => {
            expect(data.status).toBe(200);
            done();
        });
    });
    it("Checkear mensaje", (done) => {
        checkMessageApi(token, '5f64d9e105d180621ac2176c', true).then((data) => {
            expect(data.message).toBe('No se ha encontrado el mensaje.');
            done();
        });
    });
    it("Eliminar mensaje", (done) => {
        deleteContactMessageApi(token, '5f64d9e105d180621ac2176c').then((data) => {
            expect(data.message).toBe('Mensaje no encontrado en la base de datos.');
            done();
        });
    });
});