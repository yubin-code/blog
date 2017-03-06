
import article from "./article";
import author from "./author";
import category from "./category";

module.exports = function (app){
  app.use("/", article);
  app.use("/category", category);
  app.use("/author", author);
};
