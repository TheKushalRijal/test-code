import { runLoginTests } from "./alltestcode/login";
import { runSigninTests } from "./alltestcode/signup";
import {
  runGetCsDataTests,
  runCreateCsTests,
  runJoinUserTests,
} from "./alltestcode/checkcs";
import { runGetProfileTests } from "./alltestcode/loaduserdata";
import { runUploadImageTests } from "./alltestcode/uploadimage";
import { runSearchUsersTests } from "./alltestcode/chats/searchuser";
import { runSendFriendRequestTests } from "./alltestcode/chats/checkfriends";
const BASE_URL = "http://192.168.1.153:8080"; // ONE place only

export async function runAllTestsForUI() {
  const results = [];

  const [
    loginResults,
    signinResults,
    profileResults,
    createCsResults,
    joinUserResults,
    uploadImageResults,
    usersearch,
    friendrequest,
  ] = await Promise.all([
    runLoginTests(BASE_URL),
    runSigninTests(BASE_URL),
    runGetProfileTests(BASE_URL),
    runCreateCsTests(BASE_URL),
    runJoinUserTests(BASE_URL),
    runUploadImageTests(BASE_URL),
    runSearchUsersTests(BASE_URL),
   
  ]);

  results.push(
    ...loginResults,
    ...signinResults,
    ...profileResults,
    ...createCsResults,
    ...joinUserResults,
    ...uploadImageResults,
    ...usersearch,
   
  );

  return results;
}
