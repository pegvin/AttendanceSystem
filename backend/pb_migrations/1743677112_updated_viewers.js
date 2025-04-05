/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3650909885")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_3650909885` ON `non_students` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_3650909885` ON `non_students` (`email`) WHERE `email` != ''"
    ],
    "name": "non_students"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3650909885")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_3650909885` ON `viewers` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_3650909885` ON `viewers` (`email`) WHERE `email` != ''"
    ],
    "name": "viewers"
  }, collection)

  return app.save(collection)
})
