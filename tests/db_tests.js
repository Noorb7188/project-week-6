const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getData");
const postData = require("../src/queries/postData");

tape("tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape('showData function', (t) => {
  runDbBuild(function(err, res) {
    t.error(err, "No Error");
    let expected = [{id :1,
                    username: "Noor"}];
    showData((err, result) => {
      if (err) { console.log(err); }
      t.deepEqual(result, expected, "Returns expected data");
      t.end();
    });
  });
});

tape ("addData function", (t) => {
  runDbBuild(function(err, res) {
      t.error(err, "No Error");
      let expected = [{id :1,
                      name: "Noor"},
                    {id :2,
                    name: "Saleh"}];
  postData("Saleh", (err, result) => {
    if (err) { console.log(err); }
    getData((err, result) => {
      if (err) console.log(err);
    t.deepEqual(result, expected, "Returns expected data");
    t.end();
   });
  });
 });
});
