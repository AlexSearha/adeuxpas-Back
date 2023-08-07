BEGIN;

DROP TABLE IF EXISTS "role", "member", "category", "sub_category", "activity", "search_result";

DROP DOMAIN rfc_email, date_of_birth, phone, postal_code_fr;

CREATE DOMAIN "rfc_email" AS text
CHECK (value ~ '^(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$');

CREATE DOMAIN "date_of_birth" AS text
CHECK (value ~'^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$');

CREATE DOMAIN "phone" AS text
CHECK (value ~ '^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$');

CREATE DOMAIN "postal_code_fr" AS text
CHECK (value ~ '^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$');


CREATE TABLE "role" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text NOT NULL
);

CREATE TABLE "member" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" text,
    "lastname" text,
    "email" rfc_email NOT NULL UNIQUE,
    "password" text NOT NULL,
    "dateofbirth" date_of_birth, 
    "phone_number" phone NOT NULL UNIQUE,
    "photo" text,  
    "address" text,
    "zipcode" postal_code_fr,
    "city" text,
    "country" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "role_id" int DEFAULT 1 NOT NULL REFERENCES "role"("id")
);

CREATE TABLE "category" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text NOT NULL
);

CREATE TABLE "sub_category" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text NOT NULL,
    "category_id" INTEGER NOT NULL REFERENCES "category"("id")
);

CREATE TABLE "activity" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text NOT NULL,
    "address" text NOT NULL,
    "latitude" text NOT NULL,
    "longitude" text NOT NULL,
    "photo" text NOT NULL,
    "sub_category_id" int NOT NULL REFERENCES "sub_category"("id")
);

CREATE TABLE "search_result" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "address_departure" text NOT NULL,
    "address_destination" text NOT NULL,
    "cardinal_point" text NOT NULL,
    "gps_latitude" decimal NOT NULL,
    "gps_longitude" decimal NOT NULL,
    "date_of_arrival" date NOT NULL,
    "date_of_departure" date NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "category_id" int NOT NULL REFERENCES "category"("id"),
	"sub_category_id" int NOT NULL REFERENCES "sub_category"("id"),
    "activity_id" int NOT NULL REFERENCES "activity"("id"),
    "member_id" int NOT NULL REFERENCES "member"("id")
);

COMMIT;