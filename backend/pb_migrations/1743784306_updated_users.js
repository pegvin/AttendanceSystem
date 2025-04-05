/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "id = @request.auth.id",
    "deleteRule": "id = @request.auth.id",
    "listRule": "id = @request.auth.id",
    "manageRule": null,
    "viewRule": "id = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "(@request.auth.role = \"admin\" && @request.body.role = \"teacher\") || (@request.auth.role = \"teacher\" && @request.body.role = \"student\")",
    "deleteRule": "(@request.auth.role = \"admin\" && @request.body.role = \"teacher\") || (@request.auth.role = \"teacher\" && @request.body.role = \"student\")",
    "listRule": "@request.auth.role = \"admin\" && @request.body.role = \"teacher\"",
    "manageRule": "@request.auth.collectionName = \"admins\"",
    "viewRule": "id = @request.auth.id || (@request.auth.role = \"admin\" && @request.body.role = \"teacher\")"
  }, collection)

  return app.save(collection)
})
