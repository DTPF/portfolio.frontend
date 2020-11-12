import {
  connectionApi,
  reloadMessagesTrueApi,
  reloadMessagesFalseApi,
  messagesStatusApi,
} from "../../api/utils";

describe("Utils API", () => {
  it("Checking connection", async () => {
    await connectionApi().then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it("Setting reloadMessages to true", async () => {
    await reloadMessagesTrueApi().then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it("Setting reloadMessages to false", async () => {
    await reloadMessagesFalseApi().then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it("Getting messages status", async () => {
    await messagesStatusApi().then((data) => {
      expect(data.messagesStatus).toBeFalsy();
    });
  });
});
