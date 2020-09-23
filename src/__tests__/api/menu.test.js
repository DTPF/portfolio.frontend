import { testingRefreshToken } from "../../utils/constants";
import {
    getMenuApi,
    updateMenuApi,
    activateMenuApi,
    addMenuApi,
    deleteMenuApi
} from "../../api/menu";

const token = testingRefreshToken;

describe("Api de menú", () => {
    it("Obtener todo los menús", (done) => {
        getMenuApi().then((data) => {
            expect(data.status).toBe(200);
            done();
        });
    });
    it("Actualizar menú", (done) => {
        let data = {
            title: "Lorem"
        };
        updateMenuApi(token, '5f64d9e105d180621ac2176c', data).then((data) => {
            expect(data.message).toBe('No se ha encontrado ningún menú.');
            done();
        });
    });
    it("Activar menú", (done) => {
        activateMenuApi(token, '5f64d9e105d180621ac2176c', true).then((data) => {
            expect(data.message).toBe('No se ha encontrado el menú.');
            done();
        });
    });
    it("Crear menú", (done) => {
        let data = {
            title: ""
        };
        addMenuApi(token, data).then((data) => {
            expect(data.message).toBe('El título es obligatorio.');
            done();
        });
    });
    it("Eliminando menú", (done) => {
        deleteMenuApi(token, '5f64d9e105d180621ac2176c').then((data) => {
            expect(data.message).toBe('Menú no encontrado.');
            done();
        });
    });
});