// @generated automatically by Diesel CLI.

diesel::table! {
    data (time, dataTypeName) {
        values -> Array<Nullable<Float4>>,
        dataTypeName -> Text,
        time -> Timestamptz,
        runId -> Int4,
    }
}

diesel::table! {
    dataType (name) {
        name -> Text,
        unit -> Text,
        nodeName -> Text,
    }
}

diesel::table! {
    run (id) {
        id -> Int4,
        locationName -> Nullable<Text>,
        latitude -> Nullable<Float8>,
        longitude -> Nullable<Float8>,
        driverName -> Nullable<Text>,
        notes -> Text,
        time -> Timestamptz,
    }
}

diesel::joinable!(data -> dataType (dataTypeName));
diesel::joinable!(data -> run (runId));

diesel::allow_tables_to_appear_in_same_query!(
    data,
    dataType,
    run,
);
