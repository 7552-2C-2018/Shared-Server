--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Ubuntu 10.5-0ubuntu0.18.04)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-0ubuntu0.18.04)

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


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: appservers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.appservers (
    id integer,
    description character varying(100),
    url character varying(200),
    state integer
);


ALTER TABLE public.appservers OWNER TO admin;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.payments (
    id integer,
    amount real,
    description character varying(100),
    state integer,
    method character varying(50)
);


ALTER TABLE public.payments OWNER TO admin;

--
-- Name: shipments; Type: TABLE; Schema: public; Owner: event
--

CREATE TABLE public.shipments (
    id integer,
    description character varying(200),
    state integer
);


ALTER TABLE public.shipments OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: event
--

CREATE TABLE public.users (
    id integer,
    name character varying(100),
    lastname character varying(100),
    mail character varying(100),
    points integer,
    startdate date,
    password character varying(30),
    profile integer
);


ALTER TABLE public.users OWNER TO admin;

--
-- Data for Name: appservers; Type: TABLE DATA; Schema: public; Owner: event
--

COPY public.appservers (id, description, url, state) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: event
--

COPY public.payments (id, amount, description, state, method) FROM stdin;
\.


--
-- Data for Name: shipments; Type: TABLE DATA; Schema: public; Owner: event
--

COPY public.shipments (id, description, state) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: event
--

COPY public.users (id, name, lastname, mail, points, startdate, password, profile) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

