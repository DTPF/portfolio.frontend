import { testingRefreshToken } from "../../utils/constants";
import { willExpireToken } from "../../api/auth";

const token = testingRefreshToken;

describe("Api de auth", () => {
    it("Comprobar si ha expirado el token", (done) => {
        const data = willExpireToken(token);
        expect(data).toBeFalsy();
        done();
    });
});