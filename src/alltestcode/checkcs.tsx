import axios from "axios";





type UITestRow = {
  name: string;
  expected: string;
  output: string;
  status: "pass" | "fail";
};












const createCsTestCases = [
  {
    name: "Create CS match with valid data",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2M2MTVjNWI1YWM3MzE1MzZlODI4YiIsImlhdCI6MTc2NzkzMjc3MCwiZXhwIjoxNzcwNTI0NzcwfQ.4IGJ5EdEY7MxweHhGvZGC3yoNnyDpN9M0kK-G7cbr98",
    inputData: {
      matchDetails: {
        betAmount: 50,
        map: "Bermuda",
        rounds: 3,
      },
    },
    expected: { status: 200, message: "Match created successfully!" },
  },
  {
    name: "Create CS with insufficient balance",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2M2MTVjNWI1YWM3MzE1MzZlODI4YiIsImlhdCI6MTc2NzkzMjc3MCwiZXhwIjoxNzcwNTI0NzcwfQ.4IGJ5EdEY7MxweHhGvZGC3yoNnyDpN9M0kK-G7cbr98",
    inputData: {
      matchDetails: { betAmount: 10000 },
    },
    expected: { status: 400, message: "You don’t have enough balance" },
  },
  {
    name: "Create CS while already playing",
    token: "ALREADY_PLAYING_TOKEN",
    inputData: {
      matchDetails: { betAmount: 50 },
    },
    expected: { status: 400, message: "You are already playing" },
  },
  {
    name: "Create CS without Freefire name",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2M2MTVjNWI1YWM3MzE1MzZlODI4YiIsImlhdCI6MTc2NzkzMjc3MCwiZXhwIjoxNzcwNTI0NzcwfQ.4IGJ5EdEY7MxweHhGvZGC3yoNnyDpN9M0kK-G7cbr98",
    inputData: {
      matchDetails: { betAmount: 50 },
    },
    expected: { status: 400, message: "Add Freefire GameName in your profile" },
  },
];

export async function runCreateCsTests(BASE_URL: string): Promise<UITestRow[]> {
  const results: UITestRow[] = [];

  for (const test of createCsTestCases) {
    try {
      const res = await axios.post(
        `${BASE_URL}/khelmela/games/freefire/createCs`,
        test.inputData,
        { headers: { Authorization: test.token } }
      );

      if (
        res.status === test.expected.status &&
        res.data?.message === test.expected.message
      ) {
        results.push({
          name: test.name,
          expected: test.expected.message,
          output: res.data.message,
          status: "pass",
        });
      } else {
        results.push({
          name: test.name,
          expected: test.expected.message,
          output: res.data.message,
          status: "fail",
        });
      }
    } catch (err: any) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      results.push({
        name: test.name,
        expected: test.expected.message,
        output: msg ?? "Server error",
        status:
          status === test.expected.status && msg === test.expected.message
            ? "pass"
            : "fail",
      });
    }
  }

  return results;
}

export async function runGetCsDataTests(
  BASE_URL: string
): Promise<UITestRow[]> {
  const results: UITestRow[] = [];

  try {
    const res = await axios.get(
      `${BASE_URL}/khelmela/games/freefire/getCsData`,
      { headers: { Authorization: "VALID_TEST_TOKEN" } }
    );

    if (res.status === 200 && res.data?.card && res.data?.matchjoin) {
      results.push({
        name: "Get CS data with valid token",
        expected: "card & matchjoin arrays",
        output: "Received CS data",
        status: "pass",
      });
    } else {
      results.push({
        name: "Get CS data with valid token",
        expected: "card & matchjoin arrays",
        output: "Invalid response structure",
        status: "fail",
      });
    }
  } catch (err: any) {
    results.push({
      name: "Get CS data with valid token",
      expected: "200 OK",
      output: err.response?.status,
      status: "fail",
    });
  }

  return results;
}


export async function runJoinUserTests(
  BASE_URL: string
): Promise<UITestRow[]> {
  const results: UITestRow[] = [];

  try {
    const res = await axios.post(
      `${BASE_URL}/khelmela/games/freefire/joinuser`,
      { matchId: "VALID_MATCH_ID" },
      { headers: { Authorization: "VALID_TEST_TOKEN" } }
    );

    results.push({
      name: "Join CS match successfully",
      expected: "Joined successfully",
      output: res.data.message,
      status: res.status === 200 ? "pass" : "fail",
    });
  } catch (err: any) {
    results.push({
      name: "Join CS match successfully",
      expected: "Joined successfully",
      output: err.response?.data?.message,
      status: "fail",
    });
  }

  return results;
}

export async function runCustomIdTests(
  BASE_URL: string
): Promise<UITestRow[]> {
  const results: UITestRow[] = [];

  try {
    const res = await axios.post(
      `${BASE_URL}/khelmela/games/freefire/customIdAndPassword`,
      {
        matchId: "VALID_MATCH_ID",
        customId: "ROOM123",
        customPassword: "PASS123",
      },
      { headers: { Authorization: "HOST_TOKEN" } }
    );

    results.push({
      name: "Publish custom ID & password",
      expected: "Custom ID and password updated successfully",
      output: res.data.message,
      status: res.status === 200 ? "pass" : "fail",
    });
  } catch (err: any) {
    results.push({
      name: "Publish custom ID & password",
      expected: "200 OK",
      output: err.response?.data?.message,
      status: "fail",
    });
  }

  return results;
}


export async function runDidYouWinTests(
  BASE_URL: string
): Promise<UITestRow[]> {
  const results: UITestRow[] = [];

  // LOSS
  try {
    const res = await axios.post(
      `${BASE_URL}/khelmela/games/freefire/DidYouWinMatch`,
      { matchId: "VALID_MATCH_ID", boolean: false },
      { headers: { Authorization: "PLAYER_TOKEN" } }
    );

    results.push({
      name: "Submit loss result",
      expected: "Match completed or conflict",
      output: res.data.message,
      status: "pass",
    });
  } catch (e: any) {
    results.push({
      name: "Submit loss result",
      expected: "200 OK",
      output: e.response?.data?.message,
      status: "fail",
    });
  }

  // WIN WITHOUT PROOF
  try {
    await axios.post(
      `${BASE_URL}/khelmela/games/freefire/DidYouWinMatch`,
      { matchId: "VALID_MATCH_ID", boolean: true },
      { headers: { Authorization: "PLAYER_TOKEN" } }
    );
  } catch (e: any) {
    results.push({
      name: "Submit win without proof",
      expected: "Proof required for win",
      output: e.response?.data?.message,
      status:
        e.response?.status === 400 ? "pass" : "fail",
    });
  }

  return results;
}
