-- This is the root role for the database
CREATE ROLE tfa WITH LOGIN PASSWORD 'svsHfaMn8MCLnHh' SUPERUSER;

-- This is the no-access role that PostGraphile will run as by default
CREATE ROLE tfa_public WITH LOGIN PASSWORD 'svsHfaMn8MCLnHh' NOINHERIT;

REVOKE ALL ON DATABASE tfa FROM PUBLIC;
GRANT CONNECT ON DATABASE tfa TO tfa;
GRANT CONNECT ON DATABASE tfa TO tfa_public;
GRANT ALL ON DATABASE tfa TO tfa;