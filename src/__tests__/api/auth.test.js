import { testingRefreshToken } from "../../utils/constants";
import { willExpireToken } from "../../api/auth";

const TOKEN = testingRefreshToken;

describe("Api de auth", () => {
    it("Comprobar si ha expirado el token", (done) => {
        const data = willExpireToken(TOKEN);
        expect(data).toBeFalsy();
        done();
    });
});