FROM postgres
ENV POSTGRES_PASSWORD EzNvoiceFTW
ENV POSTGRES_DB eznvoicedb
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432