PGDMP     :                     v            sharedserverdb !   10.5 (Ubuntu 10.5-0ubuntu0.18.04) !   10.5 (Ubuntu 10.5-0ubuntu0.18.04)     l           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            m           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            n           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            o           1262    24578    sharedserverdb    DATABASE     �   CREATE DATABASE sharedserverdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE sharedserverdb;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            p           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    13041    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            q           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    32795 
   appservers    TABLE     �   CREATE TABLE public.appservers (
    id integer,
    description character varying(100),
    url character varying(200),
    state integer
);
    DROP TABLE public.appservers;
       public         event    false    3            �            1259    32798    payments    TABLE     �   CREATE TABLE public.payments (
    id integer,
    amount real,
    description character varying(100),
    state integer,
    method character varying(50)
);
    DROP TABLE public.payments;
       public         event    false    3            �            1259    32792 	   shipments    TABLE     m   CREATE TABLE public.shipments (
    id integer,
    description character varying(200),
    state integer
);
    DROP TABLE public.shipments;
       public         event    false    3            �            1259    32780    users    TABLE     �   CREATE TABLE public.users (
    id integer,
    name character varying(100),
    lastname character varying(100),
    mail character varying(100),
    points integer,
    startdate date,
    password character varying(30),
    profile integer
);
    DROP TABLE public.users;
       public         event    false    3            h          0    32795 
   appservers 
   TABLE DATA               A   COPY public.appservers (id, description, url, state) FROM stdin;
    public       event    false    198   �       i          0    32798    payments 
   TABLE DATA               J   COPY public.payments (id, amount, description, state, method) FROM stdin;
    public       event    false    199   �       g          0    32792 	   shipments 
   TABLE DATA               ;   COPY public.shipments (id, description, state) FROM stdin;
    public       event    false    197   �       f          0    32780    users 
   TABLE DATA               _   COPY public.users (id, name, lastname, mail, points, startdate, password, profile) FROM stdin;
    public       event    false    196   �       h      x������ � �      i      x������ � �      g      x������ � �      f      x������ � �     