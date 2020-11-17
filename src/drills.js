require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function searchByText(searchTerm) {
  knexInstance
    .select("id", "item_name", "price", "category")
    .from("shopping_list")
    .where("item_name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}
// searchByText("ham");

function paginateProducts(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select("id", "item_name", "price", "category", "checked", "date_added")
    .from("shopping_list")
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

paginateProducts(2);

function searchAfterDate(daysAgo) {
  knexInstance
    .select("id", "item_name", "price", "date_added")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days' ::Interval`, daysAgo)
    )
    .then((restuls) => {
      console.log(results);
    });
}
