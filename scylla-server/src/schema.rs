// @generated automatically by Diesel CLI.

diesel::table! {
    data (time, dataTypeName) {
        values -> Nullable<Array<Nullable<Float8>>>,
        time -> Timestamptz,
        dataTypeName -> Text,
        runId -> Text,
    }
}

diesel::table! {
    data_type (name) {
        name -> Text,
        unit -> Text,
        nodeName -> Text,
    }
}

diesel::table! {
    run (id) {
        id -> Text,
        runId -> Int4,
        driverName -> Text,
        notes -> Text,
        time -> Timestamptz,
    }
}

diesel::joinable!(data -> data_type (dataTypeName));
diesel::joinable!(data -> run (runId));

diesel::allow_tables_to_appear_in_same_query!(
    data,
    data_type,
    run,
);
