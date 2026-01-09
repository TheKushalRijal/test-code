export function getTestData() {
  return [
    {
      id: "home_profile_valid_case_1",

      input: {
        api: "GET_PROFILE",
        token: "VALID_TOKEN_1"
      },

      expectedOutput: {
        status: 200,
        balanceType: "number",
        balanceGreaterThanOrEqual: 0
      }
    },

    {
      id: "home_profile_valid_case_2",

      input: {
        api: "GET_PROFILE",
        token: "VALID_TOKEN_2"
      },

      expectedOutput: {
        status: 200,
        balanceType: "number",
        balanceGreaterThanOrEqual: 0
      }
    }
  ];
}
