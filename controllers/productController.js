exports.testProduct = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      greeting: "Hello from dummy route for product",
    });
  } catch (err) {
    console.log(err);
  }
};
