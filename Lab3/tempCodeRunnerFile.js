try {
  const a = await booksByPageCount(300, 500);
  console.log(a);
} catch (error) {
  console.log(error.message);
}