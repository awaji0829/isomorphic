module.exports = function (env) {
  let ENV = env["dev"] === true ? "dev" : "prod";
  // 이부분 환경변수 처리 고민
  return require(`./webpack.server`);
};
