const sync = process.env.SERVER_FIRST_DEPLOY === "first_deploy";
const force = process.env.SERVER_FIRST_DEPLOY === "first_deploy";
const firstCommit = process.env.SERVER_FIRST_DEPLOY === "first_deploy";

module.exports = { sync, force, firstCommit }