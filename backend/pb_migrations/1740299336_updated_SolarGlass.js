/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // update collection data
  unmarshal({
    "name": "GlassEntry"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // update collection data
  unmarshal({
    "name": "SolarGlass"
  }, collection)

  return app.save(collection)
})
