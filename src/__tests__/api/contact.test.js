import { testingRefreshToken } from "../../utils/constants";
import {
  subscribeContactApi,
  getMessagesApi,
  getMessagesUnreadApi,
  checkMessageApi,
  deleteContactMessageApi,
} from "../../api/contact";
const TOKEN = testingRefreshToken;

describe("Contact API", () => {
  it("Send test message", async () => {
    const CONTACTDATA = {
      email: "d@d.com",
      subject: "ContactTest",
    };
    await subscribeContactApi(CONTACTDATA).then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it("Get messages", async () => {
    await getMessagesApi(TOKEN).then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it("Get unread messages", async () => {
    await getMessagesUnreadApi(TOKEN, false).then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it("Message marked as read", async () => {
    await getMessagesUnreadApi(TOKEN, false).then( async (data) => {
      expect(data.status).toBe(200);
      let dataMessages = data.messages;
      let testingMessage = dataMessages.find(
        (subject) => subject.subject === "ContactTest"
      );
      await checkMessageApi(TOKEN, testingMessage._id, false).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
  it("Remove test mensaje", async () => {
    await getMessagesUnreadApi(TOKEN, false).then( async (data) => {
      expect(data.status).toBe(200);
      let dataMessages = data.messages;
      let testingMessage = dataMessages.find(
        (subject) => subject.subject === "ContactTest"
      );
      await deleteContactMessageApi(TOKEN, testingMessage._id).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
});
