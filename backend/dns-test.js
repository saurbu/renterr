const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("Starting...");

setTimeout(() => {
  console.log("TIMEOUT");
  process.exit(1);
}, 10000);

dns.resolveSrv(
  "_mongodb._tcp.cluster0.ocvtiz8.mongodb.net",
  (err, records) => {
    console.log("ERR:", err);
    console.log("RECORDS:", records);
    process.exit(0);
  }
);
