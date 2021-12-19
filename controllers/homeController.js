const BigPromise = require("../middlewares/bigPromise");

exports.home = BigPromise((req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello from API",
  });
});

















































/*ALternative to BigPromise

exports.home = (req, res) => {
  try{
  res.status(200).json({
    success: true,
    greeting: "Hello from API",
  });

}
catch(err){
  console.log(err);
}
}

*/