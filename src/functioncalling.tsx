import { runLoginTests } from "./alltestcode/login";
import { runSigninTests } from "./alltestcode/signup";
import { runCreateCsTests } from "./alltestcode/cs_matchcard";
import { runDeleteCardTests } from "./alltestcode/cs_matchcard";
import { TEST_TOKENS } from "./tokens";

const BASE_URL = "http://192.168.1.153:8080";

export async function runAllTestsForUI() {
  const results: any[] = [];

  // run non-auth tests once
  const [loginResults, signinResults] = await Promise.all([
    runLoginTests(BASE_URL),
    runSigninTests(BASE_URL),
  ]);

  results.push(...loginResults, ...signinResults);

  // run create → delete per token
  for (const token of TEST_TOKENS) {
    const { results: createResults, createdMatchIds } =
      await runCreateCsTests(BASE_URL, token);

    results.push(...createResults);
    console.log("this is match id",createdMatchIds);
    if (createdMatchIds.length > 0) {
      const deleteResults = await runDeleteCardTests(
        BASE_URL,
        token,
        createdMatchIds
      );

      results.push(...deleteResults);
    }
  }

  return results;
}
