/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\" && created = @now"
  }, collection)

  return app.save(collection)
})
