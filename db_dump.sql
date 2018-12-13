CREATE FUNCTION add_appserver(newname character varying, newurl character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare
idResult integer;
begin
insert into appservers (url, name, createdtime) values (newUrl, newName, EXTRACT( epoch from now())) RETURNING id into idResult;
update appservers set createdby= idResult where id = idResult;
insert into users (profile, state, loginId) values ('server', 1, idResult);

RETURN idResult;
end;
$$;



--
-- Name: delete_appserver(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION delete_appserver(anid integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
begin
delete from appservers where id = anId;
delete from users where loginId = anId;
end;
$$;



SET default_tablespace = '';

SET default_with_oids = false;


CREATE TABLE appservers (
    url character varying(100) NOT NULL,
    name character varying(50),
    rev character varying(100),
    createdtime double precision,
    lastconnection double precision,
    createdby character varying(100),
    id integer NOT NULL
);

ALTER TABLE appservers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME appservers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payments (
    transaction_id integer NOT NULL,
    currency character varying(10),
    value double precision,
    expiration_month character varying(2),
    expiration_year character varying(4),
    number character varying(20),
    type character varying(20),
    state integer,
    ownerid character varying(50)
);



--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE payments ALTER COLUMN transaction_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: paymentmethods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE paymentmethods (
    paymethod character varying(50),
    parameter character varying(50)
);



--
-- Name: shipments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE shipments (
    ownerid character varying(50),
    start_time double precision,
    start_street character varying(100),
    start_lat double precision,
    start_lon double precision,
    end_time double precision,
    end_street character varying(100),
    end_lat double precision,
    end_lon double precision,
    distance double precision,
    currency character varying(10),
    value double precision,
    id integer NOT NULL,
    state integer
);



--
-- Name: shipments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE shipments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: shipments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE shipments_id_seq OWNED BY shipments.id;


--
-- Name: shipmentsteps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE shipmentsteps (
    lat double precision,
    lon double precision,
    "timestamp" double precision,
    shipmentid character varying(50)
);



--
-- Name: states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE states (
    id integer,
    description character varying(50)
);



--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    profile character varying(10),
    state integer,
    loginid integer
);



--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: shipments id; Type: DEFAULT; Schema: public; Owner: postgres
--

--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--



--
-- Name: appservers appservers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY appservers
    ADD CONSTRAINT appservers_pkey PRIMARY KEY (url);


--
-- Name: shipments shipments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY shipments
    ADD CONSTRAINT shipments_pkey PRIMARY KEY (id);
    insert into states values (1, 'Offline');
    insert into states values (1, 'Online');
    insert into states values (6, 'Pago pendiente de proceso');
    insert into states values (7, 'Pago rechazado');
    insert into states values (8, 'Pago aceptado');
    insert into states values (9, 'Envio en progreso');
    insert into states values (10, 'Pendiente de envio');
    insert into states values (11, 'Envio realizado');

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--


--
-- PostgreSQL database dump complete
--
