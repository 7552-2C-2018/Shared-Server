--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-1.pgdg14.04+1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: add_appserver(character varying, character varying); Type: FUNCTION; Schema: public; Owner: djqwxgjfyscimj
--

CREATE FUNCTION public.add_appserver(newname character varying, newurl character varying) RETURNS integer
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


ALTER FUNCTION public.add_appserver(newname character varying, newurl character varying) OWNER TO djqwxgjfyscimj;

--
-- Name: delete_appserver(integer); Type: FUNCTION; Schema: public; Owner: djqwxgjfyscimj
--

CREATE FUNCTION public.delete_appserver(anid integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
begin
delete from appservers where id = anId;
delete from users where loginId = anId;
end;
$$;


ALTER FUNCTION public.delete_appserver(anid integer) OWNER TO djqwxgjfyscimj;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: appservers; Type: TABLE; Schema: public; Owner: djqwxgjfyscimj
--

CREATE TABLE public.appservers (
    url character varying(100) NOT NULL,
    name character varying(50),
    rev character varying(100),
    createdtime double precision,
    lastconnection double precision,
    createdby character varying(100),
    id integer NOT NULL
);


ALTER TABLE public.appservers OWNER TO djqwxgjfyscimj;

--
-- Name: appservers_id_seq; Type: SEQUENCE; Schema: public; Owner: djqwxgjfyscimj
--

ALTER TABLE public.appservers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.appservers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: djqwxgjfyscimj
--

CREATE TABLE public.payments (
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


ALTER TABLE public.payments OWNER TO djqwxgjfyscimj;

--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: djqwxgjfyscimj
--

ALTER TABLE public.payments ALTER COLUMN transaction_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: paymentmethods; Type: TABLE; Schema: public; Owner: djqwxgjfyscimj
--

CREATE TABLE public.paymentmethods (
    paymethod character varying(50),
    parameter character varying(50)
);


ALTER TABLE public.paymentmethods OWNER TO djqwxgjfyscimj;

--
-- Name: shipments; Type: TABLE; Schema: public; Owner: djqwxgjfyscimj
--

CREATE TABLE public.shipments (
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


ALTER TABLE public.shipments OWNER TO djqwxgjfyscimj;

--
-- Name: shipments_id_seq; Type: SEQUENCE; Schema: public; Owner: djqwxgjfyscimj
--

CREATE SEQUENCE public.shipments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shipments_id_seq OWNER TO djqwxgjfyscimj;

--
-- Name: shipments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: djqwxgjfyscimj
--

ALTER SEQUENCE public.shipments_id_seq OWNED BY public.shipments.id;


--
-- Name: shipmentsteps; Type: TABLE; Schema: public; Owner: djqwxgjfyscimj
--

CREATE TABLE public.shipmentsteps (
    lat double precision,
    lon double precision,
    "timestamp" double precision,
    shipmentid character varying(50)
);


ALTER TABLE public.shipmentsteps OWNER TO djqwxgjfyscimj;

--
-- Name: states; Type: TABLE; Schema: public; Owner: djqwxgjfyscimj
--

CREATE TABLE public.states (
    id integer,
    description character varying(50)
);


ALTER TABLE public.states OWNER TO djqwxgjfyscimj;

--
-- Name: users; Type: TABLE; Schema: public; Owner: djqwxgjfyscimj
--

CREATE TABLE public.users (
    id integer NOT NULL,
    profile character varying(10),
    state integer,
    loginid integer
);


ALTER TABLE public.users OWNER TO djqwxgjfyscimj;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: djqwxgjfyscimj
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: shipments id; Type: DEFAULT; Schema: public; Owner: djqwxgjfyscimj
--

ALTER TABLE ONLY public.shipments ALTER COLUMN id SET DEFAULT nextval('public.shipments_id_seq'::regclass);


--
-- Data for Name: appservers; Type: TABLE DATA; Schema: public; Owner: djqwxgjfyscimj
--

COPY public.appservers (url, name, rev, createdtime, lastconnection, createdby, id) FROM stdin;
https://app-server-23.herokuapp.com	App Server	\N	1539293068.36733699	\N	7	7
http://www.url.com	holaaa	\N	1539195433.35834098	\N	6	6
\.


--
-- Data for Name: paymentmethods; Type: TABLE DATA; Schema: public; Owner: djqwxgjfyscimj
--

COPY public.paymentmethods (paymethod, parameter) FROM stdin;
Card	Number
Card	Type
Debit	Type
Debit	Suc
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: djqwxgjfyscimj
--

COPY public.payments (transaction_id, currency, value, expiration_month, expiration_year, number, type, state, ownerid) FROM stdin;
2	USD	21	12	2020	1234567890	MASTER	1	1
5	ars	200	11	2020	1111	american express	\N	1
6	ars	200	11	2020	1111	american express	\N	1
7	ars	200	11	2020	1111	american express	\N	1
8	ars	200	11	2020	1111	american express	\N	1
9	ars	200	11	2020	1111	american express	\N	1
10	ARS	43	09	2019	2323	undefined	\N	1
11	ars	500	11	2020	1111	Macro	\N	1
12	ars	500	11	2020	1111	Macro	\N	1
13	ars	500	11	2020	1111	Macro	\N	1
14	ars	500	11	2020	1111	Macro	\N	1
15	ars	500	11	2020	1111	Macro	\N	1
16	ars	500	11	2020	1111	Macro	\N	1
17	ars	500	11	2020	1111	Macro	\N	1
18	ars	500	11	2020	1111	Macro	\N	1
19	ars	500	11	2020	111	Macro	\N	1
20	ars	1000	11	2011	11111	MACRO	\N	MACRO
21	ARS	43	09	2019	2323	undefined	\N	2
22	ARS	10	08	2019	23232323232	Credit Card	\N	2
1	ARS	123	08	2019	478968953251	Visa	1	1
3	ars	200	11	2020	1111	american express	0	1
4	ars	200	11	2020	1111	american express	0	1
23	557	46	12	2022	24453	ffds	1	undefined
\.


--
-- Data for Name: shipments; Type: TABLE DATA; Schema: public; Owner: djqwxgjfyscimj
--

COPY public.shipments (ownerid, start_time, start_street, start_lat, start_lon, end_time, end_street, end_lat, end_lon, distance, currency, value, id, state) FROM stdin;
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	6	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	7	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	8	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	9	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	10	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	11	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	12	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	13	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	14	\N
dgsdgds	\N	San Luis 1258	123456	123456	\N	Amoedo 1204	1234566	123456	123	ARS	123	15	\N
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	3	0
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	4	0
plala	123123.123122999998	Paseo Colon	494.230000000000018	1239.42129999999997	40.1229999999999976	Plaza MAyo	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	5	1
23343	0	independencia	55	56	0	Alem	-34.5559999999999974	56.1212000000000018	23	ARS	20	16	\N
23343	0	independencia	55	56	0	Alem	-34.5559999999999974	56.1212000000000018	23	ARS	20	17	\N
23343	0	independencia	55	56	0	Alem	-34.5559999999999974	56.1212000000000018	23	ARS	20	18	\N
23343	0	independencia	55	56	0	Alem	-34.5559999999999974	56.1212000000000018	23	ARS	20	19	\N
991543595846	0		55	56	0	av. las heras 2390 2 b, caba	-34.586748	-58.3981610000000018	\N	ars	500	20	\N
991543595984	0		55	56	0	av. las heras 2390 2 b, caba	-34.586748	-58.3981610000000018	14548.9038834711846	ars	500	21	\N
991543596054	0		55	56	0	av. las heras 2390 2 b, caba	-34.586748	-58.3981610000000018	14548.9038834711846	ars	500	22	\N
991543596077	0		55	56	0	av. las heras 2390 2 b, caba	-34.586748	-58.3981610000000018	14548.9038834711846	ars	500	23	\N
1	0	Avenida Siempre viva	4300.23199999999997	431.12299999999999	0	Washington Street	123.123000000000005	5454.13240000000042	123.120000000000005	usd	141.22999999999999	24	\N
pepe	23.1999999999999993	SiempreViva	494.230000000000018	1239.42129999999997	54.2000000000000028	SIEMPRE_FIN	123123.123212999999	41213.4124119999979	12.3000000000000007	ARS	1233	1	1
undefined	0	fsefsd	342434	43423243	0	dsfg	34253	235523	323	ars	12135	25	0
\.


--
-- Data for Name: shipmentsteps; Type: TABLE DATA; Schema: public; Owner: djqwxgjfyscimj
--

COPY public.shipmentsteps (lat, lon, "timestamp", shipmentid) FROM stdin;
483.230000000000018	23.1230000000000011	1232131312.23213005	1
4823.22999999999956	123.123000000000005	12321312.2321300004	1
483.230000000000018	23.1230000000000011	1232131312.23213005	[object Object]
4823.22999999999956	123.123000000000005	12321312.2321300004	[object Object]
483.230000000000018	23.1230000000000011	1232131312.23213005	13
4823.22999999999956	123.123000000000005	12321312.2321300004	13
483.230000000000018	23.1230000000000011	1232131312.23213005	14
4823.22999999999956	123.123000000000005	12321312.2321300004	14
\.


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: djqwxgjfyscimj
--

COPY public.states (id, description) FROM stdin;
1	Offline
2	Online
6	Pago pendiente de proceso
7	Pago rechazado
8	Pago aceptado
9	Envio en progreso
10	Pendiente de envio
11	Envio realizado
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: djqwxgjfyscimj
--

COPY public.users (id, profile, state, loginid) FROM stdin;
6	server	1	0
11	server	1	6
1	admin	\N	1
12	server	1	7
\.


--
-- Name: appservers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: djqwxgjfyscimj
--

SELECT pg_catalog.setval('public.appservers_id_seq', 40, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: djqwxgjfyscimj
--

SELECT pg_catalog.setval('public.payment_id_seq', 23, true);


--
-- Name: shipments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: djqwxgjfyscimj
--

SELECT pg_catalog.setval('public.shipments_id_seq', 25, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: djqwxgjfyscimj
--

SELECT pg_catalog.setval('public.users_id_seq', 45, true);


--
-- Name: appservers appservers_pkey; Type: CONSTRAINT; Schema: public; Owner: djqwxgjfyscimj
--

ALTER TABLE ONLY public.appservers
    ADD CONSTRAINT appservers_pkey PRIMARY KEY (url);


--
-- Name: shipments shipments_pkey; Type: CONSTRAINT; Schema: public; Owner: djqwxgjfyscimj
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: djqwxgjfyscimj
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO djqwxgjfyscimj;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO djqwxgjfyscimj;


--
-- PostgreSQL database dump complete
--

