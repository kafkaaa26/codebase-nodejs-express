CREATE TABLE "scheme"."users-tbl" (
	username varchar(10) NOT NULL,
	email varchar(255) NULL,
	is_rejected bool NULL DEFAULT false,
	CONSTRAINT users_tbl_pk PRIMARY KEY (username)
);

-- cat init-dbtable.sql | PGPASSWORD=pw psql -h host -U user -d database -f -