--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2

-- Started on 2022-06-22 19:01:15 +07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 6659675)
-- Name: comment; Type: TABLE; Schema: public; Owner: dkfgxfsaaapyhh
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    content text,
    created_at timestamp with time zone DEFAULT now(),
    post_id integer,
    author_id integer
);


ALTER TABLE public.comment OWNER TO dkfgxfsaaapyhh;

--
-- TOC entry 213 (class 1259 OID 6659674)
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: dkfgxfsaaapyhh
--

ALTER TABLE public.comment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 212 (class 1259 OID 6659584)
-- Name: post; Type: TABLE; Schema: public; Owner: dkfgxfsaaapyhh
--

CREATE TABLE public.post (
    id integer NOT NULL,
    author_id integer,
    created_at timestamp with time zone DEFAULT now(),
    content text,
    title character varying
);


ALTER TABLE public.post OWNER TO dkfgxfsaaapyhh;

--
-- TOC entry 211 (class 1259 OID 6659583)
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: dkfgxfsaaapyhh
--

ALTER TABLE public.post ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 6659693)
-- Name: reaction; Type: TABLE; Schema: public; Owner: dkfgxfsaaapyhh
--

CREATE TABLE public.reaction (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    post_id integer,
    author_id integer
);


ALTER TABLE public.reaction OWNER TO dkfgxfsaaapyhh;

--
-- TOC entry 215 (class 1259 OID 6659692)
-- Name: reaction_id_seq; Type: SEQUENCE; Schema: public; Owner: dkfgxfsaaapyhh
--

ALTER TABLE public.reaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 6659572)
-- Name: user; Type: TABLE; Schema: public; Owner: dkfgxfsaaapyhh
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    fullname character varying,
    dob character varying,
    username character varying,
    password character varying,
    is_admin boolean DEFAULT false
);


ALTER TABLE public."user" OWNER TO dkfgxfsaaapyhh;

--
-- TOC entry 209 (class 1259 OID 6659571)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: dkfgxfsaaapyhh
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4175 (class 2606 OID 6659681)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: dkfgxfsaaapyhh
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- TOC entry 4173 (class 2606 OID 6659588)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: dkfgxfsaaapyhh
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- TOC entry 4177 (class 2606 OID 6659697)
-- Name: reaction reaction_pkey; Type: CONSTRAINT; Schema: public; Owner: dkfgxfsaaapyhh
--

ALTER TABLE ONLY public.reaction
    ADD CONSTRAINT reaction_pkey PRIMARY KEY (id);


--
-- TOC entry 4171 (class 2606 OID 6659578)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: dkfgxfsaaapyhh
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 4322 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: dkfgxfsaaapyhh
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO dkfgxfsaaapyhh;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 4323 (class 0 OID 0)
-- Dependencies: 841
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO dkfgxfsaaapyhh;


-- Completed on 2022-06-22 19:02:12 +07

--
-- PostgreSQL database dump complete
--

