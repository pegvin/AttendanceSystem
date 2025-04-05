/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "(@request.auth.role = \"admin\" && @request.body.role = \"teacher\") || (@request.auth.role = \"teacher\" && @request.body.role = \"student\")",
    "deleteRule": "(@request.auth.role = \"admin\" && @request.body.role = \"teacher\") || (@request.auth.role = \"teacher\" && @request.body.role = \"student\")",
    "listRule": "id = @request.auth.id || (@request.auth.role = \"admin\" && @request.body.role = \"teacher\")",
    "viewRule": "id = @request.auth.id || (@request.auth.role = \"admin\" && @request.body.role = \"teacher\")"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.collectionName = \"admins\"",
    "deleteRule": "@request.auth.collectionName = \"admins\"",
    "listRule": "id = @request.auth.id || @request.auth.collectionName = \"admins\"",
    "viewRule": "id = @request.auth.id || @request.auth.collectionName = \"admins\""
  }, collection)

  return app.save(collection)
})
